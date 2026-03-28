import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        List once.{" "}
        <span className="text-indigo-600">Sell everywhere.</span>
      </h1>
      <p className="text-xl text-gray-500 max-w-2xl mb-10">
        Manage your products in one place and deploy parallel agents to list them on Etsy, eBay,
        Amazon, and Facebook Marketplace — simultaneously.
      </p>
      <div className="flex gap-4">
        <Link
          href="/products/new"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-700 transition-colors"
        >
          Add your first product
        </Link>
        <Link
          href="/products"
          className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors"
        >
          View products
        </Link>
      </div>

      {/* Marketplace badges */}
      <div className="mt-16 flex items-center gap-4 text-sm text-gray-400">
        <span>Supported marketplaces:</span>
        {["Etsy", "eBay", "Amazon", "Facebook"].map((m) => (
          <span
            key={m}
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
