import Icon from '@ant-design/icons';

const ChevronRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.19526 12.4714C5.93491 12.211 5.93491 11.7889 6.19526 11.5286L9.72386 7.99998L6.19526 4.47138C5.93491 4.21104 5.93491 3.78892 6.19526 3.52858C6.45561 3.26823 6.87772 3.26823 7.13807 3.52858L11.1381 7.52857C11.3984 7.78892 11.3984 8.21103 11.1381 8.47138L7.13807 12.4714C6.87772 12.7317 6.45561 12.7317 6.19526 12.4714Z"
      fill="#99A2BC"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ChevronRightIcon: React.FC<StyleProps> = (props) => (
  <Icon component={ChevronRightSvg} {...props} />
);

export default ChevronRightIcon;
