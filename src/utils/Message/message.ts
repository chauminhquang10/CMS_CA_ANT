const messageResponse = {
  approveSuccess: 'Phê duyệt thành công',
  approveDeny: 'Từ chối thành công',
  uploadDeedUnSuccess: 'Upload hồ sơ không thành công! Không Phê Duyệt được!',
  editInfoApproveSuccess:
    'Bạn vừa chỉnh sửa thông tin hồ sơ. Bạn có muốn xác nhận Chỉnh Sửa và Duyệt Hồ sơ?',
  eidtInfoApproveDeny:
    'Bạn vừa chỉnh sửa thông tin hồ sơ. Bạn có muốn xác nhận Chỉnh sửa và Từ chối hồ sơ?',
  approveDeed: 'Bạn có muốn xác nhận Từ chối hồ sơ?',
  denyDeed: 'Bạn có muốn xác nhận Duyệt hồ sơ?',
  success: 'Success',
  approveError: 'Phê duyệt không thành công. Vui lòng thử lại!',
  findSuccess: 'Tìm kiếm tài khoản thành công',
};

const messageConfirm = {
  messageApproveConfirm: 'Bạn có chắc chắn muốn duyệt hóa đơn này?',
  successConfirm: 'Đồng ý',
  successCreateAccount: 'Tạo tài khoản',
  messageErrorEnter:
    'Không hỗ trợ cấp phát chứng thư cá nhân đối với người sở hữu' +
    ' đang tồn tại chứng thư cá nhân, vui lòng kiểm tra lại',
  messageCreateAccount:
    'Người sở hữu chứng thư chưa có tài khoản UniID, vui lòng tạo' +
    ' tài khoản trước khi cấp phát chứng thư!',
  messageErrorData: 'Không lấy được dữ liệu. Vui lòng thử lại!',
};

const validate = {
  date: {
    dateRequired: 'Vui lòng nhập Ngày cấp!',
    dateInvalid: 'Ngày cấp không hợp lệ!',
  },
  chooseFile: {
    fileRequired: 'Vui lòng upload hồ sơ!',
  },
  name: {
    nameRequired: 'Vui lòng nhập họ và tên',
  },
  birthDay: {
    birthDayRequired: 'Vui lòng nhập Ngày sinh!',
    birthDayInvalid: 'Ngày sinh không hợp lệ!',
  },
  sex: {
    sexRequired: 'Vui lòng chọn giới tính!',
  },
  required: 'Vui lòng không được để trống!',
};

const labelButton = {
  yes: 'Đồng ý',
  editApprove: 'Chỉnh sửa và duyệt',
  approve: ' Duyệt',
};

export { messageResponse, labelButton, validate, messageConfirm };
