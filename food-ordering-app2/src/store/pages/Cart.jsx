import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { cartStore } from "../store/cartstore"; // Import MobX store
import "./Cart.css";

const Cart = observer(() => {
  const [error, setError] = useState("");

  useEffect(() => {
    // ฟังก์ชันที่จะทำการรีเซ็ตข้อผิดพลาดเมื่อเปลี่ยนแปลงในตะกร้า
    setError("");
  }, [cartStore.cart]);

  const calculateTotal = () => cartStore.cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const increaseQuantity = (item) => {
    cartStore.updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      cartStore.updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemoveItem = (itemId) => {
    cartStore.removeFromCart(itemId);
  };

  const isValidStore = (newItemStore) => {
    if (!newItemStore) return false;
    if (cartStore.cart.length === 0) return true;
    return cartStore.cart[0].storeName === newItemStore;
  };

  const handleAddToCart = (item) => {
    if (isValidStore(item.storeName)) {
      cartStore.addToCart(item);
    } else {
      setError("คุณสามารถสั่งได้จากร้านเดียวเท่านั้น!");
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">ตะกร้าของคุณ</h1>
      {error && <p className="error-message">{error}</p>}
      
      {cartStore.cart.length === 0 ? (
        <p className="empty-cart">ตะกร้าของคุณยังไม่มีสินค้า</p>
      ) : (
        <div>
          {cartStore.cart.map((item, index) => (
            <div key={index} className="cart-item">
              <p><strong>{item.name}</strong> - {item.price} บาท</p>

              {/* ลบส่วน Add-ons ออก */}
              {item.addOn?.length > 0 && (
                <div className="addOn-section">
                  <h4>Add-ons:</h4>
                  {item.addOn.map((addOn, addOnIndex) => (
                    <div key={addOnIndex} className="addOn-item">
                      <p><strong>{addOn.name}</strong> - {addOn.price} บาท</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => increaseQuantity(item)}>+</button>
              </div>

              <p>ราคารวม: {item.totalPrice} บาท</p>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-item-button">
                ลบ
              </button>
            </div>
          ))}

          <p className="cart-total">รวมทั้งหมด: {calculateTotal()} บาท</p>

          <Link to="/payment">
            <button className="checkout-button">ชำระเงิน</button>
          </Link>
        </div>
      )}
    </div>
  );
});

export default Cart;