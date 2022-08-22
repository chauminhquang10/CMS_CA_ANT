import { validatorEmail, validatorPhone } from '@/utils/rules';
import type { FormInstance } from 'antd';
import { Form, Input, Spin } from 'antd';

type FormCustomProps = {
  formCurrent: FormInstance<any>;
  isLoading: boolean;
};

const StepCreateOwner: React.FC<FormCustomProps> = (props) => {
  const { formCurrent, isLoading } = props;
  const formItemLayout = {
    labelCol: { span: 32 },
    wrapperCol: { span: 32 },
  };
  console.log('isloading', isLoading);

  return (
    <Spin spinning={isLoading} tip="Vui lòng đợi...">
      <Form
        {...formItemLayout}
        size="large"
        layout="inline"
        className="form-inline-text-vertical"
        form={formCurrent}
        style={{ minHeight: '60vh' }}
      >
        <Form.Item
          name="fullName"
          label={<div className="label-txt-required">Họ tên</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ và tên!',
              validateTrigger: 'onSubmit',
            },
          ]}
          style={{ justifyContent: 'flex-start' }}
        >
          <Input
            placeholder="Nhập họ và tên"
            onChange={(event) => {
              formCurrent.setFieldsValue({ fullName: event.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label={<div className="label-txt-required">Số điện thoại</div>}
          className="form-input-custom"
          rules={[
            () => ({
              required: true,
              pattern: new RegExp('^[0-9]*$'),
              validator(_, value) {
                return validatorPhone(_, value);
              },
              validateTrigger: 'onSubmit',
            }),
          ]}
        >
          <Input
            disabled={true}
            placeholder="Nhập số điện thoại"
            onChange={(event) => {
              formCurrent.setFieldsValue({ phoneNumber: event.target.value });
            }}
            maxLength={10}
          />
        </Form.Item>
        <Form.Item
          name="emailAddress"
          label={
            <>
              <div className="label-txt-required">Email</div>
              <span style={{ marginLeft: '4px', color: '#0979FD' }}>
                (Email dùng để kích hoạt chứng thư số)
              </span>
            </>
          }
          className="form-input-custom"
          rules={[
            () => ({
              required: true,
              validator(_, value) {
                return validatorEmail(_, value);
              },
              validateTrigger: 'onSubmit',
            }),
          ]}
        >
          <Input
            placeholder="Nhập email"
            onChange={(event) => {
              formCurrent.setFieldsValue({ emailAddress: event.target.value });
            }}
          />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default StepCreateOwner;
