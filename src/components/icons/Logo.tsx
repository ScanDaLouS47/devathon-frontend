/**
 *
 * @param {Object} props - Properties for rendering component
 *
 * @returns {JSX.Element} Elemento | Estructura HTML
 */
const Logo = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 2048 608"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path transform="translate(0)" d="m0 0h2048v608h-2048z" fill="#FEFEFE" />
      <path
        transform="translate(1080,157)"
        d="m0 0h7l5 2 4 4-1 12-10 28-10 27-2 8 1 6 5 3 19 5 11 6 8 9 5 11 1 4v35l-5 21-14 35v9l2 5 7 4 8-1 8-4 10-9 10-14 12-23 8-17 26-65 17-43 17-44 7-13 3-1h7l6 4 3 4-1 10-7 20-11 29-13 32-13 33-13 32-16 41-3 10v11l2 6 14 1 12-6 5-4 11-17 12-22 12-35 11-21 13-16 9-9 16-8 6-2h19l14 6 11 11 6 13v20l-8 16-14 14-19 9-24 6-23 4-2 3-1 6v9l5 14 7 7 8 4 4 1h13l16-4 17-9 13-12 11-14 10-18 7-11 3-1 7 2 4 4v7l-3 9-9 16-16 21-9 10-16 11-15 7-16 4-16 1-19-5-13-7-7-7-8-14-3-4-7 12-12 12-16 8h-20l-16-8-8-9-2-3-12 12-12 7-7 2h-14l-14-6-7-5h-8l-16 9-11 3h-20l-15-8-9-9-6-11v-2l-5 5-11 12-8 6-13 6h-14l-15-6-10-7-5 1-24 12-4 1h-18l-12-6-6-5-8-14-4-13-1-5v-24l3-16 8-23 11-21 10-14 11-11 13-8 8-3h22l15 6 7 4h9l2-4 7-6h7l6 4 2 3-1 13-17 43-19 49-2 6-1 14 2 5 4 3h11l11-6 9-11 15-26 12-24 15-38 18-44 19-48 12-30 4-5z"
        fill="#FEA44A"
      />
      <path
        transform="translate(320,137)"
        d="m0 0 7 1 4 11-1 6-4 5 5 3 2 32 3 2v9l-3 6-2 9 6-1v-7l3-4 4-34 3-1h8l2 1 2 20 2 15 4 3-2 6-4 6-4 8-3 3-6 1h-15l1 20v19l9 2 4 3h38l5-4 1-7-10-10-1-2v-35l7-2h23l8 1 4 6v27l-6 10-6 5v6l9 6 9 4v38h70l1-15 5-35 6-35 2-4 13 2v10l-4 30-6 39-2 23-1 33-1 82-1 1h-12l-2-3-1-40v-38h-30l-51-1v81l-1 1h-12l-1-8v-99l1-9 4-5 1-3-25-1-11 2-20 7-14 5h-2v37l-1 61h26v13h-66l-1-1v-12l10-1h16l-2-69v-28l-10-3-30-10h-32l5 8 1 24v72l-1 20h-12l-2-6v-76h-81v78l-2 4-9 1-4-5-2-117-5-40-6-39v-17l4-3h6l3 3 3 15 11 71h69v-38l16-8 2-2-1-8-4-2-5-6-2-7v-28l5-3h35l2 2v33l-7 10-3 3 1 8 4 3h39l6-5 7-1v-38h-15l-8-4-6-9-5-10 6-8 1-27 4-7-4-5v-7l3-8 2-2h5l4 7v12l-6 3 4 3 2 1 2 17 2 16 3 3v9h7l-4-14-2-3 1-8 4-2v-28l3-3v-7l-3-2 1-12z"
        fill="#FEA44A"
      />
      <path
        transform="translate(1951,157)"
        d="m0 0 10 1 5 5v8l-4 13-12 33 16 2 9 2 4 5v8l-5 8-10 1h-25l-20 50-16 41-11 29-3 12v8l6 7h12l11-7 10-12 13-22 12-21 2-2h9l5 4v10l-8 16-10 19-12 16-8 9-14 9-9 3h-12l-16-6-10-10-4-8-9 5-11 9-21 10-19 4-16-1-18-6-10-8-7-8-5-11-1-3-2-1-1 5-4 6-9 10-10 7-9 5-4 1h-14l-15-6-10-7-5 1-24 12-4 1h-18l-11-6-10-10-6-13-4-19v-13l2-14 6-22 9-20 10-18 15-16 18-10 5-2h21l15 6 10 5 5 1 6-9 4-3h8l6 5 2 3-1 9-9 25-21 53-8 22-1 4v13l3 5 3 1h10l11-6 9-10 14-24 7-16 9-26 10-20 10-13 8-9 11-8 17-8h20l13 5 11 10 6 12 1 4v15l-5 12-9 11-6 4-5-1-6-4-3-3v-7l4-8 4-6 1-12-4-5-5-2h-13l-8 4-9 7-6 7-8 13-8 17-6 26v20l4 12 6 7 10 4 5 1h12l13-3 19-10 12-11 10-11 8-14 10-23 19-49 8-22v-5l-17-3-5-6v-10l6-6 4-1 27-1 1-5 14-35 8-18z"
        fill="#FEA44A"
      />
      <path
        transform="translate(294,33)"
        d="m0 0h57l17 2 21 5 35 12 31 15 21 13 14 11 7 6-3 1-24-16h-4l16 12 13 11 9 10 7 7 11 14 13 17 2 5h-2l-18-22-12-14-12-12-15-11-10-6v-3l-6-1-3-3v-3l-5-2-12-6-50-16-18-4-20-3h-15l27 3 21 5 31 11 18 8 19 11 19 14 10 8 11 10 2 4 6 4 15 16 2 5h-6l2 6 12 20 6 12 8 17 8 22 1 4v7l-3-4-13-32-13-27v-2h-4l1 5-4-2-9-10-9-11-14-15-7-7-13-10-26-16-16-9-30-11-19-5-19-3-10-1h-39l-35 6-17 5-16 7-20 10-16 10-11 8-10 8-10 9-5 5-11 12-18 27-11 21-12 33-4 17-2 15-1 19v26l4 27 2 10 1 14 7 21 1 10v13l-1 4h-2l-8-16-13-27-9-27-3-12-3-4-2-15-1-15-2-1 4 38 6 29 7 20 5 11v6h3l2 11 12 22 12 18 5 8 11 8 7 7 3 6 7 4 3 5 16 12 26 14 19 10 25 10 50 10h52l34-6 31-9 26-12 14-8 10-6 9-6 6-5 5-5 5-1 1-4 8-7 3-1 4-6 6-4 4-6 10-12 9-13 10-17 4-6h1v7l-11 23-14 21-11 12-13 12-8 7-10 9-5 6h-5l-6 5-2 1-2 5-23 12-23 11-16 6-17 5-22 4-25 2h-31l-34-6-30-8-26-9-20-10-20-13-14-11-13-11-8-7-24-24-12-16-9-13-14-26-10-25-8-29-4-25-1-8v-29l2-27 6-31 4-15 10-27 13-27 18-27 13-16 14-15 10-9 17-13 15-11 19-11 19-10 25-9 36-9z"
        fill="#6F6F71"
      />
      <path
        transform="translate(1484,82)"
        d="m0 0h30l30 5 27 8 31 12 40 17 39 14 30 7h17l15-4 15-6 8 1 5 5 2 3v6l-7 8-12 6-13 4-9 2h-30l-26-7-31-11-44-18-29-12-25-7-25-5h-34l-20 4-23 11-11 9-11 12-9 16-9 19-6 15-4 5h-8l-5-2-5-5 1-12 8-24 9-19 10-13 9-11 7-7 15-10 14-7 18-6z"
        fill="#FEA44A"
      />
      <path
        transform="translate(745,82)"
        d="m0 0h24l30 5 25 7 31 12 30 13 37 14 30 9 14 3h17l27-9 2-1h9l5 4 2 3v10l-8 7-8 4-15 5-10 2h-29l-30-8-40-15-48-20-19-7-27-7-16-3h-34l-24 5-12 5-18 13-9 10-9 14-11 23-6 15-5 6h-9l-6-4-2-2v-12l8-24 11-21 10-14 9-10 7-7 23-14 24-8z"
        fill="#FEA44A"
      />
      <path
        transform="translate(1586,145)"
        d="m0 0 8 1 7 7v14l-6 29-7 25-9 26-13 32-15 33-10 20-10 18-15 25-12 17-8 10-11 13-6 7-17 13-16 10-14 6-17 5-20 4h-31l-9-3-4-6v-9l2-4 8-4h29l19-3 15-5 21-11 14-11 12-11 13-17 14-22 10-17 17-33 12-25 13-31 14-41 7-26 7-32z"
        fill="#FEA44A"
      />
      <path
        transform="translate(841,145)"
        d="m0 0 9 1 7 7v11l-7 34-9 31-9 24-11 27-13 29-13 26-21 36-8 12-16 21-12 13-10 10-12 9-15 9-19 8-25 6-6 1h-31l-10-4-3-3v-12l6-5 7-2h27l22-4 21-9 12-7 11-9 10-9 9-10 12-17 10-16 13-22 19-37 13-30 14-37 9-28 7-29 4-19 5-5z"
        fill="#FEA44A"
      />
      <path
        transform="translate(1077,273)"
        d="m0 0h11l8 4 4 5 1 3v24l-5 21-11 26-9 14-11 13-10 7-3 1h-12l-8-4-6-7-2-4v-20l7-23 13-27 12-17 7-8 11-7z"
        fill="#FEFEFE"
      />
      <path
        transform="translate(913,273)"
        d="m0 0h14l5 3 5 4 3 6v23l-5 20-8 20-11 20-10 10-4 5-9 6-3 1h-9l-9-8-4-12-1-17 6-25 8-20 10-18 13-13z"
        fill="#FEFEFE"
      />
      <path
        transform="translate(1657,273)"
        d="m0 0h14l8 4 4 6 1 3v26l-6 22-11 24-9 14-12 13-8 5-12 1-7-5-6-12-1-6v-14l3-16 5-16 7-16 10-16 10-11z"
        fill="#FEFEFE"
      />
      <path
        transform="translate(161,458)"
        d="m0 0 5 1 10 9 2 1 1 3 13 8 12 7 15 10 15 8 24 8 2 2 29 6 62 5h9l31-6 20-6 18-8 21-11 15-10 22-18h20l-2 6-10 9-8 7-4 4-10 5-11 10-28 15-23 10-13 4-35 7-19 2h-38l-28-4-21-5-9-3 2-2 14 2 23 4 15 1h55l26-5 28-7 13-5 19-9 30-20 7-8 1-3-13 9-13 8-19 11-27 11-22 7-34 7-37 1-2-1v-2l12-1-1-2h-17v2l3 1v2h-12l-44-8-2-1-1-3-35-11-18-10-11-8-14-11-10-8-10-9v-3z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1306,272)"
        d="m0 0h11l8 5 4 7v9l-4 8-8 9-10 6-12 5-8 2h-13l-4-4-1-7 7-14 9-11 9-8 9-6z"
        fill="#FEFEFE"
      />
      <path
        transform="translate(1361,514)"
        d="m0 0h13l8 7 4 8v24l-5 8-6 6-3 1h-11l-6-4-4-5-4-8v-20l4-8 5-5z"
        fill="#FEFEFE"
      />
      <path
        transform="translate(849,510)"
        d="m0 0h30l6 4 4 6v15l-8 7-4 3 10 18 3 5v4l-6-1-15-24-12-1-1 25-1 1h-6z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1061,510)"
        d="m0 0h26l9 4 4 5 1 3v12l-6 7-7 3 2 5 12 21v2l-5-1-6-5-10-16-1-5h-13v26l-1 1h-5z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1604,509)"
        d="m0 0 7 1 15 43 6 16v3h-6l-2-1-6-17h-24l-3 12-2 5-7 1 3-12 16-46z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1262,510)"
        d="m0 0h7l10 16 12 23 5 9v2h2v-39l1-11h7v37l-1 25-7-1-6-8-16-29-6-10v-2h-2v49h-7v-52z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1447,509)"
        d="m0 0 4 1 1 5 1 56-1 1h-5l-7-7-15-27-9-15-1 48h-8l1-54 1-7h6l6 7 12 23 12 20 2 1z"
        fill="#6F6F72"
      />
      <path transform="translate(1759,538)" d="m0 0h179v5l-1 1h-178z" fill="#6F6F72" />
      <path transform="translate(646,538)" d="m0 0h180v5l-1 1h-177z" fill="#6F6F72" />
      <path
        transform="translate(1358,509)"
        d="m0 0h16l8 4 7 8 4 10v19l-4 10-4 6-9 6h-19l-9-6-6-10-1-3v-23l5-11 7-7zm3 5-8 6-5 8-1 3v20l6 11 6 5 2 1h11l5-3 7-8 2-4v-24l-5-9-7-6z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1009,510)"
        d="m0 0h35v5l-11 1h-17v19h11l13 1v5h-24l1 11v14l27 1 2 1v3l-7 1h-29l-1-13z"
        fill="#6F6F72"
      />
      <path
        transform="translate(968,509)"
        d="m0 0h12l9 4 3 6-9-2-2-1h-12l-4 3-1 7 1 4 23 12 6 7 1 10-3 6-7 6-8 2h-8l-9-3-7-7v-2l9 2 4 2h16l4-4v-9l-4-4-22-12-4-5v-11l6-8z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1166,510)"
        d="m0 0h35l-2 5h-27l1 21h23v5l-6 1h-17l-1 25h29v4h-36v-60z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1108,509)"
        d="m0 0 6 1 3 8 11 36 2 9h2l2-10 13-41 1-2h5l-2 11-8 27-7 22-2 2h-7l-4-9-11-34-4-14z"
        fill="#6F6F72"
      />
      <path
        transform="translate(907,510)"
        d="m0 0h34l-1 5h-19l-8-1v22h24v5h-24l1 25 27 1 3 2-1 2-8 1h-28l-1-18v-24z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1472,510)"
        d="m0 0h34v4l-28 2v21l25-1v5l-6 1h-18l-1 25 28-1v5h-35v-60z"
        fill="#6F6F72"
      />
      <path
        transform="translate(1659,509)"
        d="m0 0h10l11 3 1 2v6l-10-4h-12l-6 4-5 8-1 3v18l4 10 6 6h16l10-4-1 5-6 5-8 2h-7l-9-3-8-8-5-10v-20l5-13 9-8z"
        fill="#6F6F72"
      />
      <path
        transform="translate(308,57)"
        d="m0 0h36l35 4 14 3 22 8 21 10v4l-5-1-31-12-28-8-15-1-55-1 1-5z"
        fill="#FEFEFE"
      />
      <path transform="translate(857,515)" d="m0 0h21l6 6v12l-8 6-2 1h-18l-1-2v-16z" fill="#FEFEFE" />
      <path transform="translate(1689,510)" d="m0 0h46l-1 5-18 1v56l-3 1-5-1v-57h-18z" fill="#6F6F72" />
      <path transform="translate(1067,515)" d="m0 0h20l6 3 2 4v10l-8 7-5 1h-15z" fill="#FEFEFE" />
      <path
        transform="translate(1535,510)"
        d="m0 0h46l1 4-9 2h-10l-1 45-1 11h-6v-57h-17l-3-2z"
        fill="#6F6F72"
      />
      <path transform="translate(1606,514)" d="m0 0 3 3 9 27-1 5h-13l-8-1 1-8 7-23z" fill="#FEFEFE" />
      <path transform="translate(1236,510)" d="m0 0h7v61h-7z" fill="#6F6F72" />
      <path
        transform="translate(226,506)"
        d="m0 0 9 2 10 5 15 4 19 4 16 5 1 2h-13l-16-3-18-5-16-7-7-4z"
        fill="#FEFEFE"
      />
      <path transform="translate(347,152)" d="m0 0h8l3 9v7l-1 2h-12l-2-2v-9l3-6z" fill="#FEA44A" />
      <path transform="translate(291,61)" d="m0 0h6l1 2-7 3-11 1 1-4z" fill="#FEFEFE" />
    </svg>
  );
};

export default Logo;
