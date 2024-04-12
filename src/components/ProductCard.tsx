import Button from "../UI/Button";
import { IProduct } from "../interfaces";
import { textslice } from "../utils/function";
import CircleColor from "./CircleColor";
import Image from "./image"

interface IProps {
product : IProduct
setProductToEdit: (product: IProduct) => void
openEditModal: () => void
idx : number
setProductToEditIdx :(value : number) => void 
openConfirmModal :()=> void 
}

const ProductCard = ({product,idx,setProductToEdit,openEditModal,setProductToEditIdx,openConfirmModal} : IProps) => {
    const {title,description,imageURL,price,colors,category} = product;
    
    /*** renderrrr ****/
    const renderProductColors = colors.map((color)=>(
      <CircleColor  key={color} color={color} />
       )) 
     
    /******      Handler      *******/   
    const onEdit = () => {
     setProductToEdit(product)
     openEditModal()
     setProductToEditIdx(idx)
    }

    const onRemove = () => {
      setProductToEdit(product)
      openConfirmModal()
    }

     return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border  rounded-md p-2 flex flex-col  ">
             <Image imageurl={imageURL} alt={"Product Name"} className="rounded-md"  />

          <h3 className="text-lg font-semibold">{textslice(title,25)}</h3>
          <p className="text-sm text-gray-500 break-words">{textslice(description)}</p>    

          <div className="flex items-center my-3 space-x-1 ">
           {renderProductColors}
          </div> 
         
        
         <div className="flex items-center justify-between">
      
         <span className="text-lg text-indigo-600 font-semibold">${Number(price).toLocaleString()}</span>
             
              <div className="flex flex-row gap-5">
              <span className="text-sm text-black-500 font-semibold mt-2 ">{category.name}</span>
              <Image imageurl={category.imageURL}
               alt={category.name} 
               className="w-10 h-10 rounded-full object-center" />
              </div> 
         </div>
            
         <div className="flex items-center justify-between space-x-2 mt-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800  " width="w-full" onClick={onEdit}
             >EDIT</Button>
            <Button className="bg-red-600 hover:bg-red-800 " onClick={onRemove} >Remove</Button>
         </div>
        </div>         
  )
    }

    export default ProductCard; 

 