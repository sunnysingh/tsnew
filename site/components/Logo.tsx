export function Logo(props: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 250"
      width={props.size}
      height={props.size / 2}
      fill="none"
      aria-labelledby="logoTitle logoDesc"
      role="img"
    >
      <title id="logoTitle">tsnew</title>
      <desc id="logoDesc">
        Logo with the text tsnew on a blueish green rectangle.
      </desc>
      <path fill="#074947" d="M0 0h500v250H0z" />
      <path
        fill="#A7DEFF"
        d="M77.32 167.16V96H52V83.16h64.56V96h-25.2v71.16H77.32ZM158.653 168.84c-7.04 0-13.52-1.48-19.44-4.44-5.84-2.96-10.52-7.96-14.04-15l11.64-6.6c2.4 4 5.32 7.16 8.76 9.48 3.44 2.24 7.96 3.36 13.56 3.36 5.6 0 9.52-1 11.76-3 2.32-2.08 3.48-4.88 3.48-8.4 0-2.24-.52-4.16-1.56-5.76-.96-1.6-3.04-3.08-6.24-4.44-3.12-1.44-7.96-2.88-14.52-4.32-7.76-1.84-13.52-4.76-17.28-8.76-3.68-4-5.52-9.08-5.52-15.24 0-4.88 1.16-9.16 3.48-12.84 2.4-3.76 5.72-6.68 9.96-8.76 4.32-2.08 9.36-3.12 15.12-3.12 7.6 0 14 1.68 19.2 5.04 5.2 3.28 9.16 7.16 11.88 11.64l-10.92 8.4c-1.36-1.92-2.96-3.76-4.8-5.52-1.84-1.84-4-3.32-6.48-4.44-2.48-1.2-5.48-1.8-9-1.8-4.16 0-7.56.92-10.2 2.76-2.56 1.76-3.84 4.44-3.84 8.04 0 1.6.36 3.16 1.08 4.68.8 1.44 2.48 2.84 5.04 4.2 2.64 1.36 6.68 2.68 12.12 3.96 9.6 2.16 16.52 5.4 20.76 9.72 4.24 4.32 6.36 9.76 6.36 16.32 0 8-2.8 14.16-8.4 18.48-5.52 4.24-12.84 6.36-21.96 6.36Z"
      />
      <path
        fill="#fff"
        d="M203.176 167.16v-84h13.8l39.6 59.64V83.16h14.04v84h-13.32l-40.32-61.32v61.32h-13.8ZM287.551 167.16v-84h56.16V96h-42.36v21.84h38.64v12.96h-38.64v23.52h43.68v12.84h-57.48ZM370.343 167.16l-18.6-84h14.28l11.88 58.92 15.24-58.92h12.36l15.24 58.92 11.88-58.92h14.4l-18.72 84h-12.72l-16.32-62.04-16.2 62.04h-12.72Z"
      />
    </svg>
  );
}