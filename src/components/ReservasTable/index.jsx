import React from 'react';
import Table from "../../components/Table";
import Thead from "../../components/Thead";
import Tr from '../../components/Tr';
import Th from '../../components/Th';
import Tbody from '../../components/Tbody';
import Td from '../../components/Td';
import format from 'date-fns/format';


const ReservasTable = ({ reservas }) => {
  const formatarData = (data) => {
    if (!data) return '';
    return format(new Date(data), 'dd/MM/yyyy HH:mm:ss');
  };
  console.log('Dados das Reservas:', reservas);
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Descrição</Th>
          <Th>Solicitante</Th>
          <Th>Sala</Th>
          <Th>Início</Th>
          <Th>Fim</Th>
   
        </Tr>
      </Thead>
      <Tbody>
        {reservas?.map((reserva, index) => (
        <Tr key={index}>
          <Td>{reserva.descricao}</Td>
          <Td>{reserva.solicitante}</Td>
          <Td>{reserva.salaId}</Td>
          <Td>{formatarData(reserva.dataInicio)}</Td>
          <Td>{formatarData(reserva.dataFim)}</Td>
        </Tr>
        ))}
      </Tbody>
      
  </Table>
  );
};

export default ReservasTable;
