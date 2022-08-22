import avatarImg from '@/assets/images/png/avatar/supper-large.png';
import CardInfo from '@/components/Card/CardDetail';
import CardStatus from '@/components/Card/CardStatus';
import CardUser from '@/components/Card/CardUser';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';
import './index.less';

const CodePreview: React.FC = ({ children }) => (
  <pre style={{ margin: '12px 0', padding: '6px 0px', background: '#fff' }}>
    <code>
      <Typography.Text code type="secondary" copyable>
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const user = {
  firstname: 'Duy',
  lastname: 'Huynh',
  phonenumber: '0339292929',
  email: 'email@unicloud.com.vn',
  uniID: 'UnicloudID',
};

const status = {
  label: 'Content ',
  status: 'Đã thanh toán ',
  dateOfPayment: '11-03-2022',
};

const employ = {
  uniID: '123456',
  position: 'Nhân viên',
  department: 'Phòng nhân sự',
};

const TagComponent: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Card Information User </Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CardUser avatar={avatarImg} activityTime={'2022/06/10'} dataUser={user} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <CardUser avatar={avatarImg} activityTime={'2022/06/10'} dataUser={user} />`}</CodePreview>
          </Col>
        </Row>

        <Divider orientation="left">Card Information Employ </Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CardInfo data={employ} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <CardInfo data={employ} />`}</CodePreview>
          </Col>
        </Row>

        <Divider orientation="left">Card Status </Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CardStatus data={status} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <CardStatus data={status} />`}</CodePreview>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default TagComponent;
