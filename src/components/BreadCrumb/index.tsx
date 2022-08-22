import type { BreadcrumbProps } from 'antd';
import { Breadcrumb } from 'antd';
import React from 'react';
import './index.less';

export type BreadcrumbCustomProps = {
  children?: React.ReactNode;
};

const BreadcrumbCustom: React.FC<BreadcrumbProps> = (props) => {
  const { children } = props;
  return (
    <Breadcrumb separator=">" className="breadcrumb-custom">
      {children}
    </Breadcrumb>
  );
};

export default BreadcrumbCustom;
