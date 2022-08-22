import ButtonCustom from '@/components/Button';
import ProTableCustom from '@/components/ProTable';
import {
  ArrowLeftBlackIcon,
  ArrowRightBlackIcon,
  CheckCircleFillIcon,
  CheckCircleFillIconX,
  CloseOutFillIcon,
  ShowIcon,
} from '@/themes/icons';
import {
  CAHistoryDTOType,
  CertificateReasonType,
  convertDateTimeStr,
  TrustDocumentType,
} from '@/utils/main';
import { UploadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Breadcrumb, Image } from 'antd';
import { useState } from 'react';
import { Link } from 'umi';

export const BuildBreadcrumb = () => {
  return (
    <Breadcrumb separator=">" className="breadcrumb-custom">
      <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={`/levelManagement/certificate-list`}>Danh sách chứng thư</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Chi tiết khách hàng</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export const BuildTableChild = (props: { item: API.TrustDocument }) => {
  const { item } = props;
  const listDocument = Object.values(item ?? {}) as API.TrustDocument[];
  const [isVisible, setIsVisible] = useState(false);
  const [imageCurrent, setImageCurrent] = useState(0);
  const [files, setFiles] = useState<string[]>();
  const getColumns = () => {
    return [
      {
        title: 'STT',
        dataIndex: 'index',
        valueType: 'index',
      },
      {
        title: 'Loại tài liệu',
        dataIndex: '',
        key: '',
        render: (_: any, record: API.TrustDocument) => {
          return TrustDocumentType[record?.type ? record?.type : ''];
        },
      },
      {
        title: 'Tên file',
        dataIndex: '',
        key: '',
        render: (__: any, record: API.TrustDocument) => {
          return (
            <div className="gruop-download-file">
              {record?.documentUrlList &&
                record?.documentUrlList.map((file: string, index: any) => {
                  return (
                    <>
                      <span
                        style={{
                          marginRight: '12px',
                          textDecoration: 'underline',
                          color: '#244AB1',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          if (file?.indexOf('pdf') > -1) {
                            window.open(file, '_blank');
                          } else {
                            setIsVisible(true);
                            setFiles(record?.documentUrlList);
                            setImageCurrent(index);
                          }
                        }}
                      >
                        {`Tài liệu${index + 1}`}
                      </span>
                    </>
                  );
                })}
              <ButtonCustom icon={<UploadOutlined />} className="btn-custom btn-icon btn-normal" />
            </div>
            // <div className="gruop-download-file">
            //   <a href={record.link}>{record.name}</a>
            // </div>
          );
        },
      },
    ];
  };
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <ProTableCustom
        rowKey={'row-key-1'}
        toolBarRender={false}
        search={false}
        columns={getColumns()}
        pagination={false}
        dataSource={listDocument}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: listDocument,
            success: true,
          });
        }}
        bordered={true}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          key={indexedDB.toString()}
          icons={{
            close: (
              <div
                onClick={() => {
                  setIsVisible(false);
                  setFiles([]);
                }}
              >
                <CloseOutFillIcon />
              </div>
            ),
            right: <ArrowRightBlackIcon style={{ width: '24px' }} />,
            left: <ArrowLeftBlackIcon style={{ width: '24px' }} />,
            zoomIn: <ZoomInOutlined />,
            zoomOut: <ZoomOutOutlined />,
          }}
          preview={{
            className: 'preview-custom-image',
            current: imageCurrent,
            visible: isVisible,
            onVisibleChange: (value) => {
              setIsVisible(value);
            },
            footer: (
              <div className="ant-image-preview-footer-custom">
                {files?.map((file, index) => (
                  <img
                    src={file}
                    key={file}
                    onClick={() => {
                      setImageCurrent(index);
                    }}
                  />
                ))}
              </div>
            ),
          }}
        >
          {files &&
            files?.length > 0 &&
            files?.map((file, index) => (
              <Image className="image-slide-main" key={`${index.toString()}`} src={file} />
            ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};

export const BuildTableChildBill = (props: { item: API.GetInvoiceInfoResponse | undefined }) => {
  const { item } = props;
  const listDocument = [item ?? {}];
  const getColumns = () => {
    return [
      {
        title: 'STT',
        dataIndex: 'index',
        valueType: 'index',
      },
      {
        title: 'Mã hóa đơn',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Thao tác',
        render: () => {
          return (
            <div>
              <ShowIcon />
            </div>
          );
        },
      },
    ];
  };
  return (
    <div
      style={{
        maxWidth: '421px',
        width: '100%',
      }}
    >
      <ProTableCustom
        rowKey={'row-key-1'}
        toolBarRender={false}
        search={false}
        columns={getColumns()}
        pagination={false}
        dataSource={listDocument}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: listDocument,
            success: true,
          });
        }}
        bordered={true}
      />
    </div>
  );
};

