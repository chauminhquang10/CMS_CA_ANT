import CustomInput from '@/components/InputSearch';
// import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, Row, Typography } from 'antd';

import React from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre style={{ margin: '12px 0', padding: '6px 0px', background: '#fff' }}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const InputComponent: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Input Search </Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <CustomInput
              prefix={<img src="/icons/icon-search.svg" />}
              placeholder={'Tìm kiếm'}
              size={'large'}
              className={'input-custom'}
            />
          </Col>
          <Col span={16}>
            <CodePreview>{`
			<CustomInput prefix={<img src="/icons/icon-search.svg" />} 
				placeholder={'Tìm kiếm'} size={'large'} 
				className={'input-custom'} 
			/>`}</CodePreview>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default InputComponent;
