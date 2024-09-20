import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Alert18 from "./components/Alerts/Alert18";
import Details from "./components/Details/Details";
import NotFound from "./components/Not_found/NotFound";
import Protected from "./components/Protected/Protected";
import AdminProfile from "./components/Admin/AdminProfile";
import UserProfile from "./components/UserProfile/UserProfile";
import PaymentStatus from "./components/PaymentGateway/PaymentStatus";
import PaymentGateway from "./components/PaymentGateway/PaymentGateway";
import UserSessionManager from "./components/UserSessionManager/UserSessionManager";
import CartSessionManager from "./components/CartSessionManager/CartSessionManager";
import { setNavigate } from "./utils/NavigationUtils";

function App() {
  const navigate = useNavigate();
  useEffect(() => {setNavigate(navigate)}, [navigate]);

  return (
    <div className="app">
      <Alert18/>
      <CartSessionManager/>
      <UserSessionManager/>
      <Routes>
        {/* Rutas para todos */}
        <Route path="/"            element= {<Home/>}></Route>
        <Route path="/product/:id" element= {<Details/>}></Route>
        <Route path="/login"       element= {<Login/>}></Route>
        <Route path="/signup"      element= {<SignUp/>}></Route>
        <Route path="/about"       element= {<About/>}></Route>

        {/* Rutas protegidas para usuarios autenticados*/}
        <Route path="/profile/:id"    element= {<Protected requiredRole={"user"}><UserProfile/>    </Protected>}></Route>
        <Route path="/cart"           element= {<Protected requiredRole={"user"}><Cart/>           </Protected>}></Route>
        <Route path="/payment/start"  element= {<Protected requiredRole={"user"}><PaymentGateway/> </Protected>}></Route>
        <Route path="/payment/result" element= {<Protected requiredRole={"user"}><PaymentStatus/>  </Protected>}></Route>

        {/* rutas de administradores */}
        <Route path="/adminprofile/:id" element= {<Protected requiredRole={"admin"}><AdminProfile/></Protected>}></Route>

        {/* Si ninguna ruta coincide, usaremos de forma predeterminada Inicio*/}
        <Route element={<Home />}></Route>
        <Route  path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
