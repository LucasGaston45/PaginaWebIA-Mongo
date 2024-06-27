import React from 'react';
import ReactDOM from 'react-dom/client';
import '/src/Mains/index.css';
import Productos from '/src/Componentes/Productos/Productos';
import Navbar from '/src/Componentes/Navbar/Navbar';
import Footer from '/src/Componentes/Footer/Footer';
import { CarritoProvider } from '/src/contexts/CarritoContext';

ReactDOM.createRoot(document.getElementById('product')).render(
  <React.StrictMode>
    <CarritoProvider>
      <Navbar />
      <Productos />
      <Footer />
    </CarritoProvider>
  </React.StrictMode>,
);