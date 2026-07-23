import axios from "axios"
import Footer from "../component/common/Footer"
import Navbar from "./common/Navbar"
import { useState } from "react"

function Addproduct(){

    const [name,setName] = useState()
    const [description,setDescription] = useState()
    const [price,setPrice] = useState()
    const [category,setCategory] = useState("other")
    const [image,setImage] = useState("watch.jpg")

    function handleAdd(){
        axios.post("https://e-commers-wpco.onrender.com/ctrateproduct",{name:name,description:description,price:price,category:category,image:image}).then((data)=>{
            console.log("Success to create product")
        }).catch(()=>{
            console.log("Failed to create product")
            alert("can not create product, Try later!..")
        })
    }

    return(
        <div>
            <Navbar/>
            <div className="flex justify-center items-center h-full pt-20 my-5 bg-gray-100">
            <form className="p-10 bg-white rounded-lg shadow-md" style={{ width: "75%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Add Products to sell</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">name:</label>
                    <input
                        type="text" placeholder="Enter product name..."
                        onChange={(e) => setName(e.target.value)}
                        
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">description:</label>
                    <textarea
                        type="text" placeholder="Enter product description..."
                        onChange={(e) => setDescription(e.target.value)}
                        
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">price:</label>
                    <input
                        type="number" placeholder="₹"
                        onChange={(e) => setPrice(e.target.value)}
                        
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 p-2 w-full border rounded">
                        <option value="other">-- Select --</option>
                        <option value="electonic">electonic</option>
                        <option value="home product">home product</option>
                        <option value="education">education</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">image:</label>
                    <input
                        type="file"
                        // onChange={(e) => setImage(e.target.value)}
                        
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <p className='text-red-600 cursor-pointer my-2'></p>
                <button onClick={handleAdd} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
                    Add
                </button>
            </form>
        </div>
            <Footer/>
        </div>
    )
}

export default Addproduct