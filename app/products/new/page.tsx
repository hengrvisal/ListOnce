import Link from "next/link";
import NewProductForm from "@/components/NewProductForm";

export const metadata = {
  title: "New Product — ListOnce",
};

export default function NewProductPage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/products" className="hover:text-indigo-600 transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">New</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add a new product</h1>
        <p className="text-sm text-gray-500 mb-8">
          Fill in the details below. Once created you can deploy listing agents for each
          marketplace.
        </p>
        <NewProductForm />
      </div>
    </div>
  );
}
