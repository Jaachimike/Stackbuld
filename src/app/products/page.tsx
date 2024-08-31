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

    // filter by category
    if (categoryFilter !== "All") {
      filteredProducts = filteredProducts.filter(
        p => capitalizeFirstLetter(p.category) === categoryFilter
      );
    }

    // filter by price
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

  // const capitalizeFirstLetter = (a: string) => {
  //   let camelCaseText = a
  //     .split(" ")
  //     .map(function (word, index) {
  //       // First character upper case else lower case
  //       return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  //     })
  //     .join(" ");

  //   return camelCaseText;
  // };

  const categories = [
    "All",
    ...new Set(products.map(p => capitalizeFirstLetter(p.category))),
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Listing</h1>
        <Link
          href="/products/new"
          className="bg-black text-white hover:bg-white hover:text-black p-3 rounded-xl"
        >
          Add New Product
        </Link>
      </div>
      <div className="mb-4 flex space-x-4">
        <select
          value={priceSort}
          onChange={e => setPriceSort(e.target.value as SortOption)}
          className="p-2 border rounded"
        >
          <option value="none">Sort by Price</option>
          <option value="ascending">Price: Low to High</option>
          <option value="descending">Price: High to Low</option>
        </select>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map(product => {
              const shortProductId = product.id.split("-", 2).join("-");
              return (
                <tr key={product.id}>
                  <td>{shortProductId}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{capitalizeFirstLetter(product.category)}</td>
                  <td>{product.description}</td>
                  <td>
                    <div className="flex space-x-4">
                      <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={() => handleView(product.id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded"
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
