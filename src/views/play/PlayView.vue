<script setup lang="ts">

import { Button, Field, Loader } from '@/components';
import { usePlayStore } from './play-store';
import { onMounted, onUnmounted, watch } from 'vue';
import { useInterval } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const store = usePlayStore();
const { isDisconnected, isReady } = storeToRefs(store);
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

onMounted(() => {
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

</script>

<template>
  <div class="container play-view">
    <Field
      v-model="store.playerText"
      :opponentText="store.opponentText"
      :attempts="store.attempts"
      :opponentAttempts="store.opponentAttempts"
      :time="timer.counter.value"
      :opponentTime="opponentTimer.counter.value"
      :isDeclined="store.isDeclined"
      @decline="handleDecline"
      @retry="store.retry"
      @update:modelValue="handleFieldInput"
    />
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
        <Button
          color="shade"
          size="lg"
          @click="handleDecline"
        >
          {{ 'Отмена' }}
        </Button>
      </template>
    </Loader>
  </div>
</template>

<style scoped>
.play-view {
  height: 100%;
}
</style>
