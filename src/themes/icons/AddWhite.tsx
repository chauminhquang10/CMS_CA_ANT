import Icon from '@ant-design/icons';

const AddWhiteSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0003 3.22852C10.5181 3.22852 10.9378 3.64825 10.9378 4.16602V9.06185H15.8337C16.3514 9.06185 16.7712 9.48158 16.7712 9.99935C16.7712 10.5171 16.3514 10.9368 15.8337 10.9368H10.9378V15.8327C10.9378 16.3505 10.5181 16.7702 10.0003 16.7702C9.48256 16.7702 9.06283 16.3505 9.06283 15.8327V10.9368H4.16699C3.64923 10.9368 3.22949 10.5171 3.22949 9.99935C3.22949 9.48158 3.64923 9.06185 4.16699 9.06185H9.06283V4.16602C9.06283 3.64825 9.48256 3.22852 10.0003 3.22852Z"
      fill="white"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const AddWhiteIcon: React.FC<StyleProps> = (props) => <Icon component={AddWhiteSvg} {...props} />;

export default AddWhiteIcon;
