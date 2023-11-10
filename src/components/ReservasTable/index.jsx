import React from 'react';

const ReservasTable = ({ reservas }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Solicitante</th>
   
        </tr>
      </thead>
      <tbody>
        {reservas.map((reserva) => (
          <tr key={reserva.id}>
            <td>{reserva.descricao}</td>
            <td>{reserva.solicitante}</td>
    
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservasTable;
