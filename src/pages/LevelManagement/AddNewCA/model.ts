import type { InquiryCAForm } from './StepUploadDeed/model';

type InfoTrustDocument = {
  appointmentDecisionInfo: {
    appointmentDoc: InquiryCAForm;
    position: string;
  };
  enterpriseInfo: {
    address: string;
    addressDetail: {
      address: string;
      city: string;
      district: string;
      ward: string;
    };
    businessLicense: InquiryCAForm;
    companyName: string;
    dnqd: string;
    taxCode: string;
  };
  individualOrEnterPrise: boolean;
  inquiryCAForm: {
    inquiryCAForm: InquiryCAForm;
  };
  numOfAvailableDocument: number;
  numberOfDocument: number;
  ownerCAInfo: {
    cardId: string;
    fullName: string;
    dateOfBirth: string;
    sex: string;
    issueDate: string;
    expiry: string;
    address: string;
    addressDetail: string;
    phone: string;
    email: string;
    idCardDoc: InquiryCAForm;
    edited: boolean;
  };
};

const StatusResponse = {
  502: 'Inquiry CA existed',
  144: 'User with phone or email is exist, but user information does not match',
  105: 'User not found',
};

const ConvertMessageResponse = {
  502: 'Yêu cầu CA tồn tại',
  144: 'Người dùng có điện thoại hoặc email tồn tại, nhưng thông tin người dùng không khớp',
  105: 'Người dùng không tồn tại',
};

export { InfoTrustDocument, StatusResponse, ConvertMessageResponse };
