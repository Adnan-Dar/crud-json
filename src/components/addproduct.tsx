import { useState } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { validateaddform } from "@/lib/zodvalidation";

export default function Addproduct() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      //zod validation
      const parsedResuts = validateaddform({
        name,
        price: parseFloat(price.toString()),
        category,
      });

      if (parsedResuts) {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, price, category }),
        });
        console.log("response", res);

        if (res.ok) {
          router.refresh();
          router.push("/");
          setSuccess(true);
          console.log("Product created successfully");
        } else {
          throw new Error("Failed to create a Product");
        }
      }

      setErrors([]);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        console.log(errorMessages);
        setErrors(error.errors);
      }
    }
  };

  const closeSuccessPopup = () => {
    setSuccess(false);
    router.push("/");
  };

  return (
    <>
      <div className="flex flex-col items-center my-10 justify-center ">
        <div className="flex">
          {" "}
          <h1 className="font-bold py-10 text-2xl">Add New Product</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input input-bordered input-accent w-full max-w-xs"
              type="text"
              placeholder="Product Name"
            />
            <div className="mt-1 text-xs text-red-500">
              {
                errors.find((error: any) => error.path.includes("name"))
                  ?.message
              }
            </div>
            <input
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              value={price}
              className="input input-bordered input-accent w-full max-w-xs"
              type="number"
              placeholder="1"
              defaultValue="1"
            />
            <div className="mt-1 text-xs text-red-500">
              {
                errors.find((error: any) => error.path.includes("price"))
                  ?.message
              }
            </div>
            <input
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="input input-bordered input-accent w-full max-w-xs"
              type="text"
              placeholder="Product Category"
            />
            <div className="mt-1 text-xs text-red-500">
              {
                errors.find((error: any) => error.path.includes("category"))
                  ?.message
              }
            </div>

            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Add Product
            </button>
          </form>
          {success && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md text-center">
                <p className="text-green-500 text-lg font-semibold mb-4">
                  Data Successfully Saved!
                </p>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={closeSuccessPopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>{" "}
      </div>
    </>
  );
}
