import { Body1, Body2, Body3 } from '@/components';
import ButtonCustom from '@/components/Button';
import ProcessCustom from '@/components/Process';
import ProTableCustom from '@/components/ProTable';
import { StatusRequest } from '@/pages/LevelManagement/RequestListPage/data';
import { ArrowLeftBlackIcon, ArrowRightBlackIcon, CloseOutFillIcon } from '@/themes/icons';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useCallback, useState } from 'react';
import { TrustDocumentType } from '../model';
import { listTypeDocument, listTypeDocumentBusiness } from './SelectUpload';

type InfoEnteringProps = {
  dataInquiry: API.GetInquiryCAByIdResponse;
  dataDocument?: API.GetInfoTrustDocumentOfInquiryCAResponse;
  listDocument: API.TrustDocument[];
  handleUploadDocument: (value: any) => void;
  isIndividual?: boolean;
};

const InforEntering: React.FC<InfoEnteringProps> = (props) => {
  const { isIndividual, dataInquiry, dataDocument, listDocument, handleUploadDocument } = props;

  const { enterpriseCA, buyerInfo } = dataInquiry;

  const handleUploadDocumentChild = useCallback(
    (value: any) => {
      const selectUploadDocs = (values: any, listType: any[]) => {
        for (let i = 0; i < listType.length; i++) {
          const type = listType[i];
          for (let j = 0; j < type?.listChild.length; j++) {
            const typeChild = type?.listChild[j];
            if (values === typeChild?.id) {
              handleUploadDocument(typeChild);
              break;
            }
          }
        }
      };
      if (!dataInquiry?.individualOrEnterprise || isIndividual) {
        selectUploadDocs(value, listTypeDocument);
        return;
      }
      selectUploadDocs(value, listTypeDocumentBusiness);
    },
    [dataInquiry?.individualOrEnterprise, handleUploadDocument, isIndividual],
  );

  const BuildGroupInfo = (propsGroup: { label: string; value: string }) => {
    return (
      <div className="form-info-show-group">
        <div className="info-show-label">{propsGroup.label}</div>
        <div className="info-show-value" style={{ textTransform: 'capitalize' }}>
          {propsGroup.value}
        </div>
      </div>
    );
  };
  const BuildInforUnit = () => {
    return (
      <>
        <Body3 style={{ color: '#525B73' }}>THÔNG TIN ĐƠN VỊ</Body3>
        <div className="form-info-show">
          <BuildGroupInfo label="Tên công ty" value={enterpriseCA?.enterpriseName || '---'} />
          <BuildGroupInfo
            label="Tỉnh/Thành phố"
            value={
              enterpriseCA?.addressDetail?.city || dataInquiry?.contactAddressDetail?.city || '---'
            }
          />
          <BuildGroupInfo
            label="Địa chỉ đầy đủ"
            value={
              enterpriseCA?.address ||
              dataInquiry?.contactAddressDetail?.address ||
              enterpriseCA?.addressDetail?.address ||
              '---'
            }
          />
          <BuildGroupInfo label="Mã số thuế" value={enterpriseCA?.taxCode || '---'} />
          <BuildGroupInfo
            label="Quận/Huyện"
            value={
              enterpriseCA?.addressDetail?.district ||
              dataInquiry?.contactAddressDetail?.district ||
              enterpriseCA?.addressDetail?.district ||
              '---'
            }
          />
          <BuildGroupInfo label="Quốc gia" value={'---'} />
          <BuildGroupInfo
            label="Phường/Xã"
            value={
              enterpriseCA?.addressDetail?.ward ||
              dataInquiry?.contactAddressDetail?.ward ||
              enterpriseCA?.addressDetail?.ward ||
              '---'
            }
          />
        </div>
      </>
    );
  };

  // const BuildInforLeaderShip = () => {
  //   return (
  //     <>
  //       <Body3 style={{ color: '#525B73' }}>
  //         THÔNG TIN LÃNH ĐẠO DOANH NGHIỆP (Giám đốc/Tổng giám đốc)
  //       </Body3>
  //       <div className="form-info-show">
  //         <BuildGroupInfo label="Họ tên" value="---" />
  //         <BuildGroupInfo label="Số điện thoại" value="---" />
  //         <BuildGroupInfo label="Email" value="---" />
  //       </div>
  //     </>
  //   );
  // };

  const BuildInforBuyUser = (propsChild: { buyerInfoChild: API.BasicInfo | undefined }) => {
    const { buyerInfoChild } = propsChild;
    return (
      <>
        <Body3 style={{ color: '#525B73' }}>NGƯỜI ĐẠI DIỆN MUA HÀNG</Body3>
        <div className="form-info-show">
          <BuildGroupInfo label="Họ tên" value={buyerInfoChild?.fullName || '---'} />
          <BuildGroupInfo label="Số điện thoại" value={buyerInfoChild?.phoneNumber || '---'} />
          <BuildGroupInfo label="Email" value={buyerInfoChild?.emailAddress || '---'} />
          <BuildGroupInfo label="Email thêm nhận thông báo (Nếu có)" value={'---'} />
        </div>
      </>
    );
  };

  const BuildCertificate = () => {
    return (
      <>
        <Body3 style={{ color: '#525B73', marginTop: '20px' }}>NGƯỜI SỞ HỮU CHỨNG THƯ</Body3>
        <div className="form-info-show">
          <BuildGroupInfo
            label="Họ tên"
            value={
              dataInquiry?.enterpriseCA?.legalRepresentative?.fullName?.toLowerCase() ||
              dataInquiry?.individualCA?.fullName?.toLowerCase() ||
              '---'
            }
          />
          <BuildGroupInfo
            label="Email (dùng để kích hoat chứng thư)"
            value={
              dataInquiry?.enterpriseCA?.legalRepresentative?.emailAddress ||
              dataInquiry?.individualCA?.emailAddress ||
              '---'
            }
          />
          <BuildGroupInfo
            label="Số điện thoại"
            value={
              dataInquiry?.enterpriseCA?.legalRepresentative?.phoneNumber ||
              dataInquiry?.individualCA?.phoneNumber ||
              '---'
            }
          />
        </div>
      </>
    );
  };
  const percentSuccess =
    dataDocument?.numOfAvailableDocument &&
    dataDocument?.numberOfDocument &&
    Math.floor((dataDocument?.numOfAvailableDocument * 100) / dataDocument?.numberOfDocument);
  const [isVisible, setIsVisible] = useState(false);
  const [imageCurrent, setImageCurrent] = useState(0);
  const [files, setFiles] = useState<string[]>();
  const BuildProTable = () => {
    const getColumns = () => {
      return [
        {
          title: 'STT',
          dataIndex: 'index',
          valueType: 'index',
        },
        {
          title: 'Loại tài liệu',
          dataIndex: 'type',
          key: 'type',
          render: (_: any, trustDocument: API.TrustDocument) => {
            const titleTypeDocument = trustDocument?.type && TrustDocumentType[trustDocument.type];
            return <div>{titleTypeDocument}</div>;
          },
        },
        {
          title: 'Tên file',
          dataIndex: 'documentUrlList',
          key: 'documentUrlList',
          render: (__: any, trustDocument: API.TrustDocument) => {
            return (
              <div className="gruop-download-file">
                {trustDocument?.documentUrlList &&
                  trustDocument?.documentUrlList?.map((file: string, index: any) => {
                    return (
                      <>
                        <span
                          style={{
                            marginRight: '4px',
                            textDecoration: 'underline',
                            color: '#244AB1',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            if (file?.indexOf('pdf') > -1) {
                              window.open(file, '_blank');
                              return;
                            }
                            setIsVisible(true);
                            setFiles(trustDocument?.documentUrlList);
                            setImageCurrent(index);
                          }}
                        >
                          {`Tài liệu${index + 1}`}
                        </span>
                      </>
                    );
                  })}
              </div>
            );
          },
        },
        {
          title: 'Trạng thái phê duyệt',
          dataIndex: 'approve',
          key: 'approve',
          render: (__: any, trustDocument: API.TrustDocument) => {
            return (
              <ButtonCustom
                className={`btn-custom ${
                  trustDocument?.approve === 'SUCCESSFULLY_APPROVED'
                    ? 'btn-success'
                    : trustDocument?.approve === 'UNSUCCESSFULLY_APPROVED'
                    ? 'btn-dangerous'
                    : 'btn-normal'
                }`}
                onClick={() => handleUploadDocumentChild(trustDocument?.type)}
              >
                {trustDocument.approve && StatusRequest[trustDocument.approve]}
              </ButtonCustom>
            );
          },
        },
      ];
    };

    return (
      <ProTableCustom
        toolBarRender={false}
        search={false}
        columns={getColumns()}
        cardBordered={{
          table: true,
        }}
        bordered={true}
        pagination={false}
        rowKey={'row-key-1'}
        dataSource={listDocument}
      />
    );
  };
  return (
    <div className="form-info-entering">
      <div>
        <Body1 className="fw-bold">Thông tin đã điền ở bước trước</Body1>
      </div>
      <div className="form-custom" style={{ padding: '16px', maxWidth: '1128px' }}>
        {enterpriseCA && <BuildInforUnit />}
        {/* <div className="divider-line" /> */}
        {/* <BuildInforLeaderShip /> */}
        <BuildInforBuyUser buyerInfoChild={buyerInfo} />
        <div className="divider-line" />
        <BuildCertificate />
      </div>
      <div className="table-form-uploadca" style={{ maxWidth: '1128px' }}>
        <div className="uploadca-title">
          <Body2>Thông tin hồ sơ bản mềm</Body2>
          <ProcessCustom
            type="circle"
            percent={percentSuccess}
            width={40}
            status="success"
            format={() => (
              <span>
                {dataDocument?.numOfAvailableDocument} / {dataDocument?.numberOfDocument}
              </span>
            )}
          />
        </div>
        <BuildProTable />
      </div>
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

export default InforEntering;
