/**
 *
 * @param {Object} props - Properties for rendering component
 * @param {string} props.width - Size of component
 *
 * @returns {JSX.Element} Elemento | Estructura HTML
 */

const SettingsIcon = ({ width, color }: { width: string; color?: string }): JSX.Element => {
  return (
    <>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: `${width}rem`, color: `${color}`, height: `auto` }}
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
          <path
            d="M2047 5109 c-124 -30 -241 -134 -282 -250 -9 -23 -28 -119 -44 -214
-39 -230 -74 -296 -189 -352 -46 -22 -69 -27 -127 -27 -61 1 -90 9 -235 65
-164 63 -165 63 -270 64 -97 0 -110 -2 -170 -31 -36 -17 -85 -51 -110 -77 -53
-54 -493 -807 -523 -897 -26 -76 -19 -197 15 -272 37 -78 73 -118 215 -234 70
-58 138 -119 151 -134 86 -109 88 -268 3 -376 -11 -14 -80 -75 -153 -136 -145
-119 -177 -155 -215 -236 -35 -75 -42 -196 -17 -272 11 -30 122 -234 249 -453
250 -434 275 -468 385 -521 60 -29 73 -31 170 -31 105 1 106 1 270 64 145 56
174 64 235 65 117 1 211 -58 266 -166 13 -25 32 -108 50 -213 32 -193 45 -236
88 -299 42 -61 95 -104 171 -140 l65 -31 484 -3 c306 -2 502 1 533 7 121 26
218 102 273 214 28 59 40 104 64 248 32 196 54 254 117 309 60 52 118 74 199
73 62 0 90 -8 235 -64 164 -63 165 -63 270 -64 97 0 110 2 170 31 109 53 135
88 383 516 124 216 234 411 244 433 13 29 17 67 18 140 0 87 -3 107 -26 155
-39 81 -72 118 -220 240 -143 119 -180 164 -204 243 -19 63 -19 91 0 154 24
80 63 127 204 243 146 120 181 159 220 240 23 48 26 68 26 155 -1 73 -5 111
-18 140 -10 22 -120 217 -244 433 -248 428 -274 463 -383 516 -60 29 -73 31
-170 31 -105 -1 -106 -1 -270 -64 -145 -56 -174 -64 -235 -65 -117 -1 -211 58
-266 166 -12 24 -32 108 -50 211 -15 94 -36 192 -46 219 -34 96 -129 191 -230
233 -45 19 -76 20 -543 22 -272 1 -512 -3 -533 -8z m933 -391 c0 -2 13 -80 30
-175 43 -248 92 -356 219 -479 141 -138 346 -214 531 -199 97 8 124 15 308 82
84 31 154 54 155 52 2 -2 97 -166 211 -363 165 -287 204 -362 194 -371 -7 -6
-64 -53 -125 -104 -144 -118 -202 -184 -252 -285 -56 -111 -74 -189 -74 -316
0 -127 18 -205 74 -316 50 -101 108 -167 252 -285 61 -51 118 -98 125 -104 10
-9 -30 -85 -194 -371 -114 -197 -209 -361 -211 -363 -1 -2 -71 21 -155 52
-184 67 -211 74 -308 82 -185 15 -391 -62 -532 -198 -125 -123 -176 -233 -218
-480 -17 -95 -30 -173 -30 -174 0 -2 -189 -3 -420 -3 -231 0 -420 1 -420 3 0
1 -13 79 -30 174 -42 247 -91 353 -217 478 -140 138 -347 215 -533 200 -97 -8
-124 -15 -308 -82 -84 -31 -154 -54 -155 -52 -31 39 -415 724 -410 729 4 4 62
52 128 107 140 116 193 173 243 263 60 107 84 206 84 340 0 134 -24 233 -84
340 -50 90 -103 147 -243 263 -66 55 -124 103 -128 107 -5 5 379 690 410 729
1 2 71 -21 155 -52 207 -76 227 -80 348 -81 125 0 202 18 315 74 91 45 160 98
227 177 91 108 134 216 168 423 11 69 23 137 26 153 l6 27 419 0 c230 0 419
-1 419 -2z"
          />
          <path
            d="M2435 3539 c-140 -18 -304 -81 -434 -167 -73 -48 -206 -182 -256
-257 -228 -346 -228 -764 0 -1110 50 -75 183 -209 256 -257 381 -251 848 -229
1191 56 301 249 427 671 311 1041 -111 356 -403 618 -761 685 -82 15 -230 20
-307 9z m300 -420 c175 -54 329 -209 387 -389 29 -91 29 -249 0 -340 -59 -182
-210 -333 -392 -391 -92 -30 -240 -30 -335 -1 -185 57 -338 208 -397 392 -29
91 -29 249 1 340 69 217 269 385 491 413 59 8 182 -4 245 -24z"
          />
        </g>
      </svg>
    </>
  );
};

export default SettingsIcon;