import Productcart from "./Productcart"
import Navbar from "../component/common/Navbar";
import Footer from "../component/common/Footer"
import { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { productContext } from "./Usecontext";


function Productlisting() {

    const { imgList, productlist } = useContext(productContext)
    const [sortOption, setSortOption] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAndSortedProducts = useMemo(() => {
        if (!productlist) return [];

        let products = [...productlist];

        // Search
        if (searchTerm.trim() !== "") {
            products = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        switch (sortOption) {
            case "a-z":
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "z-a":
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;

            case "newest":
                products.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;

            case "oldest":
                products.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
                break;

            default:
                break;
        }

        return products;
    }, [productlist, searchTerm, sortOption]);

    return (
        <div>
            <Navbar />
            {/* Search and Sort section */}
            <div className="flex items-center justify-center pt-20">
                <input
                    type="text"
                    placeholder="Search what you want..."
                    className="border w-[80%] p-2 m-3 rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border p-2 rounded-lg ml-3"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="a-z">A - Z</option>
                    <option value="z-a">Z - A</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {/* Display the available products */}
            <div className="w-full p-5 my-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center my-3">
                    {
                        filteredAndSortedProducts.map((product) => (
                            <div key={product._id}>
                                <Productcart
                                    id={product._id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    category={product.category}
                                    image={imgList.find(item => item.key == product.image)?.img}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Productlisting