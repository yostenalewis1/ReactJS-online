import Button from "../UI/Button";
import { IProduct } from "../interfaces";
import { textslice } from "../utils/function";
import Image from "./image"
interface IProps {
product : IProduct
}

const ProductCard = ({product} : IProps) => {
    const {title,description,imageURL,price,category} = product;
     return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border  rounded-md p-2 flex flex-col  ">
             <Image imageurl={imageURL} alt={"Product Name"} className="rounded-md"  />

          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 break-words">{textslice(description)}</p>    

         <div className="flex items-center my-3 space-x-2 " >
            <span className="w-5 h-5 bg-red-800 rounded-full  cursor-pointer"/>
            <span className="w-5 h-5 bg-yellow-400 rounded-full cursor-pointer"/>
            <span className="w-5 h-5 bg-blue-800 rounded-full cursor-pointer " />
         </div>
        
         <div className="flex items-center justify-between">
              <span>{price}</span> 
             <Image imageurl={category.imageURL}
               alt={category.name} className="w-10 h-10 rounded-full object-center" />
         </div>
            
         <div className="flex items-center justify-between space-x-2 mt-3">
            <Button className="bg-indigo-600 " width="w-full"
             >EDIT</Button>
            <Button className="bg-red-700 " >DELETE</Button>
         </div>
        </div>
  
             
  )
    }

    export default ProductCard; 