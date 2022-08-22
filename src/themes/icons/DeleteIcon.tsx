import Icon from '@ant-design/icons';

const DeleteSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.375 10.4766C10.7537 10.4766 11.0607 10.7865 11.0607 11.1689V16.1535C11.0607 16.5358 10.7537 16.8458 10.375 16.8458C9.99629 16.8458 9.68929 16.5358 9.68929 16.1535V11.1689C9.68929 10.7865 9.99629 10.4766 10.375 10.4766Z"
      fill="#99A2BC"
    />
    <path
      d="M14.3107 11.1689C14.3107 10.7865 14.0037 10.4766 13.625 10.4766C13.2463 10.4766 12.9393 10.7865 12.9393 11.1689V16.1535C12.9393 16.5358 13.2463 16.8458 13.625 16.8458C14.0037 16.8458 14.3107 16.5358 14.3107 16.1535V11.1689Z"
      fill="#99A2BC"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.9361 5.35385V6.32308H17.6885C17.6977 6.32308 17.7068 6.32326 17.7159 6.32362H19.3143C19.693 6.32362 20 6.63357 20 7.01593C20 7.39828 19.693 7.70823 19.3143 7.70823H18.3742V18.6462C18.3742 19.2677 18.1328 19.8654 17.7003 20.3075C17.2676 20.7499 16.6788 21 16.0631 21H7.93611C7.3204 21 6.73165 20.7499 6.29891 20.3075C5.86645 19.8654 5.625 19.2677 5.625 18.6462V7.70823H4.68571C4.307 7.70823 4 7.39828 4 7.01593C4 6.63357 4.307 6.32362 4.68571 6.32362H6.28336C6.29243 6.32326 6.30155 6.32308 6.31071 6.32308H8.0631V5.35385C8.0631 4.73232 8.30454 4.13455 8.737 3.69248C9.16974 3.25011 9.75849 3 10.3742 3H13.625C14.2407 3 14.8295 3.25011 15.2622 3.69248C15.6947 4.13455 15.9361 4.73232 15.9361 5.35385ZM9.71275 4.66545C9.88965 4.48461 10.1278 4.38462 10.3742 4.38462H13.625C13.8715 4.38462 14.1096 4.48461 14.2865 4.66545C14.4636 4.84657 14.5647 5.09403 14.5647 5.35385V6.32308H9.43452V5.35385C9.43452 5.09403 9.53557 4.84657 9.71275 4.66545ZM6.99643 7.70823V18.6462C6.99643 18.906 7.09747 19.1534 7.27466 19.3346C7.45156 19.5154 7.68966 19.6154 7.93611 19.6154H16.0631C16.3095 19.6154 16.5476 19.5154 16.7245 19.3346C16.9017 19.1534 17.0028 18.906 17.0028 18.6462V7.70823H6.99643Z"
      fill="#99A2BC"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const DeleteIcon: React.FC<StyleProps> = (props) => <Icon component={DeleteSvg} {...props} />;

export default DeleteIcon;