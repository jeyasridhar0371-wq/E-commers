import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "./component/Login"
import Signup from "./component/Signup"
import Home from "./component/Home"
import Productlisting from "./component/Productlisting";
import Productdetail from "./component/Productdetail";
import Addproduct from "./component/Addproduct";
import Shoppingcart from "./component/Shoppingcart";
import Checkout from "./component/Checkout";
import Orderconfirmation from "./component/Orderconfirmation";
import Myorders from "./component/Myorders";
import Account from "./component/Account";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/productlist" element={<Productlisting/>}/>
          <Route path="/productdetail" element={<Productdetail/>}/>
          <Route path="/addproduct" element={<Addproduct/>}/>
          <Route path="/shoppingcart" element={<Shoppingcart/>}/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderconfirmation" element={<Orderconfirmation/>}/>
          <Route path="/myorders" element={<Myorders/>}/>
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
