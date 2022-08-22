import Icon from '@ant-design/icons';

const CheckCircleFillSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.00004" cy="7.99998" r="6.66667" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.00004 1.33331C4.31814 1.33331 1.33337 4.31808 1.33337 7.99998C1.33337 11.6819 4.31814 14.6666 8.00004 14.6666C11.6819 14.6666 14.6667 11.6819 14.6667 7.99998C14.6667 4.31808 11.6819 1.33331 8.00004 1.33331ZM12.091 6.42431C12.3254 6.19 12.3254 5.8101 12.091 5.57578C11.8567 5.34147 11.4768 5.34146 11.2425 5.57578L7.07706 9.74119L4.75771 7.42181C4.52339 7.1875 4.14349 7.18749 3.90918 7.42181C3.67486 7.65612 3.67486 8.03602 3.90917 8.27034L6.65279 11.014C6.8871 11.2483 7.267 11.2483 7.50132 11.014L12.091 6.42431Z"
      fill="#34C759"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const CheckCircleFillIcon: React.FC<StyleProps> = (props) => (
  <Icon component={CheckCircleFillSvg} {...props} />
);

export default CheckCircleFillIcon;
