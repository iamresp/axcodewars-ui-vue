<script setup lang="ts">
import { Auth, useAuthStore } from '@/widgets/auth';
import { useTasksStore } from './tasks-store';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const store = useTasksStore();

onMounted(() => {
  store.getTasks();
});

</script>

<template>
  <article class="tasks column gap-2">
    <h1 class="header">Задачи</h1>
    <template v-if="authStore.isAuthorized">
      <div class="list column gap-2">
        <template v-if="store.tasks.length">
          <router-link
            v-for="task in store.tasks"
            class="task column"
            :key="task.uuid"
            :to="`/tasks/${task.uuid}`"
          >
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
            <div class="column">
              <p>Кейсы:</p>
              <p v-for="(result, i) in task.results" :key="i">
                Для аргументов {{ JSON.parse(result[0]).join(', ') }} функция должна вернуть {{ result[1] }}
              </p>
            </div>
          </router-link>
        </template>
        <div class="centered fg-1" v-else>
          <h3>Нет доступных задач</h3>
        </div>
      </div>
    </template>
    <Auth v-else />
  </article>
</template>

<style scoped>
.tasks {
  height: 100%;
}

.task {
  padding: 1rem;
  gap: .5rem;
  background-color: var(--c-darker);
  color: var(--c-white);
  text-decoration: none;
}
</style>
