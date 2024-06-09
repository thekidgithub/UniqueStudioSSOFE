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

const useEditStore = defineStore('edit', {
  state: (): EditStore => ({
    editFormInfo: {
      name: '',
      gender: null,
      phoneNumber: '',
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
            phone: this.editFormInfo.phoneNumber,
            password: this.editFormInfo.password,
            email: this.editFormInfo.email
          };
          const res: Promise<EditResponse> = edit(oPostData);
          res.then((response) => {
            if (response !== null) {
              Message.success(i18n.global.t('edit.success'));
            }
          });
        }
      });
    },
    getUserInfo(): any {
      const res: Promise<getInfoResponse> = getInfo();
      res.then((response) => {
        if (response !== null) {
          return response.data;
        }
      });
    }
  },
});

export default useEditStore;
