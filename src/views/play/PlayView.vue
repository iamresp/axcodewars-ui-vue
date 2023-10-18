<script setup lang="ts">

import { Button, Field, Loader } from '@/components';
import { usePlayStore } from './play-store';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useInterval } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const store = usePlayStore();
const { hasLost, isDisconnected, isReady } = storeToRefs(store);
const failedCase = ref<[string, string]>();
const executionError = ref<string>();
const timer = useInterval(1000, { controls: true, immediate: false });
const opponentTimer = useInterval(1000, { controls: true, immediate: false });

const handleReadyButtonClick = () => {
  store.isPlayerReady = true;
  store.sendMessage('ready');
};

const handleFieldInput = () => {
  store.sendMessage('push', store.playerText);
};

const handleDecline = () => {
  store.decline();
  timer.pause();
  timer.reset();
  opponentTimer.pause();
  opponentTimer.reset();
};

const handleTry = () => {
  store.attempt();

  try {
    const result = Function(store.playerText);

    failedCase.value = store.task?.results.find(([args, expected]) => (
      result(...JSON.parse(args)).toString() !== JSON.parse(expected)
    ));

    if (!failedCase.value) {
      timer.pause();
      opponentTimer.pause();
      store.win();
    }
  } catch (e) {
    if (e instanceof Error) {
      executionError.value = e.message;
    }

    if (typeof e === 'string') {
      executionError.value = e;
    }
  }
};

const handleBackClick = () => {
  router.push({ name: 'tasks' });
};

const handleClear = () => {
  failedCase.value = undefined;
  executionError.value = undefined;
};

onMounted(() => {
  const taskId = route.params.id as string;

  store.taskId = taskId;
  store.getTask();
  store.connect();
});

onUnmounted(() => {
  store.disconnect();
});

watch(isReady, value => {
  if (value) {
    store.isDeclined = false;
    store.isDisconnected = false;
    timer.resume();
    opponentTimer.resume();
  }
});

watch(isDisconnected, value => {
  if (value) {
    timer.reset();
    timer.pause();
    opponentTimer.pause();
    opponentTimer.reset();
  }
});

watch(hasLost, value => {
  if (value) {
    timer.pause();
    opponentTimer.pause();
  }
});

</script>

<template>
  <article class="container column gap-3 play-view">
    <section class="brief">
      <h2>{{ store.task?.title }}</h2>
      <p>{{ store.task?.description }}</p>
    </section>
    <Field
      v-model="store.playerText"
      :opponentText="store.opponentText"
      :attempts="store.attempts"
      :opponentAttempts="store.opponentAttempts"
      :time="timer.counter.value"
      :opponentTime="opponentTimer.counter.value"
      :isDeclined="store.isDeclined"
      @decline="handleDecline"
      @try="handleTry"
      @retry="store.retry"
      @update:modelValue="handleFieldInput"
    />
    <div class="overlay" v-if="store.hasWon || store.hasLost">
      <template v-if="store.hasWon">
        <h1><vue-feather type="zap" /></h1>
        <h1>Победа!</h1>
        <h2>Вы выиграли!</h2>
      </template>
      <template v-else>
        <h1>Поражение :(</h1>
        <h2>Сожалеем! В следующий раз обязательно получится!</h2>
      </template>
      <Button size="lg" @click="store.retry">
        {{ 'Новый раунд' }}
      </Button>
      <Button size="lg" color="shade" @click="handleBackClick">
        {{ 'Назад к задачам' }}
      </Button>
    </div>
    <div class="overlay" v-if="failedCase">
      <h2>Решение неверное :(</h2>
      <p>{{ `Результат не совпадает для аргументов ${JSON.parse(failedCase[0]).join(', ')}` }}</p>
      <Button size="lg" color="shade" @click="handleClear">
        {{ 'К задаче!' }}
      </Button>
    </div>
    <div class="overlay" v-if="executionError">
      <h2>Ошибка!</h2>
      <p>При выполнении решения возникла следующая ошибка:</p>
      <p>{{ executionError }}</p>
      <Button size="lg" color="shade" @click="handleClear">
        {{ 'К задаче!' }}
      </Button>
    </div>
    <Loader v-if="!store.isReady && !store.isIdling">
      <template v-if="store.peerId">
        <h2>Вы готовы?</h2>
        <Button
          v-if="!store.isPlayerReady"
          size="lg"
          @click="handleReadyButtonClick"
        >
          {{ 'Поехали!' }}
        </Button>
        <Button
          v-else
          color="transparent"
          size="lg"
          disabled
        >
          {{ 'Ожидаем готовности другого игрока' }}
        </Button>
      </template>
      <template v-else>
        <h2>Поиск игрока...</h2>
        <h3>{{ store.task?.title }}</h3>
        <p class="desc">{{ store.task?.description }}</p>
        <Button
          color="shade"
          size="lg"
          @click="handleDecline"
        >
          {{ 'Отмена' }}
        </Button>
      </template>
    </Loader>
  </article>
</template>

<style scoped>
.play-view {
  height: 100%;
}

.desc {
  max-width: 25rem;
  text-align: center;
}
</style>
