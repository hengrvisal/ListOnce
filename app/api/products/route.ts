import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/prisma/client";
import type { CreateProductPayload } from "@/types";

// GET /api/products — list all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { listings: true },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products — create a product
export async function POST(request: Request) {
  try {
    const body: CreateProductPayload = await request.json();

    const { title, description, price, category, quantity, images, variants } = body;

    if (!title || !description || price == null || !category || quantity == null) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, price, category, quantity" },
        { status: 400 }
      );
    }

    if (typeof price !== "number" || price < 0) {
      return NextResponse.json({ error: "price must be a non-negative number" }, { status: 400 });
    }

    if (typeof quantity !== "number" || quantity < 0 || !Number.isInteger(quantity)) {
      return NextResponse.json(
        { error: "quantity must be a non-negative integer" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        category,
        quantity,
        images: images ?? [],
        variants: (variants ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[POST /api/products]", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
