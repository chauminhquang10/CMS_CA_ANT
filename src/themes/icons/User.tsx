import Icon from '@ant-design/icons';

const UserSvg = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4.5C9.79086 4.5 8 6.29086 8 8.5C8 10.7091 9.79086 12.5 12 12.5C14.2091 12.5 16 10.7091 16 8.5C16 6.29086 14.2091 4.5 12 4.5ZM6 8.5C6 5.18629 8.68629 2.5 12 2.5C15.3137 2.5 18 5.18629 18 8.5C18 11.8137 15.3137 14.5 12 14.5C8.68629 14.5 6 11.8137 6 8.5ZM8 18.5C6.34315 18.5 5 19.8431 5 21.5C5 22.0523 4.55228 22.5 4 22.5C3.44772 22.5 3 22.0523 3 21.5C3 18.7386 5.23858 16.5 8 16.5H16C18.7614 16.5 21 18.7386 21 21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5C19 19.8431 17.6569 18.5 16 18.5H8Z"
      fill="#99A2BC"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const UserIcon: React.FC<StyleProps> = (props) => <Icon component={UserSvg} {...props} />;

export default UserIcon;
