import {
  Body1,
  Body2,
  Body3,
  CustomHeading1,
  CustomHeading2,
  CustomHeading3,
  CustomHeading4,
  CustomHeading5,
  Subtitle,
} from '@/components/HeadingColor';
import { PageContainer } from '@ant-design/pro-components';

import { Card, Col, Divider, Row, Typography } from 'antd';

import React from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre style={{ margin: '12px 0', padding: '6px 0px', background: '#fff' }}>
    <code>
      <Typography.Text copyable code>
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const InputComponent: React.FC = () => {
  //   const listColor = [
  //     'dark-blue',
  //     'orange',
  //     'green',
  //     'blue',
  //     'red',
  //     'green',
  //     'yellow',
  //     'ink',
  //     'black',
  //     'white',
  //   ];

  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Heading</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CustomHeading1>h1</CustomHeading1>
          </Col>
          <Col span={16}>
            <CodePreview>{`<CustomHeading1>h1</CustomHeading1>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CustomHeading2>h2</CustomHeading2>
          </Col>
          <Col span={16}>
            <CodePreview>{`<CustomHeading2>h2</CustomHeading2>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CustomHeading3>h3</CustomHeading3>
          </Col>
          <Col span={16}>
            <CodePreview>{`<CustomHeading3>h3</CustomHeading3>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CustomHeading4>h4</CustomHeading4>
          </Col>
          <Col span={16}>
            <CodePreview>{`<CustomHeading4>h4</CustomHeading4>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CustomHeading5>h5</CustomHeading5>
          </Col>
          <Col span={16}>
            <CodePreview>{`<CustomHeading5>h5</CustomHeading5>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <Subtitle>Subtitle</Subtitle>
          </Col>
          <Col span={16}>
            <CodePreview>{`<Subtitle>Subtitle</Subtitle>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <Body1>Body 1</Body1>
          </Col>
          <Col span={16}>
            <CodePreview>{`<Body1>Body 1</Body1>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <Body2>Body 2</Body2>
          </Col>
          <Col span={16}>
            <CodePreview>{`<Body2>Body 2</Body2>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <Body3>Body 3</Body3>
          </Col>
          <Col span={16}>
            <CodePreview>{`<Body3>Body 3</Body3>`}</CodePreview>
          </Col>
        </Row>

        {/* <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          {listColor.map((color) => {
            console.log(styless['@color-ink-0']);
            return (
              <>
                <Col span={4}>
                  <span>color-{color}-5</span>
                </Col>
                <Col span={8}>
                  <div style={{ height: 50, backgroundColor: styless['@color-ink-100'] }}></div>
                </Col>
                <Col span={4}>
                  <span>color-{color}-10</span>
                </Col>
                <Col span={8}>
                  <div></div>
                </Col>
              </>
            );
          })}
        </Row> */}
      </Card>
    </PageContainer>
  );
};

export default InputComponent;
