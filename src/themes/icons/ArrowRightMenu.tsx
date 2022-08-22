import Icon from '@ant-design/icons';

const AddWhiteSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
      fill="#F3F8FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.21967 7.20921C9.51256 6.93026 9.98744 6.93026 10.2803 7.20921L14.7803 11.4949C15.0732 11.7739 15.0732 12.2261 14.7803 12.5051L10.2803 16.7908C9.98744 17.0697 9.51256 17.0697 9.21967 16.7908C8.92678 16.5118 8.92678 16.0596 9.21967 15.7806L13.1893 12L9.21967 8.21936C8.92678 7.94042 8.92678 7.48816 9.21967 7.20921Z"
      fill="#0979FD"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ArrowLeffMenu: React.FC<StyleProps> = (props) => <Icon component={AddWhiteSvg} {...props} />;

export default ArrowLeffMenu;
