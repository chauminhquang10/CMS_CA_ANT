import Icon from '@ant-design/icons';

const ArrowLeftSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.85355 11.3536C9.65829 11.5488 9.34171 11.5488 9.14645 11.3536L6.14645 8.35355C5.95118 8.15829 5.95118 7.84171 6.14645 7.64645L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L7.20711 8L9.85355 10.6464C10.0488 10.8417 10.0488 11.1583 9.85355 11.3536Z"
      fill="#212633"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ArrowLeftBlackIcon: React.FC<StyleProps> = (props) => (
  <Icon component={ArrowLeftSvg} {...props} />
);

export default ArrowLeftBlackIcon;
