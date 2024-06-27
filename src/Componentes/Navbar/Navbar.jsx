import { useContext, useState } from 'react';
import { CarritoContext } from '/src/contexts/CarritoContext';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const { carrito, totalPrecio, eliminarDelCarrito, limpiarCarrito } = useContext(
    CarritoContext
  );
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nombre = event.target.elements.nombre.value;
    const apellido = event.target.elements.apellido.value;
    const telefono = event.target.elements.telefono.value;
    const email = event.target.elements.email.value;
    const dni = event.target.elements.dni.value;

    if (!email.includes('@')) {
      alert('El correo electrónico debe contener el símbolo "@"');
      return;
    }

    if (dni.length !== 8) {
      alert('El DNI debe contener 8 dígitos');
      return;
    }

    const datosCliente = {
      nombre,
      apellido,
      telefono,
      email,
      dni,
      productos: carrito,
      total: totalPrecio,
    };

    try {
      await axios.post('http://localhost:5000/api/enviar', datosCliente);
      setEnviado(true);
      limpiarCarrito();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Error al enviar los datos. Intenta de nuevo más tarde.');
    }

    setTimeout(() => {
      setMostrarModal(false);
      setEnviado(false);
    }, 3000);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/src/assets/logo.jpeg" alt="Logo de la Pagina" />
        <a href="/">JARVIS INDUSTRY</a>
      </div>
      <nav className="navbar">
        <a href="index.html">Home</a>
        <a href="producto.html">Products</a>
        <a href="IA.html">J.A.R.V.I.S.</a>
        <div className="container-cart-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="icon-cart"
            onClick={toggleCarrito}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{carrito.length}</span>
          </div>
        </div>
        {mostrarCarrito && (
          <div className="carrito-desplegable">
            <div className="carrito-items">
              {carrito.map((producto) => (
                <div key={producto.id} className="carrito-item">
                  <p>{producto.nombre}</p>
                  <button
                    className="eliminar-producto"
                    onClick={() => eliminarDelCarrito(producto.id)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="carrito-total">
              <p>Total: ${totalPrecio.toLocaleString()}</p>
              <button className="btn-pagar" onClick={toggleModal}>
                Pagar
              </button>
            </div>
          </div>
        )}
      </nav>
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2 className="modal-title">Formulario de Cliente</h2>
            <form onSubmit={handleSubmit}>
              <label>Nombre:</label>
              <input type="text" placeholder="Nombre" name="nombre" required />
              <label>Apellido:</label>
              <input type="text" placeholder="Apellido" name="apellido" required />
              <label>Número de Teléfono:</label>
              <input type="tel" placeholder="Teléfono" name="telefono" required />
              <label>Email:</label>
              <input type="email" placeholder="Email" name="email" required />
              <label>DNI:</label>
              <input type="text" placeholder="DNI" name="dni" required />
              <button type="submit">Guardar</button>
            </form>
            {enviado && (
              <div className="alerta-enviado">
                <p>Datos enviados correctamente</p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;