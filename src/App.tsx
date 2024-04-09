import { FormEvent, useState } from "react"
import Modal from "./UI/Modal"
import ProductCard from "./components/ProductCard"
import { colors, formInput, productList } from "./data/data"
import Button from "./UI/Button"
import Input from "./UI/Input"
import { IProduct } from "./interfaces"
import { productValidation } from "./validation"
import ErrorMessage from "./components/ErrorMessage"
import CircleColor from "./components/CircleColor"
import { v4 as uuid } from "uuid";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    price: "",
    imageURL: "",
    colors: [],
    category: {
      name: "",
      imageURL: ""
    }
  
  }
/*-----------------State-----------------*/
  const [products,setProducts] = useState<IProduct[]>(productList)
  const [product,setProduct] = useState<IProduct>(defaultProductObj)
  const [errors, setErrors] = useState({ title: "", description: "", price: "",imageURL: "",})
  const [tempColors, setTempColors] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
console.log(tempColors)

  /* -----------Handler-----------------*/
  const closeModal = () =>  setIsOpen(false)
  const openModal =()=> setIsOpen(true)
  const onChangeHandler= (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setProduct({
      ...product ,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    })
  };

  const onCancel = () => {
    closeModal();
    setProduct(defaultProductObj);
    setTempColors([]);
    setTimeout(() => {
      setErrors({
        title: "",
        description: "",
        price: "",
        imageURL: "",
      });
    }, 2);
  };
  

 const submitHandler = (event: FormEvent<HTMLFormElement>): void =>{
  event.preventDefault()
  const {title, description, price, imageURL} = product
  const errors = productValidation({
    title , 
    description , 
    imageURL ,
     price 
    })
  console.log(errors)

  //check if any prop has a value of "" && check if all props have a value of ""
  const hasErrorMessage = Object.values(errors).some((err)=> err === '') && Object.values(errors).every((err)=> err === '') 

  if(!hasErrorMessage){
  setErrors(errors)
  return ;
 }
 setProducts(perv => [...perv, {...product, colors: tempColors , id: uuid()}])
  setProduct(defaultProductObj)
  setTempColors([])
  closeModal()
  }

/*---------------render-----------------*/ 
 const renderProductList = products.map((product)=>(
    <ProductCard key={product.id} product={product} />
 ))
 const renderFormInput = formInput.map((input)=>(
  <div key={input.id} className="flex flex-col">
    <label htmlFor={input.id} className="text-gray-800" >{input.label}</label>
    <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
    <ErrorMessage message={errors[input.name]}/> 
 </div>
 ))

const renderProductColors = colors.map((color)=>(
 <CircleColor  key={color} color={color} onClick={()=>
  {
  if (tempColors.includes(color)){
    setTempColors((prev)=>prev.filter((item)=>item !== color))
  return ;
  }
    setTempColors((prev)=>[...prev,color])}}/>
  )) 


  ////////// Main return //////////
  return (
    <main className="container" > 

       <Button className="bg-indigo-600 hover:bg-indigo-800  " onClick={openModal}>Add</Button>
       <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md ">
       {renderProductList }
       </div>
      <Modal isOpen={isOpen} closeModal={closeModal}  title="Add A NEW PRODUCT">
      <form className="space-y-3" onSubmit={submitHandler}>
       
        {renderFormInput}


        <div className="flex items-center my-3 space-x-1 ">
           {renderProductColors}
        </div>

        <div className="flex items-center my-3 space-x-1  flex-wrap">
          {tempColors.map((color)=>(
          <span key={color} className="p-1 mr-1 mb-1 text-xs rounded-md text-white"  style={{backgroundColor:color}} >{color}</span>  
          ))}
        </div>

         <div className="flex items-center justify-between space-x-2 mt-3"> 
        <Button  className="bg-indigo-600 ">Submit</Button>
        <Button className= "bg-gray-400 hover:bg-red-700 " onClick={onCancel}>Cancel</Button>
         </div>
      </form>
        </Modal>



     </main>
  )
}

export default App



