import { Body1 } from '@/components';
import CollapseCustom from '@/components/Collapse';
import { CheckCircleFillIcon, UploadIcon } from '@/themes/icons';
import { Collapse, Tooltip } from 'antd';
import React, { useCallback, useMemo } from 'react';
import type { ListUploadModel, ListUploadDeedModel } from '../model';
const { Panel } = Collapse;

type SelectUploadProps = {
  isActive?: boolean;
  dataInquiry?: API.GetInquiryCAByIdResponse;
  handleUploadDocument: (value: any) => void;
  isIndividual?: boolean;
  listDocument?: API.TrustDocument[];
};

export const listTypeDocument: ListUploadModel[] = [
  {
    key: 1,
    title: 'Thông tin người đại diện theo pháp luật',
    listChild: [
      {
        key: 1,
        title: 'Chứng minh nhân dân',
        value: 'Thông tin người đại diện theo pháp luật',
        id: 'ID_CARD',
        isIvidual: true,
      },
      {
        key: 2,
        title: 'Căn cước công dân',
        value: 'Thông tin người đại diện theo pháp luật',
        id: 'CCCD',
        isIvidual: true,
      },
      {
        key: 3,
        title: 'Hộ chiếu',
        value: 'Thông tin người đại diện theo pháp luật',
        id: 'PASSPORT',
        isIvidual: true,
      },
    ],
  },
  {
    key: 2,
    title: 'Đơn đề nghị cấp chứng thư',
    listChild: [
      {
        key: 1,
        title: 'Đơn đề nghị cấp chứng thư',
        value: 'Đơn đề nghị cấp chứng thư',
        id: 'INQUIRY_CA_FORM',
        isIvidual: false,
      },
    ],
  },
];

export const listTypeDocumentBusiness: ListUploadModel[] = [
  {
    key: 0,
    title: ' Thông tin người đại diện theo pháp luật',
    listChild: [
      {
        key: 1,
        title: 'Chứng minh nhân dân',
        value: 'Thông tin người đại diện theo pháp luật',
        id: 'ID_CARD',
        isIvidual: true,
      },
      {
        key: 2,
        title: 'Căn cước công dân',
        value: 'Thông tin người đại diện theo pháp luật',
        id: 'CCCD',
        isIvidual: true,
      },
      {
        key: 3,
        title: 'Hộ chiếu',
        value: 'Thông tin người đại diện theo pháp luật',
        id: 'PASSPORT',
        isIvidual: true,
      },
    ],
  },
  {
    key: 1,
    title: 'Thông tin tổ chức/doanh nghiệp',
    listChild: [
      {
        key: 0,
        title: 'Giấy chứng nhận đăng ký doanh nghiệp',
        value: 'Giấy chứng nhận đăng ký doanh nghiệp',
        id: 'ORGANIZATION_CERTIFICATE',
        isIvidual: false,
      },
      {
        key: 1,
        title: 'Quyết định thành lập',
        value: 'Quyết định thành lập',
        id: 'DECIDE_TO_ESTABLISH',
        isIvidual: false,
      },
      {
        key: 2,
        title: 'Quyết định quy định về chức năng, nhiệm vụ, quyền hạn, cơ cấu tổ chức',
        value: 'Quyết định quy định về chức năng, nhiệm vụ, quyền hạn, cơ cấu tổ chức',
        id: 'INVESTMENT_LICENSE',
        isIvidual: false,
      },
      {
        key: 3,
        title: 'Giấy phép kinh doanh',
        value: 'Giấy phép kinh doanh',
        id: 'BUSINESS_REGISTRATION',
        isIvidual: false,
      },
    ],
  },
  {
    key: 2,
    title: 'Văn bản xác nhận chức danh',
    listChild: [
      {
        key: 0,
        title: 'Văn bản xác nhận chức danh',
        value: 'Văn bản xác nhận chức danh',
        id: 'APPOINTMENT_DECISION',
        isIvidual: false,
      },
    ],
  },
  {
    key: 3,
    title: 'Đơn đề nghị cấp chứng thư',
    listChild: [
      {
        key: 0,
        title: 'Đơn đề nghị cấp chứng thư',
        value: 'Đơn đề nghị cấp chứng thư',
        id: 'INQUIRY_CA_FORM',
        isIvidual: false,
      },
    ],
  },
];

const findItem = (list: API.TrustDocument[], itemFind: string) => {
  return list?.findIndex((value) => itemFind === value?.type) > -1 ? true : false;
};

const findItemSelected = (listSelected: API.TrustDocument[], listFind: ListUploadDeedModel[]) => {
  let find: string = '';
  for (let i = 0; i < listSelected.length; i++) {
    const itemSelected = listSelected[i];
    for (let j = 0; j < listFind.length; j++) {
      const itemFind = listFind[j];
      if (itemSelected?.type === itemFind?.id) {
        find = ` - ${itemFind?.title}`;
        break;
      }
    }
  }
  return find;
};
const SelectUpload: React.FC<SelectUploadProps> = (props) => {
  const { listDocument, dataInquiry, handleUploadDocument, isIndividual } = props;
  const handleUploadDocumentChild = useCallback(
    (value: any) => {
      handleUploadDocument(value);
    },
    [handleUploadDocument],
  );

  const listTypeDeed =
    !dataInquiry?.individualOrEnterprise || isIndividual === true
      ? listTypeDocument
      : listTypeDocumentBusiness;

  const BuildPanelDocuments = useMemo(
    () => (
      <CollapseCustom
        bordered
        style={{
          borderRadius: '8px',
          border: '1px solid #bdc4d8',
          borderBottom: '0',
          background: '#fff',
          marginTop: '8px',
          width: 'fit-content',
          minWidth: '590px',
        }}
        className="custom-collapse-step3"
      >
        {listTypeDeed?.map((business) => (
          <Panel
            header={`${business.title}${
              listDocument && findItemSelected(listDocument, business?.listChild)
            }`}
            key={business.key}
          >
            <ul className="step3-upload-item">
              {business.listChild?.map((child) => (
                <li
                  key={child.key}
                  onClick={() => handleUploadDocumentChild(child)}
                  style={{ cursor: 'pointer' }}
                >
                  {listDocument && findItem(listDocument, child?.id) ? (
                    <CheckCircleFillIcon />
                  ) : (
                    <span />
                  )}
                  <span style={{ whiteSpace: 'nowrap' }}>{child.title}</span>
                  <span>
                    <Tooltip title="Upload hồ sơ">
                      <UploadIcon style={{ cursor: 'pointer' }} />
                    </Tooltip>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </CollapseCustom>
    ),
    [handleUploadDocumentChild, listDocument, listTypeDeed],
  );

  return (
    <div className="select-upload-collapse" style={{ width: '544px' }}>
      <div>
        <Body1 className="fw-bold">Chọn loại hồ sơ upload</Body1>
      </div>
      <div>{BuildPanelDocuments}</div>
    </div>
  );
};

export default SelectUpload;
