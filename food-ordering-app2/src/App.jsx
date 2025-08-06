import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from "./store/pages/Home.jsx";
import Menu from "./store/pages/Menu.jsx";
import Cart from "./store/pages/Cart.jsx";
import Payment from "./store/pages/Payment.jsx";
import Login from "./store/pages/Login.jsx";
import Register from "./store/pages/Register.jsx";
import Navbar from "./store/components/Navbar.jsx";
import Profile from "./store/pages/Register.jsx"; // นำเข้า Profile
import Notification from "./store/pages/Notification.jsx";// นำเข้า Notification

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:shopId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> {/* เพิ่ม route สำหรับ Profile */}
          <Route path="/notifications" element={<Notification />} /> {/* เพิ่ม route สำหรับ Notification */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;