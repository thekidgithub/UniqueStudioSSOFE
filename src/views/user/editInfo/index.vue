<template>
  <div class="w-5/6 h-2/5 bg-white m-5 flex">
    <div class="w-1/5 h-full flex">
      <a-avatar :style="{ backgroundColor: '#3370ff' }" class="mt-16 ml-16" :size="200">
        <IconUser />
      </a-avatar>
    </div>
    <div class="w-5/6 h-full m-16">
      <a-space direction="vertical" size="large" fill>
        <p class="font-bold text-lg">{{ $t('edit.userinfo') }}</p>
        <a-descriptions 
          title="" 
          size="large" 
          layout="inline-vertical" 
          :label-style="{fontSize: '16px', fontWeight: 'bold', marginTop: '15px', marginRight: '100px'}"
          :value-style="{fontSize: '16px'}">
          
          <a-descriptions-item v-for="item of data" :label="item.label" :span="1">
            {{ item.value }}
          </a-descriptions-item>
        </a-descriptions>
      </a-space>
    </div>
    <a-button 
      type="primary" 
      size="large" 
      class="float-right" 
      @click="openModel"
      >
        {{ $t('edit.change') }}
      </a-button>
  </div>
  <a-modal
    v-model:visible="isOpen"
    :hideCancel="true"
    :modal-style="{ maxHeight: '700px' }"
    >
    <template #title>
      {{ $t('edit.changeinfo') }}
    </template>
    <a-form ref="editForm" :model="editFormInfo" layout="vertical">
    <a-form-item
      field="name"
      hide-label
      :rules="[{ required: true, message: $t('register.form.name.errMsg') }]"
    >
      <a-input
        v-model="editFormInfo.name"
        size="large"
        :placeholder="$t('register.form.name')"
        allow-clear
      >
        <template #prefix>
          <icon-user />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      field="gender"
      hide-label
      :rules="[{ required: true, message: $t('register.form.gender.errMsg') }]"
    >
      <a-select
        v-model="<number>editFormInfo.gender"
        size="large"
        :placeholder="$t('register.form.gender.placeholder')"
        allow-clear
      >
        <template #prefix>
          <icon-user-group />
        </template>
        <a-option :value="Gender.male">男</a-option>
        <a-option :value="Gender.female">女</a-option>
        <a-option :value="Gender.other">其它</a-option>
      </a-select>
    </a-form-item>
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
        v-model="editFormInfo.phoneNumber"
        size="large"
        :placeholder="$t('register.form.phoneNumber')"
        allow-clear
      >
        <template #prefix>
          <icon-phone />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      field="email"
      hide-label
      :rules="[
        { required: true, message: $t('login.form.email.errMsg') },
        {
          match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: $t('login.form.email.formatErr'),
        },
      ]"
    >
      <a-input
        v-model="editFormInfo.email"
        size="large"
        :placeholder="$t('register.form.email')"
        allow-clear
      >
        <template #prefix>
          <Icon-email />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      field="password"
      hide-label
      :rules="[
        { required: true, message: $t('login.form.password.errMsg') },
        { minLength: 6, message: $t('login.form.password.minLength') },
      ]"
    >
      <a-input-password
        v-model="editFormInfo.password"
        size="large"
        :placeholder="$t('register.form.password')"
        allow-clear
      >
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </a-form-item>
  </a-form>
  <a-button
    type="primary"
    long
    size="large"
    @click="handleEdit(editForm)"
    >{{ $t('register.form.confirm') }}</a-button
  >
  <template #footer>
    {{ '' }}
  </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

// type
import { Gender } from './type';
// store
import { useEditStore } from './store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const editStore = useEditStore();
const { handleEdit, getUserInfo } = editStore;
const editForm = ref(null);
const { editFormInfo } = storeToRefs(editStore);

const isOpen = ref(false);

const openModel = () => {
  isOpen.value = true;
};

const genders = ['0', '男', '女', '其他'];

function fetchData(): any {
  getUserInfo().then((infoData: any) => {
  console.log('infoData:', infoData);
  const data = [{
  label: t('edit.name'),
  value: infoData.name,
}, {
  label: t('edit.gender'),
  value: genders[infoData.gender],
},  {
  label: t('edit.phonenumber'),
  value: infoData.phone,
}, {
  label: t('edit.email'),
  value: infoData.email,
}];
return data;
  });
}

const data = fetchData();
console.log(data);

// const data = [{
//   label: t('edit.name'),
//   value: 1,
// }, {
//   label: t('edit.gender'),
//   value: 1,
// },  {
//   label: t('edit.phonenumber'),
//   value: 1,
// }, {
//   label: t('edit.email'),
//   value: 1,
// }];
</script>

<style scoped lang="less"></style>