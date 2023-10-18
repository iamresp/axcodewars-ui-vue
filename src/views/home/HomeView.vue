<script setup lang="ts">
import { Button } from '@/components';
import { Auth, useAuthStore } from '@/widgets/auth';
import sha256 from 'sha256';

const store = useAuthStore();

const handlePasswordInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  store.hash = sha256(target.value);
};

</script>

<template>
  <article class="home column gap-2">
    <h1>Профиль</h1>
    <div class="column gap-2" v-if="store.isAuthorized">
      <input type="text" v-model="store.username" placeholder="Имя пользователя" />
      <input type="password" @input="handlePasswordInput" placeholder="Пароль"/>
      <Button @click="store.signUp">Обновить</Button>
      <Button color="secondary" @click="store.reset">Выйти</Button>
    </div>
    <Auth v-else />
  </article>
</template>

<style scoped>
.home {
  height: 100%;
  width: 50rem;
}
</style>
