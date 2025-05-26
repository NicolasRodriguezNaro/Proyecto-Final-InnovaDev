import React, { useEffect, useState } from 'react';
import './Project.css';

const Project = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const obtenerProyectos = async () => {
    try {
      //const token = localStorage.getItem('token'); // Asegúrate que el token esté guardado ahí

      const response = await fetch('http://localhost:5000/api/proyectos/mostrarProyecto', {
         method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          //Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los proyectos');
      }

      const data = await response.json();
      setProyectos(data);
    } catch (err) {
      setError('No se pudo cargar los proyectos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  if (loading) return <div className="loader">Cargando proyectos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="project-container">
      <h1 className="project-title">Listado de Proyectos</h1>
      <div className="project-list">
        {proyectos.map((proyecto) => (
          <div key={proyecto._id} className="project-card">
            <h2>{proyecto.titulo}</h2>
            <p><strong>Área:</strong> {proyecto.area}</p>
            <p><strong>Institución:</strong> {proyecto.institucion || 'N/A'}</p>
            <p>
              <strong>Estado:</strong>{' '}
              <span className={`estado ${proyecto.estado.toLowerCase()}`}>{proyecto.estado}</span>
            </p>
            <p><strong>Docente:</strong> {proyecto.docenteId?.nombre} (<a href={`mailto:${proyecto.docenteId?.correo}`}>{proyecto.docenteId?.correo}</a>)</p>
            <p><strong>Integrantes:</strong> {proyecto.integrantes?.length || 0}</p>
            <p><strong>Creado:</strong> {new Date(proyecto.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
