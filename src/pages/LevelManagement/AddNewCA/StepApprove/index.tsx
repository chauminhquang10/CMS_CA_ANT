import CheckBoxCustom from '@/components/Checkbox';
import { convertDateTimeNumber } from '@/utils/main';
import './style.less';

type StepApproveProps = {
  inforInvoice?: API.GetInvoiceInfoResponse;
  onCheckPayment: (value: boolean | string | undefined) => void;
  isCheck: boolean;
};

const StepApprove: React.FC<StepApproveProps> = (props) => {
  const { inforInvoice, onCheckPayment, isCheck } = props;

  const BuildGroupInfo = (prop: {
    style?: React.CSSProperties;
    title: string;
    content: React.ReactNode;
  }) => {
    const { title, content, style } = prop;
    return (
      <div className="info-vertical" style={style}>
        <div className="label-txt">{title}</div>
        <div className="content-txt ">{content}</div>
      </div>
    );
  };
  return (
    <div className="card-information" style={{ padding: '80px 80px 0 80px' }}>
      <div>
        <span className="title-step">Thông tin hóa đơn</span>
        <div className="group-info grid-2-template">
          <BuildGroupInfo title="Mã đơn hàng" content={inforInvoice?.id || '---'} />
          <BuildGroupInfo title="Chủ tài khoản" content={inforInvoice?.ownerCAName || '---'} />
          <BuildGroupInfo
            title="Thời gian"
            content={
              <span style={{ textTransform: 'capitalize' }}>
                {inforInvoice?.timeStamp ? convertDateTimeNumber(inforInvoice?.timeStamp) : '---'}
              </span>
            }
          />
          <BuildGroupInfo title="Mã số thuế" content={inforInvoice?.taxCode} />
        </div>
        <div className="divider-inside" />
      </div>
      <div>
        <span className="title-step">Thông tin gói cước</span>
        <div className="group-info grid-2-template">
          <BuildGroupInfo title="Gói cước" content={inforInvoice?.subscriptionName || '---'} />
          <BuildGroupInfo
            style={{ gridColumn: '2', gridRow: '2' }}
            title="Tổng cước"
            content={
              <span className="label-price">{inforInvoice?.subscriptionPrice || '0 đ'}</span>
            }
          />
          <BuildGroupInfo
            style={{ gridColumn: '1', gridRow: '2' }}
            title="Thời gian"
            content={inforInvoice?.interval || '---'}
          />
        </div>
        <div className="divider-inside" />
      </div>
      <div>
        <div className="group-checkbox">
          <CheckBoxCustom
            checked={isCheck}
            onChange={(event) => onCheckPayment(event.target.checked)}
          />
          <span className="group-checkbox-label">Đã thanh toán</span>
        </div>
      </div>
    </div>
  );
};

export default StepApprove;
