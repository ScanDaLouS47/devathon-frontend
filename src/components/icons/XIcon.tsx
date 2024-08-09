/**
 *
 * @param {Object} props - Properties for rendering component
 *
 * @returns {JSX.Element} Elemento | Estructura HTML
 */
const LogOutIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </>
  );
};

export default LogOutIcon;
