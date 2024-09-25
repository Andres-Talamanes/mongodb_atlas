import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase/firebase.js';
import { signOut } from 'firebase/auth';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '', edad: '', ciudad: '' });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/datos', { // Cambia el puerto según tu servidor
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Datos guardados:', result);
        // Limpiar el formulario después de guardar
        setFormData({ nombre: '', edad: '', ciudad: '' });
      } else {
        console.error('Error al guardar datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={() => navigate('/dashboard')}>Dashboard</li>
          <li onClick={() => navigate('/other-page')}>Otra Página</li>
          <li onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Bienvenido al Dashboard</h1>
        <p>Este es tu panel de control.</p>

        {/* Formulario para guardar datos */}
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Edad:
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ciudad:
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;