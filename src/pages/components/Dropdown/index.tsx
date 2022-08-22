import DropdownCustom from '@/components/Dropdown';
import { CaretDownOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, Menu, Row, Space, Typography } from 'antd';
import React from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre style={{ margin: '12px 0', padding: '6px 0px', background: '#fff', fontSize: '12px' }}>
    <code>
      <Typography.Text code type="secondary" copyable>
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const menu = (
  <Menu
    items={[
      {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);

const TagComponent: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Dropdown</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <DropdownCustom className="dropdown-success" overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Đã hoàn thành
                  <CaretDownOutlined />
                </Space>
              </a>
            </DropdownCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` 
            <DropdownCustom className="dropdown-success" overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Đã hoàn thành
                  <CaretDownOutlined />
                </Space>
              </a>
            </DropdownCustom>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <DropdownCustom className="dropdown-dangerous" overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Chưa hoàn thành
                  <CaretDownOutlined />
                </Space>
              </a>
            </DropdownCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` 
            <DropdownCustom className="dropdown-dangerous" overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Đã hoàn thành
                  <CaretDownOutlined />
                </Space>
              </a>
            </DropdownCustom>`}</CodePreview>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default TagComponent;
