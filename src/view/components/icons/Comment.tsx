interface Props {}

function Comment({}: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <path
        d="M13.5 3H8.5C4.36 3 1 6.36 1 10.5C1 13.76 3.09 16.53 6 17.56V23L11 18H13.5C17.64 18 21 14.64 21 10.5"
        stroke="#5899E0"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.99 13H17"
        stroke="#5899E0"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.99 13H14"
        stroke="#5899E0"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5563 1.3283L11.0632 9.82141L10.0005 13.001L13.1801 11.9383L21.6732 3.44516C22.0588 3.05949 22.1103 2.46815 21.776 2.13391L20.8676 1.22546C20.5333 0.891221 19.942 0.934072 19.5563 1.3283Z"
        stroke="#5899E0"
        strokeWidth="0.857025"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Comment;
