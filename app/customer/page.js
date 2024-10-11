"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CustomerList = () => {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const fetchCustomers = async () => {
    const response = await fetch(`api/customers`);
    const data = await response.json();
    setCustomers(data);
  };

  const deleteCustomer = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    await fetch(`api/customers/${id}`, { method: "DELETE" });
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setEditMode(true);
    setSelectedCustomer(customer);
    reset(customer); // Reset form with selected customer data
  };

  const handleAddOrUpdate = async (data) => {
    if (editMode) {
      await fetch(`api/customers/${selectedCustomer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch(`api/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    setEditMode(false);
    setSelectedCustomer(null);
    reset(); // Reset form
    fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex-1 w-64 ">
          {/* Customer Form for Adding/Updating Customers */}
          <form onSubmit={handleSubmit(handleAddOrUpdate)}>
            <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
              <div>
                <label>Name:</label>
                <input
                  {...register("name", { required: true })}
                  placeholder="Customer Name"
                  className="border border-black w-full"
                />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  type="date"
                  {...register("dateOfBirth", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>
                <label>Member Number:</label>
                <input
                  type="number"
                  {...register("memberNumber", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>
                <label>Interests:</label>
                <input
                  {...register("interests")}
                  placeholder="Interests"
                  className="border border-black w-full"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className={`bg-${editMode ? 'blue' : 'green'}-800 hover:bg-${editMode ? 'blue' : 'green'}-700 text-white font-bold py-2 px-4 rounded-full`}
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="border m-4 bg-slate-300 flex-1 w-64">
          <h1 className="text-2xl">Customers ({customers.length})</h1>
          <ul className="list-disc ml-8">
            {customers.map((customer) => (
              <li key={customer._id} className="flex justify-between items-center">
                <Link href={`/customer/${customer._id}`} className="font-bold">
                  {customer.name}
                </Link>
                <div>
                  <button
                    className="border border-black p-1 mx-1"
                    onClick={() => handleEdit(customer)}
                  >
                    📝
                  </button>
                  <button
                    className="border border-black p-1 mx-1"
                    onClick={() => deleteCustomer(customer._id)}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustomerList;
