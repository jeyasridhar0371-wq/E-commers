import { useEffect, useState } from "react";
import axios from "axios";
import auth from "./config";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";


function Myorders(){

    const [orders,setOrders] = useState([]);


    useEffect(()=>{

        fetchOrders();

    },[]);


    // Get order history based on user
    async function fetchOrders(){

        const user = auth.currentUser;

        if(!user) return;


        try{

            const res = await axios.get(
                "https://e-commers-wpco.onrender.com/readorders",
                {
                    params:{
                        userid:user.uid
                    }
                }
            );


            setOrders(res.data);


        }
        catch(err){

            console.log(err);

        }

    }



    return(

        <div>

            <Navbar />


            <div className="pt-20 p-5">


                <h1 className="text-3xl font-bold mb-5">
                    My Orders
                </h1>



                {
                    orders.length === 0 ?

                    <h2>
                        No orders found
                    </h2>


                    :

                    orders.map((order)=>(


                        <div
                        key={order._id}
                        className="border rounded-xl p-5 mb-5"
                        >


                            <h2 className="font-bold text-xl">
                                Order ID : {order._id}
                            </h2>


                            <p>
                                Total : ₹ {order.total}
                            </p>


                            <p>
                                Payment : {order.paymentMethod}
                            </p>


                            <p>
                                Status : {order.status}
                            </p>


                        </div>


                    ))

                }


            </div>


            <Footer />

        </div>

    )

}


export default Myorders;