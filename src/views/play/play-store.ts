import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Task } from './models';
import { useAuthStore } from '@/widgets/auth';

export const usePlayStore = defineStore('play', () => {
  const authstore = useAuthStore();
  const ws = ref<WebSocket>();
  const connId = ref<string>();
  const peerId = ref<string>();
  const attempts = ref<number>(0);
  const opponentAttempts = ref<number>(0);
  const isIdling = ref<boolean>(false);
  const isPlayerReady = ref<boolean>(false);
  const isOpponentReady = ref<boolean>(false);
  const playerText = ref<string>('');
  const opponentText = ref<string>('');
  const isReady = computed(() => !!peerId.value && isPlayerReady.value && isOpponentReady.value);
  const isDeclined = ref<boolean>(false);
  const isDisconnected = ref<boolean>(false);
  const hasWon = ref<boolean>(false);
  const hasLost = ref<boolean>(false);
  const taskId = ref<string>('');
  const task = ref<Task>();

  const sendMessage = <T = null>(event: string, data?: T) => {
    ws.value?.send(JSON.stringify({ event, data }));
  };

  const reset = () => {
    isIdling.value = false;
    peerId.value = undefined;
    isPlayerReady.value = false;
    isOpponentReady.value = false;
    playerText.value = '';
    opponentText.value = '';
    attempts.value = 0;
    opponentAttempts.value = 0;
    isDeclined.value = false;
    isDisconnected.value = false;
    hasWon.value = false;
    hasLost.value = false;
  };

  const decline = () => {
    sendMessage('decline');
    reset();
    isIdling.value = true;
  };

  const attempt = () => {
    sendMessage('attempt');
    ++attempts.value;
  };

  const win = () => {
    hasWon.value = true;
    sendMessage('win');
  };

  const retry = () => {
    sendMessage('retry');
    reset();
  };

  const handlePairMessage = (data: string) => {
    peerId.value = data;
  };

  const handlePullMessage = (data: string) => {
    opponentText.value = data;
  };

  const handleDisconnectMessage = () => {
    peerId.value = undefined;
    isPlayerReady.value = false;
    isOpponentReady.value = false;
    opponentText.value = '';
    isDisconnected.value = true;
  };

  const handleDeclineMessage = () => {
    opponentText.value = '';
    isDeclined.value = true;
  };

  const handleReadyMessage = () => {
    isOpponentReady.value = true;
  };

  const handleAttemptMessage = () => {
    ++opponentAttempts.value;
  };

  const handleLoseMessage = () => {
    hasLost.value = true;
  };

  const connect = () => {
    ws.value = new WebSocket(`ws://localhost:${process.env.VUE_APP_WS_PORT}?taskId=${taskId.value}`);

    ws.value.onopen = () => {
      ws.value!.onmessage = event => {
        const message = JSON.parse(event.data);

        switch (message.event) {
        case 'pair':
          handlePairMessage(message.data);
          break;
        case 'pull':
          handlePullMessage(message.data);
          break;
        case 'disconnect':
          handleDisconnectMessage();
          break;
        case 'decline':
          handleDeclineMessage();
          break;
        case 'ready':
          handleReadyMessage();
          break;
        case 'attempt':
          handleAttemptMessage();
          break;
        case 'lose':
          handleLoseMessage();
          break;
        }
      };
    };
  };

  const disconnect = () => {
    if (ws.value) {
      ws.value.close();
      ws.value = undefined;
      reset();
    }
  };

  const getTask = async (): Promise<Task> => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/tasks/${taskId.value}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authstore.token}`,
        'Content-Type': 'application/json',
      },
    });

    task.value = await response.json() as Task;

    return task.value;
  };

  return {
    attempts,
    connId,
    hasLost,
    hasWon,
    isDeclined,
    isDisconnected,
    isIdling,
    isOpponentReady,
    isPlayerReady,
    isReady,
    opponentAttempts,
    opponentText,
    peerId,
    playerText,
    task,
    taskId,

    attempt,
    connect,
    decline,
    disconnect,
    getTask,
    handleDeclineMessage,
    handleDisconnectMessage,
    handlePairMessage,
    handlePullMessage,
    handleReadyMessage,
    retry,
    sendMessage,
    win,
  };
});
