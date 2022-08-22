import React from 'react';
import './index.less';

export type BaseHeading = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export const CustomHeading1: React.FC<BaseHeading> = (props) => (
  <>
    <h1 {...props} className={`heading-1-custom ${props.className}`} style={props.style} />
  </>
);

export const CustomHeading2: React.FC<BaseHeading> = (props) => (
  <>
    <h2 {...props} className={`heading-2-custom ${props.className}`} style={props.style} />
  </>
);

export const CustomHeading3: React.FC<BaseHeading> = (props) => (
  <>
    <h3 {...props} className={`heading-3-custom ${props.className}`} style={props.style} />
  </>
);

export const CustomHeading4: React.FC<BaseHeading> = (props) => (
  <>
    <h4 {...props} className={`heading-4-custom ${props.className}`} style={props.style} />
  </>
);

export const CustomHeading5: React.FC<BaseHeading> = (props) => (
  <>
    <h5 {...props} className={`heading-5-custom ${props.className}`} style={props.style} />
  </>
);

export const Subtitle: React.FC<BaseHeading> = (props) => (
  <>
    <p {...props} className={`subtitle-custom ${props.className}`} style={props.style} />
  </>
);

export const Body1: React.FC<BaseHeading> = (props) => (
  <>
    <p {...props} className={`body-1-custom ${props.className}`} style={props.style} />
  </>
);

export const Body2: React.FC<BaseHeading> = (props) => (
  <>
    <p {...props} className={`body-2-custom ${props.className}`} style={props.style} />
  </>
);

export const Body3: React.FC<BaseHeading> = (props) => (
  <>
    <p {...props} className={`body-3-custom ${props.className}`} style={props.style} />
  </>
);
