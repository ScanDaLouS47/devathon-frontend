import { useEffect, useState } from 'react';
import { BarChart } from '../../../components/dashboard/BarChart'; 
import { DonutChart } from '../../../components/dashboard/DonutChart';
import { fetchApi } from '../../../utils/fetchApi';
import styles from '../accountSettings/settings/settings.module.scss';

export const DashboardPage = () => {

  const [datachart, setDatachart] = useState(null);  
  const [dataDonutchart, setDataDonutchart] = useState(null); 

  useEffect(() => {
    const loadCharts = async () => {
      try {             
        const resp: any = await fetchApi(
          '/api/v1/dashboard/barchart',
          'GET',
          '',
          null                       
        );
        console.log('ON MY DASHBOARD', resp);
  
        if(resp.ok){
          setDatachart(resp.data);
          console.log(datachart, 'DATA')
        }
  
        if (!resp) {
          throw new Error('Bad request');
        }      
        
      } catch (error) {
        if (error instanceof Error) {        
          console.error('Registration error:', error.message);
        } else {        
          console.error('Unexpected error:', error);
        }
      }
    };

    loadCharts();    
  }, []);

  useEffect(() => {
    const loadChartsDonut = async () => {
      try {             
        const resp: any = await fetchApi(
          '/api/v1/dashboard/donutchart',
          'GET',
          '',
          null                       
        );
        console.log('ON MY DASHBOARD', resp);
  
        if(resp.ok){
          setDataDonutchart(resp.data);
          console.log(dataDonutchart, 'DATA')
        }
  
        if (!resp) {
          throw new Error('Bad request');
        } 

        const respDonut: any = await fetchApi(
          '/api/v1/dashboard/donutchart',
          'GET',
          '',
          null                       
        );
        console.log('ON MY DASHBOARD DONUT', respDonut);
  
        if(respDonut.ok){
          setDataDonutchart(respDonut.data);
          console.log(dataDonutchart, 'DATA')
        }
  
        if (!respDonut) {
          throw new Error('Bad request');
        } 
        
        
      } catch (error) {
        if (error instanceof Error) {        
          console.error('Registration error:', error.message);
        } else {        
          console.error('Unexpected error:', error);
        }
      }
    };

    loadChartsDonut();    
  }, []);
  

  
  return (
    <div>
      <div className={styles.settings}>
        <div className={styles.settings__container}>        
          <h1 className={styles.settings__title}>Reserves</h1>
          <div>
          { (datachart && dataDonutchart) ? <div><BarChart data={datachart} /> <DonutChart data={dataDonutchart} /> </div> : <p style={{ textAlign: 'center'}}>Cargando...</p> }                          
          </div>
        </div>
      </div>      
    </div>
  );
};
