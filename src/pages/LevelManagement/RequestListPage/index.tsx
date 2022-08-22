import ButtonCustom from '@/components/Button';
import ProTableCustom from '@/components/ProTable';

import SelectCustom from '@/components/Select';
import { getAll1 } from '@/services/unicloud-ca-cms/TrustCMSController';
import { AddBlueIcon, SortIconBlue } from '@/themes/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useDebounce } from 'ahooks';
import { Breadcrumb, Card, Input, PageHeader, Select } from 'antd';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useRequest } from 'umi';
import type { FilterModel, softDocumentInfoModel } from './data';
import { ListOptionFilter } from './data';

import columnsTableTrustCA from './Main/ColumnTableTrust';
import ModalInforSortDocument from './Main/ModalInforSortDocument';
import './style.less';

const { Option } = Select;

const listOption = ListOptionFilter;
// const listCreateOption: ListOptions[] = ListCreateNew;

const RequestListPage = () => {
  const pageSizeRef = React.useRef(10);
  const [items, setItems] = useState<FilterModel[]>([]);
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
  const [visible, setVisible] = useState(false);
  const [listTrustCA, setListTrustCA] = useState<API.InquiryCADto[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const onSelect = useCallback(
    (value: any, option: any) => {
      const optionSelected = listOption.find(
        (itemOption: { value: any }) => option.value === itemOption.value,
      );
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

  const onSelectFilterChild = useCallback(() => {}, []);

  const handleItemModal = (value: any) => {
    setVisible(!visible);
    setItemModal(value);
  };

  const { run: runListInquiryCA } = useRequest(
    (params = { page: 0, size: pageSizeRef.current, phone: '' }) => getAll1(params),
    {
      refreshOnWindowFocus: true,
      manual: true,
      onSuccess: async (data: any) => {
        const dataNews = data as { inquiryCAList: API.PageInquiryCADto };
        if (dataNews && dataNews?.inquiryCAList?.content) {
          setTotalPages(dataNews?.inquiryCAList?.totalElements || 0);
          setListTrustCA(dataNews?.inquiryCAList?.content);
        }
      },
      onError: (e) => {
        console.log('error', e);
      },
    },
  );

  //   const BuildFilter = () => {
  //     return (
  //       <>
  //         <div className="group-filter">
  //           <CustomInput
  //             prefix={<img src="/icons/icon-search.svg" />}
  //             placeholder={'Tìm kiếm'}
  //             size={'large'}
  //             className={'input-custom'}
  //             style={{ width: '343px' }}
  //           />
  //           <SelectCustom
  //             onChange={onSelect}
  //             style={{ width: '106px' }}
  //             suffixIcon={
  //               <ButtonCustom
  //                 style={{ borderRadius: '8px' }}
  //                 icon={<SortIcon />}
  //                 className="btn-custom btn-primary-blue"
  //               >
  //                 Bộ lọc
  //               </ButtonCustom>
  //             }
  //             placement="bottomRight"
  //             className={`show-arrow-icon-center`}
  //             dropdownClassName="dropdown-filter"
  //           >
  //             {listOption.map((optionParent: ListOptions) => {
  //               return (
  //                 <Option key={optionParent.value} value={optionParent.value}>
  //                   {optionParent.value}
  //                 </Option>
  //               );
  //             })}
  //           </SelectCustom>
  //         </div>
  //         {items.map((item) => {
  //           return (
  //             <div key={item.value} style={{ display: 'flex' }}>
  //               {item?.listFilterChild && (
  //                 <SelectCustom
  //                   size="middle"
  //                   mode="multiple"
  //                   defaultValue={[item?.value]}
  //                   onSelect={onSelectFilterChild}
  //                   maxTagCount={'responsive'}
  //                   style={{ width: '305px' }}
  //                   showArrow={false}
  //                 >
  //                   {item.listFilterChild.map((option) => {
  //                     return (
  //                       <Option key={option.value} value={option.value}>
  //                         {option.value}
  //                       </Option>
  //                     );
  //                   })}
  //                 </SelectCustom>
  //               )}
  //             </div>
  //           );
  //         })}
  //       </>
  //     );
  //   };

  const cancelModal = useCallback((value: boolean) => {
    setVisible(value);
  }, []);

  const [pageCurrents, setPageCurrents] = React.useState(1);

  const [valueinput, setValueInput] = useState('');
  const debouncedValue = useDebounce(valueinput, { wait: 500 });

  useEffect(() => {
    if (debouncedValue) {
      runListInquiryCA({ page: 0, size: pageSizeRef.current, phone: valueinput });
    }
  }, [debouncedValue, runListInquiryCA, valueinput]);

  function handleSearchChange(value: string) {
    setValueInput(value);
  }

  const BuildPageHeader = useMemo(() => {
    const BuildBreadCrumb = () => (
      <Breadcrumb separator=">" className="breadcrumb-custom">
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý cấp phát</Breadcrumb.Item>
        <Breadcrumb.Item href="/levelManagement/request-list">Danh sách yêu cầu</Breadcrumb.Item>
      </Breadcrumb>
    );
    return (
      <PageHeader
        breadcrumbRender={BuildBreadCrumb}
        title="Danh sách yêu cầu"
        extra={[
          <ButtonCustom
            key="1"
            className="btn-custom btn-excel-normal"
            style={{ borderRadius: '8px' }}
          >
            Xuất file excel
          </ButtonCustom>,
          // <SelectCustom
          //   key="3"
          //   style={{ borderRadius: '8px', width: '106px', marginLeft: 24 }}
          //   suffixIcon={
          //     <ButtonCustom
          //       style={{ borderRadius: '8px', height: '38px' }}
          //       icon={<AddBlueIcon />}
          //       className="btn-custom btn-primary-blue btn-add"
          //     >
          //       Tạo mới
          //     </ButtonCustom>
          //   }
          //   placement="bottomRight"
          //   className={`show-arrow-icon-center`}
          //   dropdownClassName="dropdown-filter"
          // >
          //   {listCreateOption.map((option: ListOptions) => {
          //     return (
          //       <Option key={option?.value} value={option?.value}>
          //         <Link to={option?.link || '/'}>{option?.value}</Link>
          //       </Option>
          //     );
          //   })}
          // </SelectCustom>,
          <Link to={'/levelManagement/request-list/add-new-ca'} key={'btn-add-new'}>
            <ButtonCustom
              style={{ borderRadius: '8px' }}
              icon={<AddBlueIcon />}
              className="btn-custom btn-primary-blue btn-add"
            >
              Tạo mới
            </ButtonCustom>
          </Link>,
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
            onChange={(e) => handleSearchChange(e.target.value)}
            value={valueinput}
            style={{ width: '250px' }}
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
                <Option key={optionParent.value} value={optionParent.value}>
                  {optionParent.value}
                </Option>
              );
            })}
          </SelectCustom>
        </div>
        {items.map((item) => {
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
      </PageHeader>
    );
  }, [onSelect, onSelectFilterChild, items, valueinput]);

  return (
    <>
      <div className="wrapper-page-container">
        {BuildPageHeader}
        <PageContainer
          breadcrumbRender={false}
          title={false}
          pageHeaderRender={false}
          className="page-container-custom-v2"
        >
          <Card
            style={{
              width: '100%',
            }}
          >
            <ProTableCustom
              scroll={{ x: 1440 }}
              toolBarRender={false}
              defaultSize="middle"
              search={false}
              cardBordered={{
                table: true,
              }}
              bordered={true}
              columns={columnsTableTrustCA({
                setItems: (value) => handleItemModal(value),
                pageCurrents: pageCurrents,
                pageSize: pageSizeRef.current,
              })}
              rowKey="id"
              dataSource={listTrustCA}
              request={async (params = {}) => {
                const pageCurrent = params?.current ? Math.floor(params?.current - 1) : '0';
                return runListInquiryCA({
                  page: pageCurrent,
                  size: params.pageSize,
                  phone: valueinput,
                });
              }}
              pagination={{
                className: 'pagination-custom',
                locale: { items_per_page: '' },
                total: totalPages,
                current: pageCurrents,
                pageSize: pageSizeRef.current,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `Từ ${range[0]} đến ${range[1]} trên tổng số ${total} kết quả`,
                onChange: (newCurrent, newPageSize) => {
                  const pageSizeChange = pageSizeRef.current !== newPageSize;
                  if (pageSizeChange) {
                    setPageCurrents(1);
                  } else {
                    setPageCurrents(newCurrent);
                  }
                  pageSizeRef.current = newPageSize;
                  runListInquiryCA({ page: newCurrent - 1, size: newPageSize, phone: valueinput });
                },
              }}
            />
          </Card>
        </PageContainer>
        <ModalInforSortDocument
          visible={visible}
          cancelModal={(value: boolean) => cancelModal(value)}
          itemModal={itemModal}
        />
      </div>
    </>
  );
};

export default RequestListPage;
