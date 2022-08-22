import ButtonCustom from '@/components/Button';
import CardUser from '@/components/Card/CardUser';
import CustomStatus from '@/components/CustomStatus';
import DropdownCustom from '@/components/Dropdown';
import ProcessCustom from '@/components/Process';
import { ThreeDotIcon } from '@/themes/icons';
import { CaretDownOutlined } from '@ant-design/icons';
import { Menu, Space } from 'antd';
import { history } from 'umi';
import { InquiryCAType, StatusRequest } from '../data';

const convertObjectUse = (txt: boolean | undefined) => {
  const text = txt ? 'Cá nhân thuộc tổ chức' : 'Cá nhân';
  return text;
};

const convertInvoice = (txt: boolean | undefined) => {
  const text = txt ? 'Đã hoàn thành' : 'Chưa hoàn thành';
  return text;
};

const columnsTableTrustCA = (props: {
  setItems: (value: any) => void;
  pageCurrents: number;
  pageSize: number;
}) => {
  const { setItems, pageCurrents, pageSize } = props;
  return [
    {
      title: 'STT',
      dataIndex: 'index',
      valueType: 'index',
      render: (item: any, trust: API.InquiryCADto, index: number) => {
        const count = pageSize * (pageCurrents - 1);
        const indexCurrent =
          pageCurrents > 1 ? Math.floor(index + 1 + count) : Math.floor(index + 1);
        return <span>{indexCurrent}</span>;
      },
    },
    {
      title: 'Mã yêu cầu',
      copyable: true,
      dataIndex: 'showId',
      key: 'showId',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        a?.showId?.localeCompare(b?.showId as string),
      render: (_: any, trust: API.InquiryCADto) => {
        return (
          <span
            style={{ textTransform: 'capitalize', cursor: 'pointer' }}
            onClick={() => {
              history.replace(`/levelManagement/request-list/add-new-ca?inquiryId=${trust.id}`);
            }}
          >
            {trust.showId}
          </span>
        );
      },
    },
    {
      title: 'Loại yêu cầu',
      dataIndex: 'inquiryCAType',
      key: 'inquiryCAType',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        a?.inquiryCAType?.localeCompare(b?.inquiryCAType as string),
      render: (_: any, trust: API.InquiryCADto) => {
        return (
          <span style={{ textTransform: 'capitalize' }}>
            {trust?.inquiryCAType && InquiryCAType[trust.inquiryCAType]}
          </span>
        );
      },
    },
    {
      title: 'Thông tin khách hàng',
      key: 'user',
      dataIndex: 'user',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        a?.user?.fullName?.localeCompare(b?.user?.fullName as string),
      render: (_: any, trust: API.InquiryCADto) => {
        return <CardUser dataUser={trust.user} />;
      },
    },
    {
      title: 'Đối tượng sử dụng',
      key: 'individualOrEnterprise',
      dataIndex: 'individualOrEnterprise',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        convertObjectUse(a?.individualOrEnterprise)?.localeCompare(
          convertObjectUse(b?.individualOrEnterprise),
        ),
      render: (_: any, trust: API.InquiryCADto) => {
        return <span>{convertObjectUse(trust?.individualOrEnterprise)}</span>;
      },
    },
    {
      title: 'Gói dịch vụ',
      key: 'subscriptionId',
      dataIndex: 'subscriptionId',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        a?.subscriptionId?.localeCompare(b?.subscriptionId as string),
      render: (_: any, trust: API.InquiryCADto) => {
        return (
          <span style={{ textTransform: 'capitalize' }}>
            {trust.subscriptionId ? trust.subscriptionId : 'Nâng cao 1'}
          </span>
        );
      },
    },
    {
      title: 'HS bản mềm',
      key: 'softDocumentInfo',
      dataIndex: 'softDocumentInfo',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        a?.softDocumentInfo?.numOfAvailableDocument
          ?.toString()
          ?.localeCompare(b?.softDocumentInfo?.numOfAvailableDocument?.toString() as string),
      render: (_: any, trust: API.InquiryCADto) => {
        const { softDocumentInfo } = trust;
        let numberOfDocument: number = 0;
        let numOfAvailableDocument: number = 0;
        if (softDocumentInfo) {
          numOfAvailableDocument = softDocumentInfo.numOfAvailableDocument || 0;
          numberOfDocument = softDocumentInfo.numberOfDocument || 0;
        }

        const percentSuccess = Math.floor((numOfAvailableDocument * 100) / numberOfDocument);
        return (
          <>
            <ButtonCustom className="btn-process-arrow" onClick={() => setItems(softDocumentInfo)}>
              <ProcessCustom
                type="circle"
                percent={percentSuccess}
                width={40}
                status="success"
                format={() => (
                  <span>
                    {numOfAvailableDocument} / {numberOfDocument}
                  </span>
                )}
              />
              <CaretDownOutlined style={{ width: '24px', height: '24px' }} />
            </ButtonCustom>
          </>
        );
      },
    },
    {
      title: 'HS bản cứng',
      key: 'completeHardFile',
      dataIndex: 'completeHardFile',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        convertInvoice(a?.completeHardFile).localeCompare(convertInvoice(b?.completeHardFile)),
      render: (_: any, trust: API.InquiryCADto) => {
        const { completeHardFile } = trust;
        const titleDropdown = completeHardFile ? 'Đã hoàn thành' : 'Chưa hoàn thành';
        // const itemMenuDroprown = completeHardFile ? 'Chưa hoàn thành' : 'Đã hoàn thành';
        // const menu = (
        //   <Menu
        //     items={[
        //       {
        //         label: itemMenuDroprown,
        //         key: '0',
        //       },
        //     ]}
        //   />
        // );

        return (
          // <DropdownCustom
          //   className={`${completeHardFile ? 'dropdown-success' : 'dropdown-dangerous'}`}
          //   overlay={menu}
          // >
          //   <a onClick={(e) => e.preventDefault()}>
          //     <Space style={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
          //       {titleDropdown}
          //       <CaretDownOutlined />
          //     </Space>
          //   </a>
          // </DropdownCustom>
          <Space
            className={`dropdown-custom hidden-arrow ${
              completeHardFile ? 'dropdown-success' : 'dropdown-dangerous'
            }`}
            style={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}
          >
            {titleDropdown}
            <CaretDownOutlined />
          </Space>
        );
      },
    },
    {
      title: 'Trạng thái yêu cầu',
      key: 'isApprovingCA',
      dataIndex: 'isApprovingCA',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        StatusRequest[a?.isApprovingCA || 'APPROVE'].localeCompare(
          StatusRequest[b?.isApprovingCA || 'APPROVE'],
        ),
      render: (_: any, trust: API.InquiryCADto) => {
        let classNameStatus = '';
        const { isApprovingCA } = trust;
        switch (isApprovingCA) {
          case Object.keys(StatusRequest)[2]:
            classNameStatus = 'custom-status-success';
            break;
          case Object.keys(StatusRequest)[3]:
            classNameStatus = 'custom-status-dangerous';
            break;
          case Object.keys(StatusRequest)[0]:
            classNameStatus = 'custom-status-normal';
            break;
          default:
            classNameStatus = 'custom-status-normal';
            break;
        }
        return (
          <CustomStatus
            className={classNameStatus}
            text={isApprovingCA && StatusRequest[isApprovingCA.toUpperCase()]}
          />
        );
      },
    },
    {
      render: (_: any, trust: API.InquiryCADto) => {
        const menu = (
          <Menu
            items={[
              {
                label: 'Xem chi tiết',
                key: 0,
                onClick: () => {
                  history.replace(`/levelManagement/request-list/add-new-ca?inquiryId=${trust.id}`);
                },
              },
            ]}
          />
        );
        return (
          <DropdownCustom overlay={menu} overlayStyle={{ backgroundColor: 'transparent' }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <ThreeDotIcon />
              </Space>
            </a>
          </DropdownCustom>
        );
      },
    },
  ];
};

export default columnsTableTrustCA;
