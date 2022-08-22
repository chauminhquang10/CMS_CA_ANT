import type { DropdownProps } from 'antd';
import { Dropdown } from 'antd';
import './index.less';

declare const Placements: [
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
  'top',
  'bottom',
];
declare type Placement = typeof Placements[number];
export type DropdownProp = {
  className?: string;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  openClassName?: string;
  placement?: Placement;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlay: React.ReactNode | (() => React.ReactNode) | any;
  onVisibleChange?: (visible: boolean) => void;
} & DropdownProps;

const DropdownCustom: React.FC<DropdownProp> = ({ className, onVisibleChange, ...restProps }) => (
  <Dropdown
    {...restProps}
    onVisibleChange={onVisibleChange}
    className={`dropdown-custom ${className}`}
  />
);

DropdownCustom.defaultProps = {
  trigger: ['click'],
};

export default DropdownCustom;
