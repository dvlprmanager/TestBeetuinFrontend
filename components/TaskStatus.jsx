import React from 'react';

const TaskStatus = ({ state }) => {
  let statusText;
  let statusColor;

  switch (state) {
    case 1:
      statusText = 'En Curso';
      statusColor = 'orange';
      break;
    case 2:
      statusText = 'Finalizada';
      statusColor = 'green';
      break;
    default:
      statusText = 'Desconocido';
      statusColor = 'gray';
      break;
  }

  return (
    <span style={{ color: statusColor, fontWeight: 'bold' }}>
      {statusText}
    </span>
  );
};

export default TaskStatus;
