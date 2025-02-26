<template>
  <div class="w-full sm:w-3/4 sm:h-2/5 bg-white mt-20 sm:ml-64 sm:min-w-900 flex flex-col sm:flex-row">
    <div class="w-60 mt-10 sm:mt-16 sm:ml-16 mx-auto">
      <a-avatar :style="{ backgroundColor: '#3370ff' }" class="ml-10 sm:ml-0" :size="160">
        {{ avatarName }}
      </a-avatar>
    </div>
    <div class="w-5/6 h-full m-16">
      <a-space direction="vertical" size="large" fill>
        <p class="font-bold text-lg">{{ $t('edit.userinfo') }}</p>
        <a-descriptions 
          title="" 
          class="hidden sm:block"
          size="large" 
          layout="inline-vertical" 
          :label-style="{fontSize: '16px', fontWeight: 'bold', marginTop: '15px', marginRight: '100px'}"
          :value-style="{fontSize: '16px'}">
          
          <a-descriptions-item v-for="item of data" :label="item.label" :span="1">
            {{ item.value }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions 
          title="" 
          class="block sm:hidden"
          size="large" 
          :column="1"
          :label-style="{fontSize: '16px', fontWeight: 'bold', marginTop: '15px', marginRight: '100px'}"
          :value-style="{fontSize: '16px'}">
          
          <a-descriptions-item v-for="item of data" :label="item.label" :span="1">
            {{ item.value }}
          </a-descriptions-item>
        </a-descriptions>
      </a-space>
      <a-button 
      type="primary" 
      size="large" 
      class="float-right" 
      @click="openEditModel"
      >
        {{ $t('edit.change') }}
      </a-button>

      <a-button 
      type="primary" 
      size="large" 
      class="float-right mr-10" 
      :disabled="role !== 'admin'"
      @click="openPermissionModel"
      >
        {{ $t('edit.permission') }}
      </a-button>
    </div>
    
  </div>
  <a-modal
    v-model:visible="isEditOpen"
    :hideCancel="true"
    :modal-style="{ maxHeight: '700px', width: small ? '300px' : '' }"
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

  <a-modal
    v-model:visible="isPermissionOpen"
    :hideCancel="true"
    :modal-style="{ maxHeight: '700px', width: small ? '300px' : '' }"
    >
    <template #title>
      {{ $t('edit.permission') }}
    </template>
    <a-form ref="permissionForm" :model="permissionFormInfo" layout="vertical">
    <a-form-item
      field="phoneNumber"
      hide-label
      :rules="[{ required: true, message: $t('edit.form.phoneNumber.errMsg') },
        {
          match: /^1[3-9]\d{9}$/,
          message: $t('edit.form.phoneNumber.formatErr'),
        },
      ]"
    >
      <a-input
        v-model="permissionFormInfo.phoneNumber"
        size="large"
        :placeholder="$t('edit.form.phoneNumber')"
        allow-clear
      >
        <template #prefix>
          <icon-phone />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      field="joinTime"
      hide-label
      :rules="[{ required: true, message: $t('edit.form.joinTime.errMsg') }]"
    >
      <a-select
        v-model="permissionFormInfo.joinTime"
        size="large"
        :placeholder="$t('edit.form.joinTime.placeholder')"
        allow-clear
      >
        <template #prefix>
          <icon-clock-circle />
        </template>
        <a-option value="2024A">2024A</a-option>
        <a-option value="2025S">2025S</a-option>
        <a-option value="2025A">2025A</a-option>
        <a-option value="2026S">2026S</a-option>
        <a-option value="2026A">2026A</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="group"
      hide-label
      :rules="[
        { required: true, message: $t('edit.form.group.errMsg') },
      ]"
    >
    <a-select
        v-model="permissionFormInfo.group"
        size="large"
        :placeholder="$t('edit.form.group.placeholder')"
        allow-clear
      >
        <template #prefix>
          <icon-user-group />
        </template>
        <a-option value="web">Web</a-option>
        <a-option value="ai">AI</a-option>
        <a-option value="lab">Lab</a-option>
        <a-option value="game">Game</a-option>
        <a-option value="mobile">Mobile</a-option>
        <a-option value="pm">PM</a-option>
        <a-option value="design">Design</a-option>
      </a-select>
    </a-form-item>
  </a-form>
  <a-button
    type="primary"
    long
    size="large"
    @click="handlePermission(permissionForm)"
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
import { watchEffect } from 'vue';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';

const { t } = useI18n();

const editStore = useEditStore();
const { handleEdit, getUserInfo, handlePermission } = editStore;

const editForm = ref(null);
const permissionForm = ref(null);

const { editFormInfo, permissionFormInfo } = storeToRefs(editStore);

const isEditOpen = ref(false);
const isPermissionOpen = ref(false);

const openEditModel = () => {
  isEditOpen.value = true;
};
const openPermissionModel = () => {
  isPermissionOpen.value = true;
};

const genders = ['0', '男', '女', '其他'];
const data: any = ref(null);
const avatarName: any = ref(null);
const small: any = ref(null);
const role: any = ref('');

watchEffect(async () => {
  getUserInfo().then((infoData: any) => {
  data.value = [{
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

  editFormInfo.value.name = infoData.name;
  editFormInfo.value.gender = infoData.gender;
  editFormInfo.value.email = infoData.email;

  avatarName.value = infoData.name.slice(0, 1);

  role.value = infoData.roles[0];
  })
})

const checkScreenSize = () => {
  small.value = window.innerWidth < 600;
} 

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
})

onUnmounted(() => window.removeEventListener('resize', checkScreenSize));
</script>

<style scoped lang="less">  
</style>