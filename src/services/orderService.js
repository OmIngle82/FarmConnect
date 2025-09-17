// src/services/orderService.js
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, updateDoc, query, where, getDoc, orderBy, serverTimestamp } from 'firebase/firestore';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...orderData };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get orders by buyer
  getOrdersByBuyer: async (buyerId) => {
    try {
      const q = query(
        collection(db, 'orders'), 
        where('buyerId', '==', buyerId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting orders by buyer:', error);
      throw error;
    }
  },

  // Get orders by farmer
  getOrdersByFarmer: async (farmerId) => {
    try {
      const q = query(
        collection(db, 'orders'), 
        where('farmerId', '==', farmerId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting orders by farmer:', error);
      throw error;
    }
  },

  // Get single order
  getOrder: async (orderId) => {
    try {
      const docRef = doc(db, 'orders', orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: serverTimestamp()
      });
      return { id: orderId, status };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (orderId, paymentStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        paymentStatus,
        updatedAt: serverTimestamp()
      });
      return { id: orderId, paymentStatus };
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }
};