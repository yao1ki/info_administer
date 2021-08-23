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
      access: 'adminRouteFilter',
    },
    {
      path: '/Settings/components/base',
      name: 'welcome',
      icon: 'smile',
      component: './Settings/components/base',
      access: 'user',
    },

    {
      path: '/Record',
      name: 'test',
      icon: 'smile',
      component: './Record',
    },

    {
      path: '/Lucky/:id',
      name: 'lucky',
      icon: 'table',
      component: './Lucky/lucky.jsx',
      hideInMenu: true,
    },
    {
      path: '/Create',
      name: 'create',
      icon: 'table',
      component: './Lucky/create',
      hideInMenu: true,
    },

    {
      name: 'leader',
      icon: 'table',
      path: '/account/leader.tsx',
      component: './Account/leader.tsx',
      access: 'adminRouteFilter',
    },

    {
      name: 'list.account',
      icon: 'table',
      path: '/account/index.tsx',
      component: './Account/index.tsx',
      access: 'adminRouteFilter',
    },

    {
      name: 'detail.user',
      icon: 'table',
      path: '/Account.detail/:id',
      component: './Account/detail.tsx',
      hideInMenu: true,
    },
    {
      name: 'detail.lifebook',
      icon: 'table',
      path: '/lifebook.detail/:id',
      component: './lifebook/detail.tsx',
      hideInMenu: true,
    },
    {
      name: 'death.book',
      icon: 'table',
      path: '/lifebook',
      component: './lifebook/index.tsx',
      access: 'adminRouteFilter',
    },
    {
      name: 'Form',
      icon: 'table',
      path: '/Form',
      component: './Form/index.tsx',

      access: 'guestRouteFilter',
    },
    {
      path: '/Tool',
      name: 'tool',
      icon: 'table',
      component: './Tool',
      access: 'guestRouteFilter',
    },
    {
      path: '/Rein',
      name: 'Rein',
      icon: 'table',
      component: './Lucky/index.tsx',
      access: 'userRouteFilter',
    },
    {
      path: '/material',
      name: 'material',
      icon: 'table',
      component: './Lucky/material.tsx',
      access: 'userRouteFilter',
    },
    {
      path: '/record1',
      name: 'record1',
      icon: 'table',
      component: './Lucky/record.tsx',
      access: 'userRouteFilter',
    },
    {
      name: 'Form',
      icon: 'table',
      path: '/Form',
      hideInMenu: true,

      routes: [
        {
          name: 'orderform',
          path: '/Form/index.tsx',
          component: './Form/index.tsx',
          access: 'guestRouteFilter',
        },
        {
          name: 'checkout',
          path: '/Form/checkout.tsx',
          component: './Form/checkout.tsx',
          access: 'adminRouteFilter',
        },
        {
          name: 'process',
          path: '/Form/process.tsx',
          component: './Form/process.tsx',
        },
        {
          name: 'chargeback',
          path: '/Form/chargeback.tsx',
          component: './Form/chargeback.tsx',
        },

        ////////////////////////////
      ],
    },
    {
      name: 'lifebook',
      icon: 'table',
      path: 'lifebook',
      hideInMenu: true,

      routes: [
        {
          name: 'birth',
          path: '/lifebook/birth',
          component: './lifebook/birth',
        },
        {
          name: 'ghost',
          path: '/lifebook/ghost',
          component: './lifebook/ghost',
        },
        {
          name: 'live',
          path: '/lifebook/live',
          component: './lifebook/live',
        },
        {
          name: 'mistake',
          path: '/lifebook/mistake',
          component: './lifebook/mistake',
        },
        ////////////////////////////
      ],
    },
    

    ///////////////////////////
    // {
    //   name: 'detail.book',
    //   icon: 'table',
    //   path: '/Book.detail/:id',
    //   component: './Book/detail.tsx',
    //   hideInMenu: true,
    // },
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
