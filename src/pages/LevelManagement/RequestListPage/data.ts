declare const TypeRequestProps: ['cấp phát', 'gia hạn', 'thu hồi', 'cấp lại'];
declare const UserObjectProps: ['cá nhân', 'tổ chức', 'cá nhân thuộc tổ chức'];
declare const StatusProps: ['đã hoàn thành', 'chưa hoàn thành'];
declare const StatusRequestProps: ['chưa tiếp nhận', 'đang hỗ trợ', 'hoàn thành'];
declare const StatusApproveProps: ['Chưa phê duyệt', 'Phê duyệt'];

enum InquiryCAType {
  NEW = 'Cấp phát',
}
enum StatusRequest {
  APPROVE = 'Chưa tiếp nhận',
  APPROVING = 'Đang hỗ trợ',
  SUCCESSFULLY_APPROVED = 'Hoàn thành',
  UNSUCCESSFULLY_APPROVED = 'Từ chối',
}

enum ApproveStatus {
  APPROVE = 'Chưa phê duyệt',
  APPROVING = 'Đang hỗ trợ',
  SUCCESSFULLY_APPROVED = 'Phê duyệt',
  UNSUCCESSFULLY_APPROVED = 'Từ chối',
}

interface FilterModel {
  key: string | number;
  type: string | number;
  label: string;
  value: string;
  isactive: boolean;
  listFilterChild?: FilterModel[];
}

interface TrustDocumentModel {
  approve: string;
  approvedBy?: string;
  documentUrl?: string;
  documentUrlList: string[];
  type: string;
}

interface softDocumentInfoModel {
  numOfAvailableDocument: number;
  numberOfDocument: number;
  trustDocuments: TrustDocumentModel;
}

interface ListOptions {
  key: string | number;
  type: string | number;
  label: string;
  value: string;
  link?: string;
}

interface UserModel {
  firstname?: string;
  lastname?: string;
  email: string;
  uniID?: string;
  avatar?: string;
  phonenumber?: string | number;
}

interface InfoHSBanMem {
  stt?: string;
  typeDocument?: string;
  filename?: FileModel[];
  status?: typeof StatusApproveProps[number];
}

interface HSBanMemModel {
  status?: typeof StatusProps[number];
  data?: InfoHSBanMem[];
}

interface HSBanCungModel {
  status?: typeof StatusProps[number];
}

interface FileModel {
  name?: string;
  link?: string;
}
type DataType = {
  key?: string;
  stt?: string;
  codeRequest?: string;
  type?: typeof TypeRequestProps[number];
  user?: UserModel;
  userObject?: typeof UserObjectProps[number];
  servicePackage?: string;
  hsBanMem?: HSBanMemModel;
  hsBanCung?: HSBanCungModel;
  statusRequest?: typeof StatusRequestProps[number];
};
interface InquiryCAModel {
  id: string;
  userId: string;
  buyerInfo: null;
  isUploadingProfile: string;
  individualCA: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    cardId: string;
    dateOfBirth: string;
    sex: string;
    issueDate: string;
    expiry: string;
    address: string;
    addressDetail: string;
    idCardFront: string;
    idCardBack: string;
    urlIdCardFrontStorage: string;
    urlIdCardBackStorage: string;
    idCard: string;
    edited: boolean;
  };
  contactAddress: string;
  contactAddressDetail: null;
  inquiryCAForm: null;
  urlInquiryCAStorage: string;
  isApprovingCA: string;
  isOnPayment: string;
  transactionId: string;
  isActive: string;
  processingStatus: string;
  lock: string;
  dateBegin: null;
  dateExpire: null;
  servicePackage: null;
  subscriptionId: null;
  subscriptionInterval: number;
  individualOrEnterprise: boolean;
  completeHardFile: boolean;
}

interface UserModel {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  completedEKYC: boolean;
}

interface TrustModel {
  completeHardFile: boolean;
  dateBegin: Date;
  dateExpire: Date;
  id: string;
  individualOrEnterprise: boolean;
  inquiryCAType: string;
  isActive: string;
  isApprovingCA: string;
  isOnPayment: string;
  lock: string;
  processingStatus: string;
  softDocumentInfo: softDocumentInfoModel;
  subscriptionId: string;
  subscriptionInterval: number;
  transactionId: string;
  user: UserModel;
  userId: string;
}

