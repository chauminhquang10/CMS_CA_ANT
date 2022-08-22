import Icon from '@ant-design/icons';

const ThreeDotSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.002 10C18.8954 10 18 10.8954 18 12.0004C18 13.0862 18.8666 13.9712 19.9484 14H20.0556C21.1358 13.9712 22.0024 13.0862 22.0024 12.0004C22.0024 10.8954 21.1062 10 20.002 10Z"
      fill="#212633"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0004 10C10.8946 10 10 10.8954 10 12.0004C10 13.0862 10.8658 13.9712 11.9468 14H12.054C13.135 13.9712 14.0008 13.0862 14.0008 12.0004C14.0008 10.8954 13.1062 10 12.0004 10Z"
      fill="#212633"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.0004 10C2.89538 10 2 10.8954 2 12.0004C2 13.0862 2.86657 13.9712 3.94679 14H4.05401C5.13583 13.9712 6.0032 13.0862 6.0032 12.0004C6.0032 10.8954 5.10622 10 4.0004 10Z"
      fill="#212633"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ThreeDotIcon: React.FC<StyleProps> = (props) => <Icon component={ThreeDotSvg} {...props} />;

export default ThreeDotIcon;
