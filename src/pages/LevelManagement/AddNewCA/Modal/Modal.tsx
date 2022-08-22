import ModalMain from '@/components/Modal';
import ProcessCustom from '@/components/Process';

export type BuildModalProps = {
  visible: boolean;
  onCancle: (value: boolean) => void;
};

const BuildModalChild: React.FC<BuildModalProps> = (props) => {
  const { onCancle, visible } = props;

  return (
    <ModalMain
      title={
        <div className="header-popup">
          <div className="header-popup-left">
            <h4>Thông tin hồ sơ bản mềm</h4>
            <ProcessCustom
              type="circle"
              percent={100}
              width={40}
              status="success"
              format={(percent) => <span>{percent ? percent / 25 : 0} / 4</span>}
            />
          </div>
        </div>
      }
      visible={visible}
      handle={() => onCancle(false)}
    >
      <div />
    </ModalMain>
  );
};

export default BuildModalChild;
