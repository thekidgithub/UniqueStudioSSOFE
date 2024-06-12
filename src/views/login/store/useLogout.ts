import { defineStore } from 'pinia';

import { Message } from '@arco-design/web-vue';

import { logout } from '@/api/logout';
import { LogoutResponse } from '@/constants/httpMsg/register/LogoutStatusMsg';
import i18n from '@/locale';

import router from '@/router';

const useLogoutStore = defineStore('logout', {
  actions: {
    handleLogout() {
      const res: Promise<LogoutResponse> = logout();
      res.then((response) => {
        if (response !== null) {
          Message.success(i18n.global.t('logout.success'));
          router.push('/login')
        }
      });
    },
  },
});

export default useLogoutStore;
