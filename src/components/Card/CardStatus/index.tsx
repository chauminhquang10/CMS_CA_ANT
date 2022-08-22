import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import './index.less';

export type InformationDetail = {
  data: {
    label?: string;
    status?: string;
    dateOfPayment?: string | Date;
  };
};

const CardStatus: React.FC<InformationDetail> = (props) => {
  const { data } = props;
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <div className="group-detail">
          <Row className="group-detail-wrap">
            <Col className="group-detail-label">Label:</Col>
          </Row>
          <Row className="group-detail-wrap">
            <Col className="group-detail-value detail-bold">{data.label || ''}</Col>
          </Row>
          <Row className="group-detail-wrap">
            <Col className="group-detail-label ">Trạng thái thanh toán</Col>
          </Row>
          <Row>
            <Col className="group-detail-value">
              <span className="detail-bold">{data.status || ''}</span> {data.dateOfPayment || ''}{' '}
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </span>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

CardStatus.defaultProps = {
  data: {
    label: '',
    status: '',
    dateOfPayment: '',
  },
};

export default CardStatus;
