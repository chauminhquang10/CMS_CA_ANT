import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';
import './index.less';

export type SelectPropCustom = SelectProps & {
  defaultValue?: any;
  style?: React.CSSProperties;
  value?: any;
};

const SelectCustom: React.FC<SelectPropCustom> = (props) => {
  const {
    defaultValue,
    style,
    value,

    ...rest
  } = props;
  return (
    <Select
      {...rest}
      defaultValue={defaultValue}
      value={value}
      style={{
        width: 120,
        ...style,
      }}
    />
  );
};

SelectCustom.defaultProps = {};
export default SelectCustom;
