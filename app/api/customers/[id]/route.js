// app/api/customers/[id]/route.js
import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

//GET by id
export async function GET(req, { params }) {
    await dbConnect();
  
    try {
      const { id } = params;
      const customer = await Customer.findById(id);
      
      if (!customer) {
        return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
  }

// PUT by id
export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await req.json();
    const customer = await Customer.findByIdAndUpdate(id, body, { new: true });
    
    if (!customer) {
      return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ customer }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

// DELETE by id
export async function DELETE(req, { params }) {
    await dbConnect();
  
    try {
      const { id } = params;
      const customer = await Customer.findByIdAndDelete(id);
      
      if (!customer) {
        return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Customer deleted successfully' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
  }
