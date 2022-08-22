import Icon from '@ant-design/icons';

const ArrowRightSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 16.3622C9 16.6359 9.13012 16.9312 9.45514 16.9848C9.74521 17.0326 10.0593 16.9679 10.2845 16.7908L15.734 12.5051C16.0887 12.2261 16.0887 11.7739 15.734 11.4949L10.2845 7.20921C10.0593 7.0321 9.74521 6.96744 9.45514 7.01524C9.13012 7.06879 9 7.3641 9 7.63778L9 16.3622Z"
      fill="#76809B"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ArrowRightIcon: React.FC<StyleProps> = (props) => (
  <Icon component={ArrowRightSvg} {...props} />
);

export default ArrowRightIcon;
