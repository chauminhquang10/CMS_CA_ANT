import Icon from '@ant-design/icons';

const ChevronUpSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.9998 15L7.75684 10.757L9.17184 9.34302L11.9998 12.172L14.8278 9.34302L16.2428 10.757L11.9998 15Z"
      fill="#F7F9FF"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ChevronUpIcon: React.FC<StyleProps> = (props) => <Icon component={ChevronUpSvg} {...props} />;

export default ChevronUpIcon;
