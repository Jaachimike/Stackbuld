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
    return <div>Loading...</div>;
  }

  const handleEdit = (id: string) => {
    router.push(`/products/edit/${id}`);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-4"> Product Details </h1>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => handleEdit(product.id)}
        >
          Edit Product
        </button>
      </div>

      <div>
        <p>
          {" "}
          <span className="font-bold">Product Identification Number: </span>
          {product.id}
        </p>
        <p>
          {" "}
          <span className="font-bold">Product Name: </span>
          {product.name}
        </p>
        <p>
          {" "}
          <span className="font-bold">Product Category: </span>
          {capitalizeFirstLetter(product.category)}
        </p>
        <p>
          {" "}
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
