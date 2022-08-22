import Icon from '@ant-design/icons';

const CheckCircleSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.00001 1.33331C4.32001 1.33331 1.33334 4.31998 1.33334 7.99998C1.33334 11.68 4.32001 14.6666 8.00001 14.6666C11.68 14.6666 14.6667 11.68 14.6667 7.99998C14.6667 4.31998 11.68 1.33331 8.00001 1.33331ZM8.00001 13.3333C5.06001 13.3333 2.66668 10.94 2.66668 7.99998C2.66668 5.05998 5.06001 2.66665 8.00001 2.66665C10.94 2.66665 13.3333 5.05998 13.3333 7.99998C13.3333 10.94 10.94 13.3333 8.00001 13.3333ZM11.06 5.05331L6.66668 9.44665L4.94001 7.72665L4.00001 8.66665L6.66668 11.3333L12 5.99998L11.06 5.05331Z"
      fill="#34C759"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const CheckCircleIcon: React.FC<StyleProps> = (props) => (
  <Icon component={CheckCircleSvg} {...props} />
);

export default CheckCircleIcon;
