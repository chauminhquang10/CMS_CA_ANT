import Icon from '@ant-design/icons';

const FileExcelSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.7 2C4.25817 2 3.9 2.35817 3.9 2.8V21.2C3.9 21.6418 4.25817 22 4.7 22H19.3C19.7418 22 20.1 21.6418 20.1 21.2V7L15.1 2H4.7Z"
      fill="#21D17C"
    />
    <path
      d="M9.75505 17L11.9944 13.7857L14.2454 17H15.3125L12.5122 13.103L15.1109 9.5H14.0438L11.9944 12.4201L9.95505 9.5H8.8883L11.4662 13.103L8.68755 17H9.75505Z"
      fill="white"
    />
    <path
      d="M19.6309 6.53125L15.5687 6.53125L20.1 11.0625L20.1 7L19.6309 6.53125Z"
      fill="url(#paint0_linear_1556_123115)"
    />
    <path d="M15.9 7L20.1 7L15.1 2L15.1 6.2C15.1 6.64183 15.4582 7 15.9 7Z" fill="#9BF1BD" />
    <defs>
      <linearGradient
        id="paint0_linear_1556_123115"
        x1="16.5844"
        y1="5.51563"
        x2="21.1156"
        y2="10.0469"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity="0.2" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const FileExcelIcon: React.FC<StyleProps> = (props) => <Icon component={FileExcelSvg} {...props} />;

export default FileExcelIcon;
