import React from 'react';
import './index.less';

export type CustomStatusProps = {
  className?: string;
  text?: string;
};

const CustomStatus: React.FC<CustomStatusProps> = (props) => {
  const { className, text } = props;
  return (
    <div className={className}>
      <div>{text}</div>
    </div>
  );
};

export default CustomStatus;
