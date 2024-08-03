/**
 *
 * @param {Object} props - Properties for rendering component
 * @param {string} props.width - Size of component
 *
 * @returns {JSX.Element} Elemento | Estructura HTML
 */

const Logo = ({ width, color }: { width: string; color?: string }): JSX.Element => {
  const calculateHeight = (width: number): string => {
    const baseWidth = 7;
    const baseHeight = 4; // 7rem - 3rem
    const ratio = baseHeight / baseWidth;
    return `${width * ratio}rem`;
  };

  return (
    <>
      <div
        style={{
          borderRadius: `0.3125rem`,
          borderWidth: `0rem`,
          border: `none`,
          width: `${width}rem`,
          height: `${calculateHeight(Number(width))}`,
          color: `${color}`,
          boxShadow: `rgba(0,0,0,0.7) 0px -3px 0px 0px inset`,
          position: `relative`,
          zIndex: `3`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 2048 1152"
          style={{
            width: `auto`,
            height: `auto`,
            boxShadow: `1px 1px 7px 3px rgba(0, 0, 0, 0.3)`,
            borderRadius: `0.3125rem`,
          }}
        >
          <path transform="translate(0)" d="m0 0h2048v1152h-2048z" fill="#FD9A31" />
          <path
            transform="translate(909,132)"
            d="m0 0h16l11 1 2 1-1 6-4 9-1 4-2 37 79-1-1-34v-21l6-2h17l9 1 2 1-1 6-4 10-1 7-1 33 79-1-1-28-1-14v-11l7-3h17l10 2 1 3-5 12-1 5-1 16v18l17 3 15 6 10 8 8 9 7 14 2 7 1 8v61l-5 10-5 2-7-1-5-5-2-5-1-10-1-55-4-9-6-8-10-6-3-1-59-1h-34l-158 1-9 4-6 4-7 11-2 13v42l1 110 1 32 3 9 9 10 9 5 12 1 38 1 13 2 10 5 4 5v9l-4 6-9 5-8 2-9 1h-25l-18-1-16-4-13-7-10-9-7-8-8-16-3-11v-41l2-93 1-54 2-16 5-12 7-10 6-7 10-7 12-5 14-3-1-34v-21z"
            fill="#020101"
          />
          <path
            transform="translate(743,615)"
            d="m0 0 6 1 5 6-1 14v33l3 42v5l5-1h40l16 3 9 4 5 8v12l-6 12-8 10-9 10-10 9-16 12-16 10-23 12-17 7h-6l-3-3-1-3v-7l5-4 19-8h2l-1-15-1-38-1-13-3-3-1-7 4-4-2-25-2-31v-28l2-15z"
            fill="#020101"
          />
          <path
            transform="translate(909,698)"
            d="m0 0 7 1 4 5 2 2 20-4 28-3 15-1h35l17 1 4 2 2 4v6l-4 5h-49l-32 2-23 3-10 2 6 24 1 2h77l13 1 3 4v7l-5 5h-85l2 18 62-3 27-1h42l4 4 2 4-1 4-5 5-48 1-69 3h-13l1 4v7l-3 6-5 2-5-1-3-3-3-13-6-4-1-2v-7l5-4h2l-4-18-7-1-4-6 1-6 4-4h3l-4-17-2-6-6-2-3-4v-6l5-5v-7l5-5z"
            fill="#020101"
          />
          <path
            transform="translate(1201,392)"
            d="m0 0 4 1 10 9 3 5-2 6-10 9-74 74-14 7-8 2h-9l-10-2-12-5-13-11-9-9-8-7-7-7-6-9v-7l7-9 9-6 2-1h6l8 7 13 17 10 13 4 5 6 3h10l8-4 59-59 8-7 6-7h2l2-4z"
            fill="#020101"
          />
          <path
            transform="translate(1160,624)"
            d="m0 0h5l5 6v4l27-2 21-1h22l4 5 1 6-5 6-62 3h-13l-1 12-2 27v34l2 31 4 39 2 19-2 5-3 2h-8l-3-3-3-15-4-34-2-27-1-26v-18l2-33 1-10-42 3h-22l-4-6 1-6 5-4 29-3 30-2h8l2-6 4-5z"
            fill="#020101"
          />
          <path
            transform="translate(495,624)"
            d="m0 0h5l5 6v4l26-2 23-1h20l5 5 1 6-4 5-2 1-60 3h-14l-3 36v39l3 42 4 34v14l-4 4h-8l-3-3-3-14-4-35-2-26-1-27v-21l2-30 2-10-43 3h-22l-3-4-1-5 3-5 4-2 29-3 37-3 4-8z"
            fill="#020101"
          />
          <path
            transform="translate(1329,684)"
            d="m0 0 6 1 5 6-1 6-2 3h-2l5 21 17 61 6 27-1 5-4 4h-8l-3-3-10-38-7-25v-2l-12 3-16 3-5 8-11 27-5 16-5 12-6 5-7-1-4-6 2-10 10-27 8-18-5 2-9 4h-5l-5-6 1-6 5-5 10-5 18-6 15-25 14-20 9-10z"
            fill="#020101"
          />
          <path
            transform="translate(663,684)"
            d="m0 0h5l6 5 1 6-3 5-1 5 15 54 11 41 1 5v9l-6 5-6-1-3-2-7-26-11-39-28 5-8 16-7 17-4 14-7 16-3 4-7 1-4-2-2-4 1-9 10-28 9-20-11 6-7 1-3-1-3-5 1-7 6-5 19-8 8-2 10-18 10-15 13-17z"
            fill="#020101"
          />
          <path
            transform="translate(1459,706)"
            d="m0 0h19l10 4 4 5-1 6-3 4-6 1-7-2h-16l-12 5-11 6-13 11-9 10-8 13-4 11 1 9 5 6 11 4 15 1 17-2 19-4 24-8 22-9h6l6 7-1 5-6 5-27 11-22 7-20 4-11 1h-18l-17-4-10-5-7-8-4-10v-14l4-12 6-12 9-11 9-10 14-11 14-8 14-5z"
            fill="#020101"
          />
          <path
            transform="translate(1600,611)"
            d="m0 0 5 1 4 4v8l-7 30-4 32-2 17 19-1h16l5 3 2 2v8l-5 4h-37l1 31 3 32 4 23v8l-5 5h-7l-4-4-5-25-3-27-1-16v-25l-14 2h-7l-5-5v-6l4-4 9-3 13-1 2-26 4-29 6-25 4-10z"
            fill="#020101"
          />
          <path
            transform="translate(870,585)"
            d="m0 0h6l5 5-1 13-5 37-1 11-1 34 2 39 5 44 8 50v8l-6 5-7-1-3-4-7-38-5-36-3-32-1-16v-47l3-32 5-31 3-7z"
            fill="#020101"
          />
          <path
            transform="translate(758,732)"
            d="m0 0h44l12 2 1 3-6 11-12 13-12 11-18 13-8 4-1-1-1-34v-21z"
            fill="#FD9A31"
          />
          <path
            transform="translate(1096,938)"
            d="m0 0h9l6 4 3 6 1 10v9l-2 9-5 6-3 1h-9l-5-3-4-7v-25l4-7z"
            fill="#020101"
          />
          <path
            transform="translate(655,938)"
            d="m0 0h15l7 4 2 4v12l-6 7h-2l9 16-1 3-5-1-10-16-3-1-1 17-2 1-4-2v-43z"
            fill="#020101"
          />
          <path
            transform="translate(827,938)"
            d="m0 0h15l6 3 3 5 1 9-3 7-4 3 1 5 6 10v4l-5-1-7-10-4-6-3-1v14l-2 4-4-1-1-10z"
            fill="#020101"
          />
          <path
            transform="translate(1135,938)"
            d="m0 0h6l8 16 6 14 1-30h5l1 1v43l-2 2-4-1-3-4-12-26v29l-2 2-4-1z"
            fill="#020101"
          />
          <path
            transform="translate(1013,938)"
            d="m0 0h5l3 5 11 23 1-27 5-1 1 1v43l-5 2-4-6-5-12-6-11-1 28h-6v-44z"
            fill="#020101"
          />
          <path
            transform="translate(1301,937)"
            d="m0 0 4 1 4 13 7 26v6l-4 1-3-7v-3h-14l-1 7-2 3-4-1 1-8 7-28 3-9z"
            fill="#020101"
          />
          <path
            transform="translate(700,938)"
            d="m0 0h21l1 3-1 2-3 1h-13v13h15l1 5-16 1 1 14 16 1v5l-21 1-2-1v-44z"
            fill="#020101"
          />
          <path
            transform="translate(914,938)"
            d="m0 0h22l1 4-1 1-16 1v13h15v5l-15 1v14l17 1 1 2-2 3h-22z"
            fill="#020101"
          />
          <path
            transform="translate(784,938)"
            d="m0 0h22l1 2-1 3-15 1-1 13h15v5l-14 1-1 15h17v5l-21 1-2-1z"
            fill="#020101"
          />
          <path
            transform="translate(748,938)"
            d="m0 0h8l6 4 2 3v5h-4l-5-5-4-1-4 3 1 6 9 6 7 6 1 2v8l-4 6-4 2h-10l-6-5-1-2v-6l4 1 4 5 7 1 3-2v-7l-16-12-2-3v-7l4-6z"
            fill="#020101"
          />
          <path
            transform="translate(870,938)"
            d="m0 0 4 1 6 25 1 7 3-8 6-23 1-2h5l-1 9-9 34-2 3-5-1-3-8-8-33v-3z"
            fill="#020101"
          />
          <path
            transform="translate(1341,938)"
            d="m0 0h8l6 4 3 4v5l-4 1-4-6-2-1h-6l-3 3v24l2 4 6 1 4-2 3-6 4 1v6l-4 5-4 2h-10l-6-5-2-6v-23l3-7z"
            fill="#020101"
          />
          <path
            transform="translate(1184,938)"
            d="m0 0h22l-1 5h-16l1 13 14 1 1 4-1 1-15 1 1 14 17 1-1 5h-22z"
            fill="#020101"
          />
          <path
            transform="translate(1098,944)"
            d="m0 0h6l4 4 1 6v14l-2 7-2 2-5 1-5-2-2-4-1-17 2-8z"
            fill="#FD9A31"
          />
          <path
            transform="translate(985,315)"
            d="m0 0 10 3 20 13 7 4 6-1 24-15 8-4 4 1-7 7-21 13-12 7-22-13-12-8-5-4z"
            fill="#020101"
          />
          <path transform="translate(935,309)" d="m0 0h6v33h17l14 1v4h-35l-3-3v-34z" fill="#020101" />
          <path
            transform="translate(1374,938)"
            d="m0 0h25l1 4-3 2h-7v38l-1 1h-5v-39h-7l-3-1z"
            fill="#020101"
          />
          <path transform="translate(1109,308)" d="m0 0 4 1 1 6v29l-3 3h-35v-4l9-1h22v-32z" fill="#020101" />
          <path
            transform="translate(1250,938)"
            d="m0 0h25l1 4-3 2-7 1v37l-1 1h-6l1-39h-8l-2-1z"
            fill="#020101"
          />
          <path transform="translate(1e3 317)" d="m0 0h44l-5 4-15 10-3 1-17-11z" fill="#020101" />
          <path transform="translate(985,938)" d="m0 0 5 1v44l-4 1-1-1z" fill="#020101" />
          <path transform="translate(660,944)" d="m0 0h10l3 3 1 7-2 5-2 1h-10z" fill="#FD9A31" />
          <path transform="translate(832,944)" d="m0 0h10l3 2 1 3v7l-4 4h-9z" fill="#FD9A31" />
          <path transform="translate(1015,294)" d="m0 0h18l1 1v9h-19l-1-1z" fill="#020101" />
          <path transform="translate(1058,293)" d="m0 0h7l3 3-1 7-4 10-3 1-3-4-2-7v-9z" fill="#020101" />
          <path transform="translate(981,293)" d="m0 0h10l3 3-2 9-3 7-4 2-4-12-1-8z" fill="#020101" />
          <path transform="translate(1e3 368)" d="m0 0h37l1 4-2 1h-36z" fill="#020101" />
          <path transform="translate(1080,368)" d="m0 0h29l1 5h-31z" fill="#020101" />
          <path transform="translate(939,368)" d="m0 0h29v5h-30z" fill="#020101" />
          <path transform="translate(1015,307)" d="m0 0h18v7h-18z" fill="#020101" />
          <path transform="translate(655,721)" d="m0 0 3 3 3 10-5 2-9 1 2-6z" fill="#FD9A31" />
          <path transform="translate(1320,721)" d="m0 0h2l3 10-1 4-9 2h-4l2-5z" fill="#FD9A31" />
          <path transform="translate(1023,345)" d="m0 0 4 1v19h-6v-19z" fill="#020101" />
          <path transform="translate(1302,948)" d="m0 0 2 4 3 13v3h-9l-1-3z" fill="#FD9A31" />
          <path transform="translate(1092,351)" d="m0 0h5l1 1v12l-5 1-1-1z" fill="#020101" />
          <path transform="translate(951,351)" d="m0 0 5 1v12h-6v-12z" fill="#020101" />
          <path transform="translate(1022,272)" d="m0 0 5 1 1 1v7h-7l-1-2v-6z" fill="#020101" />
          <path transform="translate(1029,285)" d="m0 0 3 3-1 2h-15l1-4z" fill="#020101" />
          <path transform="translate(966,317)" d="m0 0h9l4 5h-14z" fill="#020101" />
          <path transform="translate(1073,317)" d="m0 0h9l1 4-4 1h-10l1-3z" fill="#020101" />
        </svg>
      </div>
    </>
  );
};

export default Logo;
