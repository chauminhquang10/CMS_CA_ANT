import type { CheckboxProps } from 'antd';
import { Checkbox } from 'antd';
import React from 'react';

type checkboxCustom = {
  children?: React.ReactNode;
  funcCallback?: (e: boolean) => void;
} & CheckboxProps;

const CheckBoxCustom: React.FC<checkboxCustom> = (props) => {
  const { children, funcCallback, ...restProps } = props;
  return <Checkbox {...restProps}>{children}</Checkbox>;
};

CheckBoxCustom.defaultProps = {
  funcCallback: () => {},
};

export default CheckBoxCustom;
