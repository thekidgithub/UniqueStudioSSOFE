// import { PingResponse } from '@/constants/httpMsg/register/PingStatusMsg';
import { DEFAULT_LAYOUT } from '../base';
// import { ping } from '@/api/ping';
const DASHBOARD = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user',
    requiresAuth: true,
    icon: 'icon-user',
    order: 2,
  },
  children: [
    {
      path: 'edit-info',
      name: 'editInfo',
      component: () => import('@/views/user/editInfo/index.vue'),
      meta: {
        locale: 'menu.user.editInfo',
        requiresAuth: true,
      },
    },
  ],
  // beforeEnter(_to: any, _from: any, next: (arg0?: string | undefined) => void) {
  //   const res: Promise<PingResponse> = ping();
  //   res.then((response) => {
  //     if (response !== null) {
  //       console.log(res);
  //       next();
  //     }
  //     else next('/login');
  //   }).catch((err) => {
  //     console.error(err);
  //   }); 
  // }
};

export default DASHBOARD;