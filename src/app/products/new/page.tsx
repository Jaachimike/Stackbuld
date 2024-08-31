"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Product, Category} from "@/types/Product";
import {v4 as uuidv4} from "uuid";

const ProductForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>(Category.Clothes);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newProduct: Product = {
      id: uuidv4(),
      name,
      category,
      price,
      description,
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value as Category)}
        className="border p-2 rounded w-full mb-4"
      >
        {Object.values(Category).map(cat => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(parseFloat(e.target.value))}
        className="border p-2 rounded w-full mb-4"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        className="bg-green-500 text-white p-2 rounded"
        onClick={handleSubmit}
      >
        Add Product
      </button>
    </div>
  );
};

export default ProductForm;
