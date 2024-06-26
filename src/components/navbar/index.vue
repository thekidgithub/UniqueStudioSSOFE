<template>
  <div class="navbar">
    <div class="left-side">
      <LogoSVG />
    </div>
    <ul class="right-side">
      <li>
        <a-dropdown trigger="click">
          <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer', backgroundColor: '#3370ff' }">
            {{ avatarName }}
          </a-avatar>
          <template #content>
            <a-doption @click="handleLogout">{{ '登出' }}</a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import LogoSVG from '@/assets/svg/logo.svg';

import { useLogoutStore } from '@/views/login/store';
import useEditStore from '@/views/user/editInfo/store/useEdit';
import { ref, watchEffect } from 'vue';

const logoutStore = useLogoutStore();
const { handleLogout } = logoutStore;

const editStore = useEditStore();
const { getUserInfo } = editStore;

const avatarName: any = ref(null);

watchEffect(async () => {
  getUserInfo().then((infoData: any) => {
    avatarName.value = infoData.name;
  })
})

</script>

<style scoped lang="less">
@nav-size-height: 60px;

.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.right-side {
  display: flex;
  align-items: center;
  padding-right: 20px;

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}
</style>
