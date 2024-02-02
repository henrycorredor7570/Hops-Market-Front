import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setNavigate } from "./utils/NavigationUtils";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Login from "./components/Login/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import SignUp from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart";
import UserSessionManager from "./components/UserSessionManager/UserSessionManager";
import CartSessionManager from "./components/CartSessionManager/CartSessionManager";
import PaymentGateway from "./components/PaymentGateway/PaymentGateway";
import PaymentStatus from "./components/PaymentGateway/PaymentStatus";
import Alert18 from "./components/Alerts/Alert18";
import AdminProfile from "./components/Admin/AdminProfile";
import Protected from "./components/Protected/Protected";
import { useEffect } from "react";
import About from "./components/About/About"
import NotFound from "./components/Not_found/NotFound";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, []);

  return (
    <div className="app">
      <Alert18 />
      <CartSessionManager />
      <UserSessionManager />
      <Routes>
        {/* Routes for everyone */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<Details />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/about" element={<About />}></Route>

        {/* user-only routes */}
        <Route path="/profile/:id" element={
          <Protected requiredRole={"user"}>
            <UserProfile />
          </Protected>
        } />
        <Route path="/cart" element={
          <Protected requiredRole={"user"}>
            <Cart />
          </Protected>
        }></Route>
        <Route path="/payment/start" element={
          <Protected requiredRole={"user"}>
            <PaymentGateway />
          </Protected>
        }/>
        <Route path="/payment/result" element={
          <Protected requiredRole={"user"}>
            <PaymentStatus />
          </Protected>
        }></Route>

        {/* admin-only routes */}
        <Route path="/adminprofile/:id" element={
          <Protected requiredRole={"admin"}>
            <AdminProfile />
          </Protected>
        }/>

        {/* If no routes match we default to Home */}
        <Route element={<Home />}></Route>
        <Route  path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
