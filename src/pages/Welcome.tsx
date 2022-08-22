import ModalMain from '@/components/Modal';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

const Welcome: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const handle = () => {
    setVisible(!visible);
  };
  const actiondelete = () => {
    console.log('Success:', form.getFieldsValue()['username']);
  };
  return (
    <PageContainer>
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
            action: actiondelete,
          },
        ]}
        visible={visible}
        handle={() => handle()}
      >
        <Form form={form} onFinish={actiondelete}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
        {/* <input type="text" /> */}
        <h1>xin chào</h1>
      </ModalMain>

      {/* <Form onFinish={actiondelete}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form> */}
    </PageContainer>
  );
};

export default Welcome;
