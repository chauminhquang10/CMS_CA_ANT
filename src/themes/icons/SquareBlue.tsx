import Icon from '@ant-design/icons';

const SquareBlueSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.3335 3.33331H16.6668V16.6666H3.3335V3.33331Z" fill="#4367C7" />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const SquareBlueIcon: React.FC<StyleProps> = (props) => (
  <Icon component={SquareBlueSvg} {...props} />
);

export default SquareBlueIcon;
