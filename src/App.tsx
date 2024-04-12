import { FormEvent, useState } from "react"
import Modal from "./UI/Modal"
import ProductCard from "./components/ProductCard"
import { categories, colors, formInput, productList } from "./data/data"
import Button from "./UI/Button"
import Input from "./UI/Input"
import { IProduct } from "./interfaces"
import { productValidation } from "./validation"
import ErrorMessage from "./components/ErrorMessage"
import CircleColor from "./components/CircleColor"
import { v4 as uuid } from "uuid";
import { Select } from "./components/Select"
import { ProductNameTypes } from "./types"

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
  const [productToEdit , setProductToEdit] = useState<IProduct>(defaultProductObj)
  const [productToEditIdx , setProductToEditIdx] = useState<number>(0)
  const [errors, setErrors] = useState({ title: "", description: "", price: "",imageURL: ""})
  const [tempColors, setTempColors] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])


  /* -----------Handler-----------------*/
  const closeModal = () =>  setIsOpen(false)
  const openModal =()=> setIsOpen(true) 
  
  const closeEditModal = () =>  setIsOpenEditModal(false)
  const openEditModal =()=> setIsOpenEditModal(true)

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


  const onChangeEditHandler= (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setProductToEdit({
      ...productToEdit ,
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
     price, 
    })
  //check if any prop has a value of "" && check if all props have a value of ""
  const hasErrorMessage = Object.values(errors).some((err)=> err === '') && Object.values(errors).every((err)=> err === '') 

  if(!hasErrorMessage){
  setErrors(errors)
  return ;
 }
 setProducts(perv => [...perv, {...product, colors: tempColors , id: uuid() , category: selectedCategory}])
  setProduct(defaultProductObj)
  setTempColors([])
  closeModal()
  }


  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void =>{
    event.preventDefault()
    const {title, description, price, imageURL} = productToEdit
    const errors = productValidation({
      title , 
      description , 
      imageURL ,
       price, 
      })
    //check if any prop has a value of "" && check if all props have a value of ""
    const hasErrorMessage = Object.values(errors).some((err)=> err === '') && Object.values(errors).every((err)=> err === '') 
  
    if(!hasErrorMessage){
    setErrors(errors)
    return ;
   }
    const updatedProducts = [...products] 
    updatedProducts[productToEditIdx] = {...productToEdit ,colors : tempColors.concat(productToEdit.colors) };
    setProducts(updatedProducts)
    setProductToEdit(defaultProductObj)
    setTempColors([])
    closeEditModal()
    }


/*---------------render-----------------*/ 
 const renderProductList = products.map((product,idx)=>(

    <ProductCard
     key={product.id} 
     product={product} 
     setProductToEdit={setProductToEdit} 
     openEditModal={openEditModal}
     idx={idx} 
     setProductToEditIdx={setProductToEditIdx}/>
    )
 
 )

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
    if (productToEdit.colors.includes(color)){
      setTempColors((prev)=>prev.filter((item)=>item !== color))
    return ;
    }
    setTempColors((prev)=>[...prev,color])} }/>
  )) 

  const renderProductEditWithErrorMsg =(id:string , label:string , name: ProductNameTypes)=>{
    return (
     <div  className="flex flex-col">
    <label htmlFor={id} className="text-gray-800" >{label}</label>
    <Input type="text" id={id } name={name} value={productToEdit[name]} onChange={onChangeEditHandler}/>
    <ErrorMessage message={errors[name]}/> 
    </div> 
   
    ) 
  }

  ////////// Main return //////////
  return (
    <main className="container" > 

       <Button className="block bg-indigo-600 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium  " onClick={openModal}>Build product</Button>
       <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md ">
       {renderProductList }
       </div>
        
    {/***************  Add product modal ************/}
      <Modal isOpen={isOpen} closeModal={closeModal}  title="Add A NEW PRODUCT">
      <form className="space-y-3" onSubmit={submitHandler}>
       
        {renderFormInput}

       <Select selected={selectedCategory} setSelected={setSelectedCategory} />
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

    {/***************  Edit product modal ************/}
     <Modal isOpen={isOpenEditModal} closeModal={closeEditModal}  title="Add A NEW PRODUCT">
      <form className="space-y-3" onSubmit={submitEditHandler}>

        {renderProductEditWithErrorMsg('title','Product title','title')}
        {renderProductEditWithErrorMsg('description','Product Description','description')}
        {renderProductEditWithErrorMsg('imageUrl','Product Image Url','imageURL')}
        {renderProductEditWithErrorMsg('price','Product Price','price')}

        <Select
         selected={productToEdit.category}
         setSelected={value =>setProductToEdit({...productToEdit, category:value})} />

        <div className="flex items-center my-3 space-x-1 ">
           {renderProductColors}
        </div>
       
        <div className="flex items-center my-3 space-x-1  flex-wrap">
          {tempColors.concat(productToEdit.colors).map((color)=>(
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



