import type { StepsProps } from 'antd';
import { Steps } from 'antd';
import React from 'react';

import './index.less';

export type StepCustomProps = StepsProps & {
  className?: string;
};

const StepCustom: React.FC<StepCustomProps> = (props) => {
  return <Steps {...props} className="steps-custom" />;
};

export default StepCustom;
