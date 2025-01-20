import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import NoPage from "./pages/noPage/NoPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashBoard from "./pages/user/UserDashBoard";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProduct from "./pages/admin/UpdateProduct";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtecteRouteForUser } from "./protectedRoute/ProtectedRouteForAdmin";
import { ProtecteRouteForAdmin } from "./protectedRoute/ProtectedRouteForUser";

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user-dashboard"
            element={
              <ProtecteRouteForUser>
                <UserDashBoard />
              </ProtecteRouteForUser>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtecteRouteForAdmin>
                <AdminDashBoard />
              </ProtecteRouteForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtecteRouteForAdmin>
                <AddProductPage />
              </ProtecteRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtecteRouteForAdmin>
                <UpdateProduct />
              </ProtecteRouteForAdmin>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;
