export const formatDateTime = (date: string) => {
  const isoString = date;

  const datePart = isoString.slice(0, 10);
  const timePart = isoString.slice(11, 16);

  const [year, month, day] = datePart.split('-');
  const formattedDate = `${day}-${month}-${year}`;

  return { formattedDate, timePart };
};
