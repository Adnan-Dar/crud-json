"use client";

import { useState, useEffect } from "react";
import Removebutton from "@/components/removebutton";
import Editproductform from "@/components/editproduct";
import Addproduct from "@/components/addproduct";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Productlist() {
  const rowperpage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowperpage);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("api/products", {
          method: "GET",
        });
        console.log(res);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log("Error loading products: ", error);
      }
    };

    getProducts();
  }, []);

  console.log(products);

  return (
    <div className=" overflow-x-auto w-2/3">
      <div className="flex justify-center items-center">
        <div>
          <h1 className="font-bold py-10 text-2xl">Manage Products here</h1>
        </div>
        <div className="text-right ml-20">
          <div className="drawers drawer-end">
            <input
              id="add-product-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="add-product-drawer"
                className="drawer-button btn btn-primary"
              >
                Add Product
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="add-product-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <Addproduct />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.slice(startIndex, endIndex).map((product: any) => (
            <tr className="hover" key={product._id}>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>
                <div className="flex items-center w-2/3 gap-3">
                  <div className="avatar"></div>
                  <div>
                    <div className="font-bold">{product.name}</div>
                  </div>
                </div>
              </td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <div className="flex">
                  <div className="drawers drawer-end">
                    <input
                      id={`edit-drawer-${product._id}`}
                      type="checkbox"
                      className="drawer-toggle"
                    />
                    <div className="drawer-content">
                      <label
                        htmlFor={`edit-drawer-${product._id}`}
                        className="drawer-button w-20 btn btn-primary"
                      >
                        Edit
                      </label>
                    </div>
                    <div className="drawer-side">
                      <label
                        htmlFor={`edit-drawer-${product._id}`}
                        aria-label="close sidebar"
                        className="drawer-overlay"
                      ></label>
                      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <Editproductform
                          id={product.id}
                          name={product.name}
                          image={product.image}
                          price={product.price}
                          category={product.category}
                        />
                      </ul>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <Removebutton id={product.id} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <Pagination className=" border">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={startIndex === 0 ? "pointer-events-none  " : undefined}
              onClick={() => {
                setStartIndex(startIndex - rowperpage);
                setEndIndex(endIndex - rowperpage);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              className={
                endIndex >= products.length ? "pointer-events-none bg-inherit" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowperpage);
                setEndIndex(endIndex + rowperpage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
   
  );
}
