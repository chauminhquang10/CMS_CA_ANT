import Icon from '@ant-design/icons';

const ArrowDownSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.36352 7.5C6.13545 7.5 5.88935 7.59294 5.84473 7.8251C5.8049 8.03229 5.85878 8.25661 6.00637 8.41747L9.5778 12.31C9.81026 12.5633 10.1871 12.5633 10.4196 12.31L13.991 8.41747C14.1386 8.25661 14.1925 8.03229 14.1527 7.8251C14.108 7.59294 13.8619 7.5 13.6339 7.5L6.36352 7.5Z"
      fill="currentColor"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ArrowDownIcon: React.FC<StyleProps> = (props) => <Icon component={ArrowDownSvg} {...props} />;

export default ArrowDownIcon;
