import { useState, useContext } from 'react';
import { CarritoContext } from '/src/contexts/CarritoContext.jsx'; 
import { destacados as productosDestacados } from '/src/data.js';
import './SliderProduct.css';

const SliderProduct = () => {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [actualProducto, setActualProducto] = useState(0);
  const itemsVisible = 4;

  const derecha = () => {
    setActualProducto((prevIndex) => (prevIndex + 1) % productosDestacados.length);
  };

  const izquierda = () => {
    setActualProducto((prevIndex) => (prevIndex - 1 + productosDestacados.length) % productosDestacados.length);
  };

  const getVisibleProducts = () => {
    let visibleProducts = [];
    for (let i = 0; i < itemsVisible; i++) {
      visibleProducts.push(productosDestacados[(actualProducto + i) % productosDestacados.length]);
    }
    return visibleProducts;
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title">Productos Destacados</h2>
      <div className="slider">
        <button onClick={izquierda} className="flecha flecha-izquierda">←</button>
        <div className="slider-content">
          {getVisibleProducts().map((producto, index) => (
            <div className="slider-item" key={index}>
              <img src={producto.imagen} alt={producto.nombre} />
              <h2>{producto.nombre}</h2>
              <button className='agregar-carrito' onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
            </div>
          ))}
        </div>
        <button onClick={derecha} className="flecha flecha-derecha">→</button>
      </div>
    </div>
  );
};

export default SliderProduct;