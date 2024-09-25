// main.jsx o main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, NextUIProvider } from '@nextui-org/react';
import App from './App';
import './index.css'; // Asegúrate de que index.css esté configurado correctamente

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider >
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
