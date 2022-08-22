import Icon from '@ant-design/icons';

const SortSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.66699 4.00046C1.66699 3.8237 1.73759 3.65418 1.86325 3.52919C1.9889 3.4042 2.15933 3.33398 2.33704 3.33398H11.211C11.3887 3.33398 11.5591 3.4042 11.6848 3.52919C11.8104 3.65418 11.881 3.8237 11.881 4.00046C11.881 4.17722 11.8104 4.34674 11.6848 4.47173C11.5591 4.59671 11.3887 4.66693 11.211 4.66693H2.33704C2.15933 4.66693 1.9889 4.59671 1.86325 4.47173C1.73759 4.34674 1.66699 4.17722 1.66699 4.00046ZM9.87087 7.33282H2.33704C2.15933 7.33282 1.9889 7.40304 1.86325 7.52803C1.73759 7.65302 1.66699 7.82254 1.66699 7.9993C1.66699 8.17606 1.73759 8.34558 1.86325 8.47057C1.9889 8.59555 2.15933 8.66577 2.33704 8.66577H9.87087C10.0486 8.66577 10.219 8.59555 10.3447 8.47057C10.4703 8.34558 10.5409 8.17606 10.5409 7.9993C10.5409 7.82254 10.4703 7.65302 10.3447 7.52803C10.219 7.40304 10.0486 7.33282 9.87087 7.33282ZM8.53077 11.3317H2.33704C2.15933 11.3317 1.9889 11.4019 1.86325 11.5269C1.73759 11.6519 1.66699 11.8214 1.66699 11.9981C1.66699 12.1749 1.73759 12.3444 1.86325 12.4694C1.9889 12.5944 2.15933 12.6646 2.33704 12.6646H8.53077C8.70848 12.6646 8.87891 12.5944 9.00456 12.4694C9.13022 12.3444 9.20082 12.1749 9.20082 11.9981C9.20082 11.8214 9.13022 11.6519 9.00456 11.5269C8.87891 11.4019 8.70848 11.3317 8.53077 11.3317ZM7.19067 15.3305H2.33704C2.15933 15.3305 1.9889 15.4007 1.86325 15.5257C1.73759 15.6507 1.66699 15.8202 1.66699 15.997C1.66699 16.1737 1.73759 16.3433 1.86325 16.4682C1.9889 16.5932 2.15933 16.6635 2.33704 16.6635H7.19067C7.36838 16.6635 7.53881 16.5932 7.66447 16.4682C7.79012 16.3433 7.86072 16.1737 7.86072 15.997C7.86072 15.8202 7.79012 15.6507 7.66447 15.5257C7.53881 15.4007 7.36838 15.3305 7.19067 15.3305ZM18.1355 13.5244C18.0732 13.4619 17.9991 13.4123 17.9174 13.3785C17.8358 13.3446 17.7482 13.3272 17.6597 13.3272C17.5713 13.3272 17.4837 13.3446 17.402 13.3785C17.3204 13.4123 17.2463 13.4619 17.184 13.5244L16.3196 14.3908V4.00046C16.3196 3.8237 16.249 3.65418 16.1234 3.52919C15.9977 3.4042 15.8273 3.33398 15.6496 3.33398C15.4719 3.33398 15.3014 3.4042 15.1758 3.52919C15.0501 3.65418 14.9795 3.8237 14.9795 4.00046V14.3908L14.1152 13.5244C14.0527 13.4622 13.9785 13.4129 13.8969 13.3793C13.8153 13.3457 13.7278 13.3284 13.6394 13.3284C13.5511 13.3284 13.4636 13.3457 13.382 13.3793C13.3003 13.4129 13.2262 13.4622 13.1637 13.5244C13.1012 13.5865 13.0517 13.6603 13.0179 13.7415C12.984 13.8227 12.9666 13.9097 12.9666 13.9976C12.9666 14.0854 12.984 14.1725 13.0179 14.2537C13.0517 14.3348 13.1012 14.4086 13.1637 14.4708L15.1738 16.4702C15.2361 16.5326 15.3102 16.5822 15.3919 16.6161C15.4735 16.6499 15.5611 16.6673 15.6496 16.6673C15.738 16.6673 15.8256 16.6499 15.9073 16.6161C15.9889 16.5822 16.063 16.5326 16.1253 16.4702L18.1355 14.4708C18.1983 14.4088 18.2481 14.3351 18.2821 14.2539C18.3161 14.1727 18.3337 14.0855 18.3337 13.9976C18.3337 13.9096 18.3161 13.8225 18.2821 13.7412C18.2481 13.66 18.1983 13.5863 18.1355 13.5244Z"
      fill="#4367C7"
    />
  </svg>
);

export type StyleProps = {
  style?: React.CSSProperties;
};

const SortIcon: React.FC<StyleProps> = (props) => <Icon component={SortSvg} {...props} />;

export default SortIcon;