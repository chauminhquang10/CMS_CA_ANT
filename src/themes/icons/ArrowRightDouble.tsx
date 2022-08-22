import Icon from '@ant-design/icons';

const ArrowRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.14645 4.64645C4.34171 4.45118 4.65829 4.45118 4.85355 4.64645L7.85355 7.64645C8.04882 7.84171 8.04882 8.15829 7.85355 8.35355L4.85355 11.3536C4.65829 11.5488 4.34171 11.5488 4.14645 11.3536C3.95118 11.1583 3.95118 10.8417 4.14645 10.6464L6.79289 8L4.14645 5.35355C3.95118 5.15829 3.95118 4.84171 4.14645 4.64645Z"
      fill="#000000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.14645 4.64645C8.34171 4.45118 8.65829 4.45118 8.85355 4.64645L11.8536 7.64645C12.0488 7.84171 12.0488 8.15829 11.8536 8.35355L8.85355 11.3536C8.65829 11.5488 8.34171 11.5488 8.14645 11.3536C7.95118 11.1583 7.95118 10.8417 8.14645 10.6464L10.7929 8L8.14645 5.35355C7.95118 5.15829 7.95118 4.84171 8.14645 4.64645Z"
      fill="#000000"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ArrowLeftDoubleIcon: React.FC<StyleProps> = (props) => (
  <Icon component={ArrowRightSvg} {...props} />
);

export default ArrowLeftDoubleIcon;
