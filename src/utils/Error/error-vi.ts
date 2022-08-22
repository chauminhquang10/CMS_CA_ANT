const CodeMessageResponseVi = {
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: 'Session not valid anymore. You should to login again',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request is for a record that does not exist, and the server is not operating. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource has been permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred in the server, please check the server. ',

  0: 'Success',
  1: 'Thất bại',
  2: 'Lỗi chung',
  3: 'Tham số không hợp lệ',
  4: 'Phiên không hợp lệ',

  // User
  100: 'Email đã tồn tại',
  101: 'Số điện thoại đã tồn tại',
  102: 'OTP hết hạn',
  103: 'Tài khoản không được liên kết',
  104: 'Người dùng đã được đăng ký',
  105: 'Không tìm thấy người dùng',
  106: 'Email đã được xác minh',
  107: 'Không tìm thấy hồ sơ eKYC',
  108: 'Không khớp với số chứng minh thư',
  109: 'Địa chỉ liên hệ không hợp lệ',
  110: 'Email hiện có trên UniCloud ID',
  111: 'Tên người dùng hiện có trên UniCloud ID',
  112: 'Người dùng cần thay đổi mật khẩu trước khi đăng nhập',
  113: 'Người dùng vẫn chưa hoàn thành xác minh',
  114: 'Người dùng có điện thoại hoặc email là tồn tại, nhưng thông tin người dùng không khớp',
  115: 'Id thiết bị không hợp lệ',

  // File
  201: 'Tập tin không tồn tại',
  202: 'Tệp trống',
  203: 'Tệp đã tồn tại',
  204: 'Không có quyền truy cập',
  205: 'Tệp không hợp lệ',
  206: 'Bản đồ tệp được chia sẻ trống',
  207: 'Phiên yêu cầu không tồn tại',
  208: 'Phiên yêu cầu đã hết hạn',
  209: 'Yêu cầu truy cập tệp không hợp lệ',
  210: 'Ủy quyền từ google không thành công',
  211: 'Từ chối yêu cầu truy cập tài liệu',

  // Folder
  302: 'Tên thư mục trống',
  303: 'Thư mục tồn tại',
  304: 'Thư mục không tồn tại',

  // CA
  501: 'CA yêu cầu của người dùng không tồn tại',
  502: 'CA yêu cầu tồn tại',
  503: 'Không có bất kỳ yêu cầu nào đang chờ xử lý',
  504: 'CA điều tra vẫn chưa có',
  505: 'Đây là cuộc điều tra của doanh nghiệp',
  506: 'Đây là cuộc điều tra của cá nhân',
  507: 'Yêu cầu ca đã thanh toán',
  508: 'Ca điều tra đã hoạt động',
  509: 'Id ca điều tra là null',

  // Signature

  601: 'Chữ ký không tồn tại',
  602: 'Chữ ký tồn tại',
  603: 'Id chữ ký trống',
  604: 'Yêu cầu nội dung chữ ký là sai',
  605: 'Tài liệu đã được ký',

  // Invitation
  701: 'Lời mời không tồn tại',
  702: 'Yêu cầu lời mời không hợp lệ',
  703: 'Không tìm thấy máy thu',
  704: 'Tài liệu không tồn tại trong lời mời này',
  705: 'Tài liệu đã được giao',
  706: 'Tài liệu đã được ký',
  707: 'Con dấu không hợp lệ',
  708: 'Không tìm thấy con dấu',
  709: 'Người dùng không cho phép viết con dấu này',
  710: 'Tài liệu không khớp với thông tin con dấu',
  711: 'Lời mời này đã được xử lý',
  712: 'Lời mời này vẫn chưa được đóng dấu',
  713: 'Con dấu cần điền trước khi ký tên',

  // Auth
  801: 'Điện thoại hoặc email không hợp lệ',
  802: 'Email không tồn tại',
  803: 'Email không tồn tại',
  804: 'Id phiên không hợp lệ',
  805: 'OTP không hợp lệ',
  807: 'OTP đã hoạt động',
  808: 'OTP không hoạt động',
  809: 'Tên người dùng hoặc mật khẩu không hợp lệ',

  // Sign-simulator
  900: 'thử thách đã ký không hợp lệ',
  901: 'id phiên không hợp lệ',
  // Storage
  1001: 'Tải tệp lên S3 không thành công',
  // Invoice
  1101: 'Không tìm thấy hóa đơn',
  // Notification
  1201: 'Không tìm thấy thông báo',
};

export default CodeMessageResponseVi;
