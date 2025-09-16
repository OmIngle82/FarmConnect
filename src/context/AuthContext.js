import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function setUserRoleWithStorage(role) {
    setUserRole(role);
    if (currentUser) {
      localStorage.setItem(`userRole_${currentUser.uid}`, role);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Get user role from localStorage
        const role = localStorage.getItem(`userRole_${user.uid}`);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      
      setAuthInitialized(true);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    userRole,
    setUserRole: setUserRoleWithStorage,
    signup,
    login,
    logout,
    authInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && authInitialized && children}
    </AuthContext.Provider>
  );
}