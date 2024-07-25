interface Props {
  color: string;
}

const ThumbsDownIcon = ({ color }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 6.9981C17.33 6.9981 18 6.32831 18 5.49857C18 4.66884 17.33 3.99905 16.5 3.99905H14H16C16.83 3.99905 17.5 3.32926 17.5 2.49952C17.5 1.66979 16.83 1 16 1H15H7C3.69 1 1 3.69915 1 7.01809C1 9.7172 2.77 12.0065 5.22 12.7663C6.45 13.1561 7.37 14.1958 7.77 15.4354L8.69 18.2645C8.85 18.9143 9.51 19.0843 10.17 18.9643C11.22 18.7844 12.11 17.4348 12.11 14.9956L12 12.9962H17.5C18.33 12.9962 19 12.3264 19 11.4967C19 10.6669 18.33 9.9971 17.5 9.9971H15H17C17.83 9.9971 18.5 9.3274 18.5 8.4976C18.5 7.66789 17.83 6.9981 17 6.9981H14.5"
        stroke={ color }
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ThumbsDownIcon;
