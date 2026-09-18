import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/repositories/product-repository";

import {
  productSchema,
  type ProductInput,
} from "@/validators/product-validator";

export async function fetchProducts() {
  return getProducts();
}

export async function fetchProductById(productId: string) {
  if (!productId) {
    throw new Error("ID barang tidak valid.");
  }

  return getProductById(productId);
}

export async function addProduct(input: ProductInput): Promise<string> {
  const validatedProduct = productSchema.parse(input);

  const products = await getProducts();

  const duplicatedSku = products.some(
    (product) =>
      product.sku.toLowerCase() === validatedProduct.sku.toLowerCase(),
  );

  if (duplicatedSku) {
    throw new Error("SKU sudah digunakan.");
  }

  return createProduct(validatedProduct);
}

export async function editProduct(
  productId: string,
  input: ProductInput,
): Promise<void> {
  if (!productId) {
    throw new Error("ID barang tidak valid.");
  }

  const validatedProduct = productSchema.parse(input);

  const products = await getProducts();

  const duplicatedSku = products.some(
    (product) =>
      product.id !== productId &&
      product.sku.toLowerCase() === validatedProduct.sku.toLowerCase(),
  );

  if (duplicatedSku) {
    throw new Error("SKU sudah digunakan.");
  }

  await updateProduct(productId, validatedProduct);
}

export async function removeProduct(productId: string): Promise<void> {
  if (!productId) {
    throw new Error("ID barang tidak valid.");
  }

  const product = await getProductById(productId);

  if (!product) {
    throw new Error("Barang tidak ditemukan.");
  }

  await deleteProduct(productId);
}
