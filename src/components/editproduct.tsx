import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Editproductform({
  id,
  name,
  image,
  price,
  category,
}: {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}) {
  const [newName, setNewName] = useState(name);
  const [newImage, setNewImage] = useState(image);
  const [newPrice, setNewPrice] = useState(price);
  const [newCategory, setNewCategory] = useState(category);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          price: newPrice.toString(),
          category: newCategory,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update Product");
      } else {
        console.log("Product updated");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold py-10 text-2xl">Update Product</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          className="input input-bordered input-accent w-full max-w-xs"
          type="text"
        />

        <input
          onChange={(e) => setNewPrice(parseFloat(e.target.value))}
          value={newPrice}
          className="input input-bordered input-accent w-full max-w-xs"
          type="number"
        />
        <input
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
          className="input input-bordered input-accent w-full max-w-xs"
          type="text"
        />

        <button className="btn btn-primary w-full max-w-xs">
          Update Product
        </button>
      </form>
    </>
  );
}
