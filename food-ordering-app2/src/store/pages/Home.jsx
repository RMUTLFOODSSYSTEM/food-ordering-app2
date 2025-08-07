// Home.jsx (สรุป)
import React from 'react';
import "../pages/Home.css";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>

      <section id="home" className="hero main-container">
        <h1>ยินดีต้อนรับสู่ <span className="bold">RMUTL Food Ordering System</span></h1><br />
        <p>
          ระบบสั่งอาหารและสินค้าสำหรับนักศึกษาและบุคลากร RMUTL<br />
          สะดวก รวดเร็ว ไม่ต้องรอนาน
        </p>
      </section>

      <section id="about" className="about main-container">
        <h2>เกี่ยวกับเรา</h2><br />
        <p>
          เราคือระบบสั่งอาหารออนไลน์สำหรับนักศึกษา RMUTL 
          ช่วยให้การซื้อขายสะดวกขึ้น ลดเวลารอคิว 
          และสนับสนุนร้านค้าภายในมหาวิทยาลัย
        </p>
      </section>

      <footer className="footer">
        © 2025 RMUTL Shop. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
