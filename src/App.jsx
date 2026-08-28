import "./App.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./contexts/cart/CartContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}

export default App;
