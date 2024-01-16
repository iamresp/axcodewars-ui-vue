<script setup lang="ts">
import { Auth, useAuthStore } from '@/widgets/auth';
import { useTasksStore } from './tasks-store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from '@/components';

const router = useRouter();
const authStore = useAuthStore();
const store = useTasksStore();

const handleTaskClick = async (id: string) => {
  const isConnectionAvailable = await store.validateConnection();

  if (isConnectionAvailable) {
    router.push({ name: 'play', params: { id } });
  }
};

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
          <a
            v-for="task in store.tasks"
            class="task column"
            :key="task.uuid"
            @click="handleTaskClick(task.uuid)"
          >
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
            <div class="column">
              <p>Кейсы:</p>
              <p v-for="(result, i) in task.results" :key="i">
                <template v-if="Array.isArray(JSON.parse(result[0]))">
                  Для аргументов {{ JSON.parse(result[0]).join(', ') }} функция должна вернуть {{ result[1] }}
                </template>
                <template v-else>
                  Для аргумента {{ JSON.parse(result[0]) }} функция должна вернуть {{ result[1] }}
                </template>
              </p>
            </div>
            <div class="row gap-2">
              <Button>Редактировать</Button>
              <Button @click.stop="store.deleteTask(task.uuid)">Удалить</Button>
            </div>
          </a>
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
  cursor: pointer;
}
</style>
