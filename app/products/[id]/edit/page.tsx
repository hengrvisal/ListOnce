import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/EditProductForm";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return { title: product ? `Edit ${product.title} — ListOnce` : "Product Not Found" };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/products" className="hover:text-indigo-600 transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/products/${id}`} className="hover:text-indigo-600 transition-colors">
          {product.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Edit</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit product</h1>

      <EditProductForm
        id={id}
        initial={{
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          quantity: product.quantity,
          images: product.images,
        }}
      />
    </div>
  );
}
