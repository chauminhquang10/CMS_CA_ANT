import Icon from '@ant-design/icons';

const SearchSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1958 16.8928C13.9284 17.8156 12.3678 18.36 10.68 18.36C6.43846 18.36 3 14.9216 3 10.68C3 6.43846 6.43846 3 10.68 3C14.9216 3 18.36 6.43846 18.36 10.68C18.36 12.3678 17.8156 13.9284 16.8928 15.1958L20.6485 18.9515C21.1172 19.4201 21.1172 20.1799 20.6485 20.6485C20.1799 21.1172 19.4201 21.1172 18.9515 20.6485L15.1958 16.8928ZM16.92 10.68C16.92 14.1263 14.1263 16.92 10.68 16.92C7.23376 16.92 4.44 14.1263 4.44 10.68C4.44 7.23376 7.23376 4.44 10.68 4.44C14.1263 4.44 16.92 7.23376 16.92 10.68Z"
      fill="#0C3399"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const SearchIcon: React.FC<StyleProps> = (props) => <Icon component={SearchSvg} {...props} />;

export default SearchIcon;
