import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const usePlayStore = defineStore('play', () => {
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
  };

  const decline = () => {
    sendMessage('decline');
    reset();
    isIdling.value = true;
  };

  const retry = () => {
    sendMessage('retry');
    isIdling.value = false;
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

  const connect = () => {
    ws.value = new WebSocket(`ws://localhost:${process.env.VUE_APP_WS_PORT}`);

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

  return {
    attempts,
    connId,
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

    connect,
    decline,
    disconnect,
    handleDeclineMessage,
    handleDisconnectMessage,
    handlePairMessage,
    handlePullMessage,
    handleReadyMessage,
    retry,
    sendMessage,
  };
});
