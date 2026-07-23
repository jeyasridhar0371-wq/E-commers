import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
// import { useParams } from "react-router-dom";
import { productContext } from "./Usecontext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import auth from "./config";
import { useNavigate,useLocation } from "react-router-dom";

function Productdetail() {

    const location = useLocation()
    const { id } = location.state

    // const { id } = useParams();

    const { productlist, imgList } = useContext(productContext);

    // find and store product based on _id
    const product = productlist.find((item) => item._id === id);

    if (!product) {
        return (
            <div>
                <Navbar />
                <h1 className="text-center text-2xl mt-20">
                    Loading...
                </h1>
            </div>
        );
    }

    // find and store image based on index
    const index = productlist.findIndex((item) => item._id === id);
    const image = imgList[index]?.img;

    const navigate = useNavigate()

    const [isCart, setIsCart] = useState(false);

    useEffect(() => {

        checkCart();

    }, [product]);

    // If already product is added to cart display "Remove" button or not added to cart display "Add"
    async function checkCart() {

        const user = auth.currentUser;

        if (!user) return;

        try {

            const res = await axios.get(
                "https://e-commers-wpco.onrender.com/checkcart",
                {
                    params: {
                        productid: product._id,
                        userid: user.uid
                    }
                }
            );

            setIsCart(res.data);

        } catch (err) {

            console.log(err);

        }

    }

    // Remove product to cart
    async function handleRemoveCart() {

        const user = auth.currentUser;

        if (!user) return;

        try {

            await axios.delete(
                "https://e-commers-wpco.onrender.com/removecart",
                {
                    params: {
                        productid: product._id,
                        userid: user.uid
                    }
                }
            );

            checkCart();

        } catch (err) {

            alert("Failed to remove cart");

        }

    }

    // Add product to cart
    async function handleCart() {

        const user = auth.currentUser;

        if (!user) return;

        try {

            await axios.post("https://e-commers-wpco.onrender.com/addcart", {
                productid: product._id,
                userid: user.uid
            });

            checkCart();

        } catch (err) {

            alert("Failed to add cart");

        }

    }

    return (
        <div>
            <Navbar />

            <div className="flex flex-wrap gap-5 p-5 pt-20">

                <div className="flex-1 min-w-75">
                    <img
                        src={image}
                        alt={product.name}
                        className="w-full h-125 object-cover"
                    />
                </div>

                <div className="flex-1 min-w-75">
                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>

                    <h2 className="text-2xl mt-3 font-bold">
                        ₹ {product.price}
                    </h2>

                    <h2 className="text-xl mt-5 font-bold">
                        Description
                    </h2>

                    <p className="mt-2">
                        {product.description}
                    </p>

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={isCart ? handleRemoveCart : handleCart}
                            className={`text-white px-5 py-2 rounded-lg ${isCart ? "bg-red-600" : "bg-blue-900"
                                }`}
                        >
                            {isCart ? "Remove Cart" : "Add Cart"}
                        </button>
                        <button className="text-white px-5 py-2 rounded-lg bg-green-900">Buy Now</button>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default Productdetail;