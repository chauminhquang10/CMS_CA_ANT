import { Progress } from 'antd';
import type {
  ProgressGradient,
  ProgressSize,
  ProgressType,
  SuccessProps,
} from 'antd/es/progress/progress';
import React from 'react';
import './index.less';

declare const ProgressStatuses: ['normal', 'exception', 'active', 'success'];
export type ProcessCustomProps = {
  prefixCls?: string;
  className?: string | typeof ProgressStatuses[number];
  type?: ProgressType;
  percent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: typeof ProgressStatuses[number];
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | ProgressGradient;
  trailColor?: string;
  width?: number;
  success?: SuccessProps;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: ProgressSize;
  steps?: number;
  successPercent?: number;
  children?: React.ReactNode;
};

const ProcessCustom: React.FC<ProcessCustomProps> = (props) => (
  <>
    {props.children}
    <Progress
      className={`group-process-dashed ${props.className}`}
      status={props.status}
      percent={props.percent}
      steps={props.steps}
      showInfo={props.showInfo}
      strokeWidth={props.strokeWidth}
      type={props.type}
      width={props.width}
      format={props.format}
    />
  </>
);

ProcessCustom.defaultProps = {
  className: '',
};

export default ProcessCustom;
