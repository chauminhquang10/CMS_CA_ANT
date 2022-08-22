import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import React from 'react';
import './index.less';

export type BaseButtonProps = {
  icon?: React.ReactNode;
  loading?:
    | boolean
    | {
        delay?: number;
      };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  onClick?: (value?: string) => void;
} & Omit<ButtonProps, 'shape'>;

const ButtonCustom: React.FC<BaseButtonProps> = (props) => (
  <>
    <Button {...props} />
  </>
);

export default ButtonCustom;
