import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Productcart(props){

    const navigate = useNavigate()

    function handleDetail(){
        // navigate(`/productdetail/${props.id}`)
        navigate("/productdetail",{state:{id:props.id}})
    }
        
        return(
            <div className="border p-3 w-60 h-80 text-center rounded-xl relative">                
                <img src={props.image} alt="not fount" className="w-full h-45"/>
                <h1 className="font-bold text-2xl">{props.name}</h1>
                <h3 className="text-lg font-bold">₹ {props.price}</h3>
                {/* <p>{props.description}</p> */}
                <h3 className="absolute left-10 bottom-0 text-2xl">🖤</h3>
                <button onClick={handleDetail} className="border p-1 rounded-lg bg-blue-900 text-white absolute right-10 bottom-0">Go details</button>
            </div>
        )
}

export default Productcart