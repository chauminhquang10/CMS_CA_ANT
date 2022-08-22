import Icon from '@ant-design/icons';

const recallIconSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.60163 14.8873L7.46257 16.7665C7.72273 17.0293 7.72274 17.454 7.46257 17.7168C7.20183 17.9802 6.78308 17.9855 6.52458 17.7244L3.5241 14.6941C3.46337 14.6256 3.41647 14.5508 3.38293 14.4695C3.31637 14.3081 3.31637 14.1189 3.38293 13.9575C3.41647 13.8763 3.46337 13.8014 3.5241 13.7329L6.52459 10.7026C6.7842 10.4404 7.20296 10.4404 7.46257 10.7026C7.72274 10.9654 7.72262 11.3903 7.46245 11.6531L5.60225 13.5398H16.0003C16.3655 13.5398 16.6663 13.8422 16.6663 14.2135C16.6663 14.5849 16.3655 14.8873 16.0003 14.8873H5.60163Z"
      fill="#4367C7"
    />
    <path
      d="M16.4752 6.27212L13.4748 9.30242C13.2163 9.56354 12.7975 9.55822 12.5368 9.29484C12.2766 9.03204 12.2766 8.60729 12.5368 8.34448L14.3977 6.4653H3.999C3.63386 6.4653 3.33301 6.16288 3.33301 5.79154C3.33301 5.42021 3.63386 5.11779 3.999 5.11779H14.3971L12.5368 3.23103C12.2766 2.96822 12.2766 2.54347 12.5368 2.28066C12.7964 2.01842 13.2152 2.01843 13.4748 2.28067L16.4753 5.31097C16.536 5.37948 16.5829 5.45428 16.6164 5.53557C16.683 5.69695 16.683 5.88614 16.6164 6.04751C16.5829 6.12881 16.536 6.20361 16.4752 6.27212Z"
      fill="#4367C7"
    />
  </svg>
);

export type StyleProps = {
  style?: React.CSSProperties;
};

const RecallIcon: React.FC<StyleProps> = (props) => <Icon component={recallIconSvg} {...props} />;

export default RecallIcon;