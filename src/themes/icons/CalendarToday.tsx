import Icon from '@ant-design/icons';

const CalendarTodaySvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.6668 1.99999H13.3335C14.0668 1.99999 14.6668 2.59999 14.6668 3.33332V14C14.6668 14.7333 14.0668 15.3333 13.3335 15.3333H2.66683C1.9335 15.3333 1.3335 14.7333 1.3335 14V3.33332C1.3335 2.59999 1.9335 1.99999 2.66683 1.99999H3.3335V1.33332C3.3335 0.966656 3.6335 0.666656 4.00016 0.666656C4.36683 0.666656 4.66683 0.966656 4.66683 1.33332V1.99999H11.3335V1.33332C11.3335 0.966656 11.6335 0.666656 12.0002 0.666656C12.3668 0.666656 12.6668 0.966656 12.6668 1.33332V1.99999ZM3.3335 14H12.6668C13.0335 14 13.3335 13.7 13.3335 13.3333V5.33332H2.66683V13.3333C2.66683 13.7 2.96683 14 3.3335 14Z"
      fill="#525B73"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const CalendarTodayIcon: React.FC<StyleProps> = (props) => (
  <Icon component={CalendarTodaySvg} {...props} />
);

export default CalendarTodayIcon;
