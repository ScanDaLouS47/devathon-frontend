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
  
        if(resp.ok){
          setDatachart(resp.data);
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
  
        if(resp.ok){
          setDataDonutchart(resp.data);
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
  
        if(respDonut.ok){
          setDataDonutchart(respDonut.data);
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
