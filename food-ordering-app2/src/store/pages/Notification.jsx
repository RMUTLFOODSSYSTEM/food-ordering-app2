import React, { useState, useEffect } from 'react';
import { firestore2 } from "../../firebaseConfig";
import { collection, query, onSnapshot } from 'firebase/firestore'; // ใช้ firestore method
import './Notification.css';

function Notification() {
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // ดึงข้อมูลรายการสั่งซื้อและสถานะจาก Firestore
  useEffect(() => {
    const ordersCollection = collection(firestore2, 'orders'); // ใช้ firestore2 ที่ถูกต้อง
    const q = query(ordersCollection);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersList = [];
      querySnapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersList);
    });

    return () => unsubscribe(); // ยกเลิกการฟังข้อมูลเมื่อคอมโพเนนต์ถูกลบ
  }, []);

  // ดึงข้อมูลประวัติการแจ้งเตือน
  useEffect(() => {
    const notificationsCollection = collection(firestore2, 'notifications'); // ใช้ firestore2 ที่ถูกต้อง
    const q = query(notificationsCollection);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notificationsList = [];
      querySnapshot.forEach((doc) => {
        notificationsList.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(notificationsList);
    });

    return () => unsubscribe(); // ยกเลิกการฟังข้อมูลเมื่อคอมโพเนนต์ถูกลบ
  }, []);

  return (
    <div className="notification-container">
      <h2>รายการสั่งซื้อ</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-item" key={order.id}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>สถานะ:</strong> {order.status}</p>
            <p><strong>วันที่สั่ง:</strong> {order.orderDate}</p>
          </div>
        ))}
      </div>

      <h2>ประวัติการแจ้งเตือน</h2>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div className="notification-item" key={notification.id}>
            <p><strong>แจ้งเตือนจาก:</strong> {notification.from}</p>
            <p><strong>ข้อความ:</strong> {notification.message}</p>
            <p><strong>วันที่:</strong> {notification.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;