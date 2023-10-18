<script setup lang="ts">
import { Navigation } from '@/components';
import { useAuthStore } from '@/widgets/auth';
import { onMounted } from 'vue';

const store = useAuthStore();

onMounted(() => {
  if (store.isAuthorized) {
    store.getUser();
  }
});
</script>

<template>
  <header>
    <Navigation />
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>
header {
  grid-area: header;
}

main {
  grid-area: main;
  padding: .5rem;
}
</style>
