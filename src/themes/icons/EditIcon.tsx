import Icon from '@ant-design/icons';

const EditSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0001 17.5041C11.5412 17.5041 11.1644 17.8699 11.1644 18.327C11.1644 18.7841 11.5412 19.1499 12.0001 19.1499H19.3144C19.7733 19.1499 20.1501 18.7841 20.1501 18.327C20.1501 17.8699 19.7733 17.5041 19.3144 17.5041H12.0001Z"
      fill="#99A2BC"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.8763 3.8501C16.1983 3.8501 15.5476 4.11436 15.0673 4.58562L4.9086 14.5543C4.80131 14.6596 4.72491 14.7918 4.68794 14.937L3.87524 18.127C3.80349 18.4086 3.88784 18.7059 4.0959 18.9101C4.30367 19.1139 4.60427 19.1952 4.88788 19.1257L8.13867 18.3282C8.28517 18.2922 8.41929 18.2178 8.52656 18.1126L18.6853 8.14385C18.9231 7.91047 19.1119 7.63326 19.2408 7.32797C19.3696 7.02268 19.436 6.69536 19.436 6.36473C19.436 6.03411 19.3696 5.70679 19.2408 5.40149C19.1119 5.0962 18.9231 4.81899 18.6853 4.58562C18.4475 4.35225 18.1653 4.16728 17.8549 4.04114C17.5446 3.91499 17.2121 3.8501 16.8763 3.8501ZM17.5054 6.97811L7.51036 16.7862L5.83534 17.1971L6.25271 15.5589L16.2472 5.75135C16.4136 5.58809 16.6398 5.49587 16.8763 5.49587C16.9933 5.49587 17.1092 5.5185 17.2171 5.56239C17.3251 5.60628 17.4231 5.67053 17.5054 5.75135C17.5878 5.83217 17.6529 5.92795 17.6974 6.03316C17.7418 6.13837 17.7646 6.25103 17.7646 6.36473C17.7646 6.47844 17.7418 6.59109 17.6974 6.6963C17.6529 6.80151 17.5878 6.8973 17.5054 6.97811Z"
      fill="#99A2BC"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const EditIcon: React.FC<StyleProps> = (props) => <Icon component={EditSvg} {...props} />;

export default EditIcon;
