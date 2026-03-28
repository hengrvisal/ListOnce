import Link from "next/link";
import type { Product } from "@/lib/generated/prisma/client";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedDate = new Date(product.createdAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedPrice = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(product.price);

  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
    >
      {/* Thumbnail */}
      {product.images.length > 0 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-40 object-cover rounded-lg mb-4 bg-gray-100"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
          No image
        </div>
      )}

      <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
      <p className="text-sm text-gray-500 mt-1 truncate">{product.category}</p>

      <div className="flex items-center justify-between mt-3">
        <span className="text-indigo-600 font-bold">{formattedPrice}</span>
        <span className="text-xs text-gray-400">
          Qty: {product.quantity} · {formattedDate}
        </span>
      </div>
    </Link>
  );
}
