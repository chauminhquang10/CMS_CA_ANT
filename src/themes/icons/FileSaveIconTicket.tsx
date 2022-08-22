import Icon from '@ant-design/icons';

const FileSaveIconTicketSvg = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.95556 1.95714C2.69076 1.95714 2.43681 2.06233 2.24957 2.24957C2.06233 2.43681 1.95714 2.69076 1.95714 2.95556V15.0444C1.95714 15.3092 2.06233 15.5632 2.24957 15.7504C2.43681 15.9377 2.69076 16.0429 2.95556 16.0429H3.95397V9.86349C3.95397 9.46111 4.28016 9.13492 4.68254 9.13492H13.3175C13.7198 9.13492 14.046 9.46111 14.046 9.86349V16.0429H15.0444C15.3092 16.0429 15.5632 15.9377 15.7504 15.7504C15.9377 15.5632 16.0429 15.3092 16.0429 15.0444V5.84782L12.1522 1.95714H5.41111V4.81746H11.5905C11.9929 4.81746 12.319 5.14365 12.319 5.54603C12.319 5.94841 11.9929 6.2746 11.5905 6.2746H4.68254C4.28016 6.2746 3.95397 5.94841 3.95397 5.54603V1.95714H2.95556ZM2.95556 0.5C2.3043 0.5 1.67972 0.758709 1.21922 1.21922C0.758709 1.67972 0.5 2.3043 0.5 2.95556V15.0444C0.5 15.6957 0.75871 16.3203 1.21922 16.7808C1.67972 17.2413 2.3043 17.5 2.95556 17.5H15.0444C15.6957 17.5 16.3203 17.2413 16.7808 16.7808C17.2413 16.3203 17.5 15.6957 17.5 15.0444V5.54603C17.5 5.3528 17.4232 5.16749 17.2866 5.03085L12.9691 0.713394C12.8325 0.57676 12.6472 0.5 12.454 0.5H2.95556ZM12.5889 16.0429V10.5921H5.41111V16.0429H12.5889Z"
      fill="white"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const FileSaveIconTicket: React.FC<StyleProps> = (props) => (
  <Icon component={FileSaveIconTicketSvg} {...props} />
);

export default FileSaveIconTicket;
