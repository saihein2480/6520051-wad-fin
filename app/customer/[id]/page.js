"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerDetail({ params }) {
  const router = useRouter();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Use API_BASE to ensure the correct URL is used
        const response = await fetch(`/api/customers/${params.id}`, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }

        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    if (params.id) {
      fetchCustomer();
    }
  }, [params.id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">Customer Details</h1>
      <p className="font-bold text-xl text-blue-800">Name: {customer.name}</p>
      <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests}</p>

      <button 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
}
