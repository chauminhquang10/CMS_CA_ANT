import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Icon from './icon';
import UseUnicloudLogin from './LoginUnicloud';

const ButtonLoginUni = (props) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const {
    onSuccess,
    onAutoLoadFinished,
    onRequest,
    onFailure,
    onScriptLoadFailure,
    tag,
    type,
    className,
    disabledStyle,
    buttonText,
    children,
    render,
    theme,
    icon,
    disabled: disabledProp,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    autoLoad,
    isSignedIn,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    uxMode,
    scope,
    accessType,
    responseType,
    jsSrc,
    prompt,
    loginApi,
    tokenId,
    target,
    style,
  } = props;

  const { signIn } = UseUnicloudLogin({
    onSuccess,
    onAutoLoadFinished,
    onRequest,
    onFailure,
    onScriptLoadFailure,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    autoLoad,
    isSignedIn,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    uxMode,
    scope,
    accessType,
    responseType,
    jsSrc,
    prompt,
    loginApi,
    tokenId,
    target,
    style,
  });
  const disabled = disabledProp;

  if (render) {
    return render({ onClick: signIn, disabled });
  }

  const initialStyle = {
    backgroundColor: theme === 'dark' ? '#fff' : '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme === 'dark' ? '#000' : 'rgba(0, 0, 0, .54)',
    boxShadow: 'none',
    padding: 2,
    borderRadius: 90,
    border: '1px solid #E2E6F2',
    fontSize: 14,
    fontWeight: '500',
    width: '100%',
  };

  const hoveredStyle = {
    cursor: 'pointer',
    opacity: 0.9,
  };

  const activeStyle = {
    cursor: 'pointer',
    backgroundColor: theme === 'dark' ? '#fff' : '#eee',
    color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
    opacity: 1,
  };

  const defaultStyle = (() => {
    if (disabled) {
      return Object.assign({}, initialStyle, disabledStyle);
    }

    if (active) {
      if (theme === 'dark') {
        return Object.assign({}, initialStyle, activeStyle);
      }

      return Object.assign({}, initialStyle, activeStyle);
    }

    if (hovered) {
      return Object.assign({}, initialStyle, hoveredStyle);
    }

    return initialStyle;
  })();
  const googleLoginButton = React.createElement(
    tag,
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setActive(false);
      },
      onMouseDown: () => setActive(true),
      onMouseUp: () => setActive(false),
      onClick: signIn,
      style: defaultStyle,
      type,
      disabled,
      className,
    },
    [
      icon && <Icon key={1} active={active} />,
      <span
        icon={icon}
        key={2}
        style={{
          paddingRight: 10,
          fontWeight: 500,
          paddingLeft: icon ? 0 : 10,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {children || buttonText}
      </span>,
    ],
  );

  return googleLoginButton;
};

ButtonLoginUni.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onScriptLoadFailure: PropTypes.func,
  clientId: PropTypes.string,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.node,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
  responseType: PropTypes.string,
  type: PropTypes.string,
  accessType: PropTypes.string,
  render: PropTypes.func,
  theme: PropTypes.string,
  icon: PropTypes.bool,
  loginApi: PropTypes.string,
  tokenId: PropTypes.string,
  style: PropTypes.object,
};

ButtonLoginUni.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Đăng nhập với Unicloud ID',
  scope: 'profile email',
  accessType: 'online',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6,
  },
  icon: true,
  theme: 'light',
  style: '',

  onRequest: () => {},
};

export default ButtonLoginUni;
