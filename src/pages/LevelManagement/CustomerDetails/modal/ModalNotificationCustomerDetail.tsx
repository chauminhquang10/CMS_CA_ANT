import ButtonCustom from '@/components/Button';
import ModalMain from '@/components/Modal';
import { Spin } from 'antd';

type Props = {
  title?: string;
  description?: string;
  visible?: boolean;
  isLoading?: boolean;
  //   typeForm?: 'certificateLock' | 'certificateRecall';
  onCancle?: () => void;
  onClick?: () => void;
};

const ModalNotificationCustomerDetail = ({
  title,
  description,
  visible,
  isLoading,
  //   typeForm,
  onCancle,
  onClick,
}: Props) => {
  return (
    <ModalMain
      destroyOnClose={true}
      title={title}
      visible={visible}
      handle={() => onCancle?.()}
      className="modal-notification"
      footer={[
        <ButtonCustom
          key="submit-create"
          onClick={() => onCancle?.()}
          className="btn-custom btn-decline-modal"
        >
          Hủy
        </ButtonCustom>,
        <ButtonCustom
          key="submit-create"
          onClick={() => onClick?.()}
          className="btn-custom btn-accept-modal"
        >
          Đồng ý
        </ButtonCustom>,
      ]}
    >
      <Spin spinning={isLoading} tip={'Vui lòng đợi!'}>
        <p className="body-modal-inform">{description}</p>
      </Spin>
    </ModalMain>
  );
};

export default ModalNotificationCustomerDetail;
