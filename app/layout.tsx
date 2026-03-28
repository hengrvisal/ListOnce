import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ListOnce — Multi-marketplace seller hub",
  description:
    "Manage products in one place and deploy parallel agents to list on Etsy, eBay, Amazon, and Facebook Marketplace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Nav */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-indigo-600">ListOnce</span>
              </Link>
              <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
                <Link href="/products" className="hover:text-indigo-600 transition-colors">
                  Products
                </Link>
                <Link
                  href="/products/new"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  + New Product
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</main>
      </body>
    </html>
  );
}
