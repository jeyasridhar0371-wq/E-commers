import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { useLocation, useNavigate } from "react-router-dom";

function Orderconfirmation(){

    const navigate = useNavigate();

    const location = useLocation();

    const order = location.state;


    return(
        <div>

            <Navbar />


            <div className="pt-24 p-5 flex justify-center">

                <div className="border rounded-xl shadow p-8 text-center max-w-lg">


                    <h1 className="text-4xl font-bold text-green-700">
                        Order Confirmed 🎉
                    </h1>


                    <p className="mt-5 text-lg">
                        Thank you for your purchase.
                    </p>


                    {
                        order && (

                            <div className="mt-5 text-left">


                                <h2 className="font-bold">
                                    Order Details
                                </h2>


                                <p>
                                    Order ID : {order._id}
                                </p>


                                <p>
                                    Payment : {order.paymentMethod}
                                </p>


                                <p>
                                    Total : ₹ {order.total}
                                </p>


                                <p>
                                    Status : {order.status}
                                </p>


                            </div>

                        )
                    }

                    <button onClick={()=>navigate("/productlist")} className="bg-blue-900 text-white px-6 py-3 rounded-lg mt-6" > 
                        Continue Shopping
                    </button>

                </div>

            </div>


            <Footer />

        </div>
    )

}


export default Orderconfirmation;