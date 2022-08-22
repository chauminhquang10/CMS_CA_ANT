import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import * as React from 'react';

import './style.less';

export type listAction = {
  name: string;
  class: string;
  action: () => void;
};
export type ModalCustomProps = {
  title?: React.ReactNode;
  children: JSX.Element | JSX.Element[];
  listAction?: listAction[];
  visible?: boolean;
  handle: (value: any) => void;
  className?: string;
  footer?: React.ReactNode;
} & ModalProps;

const ModalMain: React.FC<ModalCustomProps> = (props) => {
  const { title, children, visible, handle, className, footer, ...rest } = props;

  //   const renderButton = () => {
  //     return listAction && listAction?.length > 0
  //       ? listAction?.map((action) => (
  //           <button key={action.name} onClick={action.action} className={action.class} type="submit">
  //             <span>{action.name}</span>
  //           </button>
  //         ))
  //       : null;
  //   };

  return (
    <>
      <Modal
        {...rest}
        visible={visible}
        title={title}
        onCancel={handle}
        centered
        footer={footer}
        className={`modal-cms-ca ${className}`}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalMain;
