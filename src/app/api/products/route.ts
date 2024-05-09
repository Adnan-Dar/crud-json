
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}

export async function POST(request: any) {
  try {
    const productData = await request.json();
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.error();
  }
}
