import TagCustom from '@/components/Tag';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre style={{ margin: '12px 0', padding: '6px 0px', background: '#fff' }}>
    <code>
      <Typography.Text code type="secondary" copyable>
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const TagComponent: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Higher</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <TagCustom type="higher" label={'RẤT CAO'} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <TagCustom type="higher" label={'RẤT CAO'} />`}</CodePreview>
          </Col>
        </Row>
        <Divider orientation="left">Hight</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <TagCustom type="hight" label={'CAO'} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <TagCustom type="hight" label={'CAO'} />`}</CodePreview>
          </Col>
        </Row>
        <Divider orientation="left">Normal</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <TagCustom type="normal" label={'BÌNH THƯỜNG'} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <TagCustom type="normal" label={'BÌNH THƯỜNG'} />`}</CodePreview>
          </Col>
        </Row>
        <Divider orientation="left">Low</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <TagCustom type="low" label={'THẤP'} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <TagCustom type="low" label={'THẤP'} />`}</CodePreview>
          </Col>
        </Row>
        <Divider orientation="left">Success</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <TagCustom className="success" label={'CÔNG BỐ'} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <TagCustom className="success" label={'CÔNG BỐ'} />`}</CodePreview>
          </Col>
        </Row>
        <Divider orientation="left">Disable</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <TagCustom className="disable" label={'NHÁP'} />
          </Col>
          <Col span={16}>
            <CodePreview>{` <TagCustom className="disable" label={'NHÁP'} />`}</CodePreview>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default TagComponent;
