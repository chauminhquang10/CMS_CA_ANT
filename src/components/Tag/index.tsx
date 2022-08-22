import { Tag } from 'antd';
import React from 'react';
import './index.less';
declare const TagTypes: ['low', 'normal', 'hight', 'higher'];
export declare type TagType = typeof TagTypes[number];

export type TagProps = {
  prefixCls?: string;
  className?: string | TagType;
  color?: string;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  visible?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  backgroundColor?: string;
  label?: string;
  type?: TagType;
};

const TagCustom: React.FC<TagProps> = (props) => {
  return (
    <>
      <Tag className={`tag-custom ${props.className} ${props.type}`} onClose={props.onClose}>
        {props.label}
      </Tag>
    </>
  );
};

TagCustom.defaultProps = {
  className: '',
};

export default TagCustom;
