import ProcessCustom from '@/components/Process';
import ProcessDate from '@/components/ProcessDate';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre
    style={{
      whiteSpace: 'nowrap',
      width: '100%',
      fontSize: '12px',
      margin: '6px 0px',
      padding: '0px 0px',
      background: '#fff',
    }}
  >
    <code>
      <Typography.Text code type="secondary" copyable>
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const ProcessComponent: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Process Dashed</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ProcessCustom status="success" percent={30} steps={10} strokeWidth={4} />
          </Col>
          <Col span={20}>
            <CodePreview>{` <ProcessCustom status="success" percent={30} steps={10} strokeWidth={4} />`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ProcessCustom percent={30} steps={10} strokeWidth={4} />
          </Col>
          <Col span={20}>
            <CodePreview>{` <ProcessCustom percent={30} steps={10} strokeWidth={4} />`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ProcessCustom percent={30} steps={10} strokeWidth={4} status="exception" />
          </Col>
          <Col span={20}>
            <CodePreview>{` <ProcessCustom percent={30} steps={10} strokeWidth={4} status="exception" />`}</CodePreview>
          </Col>
        </Row>

        <Divider orientation="left">Process Bar</Divider>
        <Row
          style={{ marginLeft: '20px', alignItems: 'center' }}
          justify="space-around"
          align="middle"
        >
          <Col span={4}>
            <ProcessCustom status="success" percent={40} strokeWidth={4} type={'line'} />
          </Col>
          <Col span={20}>
            <CodePreview>{` <ProcessCustom status="success" percent={40} strokeWidth={4} type={'line'} />`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ProcessCustom status="exception" percent={40} strokeWidth={4} type={'line'} />
          </Col>
          <Col span={20}>
            <CodePreview>{` <ProcessCustom status="exception"  percent={40} strokeWidth={4} type={'line'}/>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ProcessCustom percent={40} strokeWidth={4} type={'line'} />
          </Col>
          <Col span={20}>
            <CodePreview>{`  <ProcessCustom percent={40} strokeWidth={4} type={'line'} />`}</CodePreview>
          </Col>
        </Row>

        <Divider orientation="left">Process Bar</Divider>
        <Row
          style={{ marginLeft: '20px', marginBottom: '10px' }}
          justify="space-around"
          align="middle"
        >
          <Col span={4}>
            <ProcessCustom
              type="circle"
              percent={70}
              width={40}
              status="active"
              format={(percent) => <span>{percent ? percent % 4 : 0} / 4</span>}
            />
          </Col>
          <Col span={20}>
            <CodePreview>{` 
            <ProcessCustom
              type="circle"
              percent={70}
              width={40}
              status="active"
              format={(percent) => <span>{percent ? percent % 4 : 0} / 4</span>}
            />`}</CodePreview>
          </Col>
        </Row>
        <Row
          style={{ marginLeft: '20px', marginBottom: '10px' }}
          justify="space-around"
          align="middle"
        >
          <Col span={4}>
            <ProcessCustom
              type="circle"
              percent={70}
              width={40}
              status="exception"
              format={(percent) => <span>{percent ? percent % 4 : 0} / 4</span>}
            />
          </Col>
          <Col span={20}>
            <CodePreview>{` <ProcessCustom
              type="circle"
              percent={70}
              width={40}
              status="exception"
              format={(percent) => <span>{percent ? percent % 4 : 0} / 4</span>}
            />`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ProcessCustom
              type="circle"
              percent={100}
              width={40}
              status="success"
              format={(percent) => <span>{percent ? percent / 25 : 0} / 4</span>}
            />
          </Col>
          <Col span={20}>
            <CodePreview>{`  <ProcessCustom
              type="circle"
              percent={100}
              width={40}
              status="success"
              format={(percent) => <span>{percent ? percent / 25 : 0} / 4</span>}
            />`}</CodePreview>
          </Col>
        </Row>

        <Divider>Process Layout For Date</Divider>
        <Row>
          <Col>
            <ProcessDate fromDate={'2022/06/15'} toDate={'2022/09/20'} />
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default ProcessComponent;
