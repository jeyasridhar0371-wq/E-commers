import img1 from "../assets/download.jpg"
import img2 from "../assets/f1.jpg"
import img3 from "../assets/f7.jpg"
import img4 from "../assets/mobile2.png"
import img5 from "../assets/n3.jpg"
import img6 from "../assets/n4.jpg"
import img7 from "../assets/n7 (1).jpg"
import img8 from "../assets/product1.webp"
import img9 from "../assets/product2.jpg"
import img10 from "../assets/product4.1.jpg"
import img11 from "../assets/watch.jpg"
import { createContext, useState, useEffect } from "react"
import axios from "axios"

const productContext = createContext()

function Usecontext(data) {
    const imgList = [
        { key: "img1",img: img1 }, { key: "img2",img: img2 }, { key: "img3",img: img3 }, { key: "img4",img: img4 }, { key: "img5",img: img5 }, { key: "img6",img: img6 }, { key: "img7",img: img7 }, { key: "img8",img: img8 }, { key: "img9",img: img9 }, { key: "img10",img: img10 }, { key: "img11",img: img11 }
    ]

    const [productlist, setProductlist] = useState([])
    useEffect(()=>{
    axios.get("http://localhost:5000/readallproduct").then(async (data) => {  // get all product details from database
        setProductlist(data.data)
        // console.log(data.data[0]._id)
    }).catch(()=>{
        console.log("Failed to get product data")
    })
    },[])



    return (
        <productContext.Provider value={{ imgList,productlist,setProductlist }}>
            {data.children}
        </productContext.Provider>
    )
}

export default Usecontext
export { productContext }