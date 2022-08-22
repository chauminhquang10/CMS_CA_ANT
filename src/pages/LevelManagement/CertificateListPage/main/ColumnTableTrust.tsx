import avatarImg from '@/assets/images/png/avatar/user-male.png';
import ButtonCustom from '@/components/Button';
import CardUser from '@/components/Card/CardUser';
import CustomStatus from '@/components/CustomStatus';
import DropdownCustom from '@/components/Dropdown';
import ProcessCustom from '@/components/Process';
import ProcessDate from '@/components/ProcessDate';
import { ThreeDotIcon } from '@/themes/icons';
import { CertificateStatus } from '@/utils/main';
import { CaretDownOutlined } from '@ant-design/icons';
import { Breadcrumb, Menu, Space } from 'antd';
import moment from 'moment';
import { history, Link } from 'umi';

export const BuildBreadcrumb = () => {
  return (
    <Breadcrumb separator=">" className="breadcrumb-custom">
      <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
      <Breadcrumb.Item>Quản lý cấp phát</Breadcrumb.Item>
      <Breadcrumb.Item href="/levelManagement/certificate-list">
        Danh sách chứng thư
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export const ColumnsTableUser = (props: { setItems: (value: any) => void }) => {
  const { setItems } = props;
  const handlelickDetail = (value: string | undefined) => {
    history.push(`/levelManagement/certificate-list/customer-details?userId=${value}`);
    // window.open(`/levelManagement/certificate-list/customer-details?userId=${value}`, '_blank');
  };
  return [
    {
      title: 'STT',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: 'Thông tin khách hàng',
      key: 'user',
      dataIndex: 'user',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        a?.user?.fullName?.localeCompare(b?.user?.fullName as string),
      render: (_: any, record: API.InquiryCADto) => {
        const { id } = record;
        return (
          <Link to={`/levelManagement/certificate-list/customer-details?userId=${id}`}>
            <CardUser avatar={avatarImg} dataUser={record?.user} />
          </Link>
        );
      },
    },
    {
      title: 'Trạng thái chứng thư',
      //   key: 'statusRequest',
      //   dataIndex: 'statusRequest',
      //   sorter: (a: any, b: any) => a.individualOrEnterprise - b.individualOrEnterprise,

      render: (_: any, record: API.InquiryCADto) => {
        let classNameStatus = '';
        let textStatus = '';
        const { isActive } = record;
        if (isActive) textStatus = CertificateStatus[isActive];
        switch (isActive) {
          case 'ACTIVE':
            classNameStatus = 'custom-status-normal';
            break;
          case 'INACTIVE':
            classNameStatus = 'custom-status-warning';
            break;
          case 'EXPIRE':
            classNameStatus = 'custom-status-dangerous';
            break;
          case 'REVOKE':
            classNameStatus = 'custom-status-dangerous';
            break;
          case 'LOCK':
            classNameStatus = 'custom-status-warning';
            break;
          case 'STOP':
            classNameStatus = 'custom-status-warning';
            break;
          default:
            classNameStatus = '';
            textStatus = '';
            break;
        }
        return <CustomStatus className={classNameStatus} text={textStatus} />;
      },
    },
    {
      title: 'Đối tượng sử dụng',
      key: 'individualOrEnterprise',
      dataIndex: 'individualOrEnterprise',
      //   sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
      //     a?.user?.fullName?.localeCompare(b?.user?.fullName as string),
      render: (_: any, record: API.InquiryCADto) => {
        return <span>{record?.individualOrEnterprise ? 'Cá nhân thuộc tổ chức' : 'Cá nhân'}</span>;
      },
    },
    {
      title: 'Thời hạn chứng thư',
      dataIndex: '',
      key: '',
      width: '300px',
      valueType: 'date',
      sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
        moment(a?.dateBegin).unix() - moment(b?.dateBegin).unix(),
      render: (_: any, record: API.InquiryCADto) => {
        return (
          <ProcessDate
            fromDate={
              moment(record?.dateBegin).isValid() ? moment(record?.dateBegin).toString() : ''
            }
            toDate={
              moment(record?.dateExpire).isValid() ? moment(record?.dateExpire).toString() : ''
            }
          />
        );
      },
    },
    {
      title: 'Gói dịch vụ',
      key: 'inquiryCAType',
      dataIndex: 'inquiryCAType',
      render: () => {
        return <span>Nâng cao 1</span>;
      },
    },
    {
      title: 'HS bản mềm',
      key: 'softDocumentInfo',
      dataIndex: 'softDocumentInfo',
      render: (_: any, record: API.InquiryCADto) => {
        const { softDocumentInfo } = record;
        let numberOfDocument: number = 0;
        let numOfAvailableDocument: number = 0;
        if (softDocumentInfo) {
          numOfAvailableDocument = softDocumentInfo?.numOfAvailableDocument || 0;
          numberOfDocument = softDocumentInfo?.numberOfDocument || 0;
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
      key: 'hsBanCung',
      dataIndex: 'hsBanCung',
      render: (_: any, record: API.InquiryCADto) => {
        const { completeHardFile } = record;
        const titleDropdown = completeHardFile ? 'Đã hoàn thành' : 'Chưa hoàn thành';
        // const itemMenuDroprown = completeHardFile ? 'Chưa hoàn thành' : 'Đã hoàn thành';
        // const menu = (
        //   <Menu
        // items={[
        //   {
        //     label: itemMenuDroprown,
        //     key: '0',
        //   },
        // ]}
        //   />
        // );

        return (
          <DropdownCustom
            className={`${
              completeHardFile
                ? 'dropdown-custom dropdown-success'
                : 'dropdown-custom dropdown-dangerous'
            }`}
            overlay={<></>}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                {titleDropdown}
                {/* <CaretDownOutlined /> */}
              </Space>
            </a>
          </DropdownCustom>
        );
      },
    },
    {
      render: (_: any, record: API.InquiryCADto) => {
        const { id } = record;
        const menu = (
          <Menu
            items={[
              {
                label: 'Xem chi tiết',
                key: 0,
                onClick: () => handlelickDetail(id),
              },
            ]}
          />
        );
        return (
          <DropdownCustom
            overlay={menu}
            overlayStyle={{ backgroundColor: 'transparent' }}
            overlayClassName="dropdown-custom-table"
          >
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

export default ColumnsTableUser;
