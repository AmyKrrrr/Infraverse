    import React, { createContext, useState } from 'react';

    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null); // 'teacher', 'student', or null

      const login = (role) => {
        setUser(role);
      };

      const logout = () => {
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };

    // Remove useAuth from this file. It will be moved to a new file 'useAuth.js'.
    
