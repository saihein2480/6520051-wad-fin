"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${params.id}`, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <p className="font-bold text-xl text-blue-800">Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price} Baht</p>
      <p>
        Category: {product.category ? product.category.name : 'No category available'}
      </p>

      <button 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
}
