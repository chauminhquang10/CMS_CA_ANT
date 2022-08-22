import Icon from '@ant-design/icons';

const DeleteIconTicketDetailSvg = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.375 7.47656C6.75371 7.47656 7.06071 7.78652 7.06071 8.16887V13.1535C7.06071 13.5358 6.75371 13.8458 6.375 13.8458C5.99629 13.8458 5.68929 13.5358 5.68929 13.1535V8.16887C5.68929 7.78652 5.99629 7.47656 6.375 7.47656Z"
      fill="#4367C7"
    />
    <path
      d="M10.3107 8.16887C10.3107 7.78652 10.0037 7.47656 9.625 7.47656C9.24629 7.47656 8.93929 7.78652 8.93929 8.16887V13.1535C8.93929 13.5358 9.24629 13.8458 9.625 13.8458C10.0037 13.8458 10.3107 13.5358 10.3107 13.1535V8.16887Z"
      fill="#4367C7"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9361 2.35385V3.32308H13.6885C13.6977 3.32308 13.7068 3.32326 13.7159 3.32362H15.3143C15.693 3.32362 16 3.63357 16 4.01593C16 4.39828 15.693 4.70823 15.3143 4.70823H14.3742V15.6462C14.3742 16.2677 14.1328 16.8654 13.7003 17.3075C13.2676 17.7499 12.6788 18 12.0631 18H3.93611C3.3204 18 2.73165 17.7499 2.29891 17.3075C1.86645 16.8654 1.625 16.2677 1.625 15.6462V4.70823H0.685714C0.307005 4.70823 0 4.39828 0 4.01593C0 3.63357 0.307005 3.32362 0.685714 3.32362H2.28336C2.29243 3.32326 2.30155 3.32308 2.31071 3.32308H4.0631V2.35385C4.0631 1.73232 4.30454 1.13455 4.737 0.692475C5.16974 0.25011 5.75849 0 6.37421 0H9.625C10.2407 0 10.8295 0.25011 11.2622 0.692475C11.6947 1.13455 11.9361 1.73232 11.9361 2.35385ZM5.71275 1.66545C5.88965 1.48461 6.12776 1.38462 6.37421 1.38462H9.625C9.87145 1.38462 10.1096 1.48461 10.2865 1.66545C10.4636 1.84657 10.5647 2.09403 10.5647 2.35385V3.32308H5.43452V2.35385C5.43452 2.09403 5.53557 1.84657 5.71275 1.66545ZM2.99643 4.70823V15.6462C2.99643 15.906 3.09747 16.1534 3.27466 16.3346C3.45156 16.5154 3.68966 16.6154 3.93611 16.6154H12.0631C12.3095 16.6154 12.5476 16.5154 12.7245 16.3346C12.9017 16.1534 13.0028 15.906 13.0028 15.6462V4.70823H2.99643Z"
      fill="#4367C7"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const DeleteIconTicketDetail: React.FC<StyleProps> = (props) => (
  <Icon component={DeleteIconTicketDetailSvg} {...props} />
);

export default DeleteIconTicketDetail;
