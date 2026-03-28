import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Products — ListOnce",
};

// Always fetch fresh data on each request
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {products.length} {products.length === 1 ? "product" : "products"} in your catalogue
          </p>
        </div>
        <Link
          href="/products/new"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          + New Product
        </Link>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No products yet</h2>
          <p className="text-gray-500 text-sm mb-6">
            Add your first product to start listing across marketplaces.
          </p>
          <Link
            href="/products/new"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Add your first product
          </Link>
        </div>
      )}

      {/* Products grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
