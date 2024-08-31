"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import {Product} from "@/types/Product";
import ProductForm from "@/components/ProductForm"; // Adjust the import path as needed

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const {productId} = params as {productId: string};
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const foundProduct = products.find((p: Product) => p.id === productId);
        setProduct(foundProduct || null);
      }
    }
  }, [productId]);

  const handleSubmit = (updatedProductData: Omit<Product, "id">) => {
    if (!product) return;

    const updatedProduct = {...product, ...updatedProductData};

    const storedProducts = localStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = products.map((p: Product) =>
      p.id === product.id ? updatedProduct : p
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    router.push("/products");
  };

  if (!product) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        initialProduct={product}
        onSubmit={handleSubmit}
        submitButtonText="Update Product"
      />
    </div>
  );
};

export default EditProductPage;
