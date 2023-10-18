import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from './views/home';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Профиль',
    },
  },
  {
    path: '/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "create" */ './views/create-task'),
    meta: {
      title: 'Добавить задачу',
    },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "play" */ './views/tasks'),
    meta: {
      highlight: true,
      title: 'Играть!',
    },
  },
  {
    path: '/tasks/:id',
    name: 'play',
    component: () => import(/* webpackChunkName: "play" */ './views/play'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
