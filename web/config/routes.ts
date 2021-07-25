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
    name: 'leader',
    icon: 'table',
    path: '/account/leader.tsx',
    component: './Account/leader.tsx',
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
    name: 'order',
    icon: 'table',
    path: '/orderform',
    component: './orderform/process.tsx',
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
    ],
  },

  {
    name: 'orderform',
    icon: 'table',
    hideInMenu: false,
    routes: [
      {
        name: 'order',
        path: '/orderform/order',
        component: './orderform/order.tsx',
        hideInMenu: false,
      },        {
        name: 'process',
        path: '/orderform/process',
        component: './orderform/process',
        hideInMenu: false,
      },
      {
        name: 'checkout',
        path: '/orderform/checkout',
        component: './orderform/checkout',
        hideInMenu: false,
      },
      {
        name: 'chargeback',
        path: '/orderform/chargeback',
        component: './orderform/chargeback',
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
]
