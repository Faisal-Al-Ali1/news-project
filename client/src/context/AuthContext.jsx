import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/me', { 
          withCredentials: true 
        });
        if (response.data.success && response.data.user) {
          const userData = {
            id: response.data.user._id,
            email: response.data.user.email,
            role: response.data.user.role
          };
          
          setUser(userData);
          console.log('Authenticated user:', userData);
        } else {
          console.warn('Authentication failed - no user data');
          setUser(null);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};