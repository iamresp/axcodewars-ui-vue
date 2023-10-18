<script setup lang="ts">

import sha256 from 'sha256';
import { Button, Switcher } from '@/components';
import { useAuthStore } from './auth-store';
import { ref } from 'vue';

const store = useAuthStore();
const isSignUp = ref<boolean>(false);

const handlePasswordInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  store.hash = sha256(target.value);
};

</script>

<template>
  <div class="auth column gap-2">
    <div class="row centered gap-2">
      <div>Вход</div>
      <Switcher v-model="isSignUp" />
      <div>Регистрация</div>
    </div>
    <input type="text" v-model="store.username" placeholder="Имя пользователя" />
    <input type="password" @input="handlePasswordInput" placeholder="Пароль"/>
    <Button v-if="isSignUp" @click="store.signUp">Зарегистрироваться</Button>
    <Button v-else @click="store.signIn">Войти</Button>
  </div>
</template>

<style scoped>
.auth {
  max-width: 25rem;
  padding: .5rem;
}
</style>
