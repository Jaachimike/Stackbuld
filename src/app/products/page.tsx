"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Product} from "@/types/Product";
import {capitalizeFirstLetter} from "@/utils/stringUtils";

type SortOption = "none" | "ascending" | "descending";

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [priceSort, setPriceSort] = useState<SortOption>("none");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setDisplayedProducts(parsedProducts);
    }
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];

    if (categoryFilter !== "All") {
      filteredProducts = filteredProducts.filter(
        p => capitalizeFirstLetter(p.category) === categoryFilter
      );
    }

    if (priceSort !== "none") {
      filteredProducts.sort((a, b) => {
        if (priceSort === "ascending") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    setDisplayedProducts(filteredProducts);
  }, [products, priceSort, categoryFilter]);

  const handleEdit = (id: string) => {
    router.push(`/products/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/products/${id}`);
  };

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const categories = [
    "All",
    ...new Set(products.map(p => capitalizeFirstLetter(p.category))),
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          Product Listing
        </h1>
        <Link
          href="/products/new"
          className="bg-black text-white hover:bg-white hover:text-black p-2 sm:p-3 rounded-xl text-sm sm:text-base"
        >
          Add New Product
        </Link>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <select
          value={priceSort}
          onChange={e => setPriceSort(e.target.value as SortOption)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="none">Sort by Price</option>
          <option value="ascending">Price: Low to High</option>
          <option value="descending">Price: High to Low</option>
        </select>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map(product => {
              const shortProductId = product.id.split("-", 2).join("-");
              return (
                <tr key={product.id} className="border-b">
                  <td className="p-2">{shortProductId}</td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">
                    {capitalizeFirstLetter(product.category)}
                  </td>
                  <td className="p-2">{product.description}</td>
                  <td className="p-2">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        className="bg-blue-500 text-white  font-semibold p-1 sm:p-2 rounded text-sm"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-white text-black font-semibold p-1 sm:p-2 rounded text-sm"
                        onClick={() => handleView(product.id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 text-white font-semibold p-1 sm:p-2 rounded text-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
