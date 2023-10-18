<script setup lang="ts">
import { Button } from '@/components';
import { Auth, useAuthStore } from '@/widgets/auth';
import { useCreateTaskStore } from './create-task-store';
import { onMounted, onUnmounted } from 'vue';

const authStore = useAuthStore();
const store = useCreateTaskStore();

const handleResultInput = (i: number) => {
  if (i === store.results.length - 1) {
    store.results.push([
      '',
      '',
    ]);
  } else {
    if (!store.results[store.results.length - 1].some(Boolean) && !store.results[i].some(Boolean)) {
      store.results.pop();
    }
  }
};

onMounted(() => {
  store.results.push([
    '',
    '',
  ]);
});

onUnmounted(() => {
  store.reset();
});

</script>

<template>
  <article class="create-task column gap-2">
    <h1>Добавить задачу</h1>
    <template v-if="authStore.isAuthorized">
      <input v-model="store.title" placeholder="Название задачи" />
      <textarea class="desc" v-model="store.description" placeholder="Описание задачи" />
      <div class="cases">
        <div v-for="(result, i) in store.results" :key="i">
          <input v-model="result[0]" placeholder="Аргументы" @input="handleResultInput(i)" />
          <input v-model="result[1]" placeholder="Ожидаемый результат" @input="handleResultInput(i)" />
        </div>
      </div>
      <Button @click="store.createTask">Создать</Button>
    </template>
    <Auth v-else />
  </article>
</template>

<style scoped>
.create-task {
  width: 50rem;
}
.desc {
  resize: vertical;
}
</style>
