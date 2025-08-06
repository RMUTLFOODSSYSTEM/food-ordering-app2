import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { cartStore } from "../store/cartstore.jsx";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        cartStore.clearCart();
      } else {
        setUser(null);
        setNotifications(0);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const notificationsRef = ref(db, 'notifications/' + user.uid);
      const offListener = onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        setNotifications(data ? Object.keys(data).length : 0);
      });
      return () => offListener(); // cleanup listener
    }
  }, [user]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    setNotifications(0);
    navigate("/"); // ✅ กลับไปหน้า Home
    setIsOpen(false);
  };

  const guestMenu = (
    <>
      <li><Link to="/" onClick={() => setIsOpen(false)}>หน้าแรก</Link></li>
      <li><button className="login-btn" onClick={() => { setIsOpen(false); navigate('/login'); }}>Login</button></li>
      <li><button className="register-btn" onClick={() => { setIsOpen(false); navigate('/register'); }}>Register</button></li>
    </>
  );

  const userMenu = (
    <>
      <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
      <li><Link to="/Menu" onClick={() => setIsOpen(false)}>Menu</Link></li>
      <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
      <li>
        <Link to="/notifications" onClick={() => setIsOpen(false)}>
          notification
          {notifications > 0 && <span className="notification-badge">{notifications}</span>}
        </Link>
      </li>
      <li><Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link></li>
      <li><button className="register-btn" onClick={handleLogout}>Logout</button></li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">RMUTL Food Ordering System</Link>

        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? "bar rotate-top" : "bar"}></span>
          <span className={isOpen ? "bar hide" : "bar"}></span>
          <span className={isOpen ? "bar rotate-bottom" : "bar"}></span>
        </div>

        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          {user ? userMenu : guestMenu}
        </ul>
      </div>
    </nav>
  );
}