export const BuildTableChildRequest = (props: { item: any }) => {
  const { item } = props;
  const getColumns = () => {
    return [
      {
        title: 'STT',
        dataIndex: 'index',
        valueType: 'index',
      },
      {
        title: 'Mã yêu cầu',
        dataIndex: 'codeBill',
        key: 'codeBill',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (_: any, record: { status: string }) => {
          return (
            <ButtonCustom className="btn-custom btn-processing">{record?.status}</ButtonCustom>
          );
        },
      },
      {
        title: 'Thao tác',
        render: () => {
          return (
            <div>
              <ShowIcon />
            </div>
          );
        },
      },
    ];
  };
  return (
    <div
      style={{
        maxWidth: '421px',
        width: '100%',
      }}
    >
      <ProTableCustom
        rowKey={'row-key-1'}
        toolBarRender={false}
        search={false}
        columns={getColumns()}
        pagination={false}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: item,
            success: true,
          });
        }}
        bordered={true}
      />
    </div>
  );
};

export const BuildTableChildHistory = (props: { item: API.GetLockHistoryOfCAResponse }) => {
  const { item } = props;
  const listHistory = item?.caHistoryDTOS;
  const getColumns = () => {
    return [
      {
        title: 'STT',
        dataIndex: 'index',
        valueType: 'index',
      },
      {
        title: 'Hành động',
        dataIndex: 'type',
        key: 'type',
        render: (_: any, record: { type: string }) => {
          return <span className="text-detail-history">{CAHistoryDTOType[record?.type]} </span>;
        },
      },
      {
        title: 'Thời gian thực hiện',
        dataIndex: 'time',
        key: 'time',
        render: (_: any, record: { time: string }) => {
          return <span className="text-detail-history">{convertDateTimeStr(record?.time)} </span>;
        },
      },
      {
        title: 'Tài khoản thực hiện',
        dataIndex: 'approvedByUserId',
        key: 'approvedByUserId',
        render: (_: any, record: { approvedByUser: API.User }) => {
          return (
            <>
              <span className="text-detail-history">{record?.approvedByUser?.fullName}</span>
              <br />
              SĐT: <span>{record?.approvedByUser?.phone}</span>
            </>
          );
        },
      },
      {
        title: 'Lý do',
        dataIndex: 'reason',
        key: 'reason',
        render: (_: any, record: { reason: string }) => {
          return <span>{CertificateReasonType[record?.reason]}</span>;
        },
      },
    ];
  };
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <ProTableCustom
        rowKey={'row-key-1'}
        toolBarRender={false}
        search={false}
        columns={getColumns()}
        pagination={false}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: listHistory,
            success: true,
          });
        }}
        bordered={true}
        scroll={{ y: 300 }}
        className="table-history-lock-CA"
      />
    </div>
  );
};

export const BuildDetailStatusOperating = (detailCAActive: any) => {
  let status = '';
  switch (detailCAActive?.subscriptionInfo?.activeStatus) {
    case 'ACTIVE':
      status = 'Đang hoạt động';
      break;
    case 'INACTIVE':
      status = 'Chưa hoạt động';
      break;
    case 'EXPIRE':
      status = 'Đã hết hạn';
      break;
    case 'REVOKE':
      status = 'Đã thu hồi';
      break;
    case 'LOCK':
      status = 'Đã khóa';
      break;
    case 'STOP':
      status = 'Đã tạm dừng';
      break;
    default:
      status = '';
      break;
  }
  if (status === 'Đang hoạt động')
    return (
      <>
        {status}
        <CheckCircleFillIcon style={{ marginLeft: 6 }} />
      </>
    );
  else
    return (
      <>
        {status}
        <CheckCircleFillIconX style={{ marginLeft: 6 }} />
      </>
    );
};
