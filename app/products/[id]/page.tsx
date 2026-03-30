import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/DeleteProductButton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return { title: product ? `${product.title} — ListOnce` : "Product Not Found" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { listings: true },
  });

  if (!product) notFound();

  const formattedPrice = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(product.price);

  const formattedDate = new Date(product.createdAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const statusColors: Record<string, string> = {
    QUEUED: "bg-yellow-100 text-yellow-700",
    RUNNING: "bg-blue-100 text-blue-700",
    LIVE: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/products" className="hover:text-indigo-600 transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium truncate">{product.title}</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        <div className="flex items-center gap-3">
          <Link
            href={`/products/${product.id}/edit`}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Edit
          </Link>
          <DeleteProductButton id={product.id} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
        {/* Images */}
        {product.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {product.images.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt={`${product.title} image ${i + 1}`}
                className="h-48 w-48 object-cover rounded-xl shrink-0 bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Meta */}
        <div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Category: <strong className="text-gray-700">{product.category}</strong></span>
            <span>Price: <strong className="text-indigo-600">{formattedPrice}</strong></span>
            <span>Qty: <strong className="text-gray-700">{product.quantity}</strong></span>
            <span>Added: <strong className="text-gray-700">{formattedDate}</strong></span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Description
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{product.description}</p>
        </div>

        {/* Listings */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Marketplace Listings
          </h2>
          {product.listings.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No listings yet. Deploy agents to start listing this product.
            </p>
          ) : (
            <div className="space-y-2">
              {product.listings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
                >
                  <span className="font-medium text-sm text-gray-700">{listing.marketplace}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      statusColors[listing.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {listing.status}
                  </span>
                  {listing.listingUrl && (
                    <a
                      href={listing.listingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      View listing
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
