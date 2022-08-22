import ButtonCustom from '@/components/Button';
import ModalMain from '@/components/Modal';
import ProcessCustom from '@/components/Process';
import ProTableCustom from '@/components/ProTable';
import { TrustDocumentType } from '../../AddNewCA/StepUploadDeed/model';
import type { softDocumentInfoModel, TrustDocumentModel } from '../data';
import { StatusRequest } from '../data';
import { Image } from 'antd';
import { useState } from 'react';
import { ArrowLeftBlackIcon, ArrowRightBlackIcon, CloseOutFillIcon } from '@/themes/icons';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

const BuildModalChild = (props: {
  cancelModal: any;
  itemModal: softDocumentInfoModel;
  visible: boolean;
}) => {
  const { cancelModal, itemModal, visible } = props;
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
        dataIndex: 'type',
        key: 'type',
        render: (_: any, trustDocument: TrustDocumentModel) => {
          const titleTypeDocument = TrustDocumentType[trustDocument.type];
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
                          } else {
                            setIsVisible(true);
                            setFiles(trustDocument?.documentUrlList);
                            setImageCurrent(index);
                          }
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
        render: (__: any, trustDocument: TrustDocumentModel) => {
          return (
            <ButtonCustom
              className={`btn-custom ${
                trustDocument?.approve === 'SUCCESSFULLY_APPROVED'
                  ? 'btn-success'
                  : trustDocument?.approve === 'UNSUCCESSFULLY_APPROVED'
                  ? 'btn-dangerous'
                  : 'btn-normal'
              }`}
            >
              {StatusRequest[trustDocument.approve]}
            </ButtonCustom>
          );
        },
      },
    ];
  };
  if (!itemModal) return <span />;
  const { numOfAvailableDocument, numberOfDocument, trustDocuments } = itemModal;
  const percentSuccess = Math.floor((numOfAvailableDocument * 100) / numberOfDocument);
  const listDocument: TrustDocumentModel[] = Object.entries(trustDocuments)
    .filter((key) => key[1] !== null)
    .map(function (key) {
      const keyDocs = key[0];
      return trustDocuments[keyDocs];
    });

  return (
    <ModalMain
      title={
        <div className="header-popup">
          <div className="header-popup-left">
            <h4 style={{ marginRight: '8px' }}>Thông tin hồ sơ bản mềm</h4>
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
          </div>
        </div>
      }
      visible={visible}
      handle={() => cancelModal(false)}
      footer={false}
    >
      <ProTableCustom
        toolBarRender={false}
        search={false}
        columns={getColumns()}
        pagination={false}
        rowKey={'row-key-1'}
        dataSource={listDocument}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: listDocument,
            success: true,
          });
        }}
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
            destroyOnClose: true,
          }}
        >
          {files &&
            files?.length > 0 &&
            files?.map((file, index) => (
              <Image className="image-slide-main" key={`${index.toString()}`} src={file} />
            ))}
        </Image.PreviewGroup>
      </div>
    </ModalMain>
  );
};

export default BuildModalChild;
