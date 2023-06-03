export default [
    {
      name: "Master",
      path: "/",
      component: () => import('../pages/layout/master.vue'),
      redirect: '/dashboard',
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../pages/dashboard'),
        },
        {
          name: 'user',
          path: 'user',
          component: () => import('../pages/user'),
        },
        {
          name: 'product',
          path: 'product',
          component: () => import('../pages/product'),
        },
        {
          name: 'contact',
          path: 'contact',
          component: () => import('../pages/contact'),
        }
      ]
    },
  ];
  