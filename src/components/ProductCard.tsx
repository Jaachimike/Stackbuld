// app/components/ProductCard.tsx
import React from "react";
import {useRouter} from "next/navigation";
import {Product} from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/products/edit/${product.id}`);
  };

  const handleDelete = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const updatedProducts = products.filter(
        (p: Product) => p.id !== product.id
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      router.refresh();
    }
  };

  return (
    <div className="border p-4 rounded flex gap-8 items-center justify-between">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <div className="mt-4 flex space-x-4 justify-between">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
