import { useState, useEffect } from 'react';  // นำเข้า useState และ useEffect จาก react
import { useAuth } from "../../context/AuthContext";
import { firestore1 } from "../../firebaseConfig";
import { collection, getDocs } from 'firebase/firestore'; // ใช้ Firestore
import "./Profile.css";

function Profile() {
  const { user } = useAuth(); // ดึงข้อมูลผู้ใช้จาก AuthContext
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    if (user) {
      // ดึงข้อมูลการสั่งซื้อจาก Firestore
      const fetchOrders = async () => {
        const ordersRef = collection(firestore1, 'orders'); // สมมติว่าใช้ Firestore ในการเก็บข้อมูลคำสั่งซื้อ
        const ordersSnapshot = await getDocs(ordersRef);
        const ordersList = ordersSnapshot.docs.map(doc => doc.data());
        setOrders(ordersList);
      };

      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // หากไม่มีผู้ใช้แสดงข้อความนี้
  }

  return (
    <div className="profile-container">
      <h2>Profile User</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p> {/* แสดง Username */}
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p> {/* แสดง Phone */}
      </div>

      <h3>Order History</h3>
      <div className="order-history">
        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                <p>Order ID: {order.orderId}</p>
                <p>Total: {order.total}</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;