import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart(props) {
  let obsolescencia = props.dados.obs*100;
  let conservacao = props.dados.cons*100;
  let manutencao = props.dados.manut*100;
  let intensidade = props.dados.inte*100;

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ['Obsolescência (%)', 'Conservação (%)', 'Manutenção (%)', 'Intensidade de Uso (%)'],
    datasets: [
      {
        label: '# of Votes',
        data: [obsolescencia, conservacao, manutencao, intensidade],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };

  return <Pie
          data={data}
        />;
}
