const CodeMessageResponseEn = {
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: 'Session not valid anymore. You should to login again',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request is for a record that does not exist, and the server is not operating. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource has been permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred in the server, please check the server. ',

  0: 'Success',
  1: 'Failed',
  2: 'Common Error',
  3: 'Invalid param',
  4: 'Invalid session',

  // User
  100: 'Existed email',
  101: 'Existed phone',
  102: 'OTP was expired',
  103: 'Account did not link',
  104: 'User was registered',
  105: 'User not found',
  106: 'Email was verified',
  107: 'Not found eKYC profile',
  108: 'Not match ID card number',
  109: 'Invalid contact address',
  110: 'Existed email on UniCloud ID',
  111: 'Existed username on UniCloud ID',
  112: 'User needs to change password before login',
  113: 'User had not finished verify yet',
  114: 'User with phone or email is exist, but user information does not match',
  115: 'Invalid Device Id',

  // File
  201: 'File does not exist',
  202: 'File is empty',
  203: 'File existed',
  204: 'Do not have permission to access',
  205: 'File is invalid',
  206: 'Shared file map is empty',
  207: 'RequestSession does not exist',
  208: 'RequestSession is expired',
  209: 'Request to access the file is invalid',
  210: 'Authorization from google failed',
  211: 'Reject the request to access the document',

  // Folder
  302: 'Folder name is empty',
  303: 'Folder existed',
  304: 'Folder does not exist',

  // CA
  501: 'Inquiry CA of user does not exist',
  502: 'Inquiry CA existed',
  503: 'Do not have any pending inquiry ca',
  504: 'Inquiry ca has not already yet',
  505: 'This is inquiry ca of enterprise',
  506: 'This is inquiry ca of individual',
  507: 'Inquiry ca has already paid',
  508: 'Inquiry ca has already been active',
  509: 'Inquiry ca id is null',

  // Signature

  601: 'Signature does not exist',
  602: 'Signature existed',
  603: 'Signature id is empty',
  604: 'Signature body request is wrong',
  605: 'Document was signed',

  // Invitation
  701: 'Invitation does not exist',
  702: 'Invitation request is invalid',
  703: 'Receiver not found',
  704: 'Document does not exist in this invitation',
  705: 'Document has already been assigned',
  706: 'Document has already been signed',
  707: 'Seal is invalid',
  708: 'Seal not found',
  709: 'User does not allow to write this seal',
  710: 'Document does not match with seal information',
  711: 'This invitation has been already processed',
  712: 'This invitation has not been set up seal yet',
  713: 'Seals need to fill before sign',

  // Auth
  801: 'Invalid phone or email',
  802: 'Email not exist',
  803: 'Email not exist',
  804: 'Invalid Session Id',
  805: 'Invalid OTP',
  807: 'OTP was active',
  808: 'OTP not active',
  809: 'Invalid username or password',

  // Sign-simulator
  900: 'signed challenge invalid',
  901: 'session id invalid',
  // Storage
  1001: 'Upload file to S3 fail',
  // Invoice
  1101: 'Invoice is not found',
  // Notification
  1201: 'Notification not found',
};

export default CodeMessageResponseEn;
