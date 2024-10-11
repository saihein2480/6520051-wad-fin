// app/api/customers/route.js
import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";


export async function GET() {
    await dbConnect();
  
    try {
      const customers = await Customer.find();
      return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  export async function POST(req) {
    await dbConnect();
  
    try {
      const body = await req.json();
      const customer = new Customer(body);
      await customer.save();
      return new Response(JSON.stringify({ customer }), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
  }
  
