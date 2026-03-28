import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/prisma/client";
import type { UpdateProductPayload } from "@/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/products/[id] — get single product
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { listings: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[GET /api/products/:id]", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PATCH /api/products/[id] — update a product
export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body: UpdateProductPayload = await request.json();

    // Verify the product exists first
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Validate numeric fields if provided
    if (body.price !== undefined && (typeof body.price !== "number" || body.price < 0)) {
      return NextResponse.json({ error: "price must be a non-negative number" }, { status: 400 });
    }

    if (
      body.quantity !== undefined &&
      (typeof body.quantity !== "number" || body.quantity < 0 || !Number.isInteger(body.quantity))
    ) {
      return NextResponse.json(
        { error: "quantity must be a non-negative integer" },
        { status: 400 }
      );
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.quantity !== undefined && { quantity: body.quantity }),
        ...(body.images !== undefined && { images: body.images }),
        ...(body.variants !== undefined && { variants: body.variants as Prisma.InputJsonValue }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH /api/products/:id]", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products/[id] — delete a product
export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE /api/products/:id]", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
