import Footer from "../component/common/Footer"
import Navbar from "./common/Navbar"
import homeimg from "../assets/advertice.webp"
import homeimg2 from "../assets/homeimg2.webp"
import homeimg3 from "../assets/homeimg3.jpg"
import { useState, useContext } from "react"
import Productcart from "./Productcart"
import { productContext } from "./Usecontext";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    const { productlist, imgList } = useContext(productContext);

    const [margin, setMargin] = useState("ml-0")

    function handleRightslider() {
        if (margin == "ml-0") {
            setMargin("ml-[-100%]")
        }
        else if (margin == "ml-[-100%]") {
            setMargin("ml-[-200%]")
        }
        else {
            setMargin("ml-0")
        }
    }

    function handleLeftsidebar() {
        if (margin == "ml-0") {
            setMargin("ml-[-200%]")
        }
        else if (margin == "ml-[-200%]") {
            setMargin("ml-[-100%]")
        }
        else {
            setMargin("ml-0")
        }
    }

    return (
        <div>
            <Navbar />
            <h1 className="text-3xl font-bold text-center mt-8 pt-20">
                Featured Page
            </h1>

            <p className="text-center text-gray-500">
                Best selling products this week
            </p>
            <div className="relative">
                <div onClick={handleLeftsidebar} className="absolute left-0 top-[20%]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                </div>
                <div className="m-5 flex gap-2 overflow-x-auto overflow-hidden scrollbar-none">
                    <img src={homeimg2} alt="not found" className={`min-w-full h-103 my-5 rounded-3xl transition-all duration-300 ${margin}`} />
                    <img src={homeimg} alt="not found" className="min-w-full h-100 my-5 rounded-3xl" />
                    <img src={homeimg3} alt="not found" className="min-w-full h-103 my-5 rounded-3xl" />
                </div>
                <div onClick={handleRightslider} className="absolute right-0 top-[20%]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </div>
            <div className="bg-blue-900 text-white p-4 rounded-xl mx-5 text-center mt-5">
                🎉 Flat 50% OFF on selected products | Free Delivery above ₹999
            </div>
            <div className="bg-gray-100 p-10 rounded-xl text-center">

                <h1 className="text-2xl font-bold">
                    Subscribe for Offers
                </h1>

                <input placeholder="Enter Email" />

                <button>Subscribe</button>

            </div>
            <div className="text-center mt-10">
                <h1 className="text-4xl font-bold">
                    Featured Products
                </h1>

                <p className="text-gray-500 mt-2">
                    Explore our most popular products
                </p>
            </div>
            {/* display first 4 products just for adverticement */}
            <div className="w-full p-5 my-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">

                    {productlist.slice(0, 4).map((product) => (

                        <Productcart
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            category={product.category}
                            image={
                                imgList.find((item) => item.key === product.image)?.img
                            }
                        />

                    ))}


                </div>
            </div>
            <div className="text-center mb-10">
                <button
                    onClick={() => navigate("/productlist")}
                    className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 "
                >
                    View All Products
                </button>
            </div>
            <div className="bg-green-700 text-white p-10 rounded-xl text-center">

                <h1 className="text-3xl font-bold">
                    Start Shopping Today
                </h1>

                <button className="mt-5 bg-white text-green-700 px-5 py-2 rounded-lg">
                    Browse Products
                </button>

            </div>
            <Footer />
        </div>
    )
}

export default Home