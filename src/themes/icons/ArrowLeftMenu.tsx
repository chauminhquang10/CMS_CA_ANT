import Icon from '@ant-design/icons';

const AddWhiteSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
      fill="#F3F8FF"
    />
    <path
      d="M14.7803 7.20921C14.4874 6.93026 14.0126 6.93026 13.7197 7.20921L9.21967 11.4949C8.92678 11.7739 8.92678 12.2261 9.21967 12.5051L13.7197 16.7908C14.0126 17.0697 14.4874 17.0697 14.7803 16.7908C15.0732 16.5118 15.0732 16.0596 14.7803 15.7806L10.8107 12L14.7803 8.21936C15.0732 7.94042 15.0732 7.48816 14.7803 7.20921Z"
      fill="#0979FD"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ArrowLeftMenu: React.FC<StyleProps> = (props) => <Icon component={AddWhiteSvg} {...props} />;

export default ArrowLeftMenu;
