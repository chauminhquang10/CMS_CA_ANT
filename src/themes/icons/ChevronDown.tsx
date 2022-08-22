import Icon from '@ant-design/icons';

const ChevronUpSvg = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.209209 0.21967C-0.0697365 0.512563 -0.0697365 0.987437 0.209209 1.28033L4.49492 5.78033C4.77387 6.07322 5.22613 6.07322 5.50508 5.78033L9.79079 1.28033C10.0697 0.987437 10.0697 0.512564 9.79079 0.21967C9.51184 -0.0732229 9.05958 -0.073223 8.78064 0.21967L5 4.18934L1.21936 0.21967C0.940416 -0.0732233 0.488155 -0.0732233 0.209209 0.21967Z"
      fill="#212633"
    />
  </svg>
);

type StyleProps = {
  style?: React.CSSProperties;
};

const ChevronDown: React.FC<StyleProps> = (props) => <Icon component={ChevronUpSvg} {...props} />;

export default ChevronDown;
