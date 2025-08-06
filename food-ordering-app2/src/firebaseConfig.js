// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";      // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore
import { getDatabase } from "firebase/database";  // Realtime Database
import { getStorage } from "firebase/storage";   // Firebase Storage


// firebaseConfig สำหรับโปรเจกต์แรก
const firebaseConfig1 = {
  apiKey: "AIzaSyCXtU7ElHII7Ho27PVC4wp8NWEb8nmBzWs",
  authDomain: "rmutlfoodvendor.firebaseapp.com",
  databaseURL: "https://rmutlfoodvendor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rmutlfoodvendor",
  storageBucket: "rmutlfoodvendor.firebasestorage.app",
  messagingSenderId: "76659761055",
  appId: "1:76659761055:web:31fe119ba8e5c49be867aa",
  measurementId: "G-V5X5B1NMQJ"
};

// firebaseConfig สำหรับโปรเจกต์ที่สอง
const firebaseConfig2 = {
  apiKey: "AIzaSyBpjdFIwOHRmyVTTRVDGI34xtLd4Sw9oEI",
  authDomain: "projectrmutlfoodorderingsystem.firebaseapp.com",
  databaseURL: "https://projectrmutlfoodorderingsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectrmutlfoodorderingsystem",
  storageBucket: "projectrmutlfoodorderingsystem.firebasestorage.app",
  messagingSenderId: "332383596728",
  appId: "1:332383596728:web:7d36cda676c639e869844d",
  measurementId: "G-DDHH23G6RB"
};

// Initializing Firebase app for both projects
const firebaseApp1 = initializeApp(firebaseConfig1);
const firebaseApp2 = initializeApp(firebaseConfig2, "app2");  // ใช้ชื่อ "app2" เพื่อให้แยกจากแอปแรก

// Firebase services สำหรับโปรเจกต์ที่หนึ่ง
const auth1 = getAuth(firebaseApp1);
const firestore1 = getFirestore(firebaseApp1);
const database1 = getDatabase(firebaseApp1);
const storage1 = getStorage(firebaseApp1);

// Firebase services สำหรับโปรเจกต์ที่สอง
const auth2 = getAuth(firebaseApp2);
const firestore2 = getFirestore(firebaseApp2);
const database2 = getDatabase(firebaseApp2);
const storage2 = getStorage(firebaseApp2);

// Exporting Firebase services สำหรับแต่ละโปรเจกต์
export { firebaseApp1, auth1, firestore1, database1, storage1 };
export { firebaseApp2, auth2, firestore2, database2, storage2 };