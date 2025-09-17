// src/services/productService.js
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc, orderBy, limit, startAfter } from 'firebase/firestore';

export const productService = {
  // Add new product
  addProduct: async (productData) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...productData };
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Get all products with pagination
  getProducts: async (pageSize = 10, lastDoc = null) => {
    try {
      let q = collection(db, 'products');
      q = query(q, orderBy('createdAt', 'desc'), limit(pageSize));
      
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return { products, lastVisible };
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Get products by farmer
  getProductsByFarmer: async (farmerId) => {
    try {
      const q = query(collection(db, 'products'), where('farmerId', '==', farmerId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting products by farmer:', error);
      throw error;
    }
  },

  // Get single product
  getProduct: async (productId) => {
    try {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productId, productData) => {
    try {
      await updateDoc(doc(db, 'products', productId), {
        ...productData,
        updatedAt: new Date()
      });
      return { id: productId, ...productData };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      return productId;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (searchTerm, category = null) => {
    try {
      let q = collection(db, 'products');
      
      if (searchTerm) {
        // Note: Firestore doesn't support full-text search natively
        // This is a simplified implementation
        q = query(q, orderBy('name'));
      }
      
      if (category) {
        q = query(q, where('category', '==', category));
      }
      
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Client-side filtering for search term
      if (searchTerm) {
        return products.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};