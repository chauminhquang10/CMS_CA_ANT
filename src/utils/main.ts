import moment from 'moment';

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
  APPOINTMENT_DECISION = 'Quyết định hẹn',
}
enum CertificateStatus {
  ACTIVE = 'Đang hoạt động',
  INACTIVE = 'Chưa hoạt động',
  EXPIRE = 'Đã hết hạn',
  REVOKE = 'Đã Thu hồi',
  LOCK = 'Đã khóa',
  STOP = 'Đã tạm dừng',
}

enum CAHistoryDTOType {
  LOCK = 'Khóa',
  UNLOCK = 'Mở khóa',
  REVOKE = 'Thu hồi',
  REACTIVE = 'Kích hoạt',
  RENEW = 'Tạo mới',
}

enum CertificateReasonType {
  BREACH_OF_CONTRACT = 'Vi phạm hợp đồng',
  GOVERNMENT = 'Cơ quan nhà nước',
  FROM_USER = 'Từ người dùng',
  OTHER = 'Khác',
}

const dateFormat = 'DD/MM/YYYY';
const GMT7 = '+0700';

function convertDateTimeStr(strDateTime: string | undefined) {
  let date: string = '';
  if (strDateTime === undefined) {
    return date;
  }
  date = moment(strDateTime).format(`hh:mm - DD/MM/YYYY`);
  return date;
}

function convertDateTimeNumber(dateTime: number | undefined) {
  let dateConvert;
  if (dateTime) {
    dateConvert = new Date(dateTime);
    dateConvert = moment(dateConvert)
      .locale('en-EN')
      .format(`h:mm - MM DD,YYYY`)
      .toLocaleLowerCase();
  }
  return dateConvert;
}

export {
  dateFormat,
  GMT7,
  convertDateTimeStr,
  TrustDocumentType,
  convertDateTimeNumber,
  CertificateStatus,
  CAHistoryDTOType,
  CertificateReasonType,
};
