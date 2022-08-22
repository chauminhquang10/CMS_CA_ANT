import ButtonCustom from '@/components/Button';
import ProTableCustom from '@/components/ProTable';
import SelectCustom from '@/components/Select';
import { getAllCAActive } from '@/services/unicloud-ca-cms/TrustCMSController';
import { SortIconBlue } from '@/themes/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useDebounce } from 'ahooks';
import { Card, Input, PageHeader, Select } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';
import type { softDocumentInfoModel } from '../RequestListPage/data';
import ListData from './data';
import './index.less';
import ColumnsTableUser, { BuildBreadcrumb } from './main/ColumnTableTrust';
import ModalInforSortDocument from './main/ModalInforSortDocument';

const { Option } = Select;
declare type DataType = Record<any, any>;
interface FilterModel {
  key: string | number;
  type: string | number;
  label: string;
  value: string;
  isactive: boolean;
  listFilterChild?: FilterModel[];
}

const listOption = ListData.ListOptionFilter;

const CertificateListPage = () => {
  const [items, setItems] = useState<FilterModel[]>([]);
  //   const [currents, setCurrents] = React.useState(1);
  const pageSizeRef = React.useRef(10);

  const onSelect = useCallback(
    (value: any, option: any) => {
      const optionSelected = listOption.find((itemOption) => option?.value === itemOption?.value);
      const optionCurrent = items.find((item) => option?.value === item?.value);
      if (items.length > 0 && optionCurrent) {
        const newItems = items.filter((item) => optionCurrent?.value !== item?.value);
        setItems((item: any) => item?.concat(newItems));
      } else {
        setItems((item: any) => item?.concat([optionSelected]));
      }
    },
    [items],
  );

  const onSelectFilterChild = useCallback(() => {}, []);

  const handleTableChange = useCallback(() => {}, []);

  const handleColumnsStateChange = () => {};

  const [visible, setVisible] = useState(false);

  const [itemModal, setItemModal] = useState<softDocumentInfoModel>({
    numOfAvailableDocument: 0,
    numberOfDocument: 0,
    trustDocuments: {
      approve: '',
      documentUrlList: [],
      type: '',
      approvedBy: '',
      documentUrl: '',
    },
  });
  const handleItemModal = useCallback(
    (value: any) => {
      setVisible(!visible);
      setItemModal(value);
    },
    [visible],
  );

  const cancelModal = useCallback((value: boolean) => {
    setVisible(value);
  }, []);

  const [resultRespon, setResultRespon] = useState<API.PageInquiryCADto>();
  const [listCAActive, setListCAActive] = useState<API.InquiryCADto>();

  const { run: runGetAllCA } = useRequest<API.ResponseBaseGetAllInquiriesResponse>(
    (params = { phone: '', page: 0, size: 10 }) => getAllCAActive(params),
    {
      manual: true,
      onSuccess(data) {
        const dataNews = data as { inquiryCAList: API.PageInquiryCADto };
        if (dataNews && dataNews?.inquiryCAList?.content) {
          setResultRespon(data?.inquiryCAList);
          setListCAActive(data?.inquiryCAList.content);
        }
      },
      onError(error) {
        console.log(error);
      },
    },
  );

  //#region debounced search số điện thoại
  const [valueinput, setValueInput] = useState('');
  const debouncedValue = useDebounce(valueinput, { wait: 500 });

  useEffect(() => {
    if (debouncedValue) {
      runGetAllCA({ phone: valueinput, page: 0, size: 10 });
    }
  }, [debouncedValue, runGetAllCA, valueinput]);

  function handleSearchChange(value: string) {
    setValueInput(value);
  }
  //#endregion

  //#region page header
  const BuildPageHeader = useMemo(() => {
    return (
      <PageHeader
        breadcrumbRender={BuildBreadcrumb}
        title="Danh sách chứng thư"
        extra={[
          <ButtonCustom key="1" className="btn-custom btn-excel" style={{ borderRadius: '8px' }}>
            Xuất file excel
          </ButtonCustom>,
        ]}
        className="custom-page-header"
      >
        <div className="group-filter">
          <Input
            prefix={<img src="/icons/icon-search.svg" />}
            placeholder="Tìm kiếm"
            size="large"
            className="input-custom"
            type="text"
            name=""
            style={{ width: '250px' }}
            onChange={(e) => handleSearchChange(e.target.value)}
            value={valueinput}
            allowClear
          />
          <SelectCustom
            onChange={onSelect}
            style={{ width: '108px' }}
            suffixIcon={
              <ButtonCustom
                style={{ borderRadius: '8px' }}
                icon={<SortIconBlue />}
                className="btn-custom btn-excel-normal"
              >
                Bộ lọc
              </ButtonCustom>
            }
            placement="bottomRight"
            className={`show-arrow-icon-center`}
            dropdownClassName="dropdown-filter"
          >
            {listOption.map((optionParent) => {
              return (
                <Option key={optionParent?.value} value={optionParent?.value}>
                  {optionParent?.value}
                </Option>
              );
            })}
          </SelectCustom>
        </div>
        {items.map((item) => {
          return (
            <div key={item?.value} style={{ display: 'flex' }}>
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
                      <Option key={option?.value} value={option?.value}>
                        {option?.value}
                      </Option>
                    );
                  })}
                </SelectCustom>
              )}
            </div>
          );
        })}
      </PageHeader>
    );
  }, [items, onSelect, onSelectFilterChild, valueinput]);
  //#endregion

  return (
    <>
      <div className="wrapper-page-container">
        {BuildPageHeader}
        <PageContainer className="page-container-custom-v2" pageHeaderRender={false}>
          <Card
            style={{
              width: '100%',
            }}
          >
            <ProTableCustom
              scroll={{ x: 1440 }}
              rowKey={'key-1'}
              onColumnsStateChange={handleColumnsStateChange}
              onDataSourceChange={handleTableChange}
              toolBarRender={false}
              defaultSize="middle"
              search={false}
              cardBordered={true}
              columns={ColumnsTableUser({
                setItems: (value) => handleItemModal(value),
              })}
              dataSource={listCAActive as readonly DataType[] | undefined}
              bordered={true}
              //   request={async (params = {}, sort, filter) => {
              request={async (params = {}) => {
                const pageCurrent = params?.current ? Math.floor(params?.current - 1) : '0';
                return runGetAllCA({
                  page: pageCurrent,
                  size: params?.pageSize,
                  phone: valueinput,
                });
              }}
              pagination={{
                className: 'pagination-custom',
                locale: { items_per_page: '' },
                total: resultRespon?.totalElements,
                // current: currents,
                pageSize: pageSizeRef?.current,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `Từ ${range[0]} đến ${range[1]} trên tổng số ${total} kết quả`,
                // onChange: (page, pageSize) => {
                //   const pageSizeChange = pageSizeRef.current !== pageSize;
                //   if (pageSizeChange) {
                //     setCurrents(1);
                //   } else {
                //     setCurrents(page);
                //   }
                //   pageSizeRef.current = pageSize;
                //     runGetAllCA({ phone: '', page: page - 1, size: pageSize });
                // },
              }}
            />
          </Card>

          <ModalInforSortDocument
            visible={visible}
            cancelModal={(value: boolean) => cancelModal(value)}
            itemModal={itemModal}
          />
        </PageContainer>
      </div>
    </>
  );
};

export default CertificateListPage;
