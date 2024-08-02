/**
 *
 * @param {Object} props - Properties for rendering component
 * @param {string} props.width - Size of component
 *
 * @returns {JSX.Element} Elemento | Estructura HTML
 */

const UserIcon = ({ width, color }: { width: string; color?: string }): JSX.Element => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: `${width}rem`, color: `${color}`, height: `auto`, cursor: `pointer` }}
        fill="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>
    </>
  );
};

export default UserIcon;
