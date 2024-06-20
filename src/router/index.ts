import { createRouter, createWebHistory } from 'vue-router';
import { NO_PERMISSION } from './routes/base';
import { appRoutes } from './routes';
import Cookies from 'js-cookie';
import createRouteGuard from './guard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/user/edit-info',
      beforeEnter(_to, _from, next) {
        const cookie = Cookies.get('SSO_SESSION');
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
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
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
