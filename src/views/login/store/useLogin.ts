import { defineStore } from 'pinia';
import type { ValidatedError } from '@arco-design/web-vue';
import { Message } from '@arco-design/web-vue';

import { sendValidateCode, ssoLogin } from '@/api';
import { LoginResponse } from '@/constants/httpMsg/register/LoginStatusMsg';
import i18n from '@/locale';

import { LoginMethod, LoginStore } from '../type';

import router from '@/router';
import { ValidateCodeRequest, ValidateCodeResponse } from '@/constants/httpMsg/register/ValidateStatusMsg';

const useLoginStore = defineStore('login', {
  state: (): LoginStore => ({
    loginFormInfo: {
      phoneNumber: '',
      validateCode: '',
      password: '',
    },
    loginMethod: LoginMethod.phone,
    isRegister: false,
    isSendValidateCode: false,
    buttonContent: i18n.global.t('register.getValidateCode'),
  }),
  actions: {
    setIsRegister(newVal: boolean) {
      this.isRegister = newVal;
    },
    handleLogin(phoneLoginRef: any, smsLoginRef: any) {
      switch (this.loginMethod) {
        case LoginMethod.phone:
          phoneLoginRef.validate().then((ValidatedError: ValidatedError) => {
            if (ValidatedError) {
              return;
            } else {
              const oPostData = {
                phone: this.loginFormInfo.phoneNumber,
                password: this.loginFormInfo.password,
              };
              const res: Promise<LoginResponse> = ssoLogin(oPostData);
              res.then((response) => {
                if (response !== null) {
                  Message.success(i18n.global.t('login.success'));
                  router.push('/user/edit-info')
                }
              });
            }
          });
          break;
          case LoginMethod.sms:
            smsLoginRef.validate().then((ValidatedError: ValidatedError) => {
              if (ValidatedError) {
                return;
              } else {
                const oPostData = {
                  phone: this.loginFormInfo.phoneNumber,
                  validateCode: this.loginFormInfo.validateCode,
                };
                const res: Promise<LoginResponse> = ssoLogin(oPostData);
                res.then((response) => {
                  if (response !== null) {
                    Message.success(i18n.global.t('login.success'));
                  }
                });
              }
            });
            break;
        default:
          break;
      }
    },
    handleValidateCode(loginFormRef: any) {
      loginFormRef
        .validateField('phoneNumber')
        .then((ValidatedError: ValidatedError) => {
          if (ValidatedError) {
            return;
          } else {
            const oPostData: ValidateCodeRequest = {
              phone: this.loginFormInfo.phoneNumber,
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

export default useLoginStore;
