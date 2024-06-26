import { DEFAULT_LAYOUT } from '../base';
import { getInfo } from '@/api/getInfo';
import { logout } from '@/api/logout';
import type {
  getInfoResponse
} from '@/constants/httpMsg/register/InfoStatusMsg';
import { LogoutResponse } from '@/constants/httpMsg/register/LogoutStatusMsg';
import i18n from '@/locale';
import { Message } from '@arco-design/web-vue';

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
  beforeEnter(_to: any, _from: any, next: (arg0?: string | undefined) => void) {
    const logoutParam = new URLSearchParams(window.location.search).get('logout');
    if(logoutParam === 'true') {
      const res: Promise<LogoutResponse> = logout();
      res.then((response) => {
        if (response !== null) {
          Message.success(i18n.global.t('logout.success'));
          next('/login');
        }
      });
    }
    
    const res: Promise<getInfoResponse> = getInfo();
    res.then((response) => {
      if (response !== null) {
        next();
      }
      else next('/login');
    }).catch((err) => {
      console.error(err);
    }); 
  }
};

export default DASHBOARD;