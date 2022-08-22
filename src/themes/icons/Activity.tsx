import Icon from '@ant-design/icons';

const ActivitySvg = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="6.5" r="5.5" fill="#63C08A" stroke="white" strokeWidth="2" />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ActivitiesIcon: React.FC<StyleProps> = (props) => <Icon component={ActivitySvg} {...props} />;

export default ActivitiesIcon;
