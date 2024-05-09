import { useRouter } from "next/navigation";

export default function Removebutton({ id }: { id: string }) {
  const router = useRouter();

  const removeProduct = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        });

        console.log("response", res);

        if (res.ok) {
          console.log("Product deleted successfully");
          router.refresh();
        } else {
          throw new Error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <button onClick={removeProduct} className="btn btn-error ml-2">
      Delete
    </button>
  );
}
