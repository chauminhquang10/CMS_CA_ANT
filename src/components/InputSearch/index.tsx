import type { InputProps } from 'antd';
import { Input } from 'antd';
import React from 'react';
import './index.less';

export type BaseInput = {
  icon?: React.ReactNode;
  loading?:
    | boolean
    | {
        delay?: number;
      };
  prefix?: React.ReactNode | (() => React.ReactNode) | any;
  className?: string;
  children?: React.ReactNode;
  onClick?: (value?: string) => void;
  bordered?: boolean;
  placeholder?: string;
  size?: string;
} & Omit<InputProps, ''>;

const CustomInput: React.FC<BaseInput> = (props) => (
  <>
    <Input {...props} />
  </>
);

export default CustomInput;
