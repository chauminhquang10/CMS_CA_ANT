import ButtonCustom from '@/components/Button';
import CustomInput from '@/components/InputSearch';
import SelectCustom from '@/components/Select';
import { SortIcon } from '@/themes/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Select } from 'antd';

import { useCallback, useState } from 'react';
const { Option } = Select;

interface FilterModel {
  key: string | number;
  type: string | number;
  label: string;
  value: string;
  isactive: boolean;
  listFilterChild?: FilterModel[];
}

const listOption: FilterModel[] = [
  {
    key: 'item-1',
    type: 'type-1',
    label: 'Đối tượng sử dụng',
    value: 'Đối tượng sử dụng',
    isactive: false,
    listFilterChild: [
      { key: 'item-1', type: 'type-child-0', label: 'Tổ chức', value: 'Tổ chức', isactive: false },
      { key: 'item-2', type: 'type-child-1', label: 'Cá nhân', value: 'Cá nhân', isactive: false },
      {
        key: 'item-3',
        type: 'type-child-2',
        label: 'Cá nhân trong tổ chức',
        value: 'Cá nhân trong tổ chức',
        isactive: false,
      },
    ],
  },
  { key: 'item-2', type: 'type-2', label: 'Gói dịch vụ', value: 'Gói dịch vụ', isactive: false },
  { key: 'item-3', type: 'type-3', label: 'Thời hạn', value: 'Thời hạn', isactive: false },
  {
    key: 'item-4',
    type: 'type-4',
    label: 'Trạng thái chứng thư',
    value: 'Trạng thái chứng thư',
    isactive: false,
  },
  {
    key: 'item-5',
    type: 'type-5',
    label: 'Hồ sơ bản mềm',
    value: 'Hồ sơ bản mềm',
    isactive: false,
  },
  {
    key: 'item-6',
    type: 'type-6',
    label: 'Hồ sơ bản cứng',
    value: 'Hồ sơ bản cứng',
    isactive: false,
  },
];

const App = () => {
  const [items, setItems] = useState<FilterModel[]>([]);

  const onSelect = useCallback(
    (value: any, option: any) => {
      const optionSelected = listOption.find((itemOption) => option.value === itemOption.value);
      const optionCurrent = items.find((item) => option.value === item.value);
      if (items.length > 0 && optionCurrent) {
        const newItems = items.filter((item) => optionCurrent?.value !== item.value);
        setItems((item: any) => item.concat(newItems));
      } else {
        setItems((item: any) => item.concat([optionSelected]));
      }
    },
    [items],
  );

  const onSelectFilterChild = useCallback((value: any) => {
    console.log('value', value);
  }, []);

  //   const [keySearch, setKeySearch] = useState();

  //   const updateSearchKey  = useCallback(
  //     (value:any) => {
  //       setKeySearch();
  //     },
  //     [],
  //   )

  return (
    <PageContainer
      content={
        <CustomInput
          prefix={<img src="/icons/icon-search.svg" />}
          placeholder={'Tìm kiếm'}
          size={'large'}
          className={'input-custom'}
        />
      }
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary Action
        </Button>,
      ]}
      tabList={[
        {
          tab: 'base information',
          key: 'base',
        },
        {
          tab: 'details',
          key: 'info',
        },
      ]}
    >
      <Card
        title="Danh sách chứng thư"
        extra={
          <ButtonCustom
            style={{ borderRadius: '8px' }}
            icon={<SortIcon />}
            className="btn-custom btn-excel"
          >
            Bộ lọc
          </ButtonCustom>
        }
        style={{
          width: '100%',
        }}
      >
        <SelectCustom
          onChange={onSelect}
          style={{ width: '108px' }}
          suffixIcon={
            <ButtonCustom
              style={{ borderRadius: '8px' }}
              icon={<SortIcon />}
              className="btn-custom btn-primary-blue"
            >
              Bộ lọc
            </ButtonCustom>
          }
          defaultOpen
          className={`show-arrow-icon-center`}
          dropdownClassName="dropdown-filter"
        >
          {listOption.map((optionParent) => {
            return (
              <Option key={optionParent.value} value={optionParent.value}>
                {optionParent.value}
              </Option>
            );
          })}
        </SelectCustom>
        {items.map((item) => {
          console.log('items', items);

          return (
            <div key={item.value} style={{ display: 'flex' }}>
              {item?.listFilterChild && (
                <SelectCustom
                  size="middle"
                  mode="multiple"
                  defaultValue={[item?.value]}
                  onSelect={onSelectFilterChild}
                  maxTagCount={'responsive'}
                  style={{ width: '305px' }}
                  showArrow={false}
                >
                  {item.listFilterChild.map((option) => {
                    return (
                      <Option key={option.value} value={option.value}>
                        {option.value}
                      </Option>
                    );
                  })}
                </SelectCustom>
              )}
            </div>
          );
        })}
      </Card>
    </PageContainer>
  );
};

export default App;
