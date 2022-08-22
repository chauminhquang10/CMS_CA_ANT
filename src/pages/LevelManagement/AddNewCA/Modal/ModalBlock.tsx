import ButtonCustom from '@/components/Button';
import ModalMain from '@/components/Modal';
import { FileSaveIcon } from '@/themes/icons';
import DeleteIcon from '@/themes/icons/DeleteIcon';

export type BuildModalProps = {
  visible: boolean;
  onCancle: (value: boolean) => void;
  onSubmit?: () => void;
};

const BuildModalChild: React.FC<BuildModalProps> = (props) => {
  const { onCancle, visible, onSubmit } = props;

  return (
    <ModalMain
      title={
        <div className="header-popup">
          <div className="header-popup-left">
            <h4>Từ chối tài liệu</h4>
          </div>
        </div>
      }
      visible={visible}
      handle={() => onCancle(false)}
      footer={[
        <ButtonCustom
          style={{ display: 'inline-block' }}
          className="btn-custom btn-close"
          key="submit-create"
          onClick={() => onCancle(false)}
        >
          <DeleteIcon /> Hủy bỏ
        </ButtonCustom>,
        <ButtonCustom
          style={{ display: 'inline-block' }}
          className="btn-custom btn-primary"
          key="submit-create"
          onClick={onSubmit}
        >
          <FileSaveIcon /> Lưu lại
        </ButtonCustom>,
      ]}
    >
      <div />
    </ModalMain>
  );
};

export default BuildModalChild;
