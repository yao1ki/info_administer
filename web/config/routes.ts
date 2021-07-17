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
    name: 'lifebook',
    icon: 'table',
    routes: [
      {
        name: 'demon',
        path: '/lifebook/demon',
        component: './lifebook/demon',
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
    ],
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
},
]
