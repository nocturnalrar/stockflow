import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Product } from "@/types/product";
import type { ProductInput } from "@/validators/product-validator";

const PRODUCTS_COLLECTION = "products";

export async function getProducts(): Promise<Product[]> {
  const productsQuery = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as Product[];
}

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Product;
}

export async function createProduct(product: ProductInput): Promise<string> {
  const document = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
}

export async function updateProduct(
  productId: string,
  product: ProductInput,
): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);

  await updateDoc(productRef, {
    ...product,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(productId: string): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);

  await deleteDoc(productRef);
}
