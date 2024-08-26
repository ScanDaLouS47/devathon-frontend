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
            labels: dataLabels,
            title: {
                text: 'Reservas por turno'
            }
        },
        series: dataSeries
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
