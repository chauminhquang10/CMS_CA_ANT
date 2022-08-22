import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { getInfo } from './services/unicloud-ca-cms/UserController';
import { ArrowLeftMenuIcon, ArrowRightMenuIcon } from './themes/icons';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.GetUserInfoResponse;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.ResponseBaseGetUserInfoResponse | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await getInfo();

      return msg.data;
    } catch (error) {
      console.log('error', error);
    }
    return undefined;
  };
  if (history.location.pathname !== loginPath && localStorage.getItem('token')) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser: currentUser as API.GetUserInfoResponse,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    collapsedButtonRender: (collapsed) => {
      if (collapsed) return <ArrowRightMenuIcon />;
      else return <ArrowLeftMenuIcon />;
    },
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    loading: false,

    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        console.log('vo day');

        history.push(loginPath);
      }
    },
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children, props) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return (
    //     <>
    //       {children}
    //       {!props.location?.pathname?.includes('/login') && (
    //         <SettingDrawer
    //           disableUrlParams
    //           enableDarkTheme
    //           settings={initialState?.settings}
    //           onSettingChange={(settings) => {
    //             setInitialState((preInitialState: any) => ({
    //               ...preInitialState,
    //               settings,
    //             }));
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // },
    ...initialState?.settings,
  };
};
