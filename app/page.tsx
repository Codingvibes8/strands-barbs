
import { Button } from "@/components/ui/button"
 
export default function Home() {
  return (
    <div className="py-20 min-h-screen flex flex-col items-center justify-center ">
     
     
    
      <p className=" text-lg text-center text-red-800 font-bold">
        This is a simple example of a Next.js application with a custom layout.
      </p>
      <div>
      <Button className="bg-blue-800">Click me</Button>
    </div>
  
    </div>
  );
}