const ListOptionFilter: FilterModel[] = [
  { key: 'item-1', type: 'type-1', label: 'Loại yêu cầu', value: 'Loại yêu cầu', isactive: false },
  {
    key: 'item-2',
    type: 'type-2',
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
  { key: 'item-4', type: 'type-3', label: 'Gói dịch vụ', value: 'Gói dịch vụ', isactive: false },
  {
    key: 'item-5',
    type: 'type-5',
    label: 'Hồ sơ bản cứng',
    value: 'Hồ sơ bản cứng',
    isactive: false,
  },
  {
    key: 'item-6',
    type: 'type-6',
    label: 'Hồ sơ bản mềm',
    value: 'Hồ sơ bản mềm',
    isactive: false,
  },
  {
    key: 'item-7',
    type: 'type-7',
    label: 'Trạng thái yêu cầu',
    value: 'Trạng thái yêu cầu',
    isactive: false,
  },
];

const ListCreateNew: ListOptions[] = [
  {
    key: 'create-1',
    label: 'Cấp phát mới',
    value: 'Cấp phát mới',
    type: 'create-1',
    link: '/levelManagement/request-list/add-new-ca',
  },
];

type ResponseModel = {
  code: number;
  message: string;
  data: any;
};

type ResponseTrustModel = {
  inquiryCAList: {
    content: [];
  };
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const dataTable: DataType[] = [
  {
    key: '1',
    stt: '1',
    codeRequest: '1A1451A',
    type: 'cấp lại',
    user: {
      avatar: '',
      email: 'email@gmail.com',
      firstname: 'Duy',
      lastname: 'Huynh',
      phonenumber: '0913700000',
      uniID: 'unicloudID',
      completedEKYC: true,
      fullName: '',
      id: '',
      phone: '',
    },
    userObject: 'cá nhân',
    hsBanCung: {
      status: 'chưa hoàn thành',
    },
    hsBanMem: {
      data: [
        {
          stt: '1',
          filename: [
            {
              name: 'file name 1',
              link: '',
            },
          ],
          status: 'Phê duyệt',
          typeDocument: 'CMT/CCCD',
        },
        {
          stt: '2',
          filename: [
            {
              name: 'Tài liệu 1',
              link: '',
            },
            {
              name: 'Tài liệu 2',
              link: '',
            },
          ],
          status: 'Phê duyệt',
          typeDocument: 'Đăng ký kinh doanh',
        },
        {
          stt: '3',
          filename: [
            {
              name: 'file name 1',
              link: '',
            },
            {
              name: 'file name 2',
              link: '',
            },
          ],
          status: 'Phê duyệt',
          typeDocument: 'Ủy quyền',
        },
        {
          stt: '4',
          filename: [
            {
              name: 'file name 1',
              link: '',
            },
            {
              name: 'file name 2',
              link: '',
            },
          ],
          status: 'Phê duyệt',
          typeDocument: 'Đăng ký kinh doanh',
        },
      ],
      status: 'đã hoàn thành',
    },
    servicePackage: 'Nâng cao 1',
    statusRequest: 'chưa tiếp nhận',
  },
  {
    key: '2',
    stt: '2',
    codeRequest: '1A1451A',
    type: 'thu hồi',
    user: {
      avatar: '',
      email: 'email@gmail.com',
      firstname: 'Ngọc',
      lastname: ' Giao',
      uniID: 'unicloudID',
      phonenumber: '0913700000',
      completedEKYC: true,
      fullName: '',
      id: '',
      phone: '',
    },
    userObject: 'cá nhân',
    hsBanCung: {
      status: 'chưa hoàn thành',
    },
    hsBanMem: {
      data: [
        {
          stt: '1',
          filename: [
            {
              name: 'file name 1',
              link: '',
            },
          ],
          status: 'Phê duyệt',
          typeDocument: 'CMND',
        },
      ],
      status: 'đã hoàn thành',
    },
    servicePackage: 'Nâng cao 1',
    statusRequest: 'hoàn thành',
  },
];

export {
  ListOptionFilter,
  ListCreateNew,
  InquiryCAModel,
  DataType,
  FileModel,
  softDocumentInfoModel,
  InquiryCAType,
  StatusRequest,
  TrustDocumentModel,
  TrustModel,
  FilterModel,
  ListOptions,
  ResponseTrustModel,
  ResponseModel,
  ApproveStatus,
};
