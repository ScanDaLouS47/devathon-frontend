import styles from '../accountSettings/settings/settings.module.scss';
import { FormInput } from '../../../components/formInput/FormInput';
import { useForm } from 'react-hook-form';
import { Table } from '../../../components/table/Table';
import { useEffect, useState } from 'react';
import { fetchApi } from '../../../utils/fetchApi';

export const ReservationsPage = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors /* , isDirty */ },
  } = useForm<any>();

  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [find, setFind] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchData('');
  }, []);

  const searchData = async (filter: any) => {
    try {
      setLoading(true);
      setData([]);
      let url = '';
      if (filter === '') {
        url = '/api/v1/todaybookings';
      } else {
        const { search } = filter;
        url = `/api/v1/booking/${search}`;
      }
      const resp: any = await fetchApi(url, 'GET', '', null);

      if (resp.ok && resp.data.length > 0) {
        const headersArr = Object.keys(resp.data[0]);
        setHeaders(headersArr);
        if (data.length === 0) {
          resp.data.forEach((element: any) => {
            data.push(element);
          });
          setData(data);
        }

        setFind(true);
        setLoading(false);
      } else {
        if (!loading) {
          setLoading(false);
          setFind(false);
        }
      }

      if (!resp) {
        throw new Error('Bad request');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Table error:', error.message);
      } else {
        console.error('Table error:', error);
      }
    }
  };

  return (
    <div>
      <div className={styles.settings}>
        <div className={styles.settings__container}>
          <h1 className={styles.settings__title}>Reserves</h1>
          <form className={styles.form} onSubmit={handleSubmit(searchData)}>
            <div className={styles.form__columns}>
              <div className={styles.form__column}>
                <FormInput
                  label=""
                  placeholder="Ingrese DNI"
                  error={errors['search']}
                  id="search"
                  type="text"
                  {...register('search')}
                />
              </div>
            </div>
          </form>
          <div className={styles.form__columns}>
            <div className={styles.form__column}>
              {find ? <Table headers={headers} data={data} /> : <p>No se encontraron datos</p>}
              {loading && <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
