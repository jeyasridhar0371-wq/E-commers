import { useContext, useEffect, useState } from "react";
import axios from "axios";
import auth from "./config";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Productcart from "./Productcart";
import { productContext } from "./Usecontext";
import { useNavigate } from "react-router-dom";

function Shoppingcart() {

    const navigate = useNavigate();

    const { productlist, imgList } = useContext(productContext);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {

        fetchCart();

    }, [productlist]);

    async function fetchCart() {

        const user = auth.currentUser;

        if (!user) return;

        try {

            const res = await axios.get("http://localhost:5000/readcart");

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

        } catch (err) {

            console.log(err);

        }

    }

    async function increase(product) {

        const user = auth.currentUser;

        await axios.put(
            "http://localhost:5000/increasequantity",
            {
                productid: product._id,
                userid: user.uid
            }
        );

        fetchCart();

    }

    async function decrease(product) {

        const user = auth.currentUser;

        await axios.put(
            "http://localhost:5000/decreasequantity",
            {
                productid: product._id,
                userid: user.uid
            }
        );

        fetchCart();

    }

    async function removeCart(product) {

        const user = auth.currentUser;

        try {

            await axios.delete(
                "http://localhost:5000/removecart",
                {
                    params: {
                        productid: product._id,
                        userid: user.uid
                    }
                }
            );

            fetchCart();

        } catch (err) {

            console.log(err);

        }

    }

    const total = cartProducts.reduce((sum, item) => {

        return sum + item.price * item.quantity;

    }, 0);

    return (
        <div>
            <Navbar />

            <div className="pt-20 p-5">
                <h1 className="text-3xl font-bold mb-5">Shopping Cart</h1>
                {/* Code for display the product in the cart */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {cartProducts.length === 0 ? (<h2>Your cart is empty</h2>) : 
                    (
                        cartProducts.map((product) => (
                            <div key={product._id} className="flex gap-5 border p-5 rounded-xl items-center">
                                <img src={imgList.find((img) => img.key === product.image)?.img} className="w-32 h-32"/>
                                <div className="flex-1">
                                    <h2>{product.name}</h2>
                                    <h3>₹ {product.price}</h3>
                                    <div className="flex gap-3 items-center mt-3">
                                        <button onClick={() => decrease(product)}className="border px-3 py-1 rounded">-</button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => increase(product)} className="border px-3 py-1 rounded">+</button>
                                    </div>
                                    <button onClick={() => removeCart(product)} className="bg-red-600 text-white px-3 py-1 rounded mt-3">Remove</button>
                                </div>
                                <h2>₹ {product.price * product.quantity} </h2>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* Total price with checkout button */}
            <div className="border-t mt-8 pt-5 text-right">
                <h2 className="text-2xl font-bold"> Total : ₹ {total} </h2>
                <button onClick={() => navigate("/checkout")} className="bg-green-700 text-white px-8 py-3 rounded-lg mt-5">Checkout</button>
            </div>

            <Footer />
        </div>
    );
}

export default Shoppingcart;