import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import App from './App'; // Página Principal (To-Do List)

function Main() {
  const isAuthenticated = localStorage.getItem('token'); // Verifica se o usuário está logado

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<App />} />
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default Main;