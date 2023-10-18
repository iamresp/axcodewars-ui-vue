import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Task } from './models';
import { useAuthStore } from '@/widgets/auth';

export const useCreateTaskStore = defineStore('create-task', () => {
  const authstore = useAuthStore();

  const title = ref<string>('');
  const description = ref<string>('');
  const results = ref<[string, string][]>([]);

  const reset = () => {
    title.value = '';
    description.value = '';
    results.value = [];
  };

  const createTask = async (): Promise<Task> => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authstore.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description.value,
        results: results.value.filter(result => result.some(Boolean)).map(result => ([
          JSON.stringify(result[0].split(',').map(value => value.trim())),
          JSON.stringify(result[1]),
        ])),
        title: title.value,
      }),
    });

    const task = await response.json() as Task;

    return task;
  };

  return {
    description,
    results,
    title,

    createTask,
    reset,
  };
});
