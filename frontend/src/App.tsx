import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Receipt from "./pages/Receipt/Receipt";
import Header from "./components/Header/Header";
import MenuOverlay from "./components/MenuOverlay/MenuOverlay";
import { useState } from "react";
import Footer from "./features/layout/Footer/Footer";
import Review from "./pages/Review/Review";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import PreviousOrdersPage from "./pages/PreviousOrders/PreviousOrders";
import OrderDetailsPage from "./pages/OrderDetails/OrderDetails";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminInventoryPage from "./pages/AdminInventory/AdminInventory";
import AdminDashboardPage from "./pages/AdminDashboard/AdminDashboard";
import AdminMenu from "./pages/AdminMenu/AdminMenu";
import AdminAdd from "./pages/AdminAdd/AdminAdd";
import { useAuthStatus } from "./features/hooks/useAuthStatus";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, user } = useAuthStatus()
  const location = useLocation()

  const overlayVariant: "public" | "profile" | "admin" =
    user?.role === "ADMIN"
      ? "admin"
      : isLoggedIn && location.pathname.startsWith("/previous-orders")
      ? "profile"
      : "public"

  return (
    <>
      <ScrollToTop />
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        user={user}
        variant={overlayVariant}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/review" element={<Review />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/previous-orders" element={<PreviousOrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/admin-inventory" element={<AdminInventoryPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-menu" element={<AdminMenu />} />
        <Route path="/admin/add" element={<AdminAdd />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
