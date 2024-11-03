import { defineStore } from 'pinia';
import type { ValidatedError } from '@arco-design/web-vue';
import { Message } from '@arco-design/web-vue';
import type {
  RegisterRequest,
  RegisterResponse,
} from '@/constants/httpMsg/register/RegisterStatusMsg';
import type {
  ValidateCodeRequest,
  ValidateCodeResponse,
} from '@/constants/httpMsg/register/ValidateStatusMsg';

import { register, sendValidateCode } from '@/api';
import i18n from '@/locale';

import { RegisterStore } from '../type';

// import router from '@/router';

const useRegisterStore = defineStore('register', {
  state: (): RegisterStore => ({
    registerFormInfo: {
      name: '',
      gender: null,
      phoneNumber: '',
      password: '',
      validateCode: '',
      email: ''
    },
    isSendValidateCode: false,
    buttonContent: i18n.global.t('register.getValidateCode'),
  }),
  actions: {
    handleRegister(registerFormRef: any) {
      registerFormRef.validate().then((ValidatedError: ValidatedError) => {
        if (ValidatedError) {
          return;
        } else {
          const oPostData: RegisterRequest = {
            name: this.registerFormInfo.name,
            gender: this.registerFormInfo.gender!,
            phone: this.registerFormInfo.phoneNumber,
            password: this.registerFormInfo.password,
            validate_code: this.registerFormInfo.validateCode,
            email: this.registerFormInfo.email
          };
          const res: Promise<RegisterResponse> = register(oPostData);
          res.then((response) => {
            if (response !== null) {
              // const hr = 'hr2024.hustunique.com';
              // const join = 'join2024.hustunique.com';
              // Message.success(i18n.global.t('register.success'));
              // const from = new URLSearchParams(window.location.search).get('from');
              // if (from) {
              //   if (from === hr || from === join) window.location.href = `https://${from}`;
              //   else router.push('/user/edit-info');
              // }
              // else router.push('/user/edit-info');
              window.location.href = `https://5173.hustunique.com`;
            }
          });
        }
      });
    },
    handleValidateCode(registerFormRef: any) {
      registerFormRef
        .validateField('phoneNumber')
        .then((ValidatedError: ValidatedError) => {
          if (ValidatedError) {
            return;
          } else {
            const oPostData: ValidateCodeRequest = {
              phone: this.registerFormInfo.phoneNumber,
            };
            const res: Promise<ValidateCodeResponse> =
              sendValidateCode(oPostData);
            res.then((response) => {
              if (response !== null) {
                Message.success(
                  i18n.global.t('register.getValidateCode.success'),
                );

              }
            });
            this.isSendValidateCode = true;

            let countDown: number = 60;
            const timeInterval = setInterval(() => {
              countDown--;
              if (countDown > 0) {
                this.buttonContent = String(countDown);
              } else {
                this.buttonContent = i18n.global.t('register.getValidateCode');
                this.isSendValidateCode = false;
                clearInterval(timeInterval);
              }
            }, 1000);
          }
        });
    },
  },
});

export default useRegisterStore;
