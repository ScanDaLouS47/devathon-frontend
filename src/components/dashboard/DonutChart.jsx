import { useState } from 'react';
import Chart from 'react-apexcharts';

export const DonutChart = ({data}) => {
    let dataSeries = [];
    let dataLabels = [];
    data.forEach(element => {
        dataSeries.push(element.total);
        dataLabels.push(element.shift_name);
    });

    const [chartData] = useState({
        options: {
            labels: dataLabels, // ['Turno 1','Turno 2', 'Turno 3', 'Turno 4'],
            title: {
                text: 'Reservas por turno'
            }
        },
        series: dataSeries // [44,55,15,12],
    })



  return (
    <div style={{ width: '50%', float: 'left'}}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </div>
  )
}
