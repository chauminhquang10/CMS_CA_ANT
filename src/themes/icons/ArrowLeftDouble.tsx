import Icon from '@ant-design/icons';

const ArrowRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.8536 11.3536C11.6583 11.5488 11.3417 11.5488 11.1464 11.3536L8.14645 8.35355C7.95118 8.15829 7.95118 7.84171 8.14645 7.64645L11.1464 4.64645C11.3417 4.45118 11.6583 4.45118 11.8536 4.64645C12.0488 4.84171 12.0488 5.15829 11.8536 5.35355L9.20711 8L11.8536 10.6464C12.0488 10.8417 12.0488 11.1583 11.8536 11.3536Z"
      fill="#212633"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.85355 11.3536C7.65829 11.5488 7.34171 11.5488 7.14645 11.3536L4.14645 8.35355C3.95118 8.15829 3.95118 7.84171 4.14645 7.64645L7.14645 4.64645C7.34171 4.45118 7.65829 4.45118 7.85355 4.64645C8.04882 4.84171 8.04882 5.15829 7.85355 5.35355L5.20711 8L7.85355 10.6464C8.04882 10.8417 8.04882 11.1583 7.85355 11.3536Z"
      fill="#212633"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ArrowRightDoubleIcon: React.FC<StyleProps> = (props) => (
  <Icon component={ArrowRightSvg} {...props} />
);

export default ArrowRightDoubleIcon;
