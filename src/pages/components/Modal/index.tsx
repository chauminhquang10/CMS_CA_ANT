import ModalMain from '@/components/Modal';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Divider, Form, Row, Typography } from 'antd';
import React, { useState } from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre style={{ margin: '12px 0', padding: '6px 0px', background: '#fff' }}>
    <code>
      <Typography.Text code type="secondary" copyable>
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const ModalComponent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const handle = () => {
    setVisible(!visible);
  };
  const actionDelete = () => {
    console.log('Success:', form.getFieldsValue().username);
  };
  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Higher</Divider>
        <Row>
          <Col span={4}>
            <Button onClick={() => setVisible(!visible)}>modal</Button>
            <ModalMain
              title="xin chào tittle"
              listAction={[
                {
                  name: 'Từ chối',
                  class: 'btn-decline-modal',
                  action: function alet() {
                    alert('Từ chối');
                    //   setVisible(false);
                  },
                },
                {
                  name: 'Đồng ý',
                  class: 'btn-accept-modal',
                  action: actionDelete,
                },
              ]}
              visible={visible}
              handle={() => handle()}
            >
              <h1>xin chào</h1>
            </ModalMain>
          </Col>
          <Col span={16}>
            <CodePreview>
              {`
               const [visible, setVisible] = useState(false);
               const [form] = Form.useForm();
               const handle = () => {
                    setVisible(!visible);
                };
                const actionDelete = () => {
                    console.log('Success:', form.getFieldsValue().username);
                };
                <Button onClick={() => setVisible(!visible)}>modal</Button>
                    <ModalMain title="xin chào tittle" visible={visible} handle={() => handle()}
					listAction={[
						{
						name: 'Từ chối',
						class: 'btn-decline-modal',
						action: function alet() {
							alert('Từ chối');
							//   setVisible(false);
						},
						},
						{
						name: 'Đồng ý',
						class: 'btn-accept-modal',
						action: actionDelete,
						},
					]}
					>
                    <h1>xin chào</h1>
                </ModalMain>`}
            </CodePreview>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default ModalComponent;
