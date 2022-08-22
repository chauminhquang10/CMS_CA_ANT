import React from 'react';
import './index.less';

export type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  iconFirst?: React.ReactNode;
  styleIconFirst?: React.CSSProperties;
  iconLast?: React.ReactNode;
  styleIconLast?: React.CSSProperties;
};

const ButtonAction: React.FC<ButtonProps> = (props) => {
  const { className, style, iconFirst, iconLast, children, styleIconFirst, styleIconLast } = props;
  return (
    <>
      <div className={`btn-action ${className}`} style={{ ...style }}>
        <div className="btn-action-iconFirst" style={{ ...styleIconFirst }}>
          {iconFirst}
        </div>
        <div className="btn-action-child">{children}</div>
        <div className="btn-action-iconLast" style={{ ...styleIconLast }}>
          {iconLast}
        </div>
      </div>
    </>
  );
};

ButtonAction.defaultProps = {
  className: '',
};

export default ButtonAction;
