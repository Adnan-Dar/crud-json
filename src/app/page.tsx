import ProductList from "@/components/productlist";


export default function Home() {
  return (
   
    <div className="flex flex-col justify-center items-center  ">
    <div> <h3 className="font-sans text-2xl text-blue-700 mt-20 ">Welcome to Dashboard</h3>
    </div>

    <ProductList />
     
     </div>

     
  );
}
