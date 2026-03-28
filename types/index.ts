import type { Listing, Marketplace, ListingStatus } from "@/lib/generated/prisma/client";

// Re-export Prisma enums for convenience
export type { Marketplace, ListingStatus };

// Product with its listings
export type ProductWithListings = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  images: string[];
  variants: unknown;
  listings: Listing[];
};

// Payload for creating a product
export type CreateProductPayload = {
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  images: string[];
  variants?: Record<string, unknown>;
};

// Payload for updating a product (all fields optional)
export type UpdateProductPayload = Partial<CreateProductPayload>;

// API error shape
export type ApiError = {
  error: string;
};
