import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // เพิ่มการนำเข้า Firebase Auth
import { getFirestore, doc, getDoc } from "firebase/firestore"; // เพิ่มการนำเข้า Firestore

// สร้าง context สำหรับ Auth
const AuthContext = createContext();

// Provider สำหรับ AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // เก็บข้อมูลเพิ่มเติมของผู้ใช้ (username, phone)
  const auth = getAuth(); // ใช้ Firebase Auth
  const firestore = getFirestore(); // ใช้ Firestore

  // ตรวจสอบสถานะการล็อกอินของผู้ใช้
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // หากผู้ใช้ล็อกอินสำเร็จ จะอัปเดต user

        // ดึงข้อมูลเพิ่มเติมจาก Firestore
        const userRef = doc(firestore, "users", currentUser.uid); // สมมติว่าเก็บข้อมูลผู้ใช้ใน collection "users"
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserDetails(userDoc.data()); // เก็บข้อมูลเพิ่มเติม (username, phone)
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null); // หากไม่ได้ล็อกอินจะตั้งค่า user เป็น null
        setUserDetails(null); // เคลียร์ข้อมูลผู้ใช้
      }
    });

    // เคลียร์สถานะเมื่อ component ถูกลบ
    return () => unsubscribe();
  }, [auth, firestore]);

  return (
    <AuthContext.Provider value={{ user, userDetails, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook สำหรับใช้ค่า user ในส่วนต่างๆ ของแอป
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};