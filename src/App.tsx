import { useState } from "react"
import Modal from "./UI/Modal"
import ProductCard from "./components/ProductCard"
import { formInput, productList } from "./data/data"
import Button from "./UI/Button"
import Input from "./UI/Input"

const App = () => {
  ////---------------state----------------
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  } 
  //render 
 const renderProductList = productList.map((product)=>(
    <ProductCard key={product.id} product={product} />
 ))

 const renderFormInput = formInput.map((input)=>(
  <div key="title" className="flex flex-col">
    <label htmlFor={input.id} className="text-gray-800" >{input.label}</label>
    <Input type="text" id={input.id} name={input.name}/>
 </div>
 ))

  return (
    <main className="container" > 

       <Button className="bg-green-500 hover:bg-green-600 " onClick={openModal}>ADD to card</Button>
       <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md ">
       {renderProductList }
       </div>
      <Modal isOpen={isOpen} closeModal={closeModal}  title="Add A NEW PRODUCT">
       <form>
        {renderFormInput}
         <div className="flex items-center justify-between space-x-2 mt-3"> 
        <Button  className="bg-indigo-600 ">Submit</Button>
        <Button className= "bg-gray-400 hover:bg-red-700 ">Cancel</Button>
         </div>
      </form>
        </Modal>

     </main>
  )
}

export default App
