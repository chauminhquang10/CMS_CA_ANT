import { Table } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table/interface';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { ColumnsType } from 'antd/lib/table';
import type {
  ExpandableConfig,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TableRowSelection,
} from 'antd/lib/table/interface';
import type { PanelRender, TableLayout } from 'rc-table/lib/interface';
import React from 'react';

export type TableCustomProps = {
  pagination?: false | TablePaginationConfig;
  tableColumns: ColumnsType<any>;
  dataSource: readonly any[];
  scroll?: {
    x?: string | number | true | undefined;
    y?: string | number | undefined;
  } & {
    scrollToFirstRowOnChange?: boolean | undefined;
  };
  bordered?: boolean;
  loading?: boolean;
  size?: SizeType;
  expandable?: ExpandableConfig<any>;
  title?: PanelRender<any>;
  showHeader?: boolean;
  footer?: PanelRender<any>;
  rowSelection?: TableRowSelection<any>;
  tableLayout?: TableLayout;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>,
  ) => void;
};

const TableCustom: React.FC<TableCustomProps> = (props) => {
  const {
    pagination,
    tableColumns,
    dataSource,
    scroll,
    bordered,
    loading,
    size,
    expandable,
    title,
    showHeader,
    footer,
    rowSelection,
    tableLayout,
  } = props;

  return (
    <Table
      loading={loading}
      size={size}
      expandable={expandable}
      bordered={bordered}
      title={title}
      showHeader={showHeader}
      footer={footer}
      rowSelection={rowSelection}
      tableLayout={tableLayout}
      pagination={pagination}
      columns={tableColumns}
      dataSource={dataSource}
      scroll={scroll}
    />
  );
};

export default TableCustom;
