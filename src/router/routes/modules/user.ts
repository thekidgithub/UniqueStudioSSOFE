import { DEFAULT_LAYOUT } from '../base';
import Cookies from 'js-cookie';
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
      beforeEnter(_to: any, _from: any, next: (arg0?: string | undefined) => void) {
        const cookie = Cookies.get('SSO_SESSION');
        console.log(Cookies.get());
        console.log(document.cookie);
        
        console.log('cookie1:', cookie);
        if (cookie) {
          console.log('cookie2:', cookie);
          next(); 
        } else {
          console.log('no cookie');
          
          next('/login'); 
        }
      }
    },
  ],
};

export default DASHBOARD;