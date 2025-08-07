import { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";
import { firestore1 } from "../../firebaseConfig";
import { collection, query, where, getDocs } from 'firebase/firestore';
import "./Profile.css";

function Profile() {
  const { user, userDetails } = useAuth();  // ดึง userDetails ด้วย
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        // สมมติว่าใน collection 'orders' มีฟิลด์ userId เก็บ UID ของผู้ใช้
        const ordersRef = collection(firestore1, 'orders');
        const q = query(ordersRef, where("userId", "==", user.uid)); // ดึง order ของ user คนนี้เท่านั้น
        const ordersSnapshot = await getDocs(q);

        const ordersList = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user || !userDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">ข้อมูลผู้ใช้งาน</h2>

      <div className="profile-card">
        <p><strong>👤 ชื่อผู้ใช้:</strong> {userDetails.username || "ไม่ระบุ"}</p>
        <p><strong>📧 อีเมล:</strong> {user.email}</p>
        <p><strong>📱 เบอร์โทร:</strong> {userDetails.phone || "ไม่ระบุ"}</p>
      </div>

      <h3 className="order-title">ประวัติการสั่งซื้อ</h3>

      {loadingOrders ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">คุณยังไม่มีประวัติการสั่งซื้อ</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <p><strong>🧾 Order ID:</strong> {order.orderId || order.id}</p>
              <p><strong>💰 ยอดรวม:</strong> {order.total} บาท</p>
              <p><strong>📦 สถานะ:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
