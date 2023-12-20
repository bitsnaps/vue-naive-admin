const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Dashboard',
  path: '/',
  component: Layout,
  redirect: '/workbench',
  children: [
    {
      name: 'Workbench',
      path: 'workbench',
      component: () => import('./index.vue'),
      meta: {
        title: 'Workbench',
        icon: 'mdi:home',
        order: 0,
      },
    },
  ],
}
