import { Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';

const UploadFileCustom: React.FC<UploadProps> = (props) => {
  const { ...restProps } = props;
  return <Upload {...restProps} />;
};

export default UploadFileCustom;
