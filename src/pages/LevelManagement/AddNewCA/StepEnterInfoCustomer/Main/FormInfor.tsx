import ButtonCustom from '@/components/Button';
import { validatorEmail, validatorPhone } from '@/utils/rules';
import type { FormInstance } from 'antd';
import { Form, Input } from 'antd';
type CustomRecord = Record<string, string>;
type FormCustomProps = {
  isIndividual?: boolean;
  formCurrent: FormInstance<any>;
  typeForm: 'Owner' | 'LeaderShip' | 'BuyerInfo'; // form enter about info owner, leadership, buyerInfo
  isCheck?: boolean; // find user success, show form FullName, Email
  handleCheckUser?: (values: any) => void;
};

const FormInfor: React.FC<FormCustomProps> = (props) => {
  const { handleCheckUser, formCurrent, typeForm, isCheck } = props;
  const formItemLayout = {
    labelCol: { span: 32 },
    wrapperCol: { span: 32 },
  };

  const onFinish = (values: any) => {
    handleCheckUser?.(values);
  };

  const handleSetValueForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const record: CustomRecord = {};
    if (event.target.value) {
      record[`${event.target.name}`] = event.target.value;
      formCurrent.setFieldsValue({ ...record });
    }
  };

  return (
    <Form
      {...formItemLayout}
      size="large"
      layout={'inline'}
      className="form-inline-text-vertical"
      form={formCurrent}
      onFinish={onFinish}
      style={isCheck ? {} : { width: '40%', margin: 'auto' }}
    >
      {isCheck && (
        <Form.Item
          name={
            typeForm === 'Owner'
              ? 'fullName'
              : typeForm === 'LeaderShip'
              ? 'fullNameLeaderShip'
              : 'fullNameBuyer'
          }
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
            name={
              typeForm === 'Owner'
                ? 'fullName'
                : typeForm === 'LeaderShip'
                ? 'fullNameLeaderShip'
                : 'fullNameBuyer'
            }
            key={typeForm}
            disabled={typeForm === 'Owner' && isCheck ? true : false}
            placeholder="Nhập họ và tên"
            onChange={(event) => {
              handleSetValueForm(event);
            }}
          />
        </Form.Item>
      )}
      <Form.Item
        name={
          typeForm === 'Owner'
            ? 'phoneNumber'
            : typeForm === 'LeaderShip'
            ? 'phoneNumberLeaderShip'
            : 'phoneNumberBuyer'
        }
        label={<div className="label-txt-required">Số điện thoại</div>}
        className="form-input-custom"
        rules={[
          () => ({
            required: true,
            validator(_, value) {
              return validatorPhone(_, value);
            },
            validateTrigger: 'onSubmit',
          }),
        ]}
        dependencies={['phoneNumber']}
      >
        <Input
          name={
            typeForm === 'Owner'
              ? 'phoneNumber'
              : typeForm === 'LeaderShip'
              ? 'phoneNumberLeaderShip'
              : 'phoneNumberBuyer'
          }
          key={typeForm}
          disabled={typeForm === 'Owner' && isCheck ? true : false}
          placeholder="Nhập số điện thoại"
          maxLength={10}
          onChange={(event) => {
            handleSetValueForm(event);
          }}
        />
      </Form.Item>
      {!isCheck && (
        <ButtonCustom
          className="btn-custom btn-primary-blue"
          htmlType="submit"
          style={{ position: 'relative', bottom: '-40px' }}
        >
          Kiểm tra
        </ButtonCustom>
      )}
      {isCheck && (
        <Form.Item
          name={
            typeForm === 'Owner'
              ? 'emailAddress'
              : typeForm === 'LeaderShip'
              ? 'emailAddressLeaderShip'
              : 'emailAddressBuyer'
          }
          label={
            <>
              <div className="label-txt-required">Email</div>
              {typeForm === 'Owner' ? (
                <span style={{ marginLeft: '4px', color: '#0979FD' }}>
                  (Email dùng để kích hoạt chứng thư số)
                </span>
              ) : null}
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
            name={
              typeForm === 'Owner'
                ? 'emailAddress'
                : typeForm === 'LeaderShip'
                ? 'emailAddressLeaderShip'
                : 'emailAddressBuyer'
            }
            key={typeForm}
            disabled={typeForm === 'Owner' && isCheck ? true : false}
            placeholder="Nhập email"
            onChange={(event) => {
              handleSetValueForm(event);
            }}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default FormInfor;
