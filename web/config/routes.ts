export default [
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
    name: 'list.account',
    icon: 'table',
    path: '/account',
    component: './Account/index.tsx',
  },
  {
    name: 'detail.book',
    icon: 'table',
    path: '/Book.detail/:id',
    component: './Book/detail.tsx',
    hideInMenu: true,
  },
  {
    name: 'detail.user',
    icon: 'table',
    path: '/Account.detail/:id',
    component: './Account/detail.tsx',
    hideInMenu: true,
  },
  {
    name: 'list.book',
    icon: 'table',
    path: '/Book',
    component: './Book/index.tsx',
  },
  {
    name: 'sample',
    icon: 'table',
    routes: [
      {
        name: 'lifebook.del',
        path: '/hell/lifebook.del',
        component: './hell/lifebook.del',
      },
      {
        name: 'sample',
        path: '/hell/sample',
        component: './hell/sample',
      },
    ],
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './ListTableList',
  // },
];
