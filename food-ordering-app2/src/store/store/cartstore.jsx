import { makeAutoObservable } from "mobx";

class CartStore {
  cart = [];

  constructor() {
    makeAutoObservable(this); // กำหนดให้ MobX สามารถสังเกตการเปลี่ยนแปลง
  }

  // อัปเดตจำนวนสินค้า
  updateQuantity(itemId, newQuantity) {
    const item = this.cart.find((cartItem) => cartItem.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      item.totalPrice = item.price * newQuantity; // อัปเดตราคารวม
    }
  }

  // อัปเดตจำนวน addOn
  updateAddOnQuantity(itemId, addOnId, newQuantity) {
    const item = this.cart.find((cartItem) => cartItem.id === itemId);
    if (item) {
      const addOn = item.addOn.find((addOn) => addOn.id === addOnId);
      if (addOn) {
        addOn.quantity = newQuantity;
        addOn.totalPrice = addOn.price * newQuantity; // อัปเดตราคารวมของ addOn
      }
    }
  }

  // เพิ่มสินค้าในตะกร้า
  addToCart(item) {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1; // เพิ่มจำนวนถ้ามีสินค้าอยู่แล้ว
    } else {
      // หากสินค้านี้มี addOn ให้เพิ่ม addOn ในการเพิ่มสินค้าใหม่
      const itemWithAddOn = {
        ...item,
        quantity: 1,
        addOn: item.addOn.map((addon) => ({ ...addon, quantity: 1 })) // กำหนดจำนวนเริ่มต้นของ Add-ons
      };
      this.cart.push(itemWithAddOn);
    }
  }

  // ลบสินค้าออกจากตะกร้า
  removeFromCart(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
  }

  // เคลียร์ตะกร้า
  clearCart() {
    this.cart = [];
  }

  // คำนวณราคาทั้งหมดในตะกร้า
  get totalPrice() {
    return this.cart.reduce((total, item) => {
      const itemTotal = item.totalPrice || (item.price * item.quantity);
      const addOnTotal = item.addOn.reduce((sum, addOn) => sum + addOn.totalPrice, 0);
      return total + itemTotal + addOnTotal;
    }, 0);
  }

  // คำนวณจำนวนรวมของ Add-ons ในตะกร้า
  get totalAddOns() {
    return this.cart.reduce((total, item) => {
      const addOnCount = item.addOn.reduce((sum, addOn) => sum + addOn.quantity, 0);
      return total + addOnCount;
    }, 0);
  }
}

const cartStore = new CartStore(); // ประกาศ cartStore หลังจากสร้าง class

export { cartStore };