import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "../store/cartstore.jsx";
import { QRCodeSVG } from 'qrcode.react';  // นำเข้า QRCodeSVG
import "./Payment.css";

const Payment = observer(() => {
  const [paymentProof, setPaymentProof] = useState(null); // สถานะสำหรับเก็บไฟล์หลักฐานการโอนเงิน
  const [paymentMethod, setPaymentMethod] = useState("");  // สถานะสำหรับเก็บวิธีการชำระเงินที่เลือก
  const [qrProof, setQrProof] = useState(null); // สถานะสำหรับเก็บไฟล์การชำระเงินผ่าน QR Code

  const totalPrice = cartStore.cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handlePayment = () => {
    if (paymentMethod === "bankTransfer" && !paymentProof) {
      alert("กรุณาแนบหลักฐานการโอนเงิน");
      return;
    }

    if (paymentMethod === "qrPayment" && !qrProof) {
      alert("กรุณาแนบหลักฐานการชำระเงินผ่าน QR Code");
      return;
    }

    alert("การชำระเงินสำเร็จ!");
    cartStore.clearCart(); // ล้างตะกร้าหลังชำระเงิน
  };

  const qrCodeData = `totalPrice=${totalPrice}`;

  // ฟังก์ชันสำหรับจัดการการเลือกไฟล์
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file); // เก็บไฟล์ที่เลือก
    }
  };

  const handleQrFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrProof(file); // เก็บไฟล์หลักฐานการชำระเงินผ่าน QR
    }
  };

  return (
    <div className="payment-container">
      <h1>หน้าชำระเงิน</h1>
      {cartStore.cart.length > 0 ? (
        <div>
          <ul>
            {cartStore.cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.totalPrice} บาท
              </li>
            ))}
          </ul>
          <h3>ราคารวม: {totalPrice} บาท</h3>

          <div className="payment-methods">
            <h4>เลือกวิธีการชำระเงิน:</h4>
            <div>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bankTransfer"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                โอนเงินผ่านธนาคาร
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                ชำระผ่านบัตรเครดิต
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="qrPayment"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                ชำระผ่าน QR Code
              </label>
            </div>
          </div>

          {paymentMethod === "bankTransfer" && (
            <div className="payment-proof">
              <label htmlFor="paymentProof">แนบหลักฐานการโอนเงิน:</label>
              <input
                type="file"
                id="paymentProof"
                onChange={handleFileChange}
                accept="image/*"
              />
              {paymentProof && (
                <div className="proof-preview">
                  <p>หลักฐานการโอนเงิน: {paymentProof.name}</p>
                  <img
                    src={URL.createObjectURL(paymentProof)}
                    alt="หลักฐานการโอน"
                    className="proof-image"
                  />
                </div>
              )}
            </div>
          )}

          {paymentMethod === "qrPayment" && (
            <div className="qr-container">
              <h4>QR Code สำหรับการชำระเงิน:</h4>
              <QRCodeSVG value={qrCodeData} size={256} className="qr-code" />

              <div className="payment-proof">
                <label htmlFor="qrPaymentProof">แนบหลักฐานการชำระเงินผ่าน QR Code:</label>
                <input
                  type="file"
                  id="qrPaymentProof"
                  onChange={handleQrFileChange}
                  accept="image/*"
                />
                {qrProof && (
                  <div className="proof-preview">
                    <p>หลักฐานการชำระเงินผ่าน QR: {qrProof.name}</p>
                    <img
                      src={URL.createObjectURL(qrProof)}
                      alt="หลักฐานการชำระเงินผ่าน QR"
                      className="proof-image"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <button className="payment-button" onClick={handlePayment}>ชำระเงิน</button>
        </div>
      ) : (
        <p className="empty-cart-message">คุณยังไม่ได้เพิ่มสินค้าในตะกร้า</p>
      )}
    </div>
  );
});

export default Payment;