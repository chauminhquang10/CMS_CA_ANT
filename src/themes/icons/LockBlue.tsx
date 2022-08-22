import Icon from '@ant-design/icons';

const LockBlueSvg = () => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.37504 7.33335C4.37504 7.40239 4.431 7.45835 4.50004 7.45835H12C12.8515 7.45835 13.5417 8.14858 13.5417 9.00002V15.6667C13.5417 16.5181 12.8515 17.2084 12 17.2084H2.00004C1.1486 17.2084 0.458374 16.5181 0.458374 15.6667V9.00002C0.458374 8.14858 1.1486 7.45835 2.00004 7.45835H2.83337C2.90241 7.45835 2.95837 7.40239 2.95837 7.33335V4.83335C2.95837 2.60882 4.77551 0.791687 7.00004 0.791687C9.22458 0.791687 11.0417 2.60882 11.0417 4.83335C11.0417 5.22456 10.7246 5.54169 10.3334 5.54169C9.94217 5.54169 9.62504 5.22456 9.62504 4.83335C9.62504 3.39122 8.44217 2.20835 7.00004 2.20835C5.55791 2.20835 4.37504 3.39122 4.37504 4.83335V7.33335ZM2.00004 8.87502C1.93101 8.87502 1.87504 8.93098 1.87504 9.00002V15.6667C1.87504 15.7357 1.93101 15.7917 2.00004 15.7917H12C12.0691 15.7917 12.125 15.7357 12.125 15.6667V9.00002C12.125 8.93098 12.0691 8.87502 12 8.87502H2.00004Z"
      fill="#4367C7"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const LockBlueIcon: React.FC<StyleProps> = (props) => <Icon component={LockBlueSvg} {...props} />;

export default LockBlueIcon;
