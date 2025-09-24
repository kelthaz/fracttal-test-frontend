// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexto/ContextoAuth';
import { ThemeProvider } from './contexto/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
);
