import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useAuth } from "../../context/AuthContext"; // ใช้ AuthContext
import { cartStore } from "../store/cartstore.jsx";
import "./Menu.css";

const menus = {
  1: [
    { id: 1, name: "ก๋วยเตี๋ยว", price: 30 },
    { id: 2, name: "ข้าวซอย", price: 30 },
    { id: 3, name: "ขนมจีนน้ำเงี้ยว", price: 30 },
  ],
  2: [
    { id: 4, name: "ข้าวกะเพราหมู", price: 35 },
    { id: 5, name: "ข้าวผัดหมู", price: 30 },
  ],
  3: [
    { id: 6, name: "ข้าวไก่ทอด", price: 30 },
    { id: 7, name: "ข้าวไก่เทริยากิ", price: 30 },
  ],
};

const addOns = {
  1: [
    { id: 3, name: "พิเศษ", price: 5 },
  ],
  2: [
    { id: 1, name: "ไข่ดาว", price: 7 },
    { id: 3, name: "พิเศษ", price: 5 },
  ],
  3: [
    { id: 2, name: "ไข่ต้ม", price: 6 },
    { id: 1, name: "ไข่ดาว", price: 7 },
    { id: 3, name: "พิเศษ", price: 5 },
  ],
};

const Menu = observer(() => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const { user } = useAuth(); // ใช้ useAuth เพื่อดึงข้อมูลผู้ใช้
  const shopMenu = menus[shopId] || [];
  const availableAddOns = addOns[shopId] || [];

  // ใช้ useEffect เพื่อตรวจสอบสถานะการล็อกอิน
  useEffect(() => {
    if (!user) {
      navigate("/login"); // หากยังไม่ได้ล็อกอินให้ไปที่หน้า login
    }
  }, [user, navigate]); // จะตรวจสอบเมื่อ user เปลี่ยนแปลง

  const handleAddOnChange = (itemId, addon) => {
    setSelectedAddOns((prev) => {
      const currentAddOns = prev[itemId] || [];
      if (addon === null) {
        return { ...prev, [itemId]: [] }; // เคลียร์การเลือก Add-on ถ้าเลือก "ไม่มี"
      }

      const newAddOns = currentAddOns.some((selected) => selected.id === addon.id)
        ? currentAddOns.filter((selected) => selected.id !== addon.id)
        : [...currentAddOns, addon];
      
      return { ...prev, [itemId]: newAddOns };
    });
  };

  const addToCart = (item, selectedAddOns) => {
    if (!user) {
      alert("กรุณาล็อกอินก่อนสั่งอาหาร");
      return;
    }

    const otherShopItems = cartStore.cart.filter(
      (cartItem) => cartItem.shopId !== shopId
    );
    if (otherShopItems.length > 0) {
      alert("สามารถสั่งจากร้านเดียวกันเท่านั้น");
      return;
    }

    cartStore.addToCart({
      ...item,
      addOn: selectedAddOns,
      totalPrice: item.price + selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0),
      shopId: shopId,
    });
  };

  if (!shopMenu.length) {
    return <div>เมนูของร้านนี้ไม่พบ</div>;
  }

  return (
    <div className="menu-container">
      <h1>ร้าน {shopId}</h1>
      <div className="menu-items">
        {shopMenu.map((item) => {
          const selectedAddOn = selectedAddOns[item.id] || [];

          return (
            <div key={item.id} className="menu-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} บาท</span>
              </div>

              <div className="addon-container">
                <span>เลือก Add-on: </span>
                {availableAddOns.map((addon) => (
                  <label key={addon.id} className="addon-label">
                    <input
                      type="checkbox"
                      name={`addon-${item.id}`}
                      onChange={() => handleAddOnChange(item.id, addon)}
                      checked={selectedAddOn.some((selected) => selected.id === addon.id)}
                      aria-label={`Add ${addon.name} to ${item.name}`}
                    />
                    {addon.name} ({addon.price} บาท)
                  </label>
                ))}
                <label className="addon-label">
                  <input
                    type="checkbox"
                    name={`addon-${item.id}`}
                    onChange={() => handleAddOnChange(item.id, null)} // เลือก "ไม่มี"
                    checked={selectedAddOn.length === 0}
                    aria-label={`No add-on for ${item.name}`}
                  />
                  ไม่มี
                </label>
              </div>

              <button
                className="add-button"
                onClick={() => addToCart(item, selectedAddOn)}
              >
                เพิ่ม
              </button>
            </div>
          );
        })}
      </div>

      <Link to="/Cart">
        <button className="go-to-cart">
          ไปยังตะกร้า ({cartStore.cart.length} รายการ)
        </button>
      </Link>
    </div>
  );
});

export default Menu;