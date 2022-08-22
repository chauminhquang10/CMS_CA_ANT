import type {
  BaseQueryFilterProps,
  ColumnsState,
  ParamsType,
  ProFormProps,
  ProTableEditableFnType,
  QueryFilterProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { SizeType } from '@ant-design/pro-form/lib/BaseForm';

import type {
  ActionType,
  Bordered,
  ColumnsStateType,
  OptionSearchProps,
} from '@ant-design/pro-table/lib/typing';
import type { TablePaginationConfig } from 'antd/es/table/interface';
import type { ColumnFilterItem, SortOrder } from 'antd/lib/table/interface';

type T = unknown;
type DataType = Record<any, any>;
type OptionsFunctionType = (e: React.MouseEvent<HTMLSpanElement>, action?: ActionType) => void;

type OptionsType = OptionsFunctionType | boolean;
type SearchConfig = BaseQueryFilterProps & {
  filterType?: 'query' | 'light';
};
declare type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?:
    | boolean
    | {
        draggable?: boolean;
        checkable?: boolean;
        checkedReset?: boolean;
        extra?: React.ReactNode;
        children?: React.ReactNode;
      };
  search?:
    | (OptionSearchProps & {
        name?: string;
      })
    | boolean;
};

type ProTableCustomProps = {
  onDataSourceChange?: (_data: any[]) => void;
  defaultSize?: SizeType;
  search?: false | SearchConfig;
  columns: any;
  hideInSetting?: boolean;
  hideInForm?: boolean;
  order?: number;
  editable?: boolean | ProTableEditableFnType<T>;
  filters?: boolean | ColumnFilterItem[];
  ellipsis?: boolean;
  initialValue?: any;
  colSize?: number;
  columnsState?: ColumnsStateType;
  onColumnsStateChange?: (map: Record<string, ColumnsState>) => void;
  request?: (
    params: ParamsType & {
      pageSize?: number | undefined;
      current?: number | undefined;
      keyword?: string | undefined;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[] | null>,
  ) => Promise<any>;
  postData?: (data: any[]) => any[];
  defaultData?: any[];
  toolBarRender?:
    | false
    | ((
        action: ActionType | undefined,
        rows: {
          selectedRowKeys?: (string | number)[] | undefined;
          selectedRows?: DataType[] | undefined;
        },
      ) => React.ReactNode[])
    | undefined;
  onSubmit?: (params: ParamsType) => void;
  onReset?: () => void;
  cardBordered?: Bordered;
  dateFormatter?:
    | 'string'
    | 'number'
    | ((value: moment.Moment, valueType: string) => string | number)
    | false;

  form?: Omit<ProFormProps & QueryFilterProps, 'form'>;
  options?: OptionConfig | false;
  pagination?: false | TablePaginationConfig;
  bordered?: boolean;
  className?: string;
  dataSource?: readonly DataType[];
  params?: any;
  rowKey: string;
  scroll?: {
    x?: string | number | true | undefined;
    y?: string | number | undefined;
  } & {
    scrollToFirstRowOnChange?: boolean | undefined;
  };
};

const ProTableCustom: React.FC<ProTableCustomProps> = (props) => {
  const {
    onDataSourceChange,
    request,
    postData,
    onSubmit,
    onReset,
    columns,
    defaultData,
    toolBarRender,
    cardBordered,
    dateFormatter,
    form,
    search,
    pagination,
    bordered,
    className,
    dataSource,
    params,
    rowKey,
    scroll,
  } = props;
  return (
    <ProTable<DataType>
      scroll={scroll}
      onDataSourceChange={onDataSourceChange}
      defaultSize="middle"
      columns={columns}
      request={request}
      postData={postData}
      defaultData={defaultData}
      toolBarRender={toolBarRender}
      onSubmit={onSubmit}
      onReset={onReset}
      bordered={bordered}
      cardBordered={cardBordered}
      dateFormatter={dateFormatter}
      form={form}
      search={search}
      pagination={pagination}
      className={className}
      dataSource={dataSource}
      params={params}
      rowKey={rowKey}
    />
  );
};
export default ProTableCustom;
