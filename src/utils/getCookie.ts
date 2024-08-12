export const getCookie = (name: string): string | null => {
  const cookieString = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return cookieString ? decodeURIComponent(cookieString.split('=')[1]) : null;
};
