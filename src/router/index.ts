import { createRouter, createWebHistory } from 'vue-router';
import { NO_PERMISSION } from './routes/base';
import { appRoutes } from './routes';
import createRouteGuard from './guard';
import { LogoutResponse } from '@/constants/httpMsg/register/LogoutStatusMsg';
import i18n from '@/locale';
import { Message } from '@arco-design/web-vue';
import { logout } from '@/api/logout';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/user/edit-info',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
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
      }
    },
    
    ...appRoutes,
    NO_PERMISSION,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
