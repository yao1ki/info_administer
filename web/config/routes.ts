export default[

  {
    name: 'orderform',
    icon: 'table',
    routes: [
      {
        name: 'Form',
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
]