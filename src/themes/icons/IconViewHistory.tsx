import Icon from '@ant-design/icons';

const IconViewHistorySvg = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 1.28205C0 0.573995 0.540345 0 1.2069 0H16.7931C17.4597 0 18 0.573993 18 1.28205V16.7179C18 17.426 17.4597 18 16.7931 18H1.2069C0.540347 18 0 17.426 0 16.7179V1.28205ZM1.44828 1.53846V16.4615H16.5517V1.53846H1.44828Z"
      fill="#212633"
    />
    <path
      d="M5.51022 7C5.29128 7 5.05503 7.09294 5.01219 7.3251C4.97395 7.53229 5.02568 7.75661 5.16737 7.91747L8.59594 11.81C8.8191 12.0633 9.1809 12.0633 9.40406 11.81L12.8326 7.91747C12.9743 7.75661 13.026 7.53229 12.9878 7.3251C12.945 7.09294 12.7087 7 12.4898 7H5.51022Z"
      fill="#212633"
    />
  </svg>
);

export type StyleProps = {
  style?: React.CSSProperties;
};

const IconViewHistory: React.FC<StyleProps> = (props) => (
  <Icon component={IconViewHistorySvg} {...props} />
);

export default IconViewHistory;
