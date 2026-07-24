import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { useState, useEffect, useContext } from "react";
import { productContext } from "./Usecontext";
import auth from "./config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const navigate = useNavigate();

    const { productlist, imgList } = useContext(productContext);

    const [cartProducts, setCartProducts] = useState([]);

    const [shipping, setShipping] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    useEffect(() => {

        fetchCart();

    }, [productlist]);

    // get all available product in cart
    async function fetchCart() {

        const user = auth.currentUser;

        if (!user) return;

        try {

            const res = await axios.get(
                "https://e-commers-wpco.onrender.com/readcart"
            );


            const myCart = res.data.filter(
                (item) => item.userid === user.uid
            );


            const products = myCart.map((cart) => {

                const product = productlist.find(
                    (p) => p._id === cart.productid
                );


                if (!product) return null;


                return {
                    ...product,
                    quantity: cart.quantity
                };

            });


            setCartProducts(products.filter(Boolean));


        }
        catch (err) {

            console.log(err);

        }

    }

    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [card, setCard] = useState({
        number: "",
        holder: "",
        expiry: "",
        cvv: ""
    });

    // function for buy order
    async function placeOrder() {

        const user = auth.currentUser;

        if (!user) {
            alert("Please login");
            return;
        }


        const orderData = {

            userid: user.uid,


            products: cartProducts.map((item) => ({

                productid: item._id,

                quantity: item.quantity

            })),


            shipping: shipping,


            paymentMethod: paymentMethod,


            total: total

        };


        try {


            await axios.post(
                "https://e-commers-wpco.onrender.com/addorder",
                orderData
            );


            await axios.delete(
                "https://e-commers-wpco.onrender.com/clearcart",
                {
                    params: {
                        userid: user.uid
                    }
                }
            );


            navigate("/orderconfirmation", {state: orderData.data});


        }
        catch (err) {

            console.log(err);

        }

    }

    // Set debit cart details in card state
    function handleCardChange(e) {
        const { name, value } = e.target;

        setCard((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // Set entered address in Shipping state
    function handleChange(e) {
        const { name, value } = e.target;

        setShipping((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // Total amount to pay to buy product
    const total = cartProducts.reduce(
        (sum, item) => {

            return sum + item.price * item.quantity;

        }, 0
    );

    return (
        <div>
            <Navbar />

            <div className="pt-20 p-10">

                <h1 className="text-4xl font-bold">
                    Checkout
                </h1>
                {/* Shipping Information */}
                <div className="mt-8 border rounded-xl p-6 shadow">

                    <h2 className="text-2xl font-bold mb-5">
                        Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="fullname"
                            placeholder="Full Name"
                            value={shipping.fullname}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={shipping.email}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={shipping.phone}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={shipping.city}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={shipping.state}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        />

                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={shipping.pincode}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        />

                    </div>

                    <textarea
                        name="address"
                        placeholder="Full Address"
                        value={shipping.address}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mt-4"
                        rows="4"
                    />

                </div>
                {/* Order Summary */}
                <div className="mt-8 border rounded-xl p-6 shadow">

                    <h2 className="text-2xl font-bold mb-5">
                        Order Summary
                    </h2>


                    {
                        cartProducts.map((product) => (

                            <div
                                key={product._id}
                                className="flex justify-between border-b py-3"
                            >

                                <div>

                                    <h3 className="font-bold">
                                        {product.name}
                                    </h3>

                                    <p>
                                        ₹ {product.price} × {product.quantity}
                                    </p>

                                </div>


                                <h3 className="font-bold">

                                    ₹ {product.price * product.quantity}

                                </h3>


                            </div>

                        ))
                    }


                    <div className="flex justify-between mt-5">

                        <h2 className="text-xl font-bold">
                            Total
                        </h2>


                        <h2 className="text-xl font-bold">
                            ₹ {total}
                        </h2>


                    </div>


                </div>
                {/* Payment Information */}
                <div className="mt-8 border rounded-xl p-6 shadow">

                    <h2 className="text-2xl font-bold mb-5">
                        Payment Information
                    </h2>

                    <div className="space-y-3">

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Cash on Delivery
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="upi"
                                checked={paymentMethod === "upi"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            UPI
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Credit / Debit Card
                        </label>

                    </div>
                </div>
                {/* Cart Details */}
                {paymentMethod === "card" && (

                    <div className="mt-5 border rounded-xl p-6 shadow">

                        <h2 className="text-xl font-bold mb-4">
                            Card Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input
                                type="text"
                                name="number"
                                placeholder="Card Number"
                                value={card.number}
                                onChange={handleCardChange}
                                className="border p-3 rounded"
                            />

                            <input
                                type="text"
                                name="holder"
                                placeholder="Card Holder Name"
                                value={card.holder}
                                onChange={handleCardChange}
                                className="border p-3 rounded"
                            />

                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                value={card.expiry}
                                onChange={handleCardChange}
                                className="border p-3 rounded"
                            />

                            <input
                                type="password"
                                name="cvv"
                                placeholder="CVV"
                                value={card.cvv}
                                onChange={handleCardChange}
                                className="border p-3 rounded"
                            />

                        </div>

                    </div>

                )}

                <button
                    onClick={placeOrder}
                    className="bg-green-700 text-white px-8 py-3 rounded-lg mt-5"
                >
                    Place Order
                </button>
            </div>


            <Footer />
        </div>
    );
}

export default Checkout;