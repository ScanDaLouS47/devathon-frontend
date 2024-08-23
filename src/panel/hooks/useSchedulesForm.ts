import { useState } from 'react';

export const useSchedulesForm = () => {
  const [persons, setPersons] = useState({
    adults: 2,
    kids: 2,
  });
  const setAdults = (adults: number) => setPersons({ ...persons, adults });

  const setKids = (kids: number) => setPersons({ ...persons, kids });

  return { persons, setAdults, setKids };
};
