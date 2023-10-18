import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Task } from './models';
import { useAuthStore } from '@/widgets/auth';

export const useTasksStore = defineStore('tasks', () => {
  const authstore = useAuthStore();
  const tasks = ref<Task[]>([]);

  const reset = () => {
    tasks.value = [];
  };

  const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/tasks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authstore.token}`,
        'Content-Type': 'application/json',
      },
    });

    tasks.value = await response.json() as Task[];

    return tasks.value;
  };

  return {
    tasks,

    getTasks,
    reset,
  };
});
