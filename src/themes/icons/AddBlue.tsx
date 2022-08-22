import Icon from '@ant-design/icons';

const AddBlueSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.875C12.6213 3.875 13.125 4.37868 13.125 5V10.875H19C19.6213 10.875 20.125 11.3787 20.125 12C20.125 12.6213 19.6213 13.125 19 13.125H13.125V19C13.125 19.6213 12.6213 20.125 12 20.125C11.3787 20.125 10.875 19.6213 10.875 19V13.125H5C4.37868 13.125 3.875 12.6213 3.875 12C3.875 11.3787 4.37868 10.875 5 10.875H10.875V5C10.875 4.37868 11.3787 3.875 12 3.875Z"
      fill="#244AB1"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const AddBlueIcon: React.FC<StyleProps> = (props) => <Icon component={AddBlueSvg} {...props} />;

export default AddBlueIcon;
