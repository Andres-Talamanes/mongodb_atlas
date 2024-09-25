import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase/firebase.js';
import { signOut } from 'firebase/auth';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [ciudad, setCiudad] = useState('');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/ejemplo_de_mongo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, edad, ciudad }),
    });
    if (response.ok) {
      console.log('Datos guardados correctamente');
      setNombre('');
      setEdad('');
      setCiudad('');
    } else {
      console.error('Error al guardar los datos');
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
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
          <input 
            type="number" 
            placeholder="Edad" 
            value={edad} 
            onChange={(e) => setEdad(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="Ciudad" 
            value={ciudad} 
            onChange={(e) => setCiudad(e.target.value)} 
            required 
          />
          <button type="submit">Guardar</button>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;
