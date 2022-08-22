import Icon from '@ant-design/icons';

const CloseOutFillSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.32372 5.32372C5.75536 4.89209 6.45517 4.89209 6.8868 5.32372L12 10.4369L17.1132 5.32372C17.5448 4.89209 18.2446 4.89209 18.6763 5.32372C19.1079 5.75536 19.1079 6.45517 18.6763 6.8868L13.5631 12L18.6763 17.1132C19.1079 17.5448 19.1079 18.2446 18.6763 18.6763C18.2446 19.1079 17.5448 19.1079 17.1132 18.6763L12 13.5631L6.8868 18.6763C6.45517 19.1079 5.75536 19.1079 5.32372 18.6763C4.89209 18.2446 4.89209 17.5448 5.32372 17.1132L10.4369 12L5.32372 6.8868C4.89209 6.45517 4.89209 5.75536 5.32372 5.32372Z"
      fill="#76809B"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const CloseOutFillIcon: React.FC<StyleProps> = (props) => (
  <Icon component={CloseOutFillSvg} {...props} />
);

export default CloseOutFillIcon;
