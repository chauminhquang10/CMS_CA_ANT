import { ArrowLeftBlackIcon, ArrowRightBlackIcon } from '@/themes/icons';
import { Pagination } from 'antd';
import React from 'react';
import './index.less';

export type PaginationProps = {
  total?: number;

  defaultPageSize?: number;
  defaultCurrent?: number;
  showQuickJumper?:
    | boolean
    | {
        goButton?: React.ReactNode;
      };
  responsive?: boolean;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    element: React.ReactNode,
  ) => React.ReactNode;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  className?: string;
  current?: number;
  style?: React.CSSProperties;
  pageSize?: number;
  showSizeChanger?: boolean;
};

const PaginationCustom: React.FC<PaginationProps> = (props) => {
  const {
    showTotal,
    onChange,
    itemRender,
    onShowSizeChange,
    defaultPageSize,
    defaultCurrent,
    total,
    showQuickJumper,
    responsive,
    className,
    style,
    showSizeChanger,
    current,
  } = props;
  return (
    <>
      <Pagination
        className={`pagination-custom ${className}`}
        showQuickJumper={showQuickJumper}
        total={total}
        showTotal={showTotal}
        defaultPageSize={defaultPageSize}
        defaultCurrent={defaultCurrent}
        responsive={responsive}
        onChange={onChange}
        itemRender={itemRender}
        onShowSizeChange={onShowSizeChange}
        showPrevNextJumpers
        nextIcon={<ArrowRightBlackIcon />}
        prevIcon={<ArrowLeftBlackIcon />}
        style={style}
        showSizeChanger={showSizeChanger}
        current={current}
      />
    </>
  );
};

export default PaginationCustom;
