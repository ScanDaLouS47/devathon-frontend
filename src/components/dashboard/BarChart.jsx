import { useState } from 'react';
import Chart from 'react-apexcharts';

export const BarChart = ({data}) => {
    let dataTotal = [];
    let dataCategories = [];
    data.forEach(element => {
      dataTotal.push(element.total);
      dataCategories.push(element.month);
    });   
    const [chartData] = useState({
        series: [
            {
              name: 'Reservas',
              data: dataTotal,
            },
          ],
          options: {
            chart: {
              height: 350,
              type: 'basic-bar',
            },
            title: {
              text: 'Reservas ultimos meses',
              align: 'left',
            },
            xaxis: {
              categories: dataCategories,
            }
          },
    })



  return (
    <div style={{ width: '50%', float: 'left'}}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  )
}
