import Icon from '@ant-design/icons';

const showIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
      fill="#0C3399"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 12C5 12 6.71111 7 12 7C17.5222 7 19 12 19 12C19 12 17.5222 17 12 17C6.63333 17 5 12 5 12ZM8.81111 12C8.81111 13.7111 10.2111 15.1889 12 15.1889C13.7889 15.1889 15.1889 13.7111 15.1889 12C15.1889 10.2889 13.7889 8.81111 12 8.81111C10.2111 8.81111 8.81111 10.2889 8.81111 12ZM13.9445 12C13.9445 13.0739 13.0739 13.9444 12 13.9444C10.9262 13.9444 10.0556 13.0739 10.0556 12C10.0556 10.9261 10.9262 10.0556 12 10.0556C13.0739 10.0556 13.9445 10.9261 13.9445 12Z"
      fill="white"
    />
  </svg>
);

export type StyleProps = {
  style?: React.CSSProperties;
};

const ShowIcon: React.FC<StyleProps> = (props) => <Icon component={showIconSvg} {...props} />;

export default ShowIcon;
