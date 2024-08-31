"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import {Product} from "@/types/Product";
import {capitalizeFirstLetter} from "@/utils/stringUtils";

const ProductDetailPage = () => {
  const router = useRouter();
  const {productId} = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const foundProduct = products.find((p: Product) => p.id === productId);
        setProduct(foundProduct);
      }
    }
  }, [productId]);

  if (!product) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const handleEdit = (id: string) => {
    router.push(`/products/edit/${id}`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          Product Details
        </h1>
        <button
          className="bg-blue-500 text-white p-2 rounded w-full sm:w-auto"
          onClick={() => handleEdit(product.id)}
        >
          Edit Product
        </button>
      </div>

      <div className="space-y-4">
        <p>
          <span className="font-bold">Product Identification Number: </span>
          {product.id}
        </p>
        <p>
          <span className="font-bold">Product Name: </span>
          {product.name}
        </p>
        <p>
          <span className="font-bold">Product Category: </span>
          {capitalizeFirstLetter(product.category)}
        </p>
        <p>
          <span className="font-bold">Product Price: </span>&#8358;
          {product.price}
        </p>
        <p>
          <span className="font-bold">Product Description: </span>
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
