import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Jarvis from '../Componentes/Jarvis/Jarvis.jsx';
import Navbar from '../Componentes/Navbar/Navbar.jsx';
import { CarritoProvider } from '/src/contexts/CarritoContext';

ReactDOM.createRoot(document.getElementById('IA')).render(
  <React.StrictMode>
    <CarritoProvider>
      <Navbar />
      <Jarvis />
    </CarritoProvider>
  </React.StrictMode>,
);