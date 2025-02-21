<template>
  <a-tabs
    v-model:active-key="loginMethod"
    :default-active-key="LoginMethod.phone"
    size="large"
  >
    <a-tab-pane :key="LoginMethod.phone" title="手机号">
      <a-form ref="phoneLoginRef" :model="loginFormInfo" layout="vertical">
        <a-form-item field="phoneNumber" hide-label :rules="[
        { required: true, message: $t('login.form.phoneNumber.errMsg') },
        {
          match: /^1[3-9]\d{9}$/,
          message: $t('login.form.phoneNumber.formatErr'),
        },
      ]">
          <a-input v-model="loginFormInfo.phoneNumber" size="large" :placeholder="$t('login.form.phoneNumber.placeholder')"
            allow-clear>
            <template #prefix>
              <icon-phone />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="password" hide-label :rules="[
        { required: true, message: $t('login.form.password.errMsg') },
        { minLength: 6, message: $t('login.form.password.minLength') },
      ]">
          <a-input-password v-model="loginFormInfo.password" size="large"
            :placeholder="$t('login.form.password.placeholder')" allow-clear>
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
      </a-form>
      <div class="flex justify-between w-full">
        <a-checkbox checked="rememberPassword">{{
          $t('login.form.rememberPassword')
        }}</a-checkbox>
  </div>
    </a-tab-pane>
    <a-tab-pane :key="LoginMethod.sms" title="验证码">
      <a-form ref="smsLoginRef" :model="loginFormInfo" layout="vertical">
        <a-form-item
          field="phoneNumber"
          hide-label
          :rules="[
            { required: true, message: $t('login.form.phoneNumber.errMsg') },
            {
              match: /^1[3-9]\d{9}$/,
              message: $t('login.form.phoneNumber.formatErr'),
            },
          ]"
        >
        <a-input
          v-model="loginFormInfo.phoneNumber"
          size="large"
          :placeholder="$t('login.form.phoneNumber.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-phone />
          </template>
        </a-input>
        <a-button
          type="primary"
          size="large"
          :disabled="isSendValidateCode"
          class="w-[160px]"
          @click="handleValidateCode(smsLoginRef)"
          >{{ buttonContent }}</a-button
        >
    </a-form-item>
        <a-form-item
        field="validateCode"
        hide-label
        :validate-trigger="['change', 'blur']"
        :rules="[
          { required: true, message: $t('register.form.validateCode.errMsg') },
        ]"
      >
        <a-input
          v-model="loginFormInfo.validateCode"
          size="large"
          :placeholder="$t('register.form.validateCode')"
          allow-clear
        >
          <template #prefix>
            <icon-safe />
          </template>
        </a-input>
    </a-form-item>
      </a-form>
    </a-tab-pane>
</a-tabs>
  <a-button type="primary" long size="large" class="mt-4" @click="handleLogin(phoneLoginRef, smsLoginRef)">{{ $t('login.form.login')
    }}</a-button>
  <a-button type="text" long class="mt-2" @click="setIsRegister(true)">{{
    $t('login.form.register')
    }}</a-button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';

// type
import { LoginMethod } from '../type';
// store
import { useLoginStore } from '../store';

const loginStore = useLoginStore();
const { setIsRegister, handleLogin, handleValidateCode } = loginStore;
const { loginFormInfo, loginMethod, isSendValidateCode, buttonContent } = storeToRefs(loginStore);

const phoneLoginRef = ref(null);
const smsLoginRef = ref(null);

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
      handleLogin(phoneLoginRef.value, smsLoginRef.value);
    // handleLogin(phoneLoginRef, smsLoginRef)
  }
};

onMounted(() => {

  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});
</script>

<style lang="less" scoped>
// 修改arcodesign-tabs原生样式
:deep(.arco-tabs-nav-tab-list) {
  width: 100%;

  .arco-tabs-tab {
    width: 50%;
    margin: 0;
    justify-content: center;
  }
}
</style>
