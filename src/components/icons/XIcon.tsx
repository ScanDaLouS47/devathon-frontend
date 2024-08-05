/**
 *
 * @param {Object} props - Properties for rendering component
 * @param {string} props.width - Size of component
 *
 * @returns {JSX.Element} Elemento | Estructura HTML
 */

const LogOutIcon = ({ width, color }: { width: string; color?: string }): JSX.Element => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: `${width}rem`, color: `${color}`, height: `auto` }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </>
  );
};

export default LogOutIcon;
