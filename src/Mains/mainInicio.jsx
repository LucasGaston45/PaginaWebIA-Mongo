import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../Componentes/Navbar/Navbar.jsx';
import Carrusel from '../Componentes/Carrusel/Carousel.jsx';
import Footer from '../Componentes/Footer/Footer.jsx';
import Slider from '../Componentes/Carrusel/SliderProduct.jsx';
import { CarritoProvider } from '/src/contexts/CarritoContext';

ReactDOM.createRoot(document.getElementById('navbar')).render(
  <React.StrictMode>
    <CarritoProvider>
      <Navbar />
    </CarritoProvider>
  </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById('carrusel')).render(
  <React.StrictMode>
    <Carrusel />
  </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById('slider')).render(
  <React.StrictMode>
    <CarritoProvider>
      <Slider />
    </CarritoProvider>
  </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById('footer')).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>,
);