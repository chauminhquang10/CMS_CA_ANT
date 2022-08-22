import type { InputProps } from 'antd';
import { Input } from 'antd';

export type InputCustomProps = InputProps;

const InputCustom: React.FC<InputCustomProps> = (props) => <Input {...props} />;

export default InputCustom;
