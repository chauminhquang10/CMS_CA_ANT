import ButtonCustom from '@/components/Button';
import ModalMain from '@/components/Modal';
import type { FormInstance } from 'antd';
import { Spin } from 'antd';
import { useCallback } from 'react';

export type BuildModalProps = {
  visible: boolean;
  onCancle: (value: any) => void;
  description: React.ReactNode;
  onCreate: () => void;
  isLoading?: boolean;
  titleButton: string;
  style?: React.CSSProperties;
  className?: string;
  zIndex?: number;
  formCreateUser?: FormInstance<any>;
};

const ModalCheckOwner: React.FC<BuildModalProps> = (props) => {
  const {
    onCancle,
    onCreate,
    visible,
    description,
    isLoading,
    titleButton,
    style,
    className,
    zIndex,
    formCreateUser,
  } = props;

  const onCreateChild = useCallback(() => {
    formCreateUser?.validateFields().then((value) => {
      if (value) {
        onCreate();
      }
    });
    onCreate();
  }, [onCreate, formCreateUser]);

  return (
    <ModalMain
      destroyOnClose={true}
      className={`modal-onwerId ${className}`}
      style={style ? style : { minWidth: '400px' }}
      title={
        <div className="header-popup">
          <div className="header-popup-left">
            <h4>Thông báo</h4>
          </div>
        </div>
      }
      visible={visible}
      handle={() => onCancle(false)}
      footer={[
        <>
          {titleButton !== 'Đã hiểu' && (
            <ButtonCustom
              style={{ display: 'inline-block' }}
              className="btn-custom btn-close"
              key="submit-create"
              onClick={() => onCancle(false)}
            >
              Hủy
            </ButtonCustom>
          )}
        </>,
        <ButtonCustom
          style={{ display: 'inline-block' }}
          className={`btn-custom ${isLoading ? 'btn-disable btn-loading-disable' : 'btn-primary'}`}
          key="submit-create"
          onClick={titleButton === 'Đã hiểu' ? () => onCancle(false) : onCreateChild}
          disabled={isLoading}
        >
          {titleButton || 'Đồng ý'}
        </ButtonCustom>,
      ]}
      zIndex={zIndex ? zIndex : 999}
      maskClosable={false}
    >
      <Spin spinning={isLoading} tip={'Vui lòng đợi!'}>
        {description}
      </Spin>
    </ModalMain>
  );
};

export default ModalCheckOwner;
