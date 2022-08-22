import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const CollapseCustom: React.FC<CollapseProps> = (props) => {
  const { ...restProps } = props;
  return <Collapse {...restProps} />;
};

export default CollapseCustom;
