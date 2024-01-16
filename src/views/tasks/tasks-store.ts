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

  const updateTask = async (payload: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authstore.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.json() as Promise<Task>;
  };

  const deleteTask = async (taskUuid: string): Promise<boolean> => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/tasks/${taskUuid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authstore.token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.json() as Promise<boolean>;
  };

  const validateConnection = async (): Promise<boolean> => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/connector/validate`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authstore.token}`,
        'Content-Type': 'application/json',
      },
    });

    return Boolean(response.ok);
  };

  return {
    tasks,

    deleteTask,
    getTasks,
    reset,
    updateTask,
    validateConnection,
  };
});
