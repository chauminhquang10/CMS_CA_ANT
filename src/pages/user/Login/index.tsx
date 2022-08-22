// import { login } from '@/services/ant-design-pro/api';
import { login } from '@/services/unicloud-ca-cms/AuthController';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import './index.less';
// import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  //   const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log('userInfo', userInfo);

    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo as API.GetUserInfoResponse,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    //   const handleSubmit = async (values: API.LoginParams) => {

    try {
      const msg = await login({ ...values });
      // eslint-disable-next-line @typescript-eslint/dot-notation
      if (msg['message'] === 'Success' || msg['code'] === 103) {
        //   if (msg.status === 'ok') {
        // const defaultLoginSuccessMessage = intl.formatMessage({
        //   id: 'pages.login.success',
        // });
        const defaultLoginSuccessMessage = 'Đăng nhập thành công';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };

        history.push(redirect || '/');
        return;
      } else {
        setUserLoginState({
          status: 'error',
          type: 'account',
          message: 'Tên đăng nhập hoặc mật khẩu chưa đúng',
        });
      }
      console.log('msg', msg);
    } catch (error) {
      //   const defaultLoginFailureMessage = intl.formatMessage({
      //     id: 'pages.login.failure',
      //   });
      //   message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType, message: msgError } = userLoginState;

  const titleButton = type === 'account' ? 'Đăng nhập' : 'Lấy lại mật khẩu';

  return (
    <main>
      <div className="container">
        {/* <div className="lang" data-lang>
                {SelectLang && <SelectLang />}
              </div> */}
        <div className="content">
          <LoginForm
            submitter={{
              searchConfig: { submitText: titleButton, resetText: titleButton },
            }}
            // submitter={{ titleButton }}
            logo={<img alt="logo" src="/icons/logo-unicloudCA.svg" />}
            //   title="Ant Design"
            //   subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
            initialValues={{
              autoLogin: true,
            }}
            actions={
              [
                // <FormattedMessage
                //   key="loginWith"
                //   id="pages.login.loginWith"
                //   defaultMessage="其他登录方式"
                // />,
                // <AlipayCircleOutlined key="AlipayCircleOutlined" className="icon" />,
                // <TaobaoCircleOutlined key="TaobaoCircleOutlined" className="icon" />,
                // <WeiboCircleOutlined key="WeiboCircleOutlined" className="icon" />,
                //   <ButtonLoginUni
                //     theme="dark"
                //     style={{ background: 'blue' }}
                //     onSuccess={success}
                //     onFailure={error}
                //     autoLoad={true}
                //     key="login-button-1"
                //   />,
              ]
            }
            onFinish={async (values) => {
              if (titleButton === 'Đăng nhập') {
                await handleSubmit(values as API.LoginParams);
              } else {
                alert('action lấy lại mật khẩu');
              }
            }}
            className="login-form-cms"
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane key="account" tab="Đăng nhập" />
              {/* <Tabs.TabPane key="mobile" tab="Đăng ký" /> */}
              {/* <Tabs.TabPane key="passwordRecovery" tab="Khôi phục" /> */}
            </Tabs>
            {status === 'error' && loginType === 'account' && (
              <LoginMessage content={msgError?.toString() as string} />
            )}
            {type === 'account' && (
              //   {status === 'error' && loginType === 'account' && (
              //   	<LoginMessage content="Tên đăng nhập hoặc mật khẩu chưa đúng" />
              //     )}
              <div className="form-login-cms-1">
                <label htmlFor="username" className="lable-login-form">
                  Tên đăng nhập
                </label>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    //   prefix: <UserOutlined className="prefixIcon" />,
                  }}
                  //   initialValue="0338597147"
                  placeholder="Nhập tên đăng nhập"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên đăng nhập',
                    },
                  ]}
                />
                <label htmlFor="password" className="lable-login-form">
                  Mật khẩu
                </label>
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    // prefix: <LockOutlined className="prefixIcon" />,
                  }}
                  placeholder="Nhập mật khẩu"
                  //   initialValue="user"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu',
                    },
                  ]}
                />
                <div
                  style={{
                    marginBottom: 24,
                  }}
                >
                  <ProFormCheckbox noStyle name="autoLogin">
                    Ghi nhớ đăng nhập
                  </ProFormCheckbox>
                </div>
              </div>
            )}
            {/* {status === 'error' && loginType === 'passwordRecovery' && (
              <LoginMessage content="Mật khẩu chưa đúng" />
            )} */}
          </LoginForm>
        </div>
      </div>
    </main>
  );
};

export default Login;
