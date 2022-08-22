import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import './index.less';

export type StatusProps = {
  data: {
    status?: string;
  };
};

const StatusIcon: React.FC<StatusProps> = (props) => {
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
            <Col className="group-detail-label">
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              <CheckCircleTwoTone twoToneColor="#ff0000" />
            </Col>
            <Col className="group-detail-value detail-bold">{data.status}</Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

StatusIcon.defaultProps = {
  data: {
    status: '',
  },
};

export default StatusIcon;
