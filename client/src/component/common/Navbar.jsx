import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar(){

    const [open, setOpen] = useState(false);

    function handlesidebar(){
        setOpen(!open);
    }

    return(
        <div className="fixed top-0 left-0 w-full bg-white flex justify-between items-center p-3 shadow-md z-50">
            <h1 className="text-3xl font-bold text-blue-950">Online Shop</h1>
            <div className="sm:flex justify-between gap-3 hidden ">
                <Link to={"/home"}>Home</Link>
                <Link to={"/productlist"}>Products</Link>
                <Link to={"/shoppingcart"}>Cart</Link>
                <Link to={"/myorders"}>My Orders</Link>
                <Link to="/account">Account</Link>
            </div>
            <div className="sm:hidden z-10" onClick={handlesidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
            </div>
            <div className={`bg-black h-screen min-w-[40%] absolute top-0 left-0 bottom-0 z-10 text-white flex flex-col gap-10 text-xl font-bold px-10 py-20 sm:hidden transition-all duration-300 ${open ? "ml-0" : "-ml-100"}`}>
                <Link to={"/home"}>Home</Link>
                <Link to={"/productlist"}>Products</Link>
                <Link to={"/shoppingcart"}>Cart</Link>
                <Link to={"/myorders"}>My Orders</Link>
                <Link to="/account">Account</Link>
            </div>
        </div>
    )
}

export default Navbar