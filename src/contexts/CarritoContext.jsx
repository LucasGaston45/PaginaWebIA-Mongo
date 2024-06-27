import { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [totalPrecio, setTotalPrecio] = useState(() => {
    const totalGuardado = localStorage.getItem('totalPrecio');
    return totalGuardado ? parseFloat(totalGuardado) : 0;
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('totalPrecio', totalPrecio);
  }, [carrito, totalPrecio]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
    setTotalPrecio((prevTotal) => prevTotal + parseFloat(producto.precio));
  };

  const eliminarDelCarrito = (productoId) => {
    const productoEliminado = carrito.find((producto) => producto.id === productoId);
    if (productoEliminado) {
      setCarrito((prevCarrito) =>
        prevCarrito.filter((producto) => producto.id !== productoId)
      );
      setTotalPrecio((prevTotal) => prevTotal - parseFloat(productoEliminado.precio));
    }
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    setTotalPrecio(0);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, totalPrecio, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};