import { useContext, useState } from 'react';
import { productos as dataProductos, destacados as productosDestacados } from '/src/data.js';
import { CarritoContext } from '/src/contexts/CarritoContext';
import './Productos.css';

const MenuDesplegable = ({ setCategoriaSeleccionada }) => {
  const [abrirCategoria, setAbrirCategoria] = useState(null);

  const alternarCategoria = (categoria) => {
    setAbrirCategoria(abrirCategoria === categoria ? null : categoria);
  };

  return (
    <div className="menu-categorias">
      <button className='boton-categoria' onClick={() => alternarCategoria('categorias')}>CATEGORÍAS</button>
      {abrirCategoria === 'categorias' && (
        <div className="submenu">
          {Object.keys(dataProductos).map((categoria) => (
            <div key={categoria}>
              <button onClick={() => setCategoriaSeleccionada(categoria)}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Productos = ({ productos }) => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
          <div className="producto-info">
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p className="producto-precio">${producto.precio.toLocaleString()}</p>
            <button className="agregar-carrito" onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Producto = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  return (
    <div className="app-contenedor">
      <MenuDesplegable setCategoriaSeleccionada={setCategoriaSeleccionada} />
      <div className="productos-area">
        {!categoriaSeleccionada ? (
          <>
            <img src="/src/assets/subcategoria_default.jpg" alt="Banner" />
            <h2>Productos Destacados</h2>
            <Productos productos={productosDestacados} />
          </>
        ) : (
          <Productos productos={dataProductos[categoriaSeleccionada]} />
        )}
      </div>
    </div>
  );
};

export default Producto;