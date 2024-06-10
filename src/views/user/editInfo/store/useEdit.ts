import { defineStore } from 'pinia';
import type { ValidatedError } from '@arco-design/web-vue';
import { Message } from '@arco-design/web-vue';
import type {
  EditRequest,
  EditResponse,
} from '@/constants/httpMsg/register/EditStatusMsg';

import type {
  getInfoResponse
} from '@/constants/httpMsg/register/InfoStatusMsg';

import { edit } from '@/api';
import { getInfo } from '@/api/getInfo';

import i18n from '@/locale';

import { EditStore } from '../type';
import router from '@/router';

const useEditStore = defineStore('edit', {
  state: (): EditStore => ({
    editFormInfo: {
      name: '',
      gender: null,
      password: '',
      email: '',
    },
    userInfo: {
      name: '',
      gender: null,
      phoneNumber: '',
      email: '',
    }
  }),
  actions: {
    handleEdit(editFormRef: any) {
      editFormRef.validate().then((ValidatedError: ValidatedError) => {
        if (ValidatedError) {
          return;
        } else {
          const oPostData: EditRequest = {
            name: this.editFormInfo.name,
            gender: this.editFormInfo.gender!,
            password: this.editFormInfo.password,
            email: this.editFormInfo.email
          };
          const res: Promise<EditResponse> = edit(oPostData);
          res.then((response) => {
            if (response !== null) {
              Message.success(i18n.global.t('edit.success'));
              router.push('/user/edit-info').then(() => {
                router.go(0);
              });
            }
          });
        }
      });
    },
    getUserInfo(): Promise<any> {
      return new Promise((resolve) => {
        const res: Promise<getInfoResponse> = getInfo();
        res.then((response) => {
          if (response !== null) {
            resolve(response.data);
          }
        }).catch(() => {
            router.push('/login');
        }); 
      });
    }
  },
});

export default useEditStore;
