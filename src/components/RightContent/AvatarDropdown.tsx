import avatarImg from '@/assets/images/png/avatar/user-male.png';
import { logout } from '@/services/unicloud-ca-cms/AuthController';
import { ChevronDownIcon } from '@/themes/icons';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';

import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const loginOut = async () => {
  const refreshTokenStorage = localStorage.getItem('refresh-token');
  await logout({ refreshToken: refreshTokenStorage as string });
  localStorage.clear();

  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/auth/login' && !redirect) {
    history.replace({
      pathname: '/auth/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;
  if (!currentUser || !currentUser.fullName) {
    return loading;
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );
  const notificationDropdown = (
    <div className="div-wrapper-nofication">
      <p>Thông báo số 1</p>
      <p>Thông báo số 2</p>
      <p>Thông báo số 3</p>
      <p>Thông báo số 4</p>
    </div>
  );

  return (
    <>
      <div className="custom-header-cms">
        <Dropdown
          overlayClassName="ant-dropdown-custom"
          overlay={notificationDropdown}
          trigger={['click']}
        >
          <span style={{ paddingLeft: 20, paddingRight: 20 }}>
            <img src="/icons/notification-icon.svg" alt="" />
          </span>
        </Dropdown>
        <HeaderDropdown overlay={menuHeaderDropdown} className="dropdown-menu-custom">
          <span className={`custom-v3 ${styles.action} ${styles.account}`}>
            <Avatar size="large" className={styles.avatar} src={avatarImg} alt="avatar" />
            <span className={`${styles.name} anticon`}>
              {currentUser.fullName} <ChevronDownIcon style={{ marginLeft: 8 }} />
            </span>
          </span>
        </HeaderDropdown>
      </div>
    </>
  );
};

export default AvatarDropdown;
