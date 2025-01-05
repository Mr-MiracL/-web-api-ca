import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

// 创建 AuthProvider 组件
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); // 用于初始化时的加载状态

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // 模拟用户已登录
    }
    setLoading(false); 
  }, []);


  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
