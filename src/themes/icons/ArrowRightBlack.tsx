import Icon from '@ant-design/icons';

const ArrowRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.14645 4.64645C6.34171 4.45118 6.65829 4.45118 6.85355 4.64645L9.85355 7.64645C10.0488 7.84171 10.0488 8.15829 9.85355 8.35355L6.85355 11.3536C6.65829 11.5488 6.34171 11.5488 6.14645 11.3536C5.95118 11.1583 5.95118 10.8417 6.14645 10.6464L8.79289 8L6.14645 5.35355C5.95118 5.15829 5.95118 4.84171 6.14645 4.64645Z"
      fill="#212633"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ArrowRightBlackIcon: React.FC<StyleProps> = (props) => (
  <Icon component={ArrowRightSvg} {...props} />
);

export default ArrowRightBlackIcon;
