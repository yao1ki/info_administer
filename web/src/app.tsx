import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings, PageLoading } from '@ant-design/pro-layout';
import { message, notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { RequestInterceptor, ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrent();
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    if (response.status === 401) {
      message.warn('未登录或登录过期，请重新登录')
      localStorage.removeItem('token')
      if (history.location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    } else {
      if(response.status === 404) {
        history.push('/404');
      }
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
    throw error;
  }
  if (error.data && error.data.error) {
    message.error(error.data.error);
    return error.data;
  }
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const autoAuthRequestInterceptor : RequestInterceptor = (url, options) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (!options.headers) {
      // eslint-disable-next-line no-param-reassign
      options.headers = {};
    }
    // @ts-ignore：无法访问的代码错误
    // eslint-disable-next-line no-param-reassign
    options.headers.Authorization = `Bearer ${token}`;
  }
  return {
    //url:'http://localhost:7001'+url,
    options,
  };
}
export const request: RequestConfig = {
  errorHandler,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: !resData.error,
      };
    },
  },
  //credentials: 'omit',
  requestInterceptors: [autoAuthRequestInterceptor]
};
