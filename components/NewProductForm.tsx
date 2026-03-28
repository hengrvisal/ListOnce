"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUrlInput from "./ImageUrlInput";
import type { CreateProductPayload } from "@/types";

export default function NewProductForm() {
  const router = useRouter();

  const [form, setForm] = useState<CreateProductPayload>({
    title: "",
    description: "",
    price: 0,
    category: "",
    quantity: 1,
    images: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }

      router.push("/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="Handmade ceramic mug"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your product in detail..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {/* Price + Category row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (AUD) <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            required
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            value={form.category}
            onChange={handleChange}
            placeholder="Home & Living"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Quantity <span className="text-red-500">*</span>
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          required
          min="0"
          step="1"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Image URLs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URLs
        </label>
        <p className="text-xs text-gray-400 mb-2">
          Paste a public image URL and click Add. Press Enter to add quickly.
        </p>
        <ImageUrlInput
          value={form.images}
          onChange={(urls) => setForm((prev) => ({ ...prev, images: urls }))}
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Creating product..." : "Create product"}
        </button>
      </div>
    </form>
  );
}
