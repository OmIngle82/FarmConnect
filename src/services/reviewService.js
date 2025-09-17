// src/services/reviewService.js
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, updateDoc, query, where, getDoc, orderBy, serverTimestamp } from 'firebase/firestore';

export const reviewService = {
  // Add review
  addReview: async (reviewData) => {
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        ...reviewData,
        createdAt: serverTimestamp()
      });
      
      // Update product rating
      const productRef = doc(db, 'products', reviewData.productId);
      const reviews = await getDocs(query(collection(db, 'reviews'), where('productId', '==', reviewData.productId)));
      const totalRating = reviews.docs.reduce((sum, doc) => sum + doc.data().rating, 0);
      const avgRating = totalRating / reviews.size;
      
      await updateDoc(productRef, {
        rating: avgRating,
        reviewCount: reviews.size
      });
      
      return { id: docRef.id, ...reviewData };
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },

  // Get reviews by product
  getReviewsByProduct: async (productId) => {
    try {
      const q = query(
        collection(db, 'reviews'), 
        where('productId', '==', productId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting reviews by product:', error);
      throw error;
    }
  },

  // Get reviews by user
  getReviewsByUser: async (userId) => {
    try {
      const q = query(
        collection(db, 'reviews'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting reviews by user:', error);
      throw error;
    }
  }
};