import { Card, Col, Row } from 'antd';

export type InformationDetail = {
  data: {
    uniID: string;
    position?: string;
    department?: string;
  };
};

const CardInfo: React.FC<InformationDetail> = (props) => {
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
            <Col className="group-detail-left">Mã nhân viên:</Col>
            <Col className="group-detail-right">{data.uniID || ''}</Col>
          </Row>
          <Row className="group-detail-wrap">
            <Col className="group-detail-left">Chức vụ:</Col>
            <Col className="group-detail-right">{data.position || ''}</Col>
          </Row>
          <Row className="group-detail-wrap">
            <Col className="group-detail-left">Phòng ban:</Col>
            <Col className="group-detail-right">{data.department || ''}</Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

CardInfo.defaultProps = {
  data: {
    uniID: '',
    department: '',
    position: '',
  },
};

export default CardInfo;
