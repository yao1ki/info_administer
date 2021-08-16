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
    authority:['aa']
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
    name:'orderform',
    icon:'table',
   path:'/Form/index.tsx',
   component:'./Form/index.tsx' 
  },
  {
    name:'checkout',
    icon:'table',
   path:'/Form/checkout.tsx',
   component:'./Form/checkout.tsx' ,
   hideInMenu: true,
  },
  {
    name:'process',
    icon:'table',
   path:'/Form/process.tsx',
   component:'./Form/process.tsx' ,
   hideInMenu: true,
  },
  {
    name:'chargeback',
    icon:'table',
   path:'/Form/chargeback.tsx',
   component:'./Form/chargeback.tsx' ,
   hideInMenu: true,
  },
  {
    name:'order',
    icon:'table',
   path:'/Form/index.tsx',
   component:'./Form/index.tsx' ,
   hideInMenu: true,
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

  {
    name: 'card-list',
    icon: 'table',
    path: '/card-list/index',
    component: './card-list/index',
  },
]