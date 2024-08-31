"use client";

import {useRouter} from "next/navigation";
import {Product} from "@/types/Product";
import {v4 as uuidv4} from "uuid";
import ProductForm from "@/components/ProductForm"; // Adjust the import path as needed

const AddProductPage = () => {
  const router = useRouter();

  const handleSubmit = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      id: uuidv4(),
      ...productData,
    };

    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("products");
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      localStorage.setItem(
        "products",
        JSON.stringify([...products, newProduct])
      );
      router.push("/products");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} submitButtonText="Add Product" />
    </div>
  );
};

export default AddProductPage;
