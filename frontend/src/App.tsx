import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"
import Cart from "./pages/Cart/Cart"
import About from "./pages/About/About"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Receipt from "./pages/Receipt/Receipt"
import Header from "./components/Header/Header"
import MenuOverlay from "./components/MenuOverlay/MenuOverlay"
import { useState } from "react"
import Footer from "./features/layout/Footer/Footer"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <BrowserRouter>
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
