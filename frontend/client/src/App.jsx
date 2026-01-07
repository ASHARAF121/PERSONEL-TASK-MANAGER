// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Register from './pages/register';
import Login from './pages/login';
import DashBoard from './pages/dashBoard';


const App = () => {
  const token = localStorage.getItem('token');  // Check if token exists in localStorage

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        {/* Optionally, Admin page route
        <Route
          path="/admin"
          element={token && localStorage.getItem('role') === 'admin' ? <Admin /> : <Navigate to="/login" />}
        /> */}

        {/* Redirect to login page if no token */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashBoard" /> : <Navigate to="/login" />}
        />
      </Routes>

      
       
    </div>
  );
};

export default App;