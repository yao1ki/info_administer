// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';

import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },

    {
      path: '/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',
    },
    {
      name: 'leader',
      icon: 'table',
      path: '/account/leader.tsx',
      component: './Account/leader.tsx',
    },
    {
      name:'order',
      icon:'table',
     path:'/order/index.tsx',
     component:'./Order/index.tsx' 
    },
    {
      name: 'list.account',
      icon: 'table',
      path: '/account/index.tsx',
      component: './Account/index.tsx',
    },

    {
      name: 'detail.user',
      icon: 'table',
      path: '/Account.detail/:id',
      component: './Account/detail.tsx',
      hideInMenu: true,
    },

    {
      name: 'death.book',
      icon: 'table',
      path: '/lifebook',
      component: './lifebook/index.tsx',
    },

    {
      name: 'lifebook',
      icon: 'table',
      hideInMenu: true,
      routes: [
        {
          name: 'birth',
          path: '/lifebook/birth',
          component: './lifebook/birth',
          hideInMenu: true,
        },
        {
          name: 'ghost',
          path: '/lifebook/ghost',
          component: './lifebook/ghost',
          hideInMenu: true,
        },
        {
          name: 'live',
          path: '/lifebook/live',
          component: './lifebook/live',
          hideInMenu: true,
        },
        {
          name: 'mistake',
          path: '/lifebook/mistake',
          component: './lifebook/mistake',
          hideInMenu: true,
        },
        {
          name: 'process',
          path: '/order/process',
          component: './Order/process/index.tsx',
          hideInMenu: false,
        },
        {
          name: 'checkout',
          path: '/order/checkout',
          component: './Order/checkout/index.tsx',
          hideInMenu: false,
        },
        {
          name: 'chargeback',
          path: '/order/chargeback',
          component: './Order/chargeback/index.tsx',
          hideInMenu: false,
        },
////////////////////////////
      ],
    },


    {
      name: 'order',
      icon: 'table',
      hideInMenu: false,
      routes: [
        {
          name: 'process',
          path: '/order/process',
          component: './Order/process/index.tsx',
          hideInMenu: false,
        },
        {
          name: 'checkout',
          path: '/order/checkout',
          component: './Order/checkout/index.tsx',
          hideInMenu: false,
        },
        {
          name: 'chargeback',
          path: '/order/chargeback',
          component: './Order/chargeback/index.tsx',
          hideInMenu: false,
        },
      ],
    },

    ///////////////////////////
    {
      name: 'detail.book',
      icon: 'table',
      path: '/Book.detail/:id',
      component: './Book/detail.tsx',
      hideInMenu: true,
    },

    {
      name: 'list.book',
      icon: 'table',
      path: '/Book',
      component: './Book/index.tsx',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
});
