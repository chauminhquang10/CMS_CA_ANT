import type { RcFile } from 'antd/lib/upload';

interface CardModal {
  type: string;
  documentUrl: string;
  documentUrlList: any[];
  approvedBy: string;
  approve: string;
}

interface IindividualCA {
  // Thông tin cá nhân
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  cardId: string;
  dateOfBirth: string;
  sex: string;
  issueDate: string;
  expiry: string;
  address: string;
  idCardFront: CardModal;
  idCardBack: CardModal;
  urlIdCardFrontStorage: string;
  urlIdCardBackStorage: string;
  idCard: CardModal;
  edited: boolean;
}

interface EnterpriseCA {
  // Doanh nghiệp
  enterpriseName: string;
  taxCode: string;
  address: string;
  licenseType: string;
  businessLicense: CardModal;
  urlLicenseStorage: string;
  licenseStorageFileName: string;
  legalRepresentative: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    cardId: string;
    dateOfBirth: string;
    sex: string;
    issueDate: string;
    expiry: string;
    address: string;
    idCardFront: CardModal;
    idCardBack: CardModal;
    urlIdCardFrontStorage: string;
    urlIdCardBackStorage: string;
    idCard: CardModal;
    edited: boolean;
  };
  legalRepresentationPosition: string;
  legalRepresentativeCertificate: CardModal;
  urlLegalRepCerStorage: string;
  legalRepCerStorageFileName: string;
}

interface InquiryCAForm {
  type: string;
  documentUrl: string;
  documentUrlList: any[];
  approvedBy: string;
  approve: string;
}

interface BuyerInfo {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
}

type EnteringProps = {
  id: string;
  userId: string;
  buyerInfo: BuyerInfo;
  isUploadingProfile: string;
  individualCA: IindividualCA;
  enterpriseCA: EnterpriseCA;
  contactAddress: string;
  inquiryCAForm: InquiryCAForm; // Cuộc điều tra
  inquiryCaFileName: string;
  urlInquiryCAStorage: string;
  isApprovingCA: string;
  isOnPayment: string;
  ownerCAInfo: any;
  transactionId: string;
  isActive: boolean;
  processingStatus: string;
  lock: any;
  dateBegin: Date;
  dateExpire: Date;
  servicePackage: string; // Gói
  subscriptionId: string;
  subscriptionInterval: number;
  completeHardFile: boolean;
  individualOrEnterprise: boolean;
};

const InquiryData = {
  id: '',
  userId: '',
  buyerInfo: {
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
  },
  isUploadingProfile: '',
  individualCA: {
    // Thông tin cá nhân
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    cardId: '',
    dateOfBirth: '',
    sex: '',
    issueDate: '',
    expiry: '',
    address: '',
    idCardFront: {
      type: '',
      documentUrl: '',
      documentUrlList: [''],
      approvedBy: '',
      approve: '',
    },
    idCardBack: {
      type: '',
      documentUrl: '',
      documentUrlList: [''],
      approvedBy: '',
      approve: '',
    },
    urlIdCardFrontStorage: '',
    urlIdCardBackStorage: '',
    idCard: {
      type: '',
      documentUrl: '',
      documentUrlList: [''],
      approvedBy: '',
      approve: '',
    },
    edited: true,
  },
  enterpriseCA: {
    // Doanh nghiệp
    enterpriseName: '',
    taxCode: '',
    address: '',
    licenseType: '',
    businessLicense: {
      type: '',
      documentUrl: '',
      documentUrlList: [''],
      approvedBy: '',
      approve: '',
    },
    urlLicenseStorage: '',
    licenseStorageFileName: '',
    legalRepresentative: {
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      cardId: '',
      dateOfBirth: '',
      sex: '',
      issueDate: '',
      expiry: '',
      address: '',
      idCardFront: {
        type: '',
        documentUrl: '',
        documentUrlList: [''],
        approvedBy: '',
        approve: '',
      },
      idCardBack: {
        type: '',
        documentUrl: '',
        documentUrlList: [''],
        approvedBy: '',
        approve: '',
      },
      urlIdCardFrontStorage: '',
      urlIdCardBackStorage: '',
      idCard: {
        type: '',
        documentUrl: '',
        documentUrlList: [''],
        approvedBy: '',
        approve: '',
      },
      edited: true,
    },
    legalRepresentationPosition: '',
    legalRepresentativeCertificate: {
      type: '',
      documentUrl: '',
      documentUrlList: [''],
      approvedBy: '',
      approve: '',
    },
    urlLegalRepCerStorage: '',
    legalRepCerStorageFileName: '',
  },
  contactAddress: '',
  inquiryCAForm: {
    type: '',
    documentUrl: '',
    documentUrlList: [''],
    approvedBy: '',
    approve: '',
  },
  inquiryCaFileName: '',
  urlInquiryCAStorage: '',
  isApprovingCA: '',
  isOnPayment: '',
  transactionId: '',
  isActive: true,
  processingStatus: '',
  lock: 'lock',
  dateBegin: new Date(),
  dateExpire: new Date(),
  servicePackage: '',
  subscriptionId: '',
  subscriptionInterval: 0,
  completeHardFile: true,
  individualOrEnterprise: true,
};

interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number;
}
interface UploadRequestError extends Error {
  status?: number;
  method?: UploadRequestMethod;
  url?: string;
}

declare type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
declare type UploadRequestHeader = Record<string, string>;
declare type BeforeUploadFileType = File | Blob | boolean | string;

interface UploadRequestOption<T = any> {
  onProgress?: (event: UploadProgressEvent) => void;
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
  data?: Record<string, unknown>;
  filename?: string;
  file: Exclude<BeforeUploadFileType, File | boolean> | RcFile;
  withCredentials?: boolean;
  action: string;
  headers?: UploadRequestHeader;
  method: UploadRequestMethod;
}
declare type BeforeUploadValueType = void | boolean | string | Blob | File;

enum TrustDocumentType {
  // Business document
  BUSINESS_REGISTRATION = 'Giấy phép kinh doanh',
  DECIDE_TO_ESTABLISH = 'Quyết định thành lập',
  ORGANIZATION_CERTIFICATE = 'Giấy chứng nhận đăng ký doanh nghiệp',

  INVESTMENT_LICENSE = 'Giấy phép đầu tư',

  // Owner document
  ID_CARD = 'CMT/CMND',
  CCCD = 'CCCD',
  PASSPORT = 'PASSPORT',

  // CA document
  INQUIRY_CA_FORM = 'Form Cấp phát CA',

  // Business employee document
  APPOINTMENT_DECISION = 'Quyết định bổ nhiệm',
}

type TypeDocumentModel = {
  key: number;
  title: string;
  value: string;
  id: keyof typeof TrustDocumentType;
  isIvidual: boolean;
};
type ListUploadDeedModel = {
  key: number;
  title: string;
  value: string;
  id: keyof typeof TrustDocumentType;
  isIvidual: boolean;
};
type ListUploadModel = {
  key: number;
  title: string;
  listChild: ListUploadDeedModel[];
};

export {
  ListUploadModel,
  ListUploadDeedModel,
  CardModal,
  IindividualCA,
  EnterpriseCA,
  InquiryData,
  EnteringProps,
  BuyerInfo,
  InquiryCAForm,
  UploadRequestOption,
  BeforeUploadValueType,
  TrustDocumentType,
  TypeDocumentModel,
};
