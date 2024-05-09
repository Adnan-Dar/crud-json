import { NextResponse } from "next/server";
import Product from "@/models/productmodel";

export async function GET({ params }: any) {
  const { id } = params;
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.error();
  }
}

// export async function PUT({ params, request }: any) {

//     try {
//         const productData = await request.json();
//         const response = await fetch(`http://localhost:3000/products/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(productData),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update product');
//         }

//         return NextResponse.json({ message: 'Product updated' }, { status: 200 });
//     } catch (error) {
//         console.error('Error updating product:', error);
//         return NextResponse.error();
//     }
// }

// export async function DELETE(request: any) {
//     try {
//         const { id } = request.query;
//         console.log(`DELETE request received for id: ${id}`);

//         // Here you should make a request to your API endpoint
//         const response = await fetch(`http://localhost:3000/products/${id}`, {
//             method: 'DELETE',
//         });

//         // Check if the request was successful
//         if (!response.ok) {
//             throw new Error('Failed to delete product');
//         }

//         // Return a success response
//         return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
//     } catch (error) {
//         console.error('Error deleting product:', error);
//         // Return an error response
//         return NextResponse.error();
//     }
// }
