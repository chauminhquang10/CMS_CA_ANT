import { ButtonLoginUni } from '@/utils/Login';
import './index.less';

const success = (response: any) => {
  console.log(response); // eslint-disable-line
};

const error = (response: any) => {
  console.error(response); // eslint-disable-line
};

export default function ButtonLogin() {
  return (
    <div className="btn-login-uniid">
      <ButtonLoginUni
        theme="dark"
        style={{ background: 'blue' }}
        onSuccess={success}
        onFailure={error}
        autoLoad={true}
      />
    </div>
  );
}
