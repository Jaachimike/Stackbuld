"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import {Product, Category} from "@/types/Product";

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const {productId} = params as {productId: string}; // Explicitly type params
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const foundProduct = products.find((p: Product) => p.id === productId);
        setProduct(foundProduct || null); // Safely handle no product found
      }
    }
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!product) return;
    const {name, value} = e.target;
    setProduct(prev => prev && {...prev, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const storedProducts = localStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = products.map((p: Product) =>
      p.id === product.id ? product : p
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    router.push("/products");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded w-full mb-4"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="border p-2 rounded w-full mb-4"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
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
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;

// "use client";

// import React, {useEffect, useState} from "react";
// import {useRouter, useParams} from "next/navigation";
// import {Product} from "@/types/Product";

// const EditProductPage = () => {
//   const router = useRouter();
//   const {productId} = useParams();
//   const [product, setProduct] = useState<Product | null>(null);

//   //   console.log(productId);

//   useEffect(() => {
//     const storedProducts = localStorage.getItem("products");
//     if (storedProducts) {
//       const products = JSON.parse(storedProducts);
//       const foundProduct = products.find((p: Product) => p.id === productId);
//       setProduct(foundProduct);
//     }
//   }, [productId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!product) return;
//     const {name, value} = e.target;
//     setProduct(prev => prev && {...prev, [name]: value});
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product) return;
//     const storedProducts = localStorage.getItem("products");
//     const products = storedProducts ? JSON.parse(storedProducts) : [];
//     const updatedProducts = products.map((p: Product) =>
//       p.id === product.id ? product : p
//     );
//     localStorage.setItem("products", JSON.stringify(updatedProducts));
//     router.push("/products");
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           value={product.name}
//           onChange={handleChange}
//           placeholder="Product Name"
//           className="border p-2 rounded w-full mb-4"
//         />
//         <input
//           type="text"
//           name="description"
//           value={product.description}
//           onChange={handleChange}
//           placeholder="Product Description"
//           className="border p-2 rounded w-full mb-4"
//         />
//         {/* Additional input fields */}
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProductPage;
