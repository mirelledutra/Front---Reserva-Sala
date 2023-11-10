// reservas.jsx
import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import Barra from '@/components/Barra';
import Header from '@/components/Header';
import ReservasTable from '../components/ReservasTable';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:3001/reservas');
        if (response.ok) {
          const data = await response.json();
          setReservas(data);
        } else {
          console.error('Erro ao buscar reservas:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div>
      <Header>Reserva de Salas</Header>
      <Formulario />
      {/* <Barra />
      <ReservasTable reservas={reservas} /> */}
    </div>
  );
};

export default Reservas;
