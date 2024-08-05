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
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: `${width}rem`, color: `${color}`, height: `auto` }}
      >
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
          <path
            d="M930 4511 c-88 -28 -140 -60 -201 -120 -61 -61 -97 -123 -123 -210
-14 -49 -16 -210 -16 -1621 0 -1715 -4 -1604 57 -1724 32 -64 125 -157 189
-189 115 -58 98 -57 838 -57 l681 0 51 24 c166 77 205 296 74 426 -81 82 -64
80 -757 80 l-603 0 0 1440 0 1439 623 3 c595 3 624 4 662 23 202 100 203 387
1 481 l-51 24 -685 -1 c-629 0 -690 -2 -740 -18z"
          />
          <path
            d="M3274 3676 c-97 -45 -164 -162 -150 -263 13 -94 36 -126 268 -359
l222 -224 -830 0 c-917 0 -891 2 -976 -63 -131 -100 -131 -314 0 -414 85 -65
59 -63 976 -63 l830 0 -222 -224 c-232 -233 -255 -265 -268 -359 -14 -101 53
-218 150 -263 66 -31 162 -32 226 -3 34 15 159 134 508 482 255 254 475 482
490 507 24 39 27 56 27 130 0 74 -3 91 -27 130 -15 25 -235 253 -490 507 -349
348 -474 467 -508 482 -64 29 -160 28 -226 -3z"
          />
        </g>
      </svg>
    </>
  );
};

export default LogOutIcon;