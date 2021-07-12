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
    name: 'del.book',
    icon: 'table',
    path: '/Book.del',
    component: './Book/del.tsx',
    hideInMenu:true,
  },
  {
    name: 'del.user',
    icon: 'table',
    path: '/Account.del/:id',
    component: './Account/del.tsx',
    hideInMenu:true ,
  },
  {
    name: 'list.book',
    icon: 'table',
    path: '/Book',
    component: './Book/index.tsx',
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
