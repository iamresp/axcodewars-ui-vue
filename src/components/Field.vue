<script lang="ts" setup>
import { ComponentPublicInstance, computed, ref } from 'vue';
import Button from './Button.vue';
import Time from './Time.vue';

interface IProps {
  isDeclined?: boolean;
  isDisabled?: boolean;
  modelValue: string;
  opponentText: string;
  time?: number;
  opponentTime?: number;
  attempts?: number;
  opponentAttempts?: number;
}

interface IEmits {
  (event: 'update:modelValue', value: string): void;
  (event: 'try'): void;
  (event: 'decline'): void;
  (event: 'retry'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const hljsRef = ref<ComponentPublicInstance>();

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});

const handleScroll = (event: UIEvent) => {
  hljsRef.value?.$el?.scrollTo({
    left: (event.target as HTMLTextAreaElement).scrollLeft,
    top: (event.target as HTMLTextAreaElement).scrollTop,
  });
};

</script>

<template>
  <div class="container">
    <div class="field-group column gap-2">
      <div class="actions row jc-space-between">
        <h3>Ваше решение</h3>
        <div class="row gap-2">
          <template v-if="isDeclined">
            <Button color="accent" size="sm" @click="emit('retry')">
              <vue-feather type="refresh-cw" />
              Поиск соперника
            </Button>
          </template>
          <template v-else>
            <div class="centered muted">
              {{ `Попыток: ${attempts ?? 0}, время решения: ` }}
              <Time :time="time" />
            </div>
            <Button color="accent" size="sm" @click="emit('try')">
              <vue-feather type="play" />
              Запуск!
            </Button>
            <Button color="secondary" size="sm" @click="emit('decline')">
              <vue-feather type="x" />
              Сдаться
            </Button>
        </template>
        </div>
      </div>
      <div class="field-container">
        <textarea
          class="field input"
          v-model="model"
          :disabled="isDisabled"
          spellcheck="false"
          @scroll="handleScroll"
        />
        <highlightjs
          ref="hljsRef"
          class="field player"
          :code="model"
          language="typescript"
          contenteditable="true"
          :disabled="isDisabled"
        />
      </div>
    </div>
    <div class="field-group column gap-2">
      <div class="actions row jc-space-between">
        <h3>Решение соперника</h3>
        <div class="row gap-2">
          <div class="centered muted">
            {{ `Попыток: ${opponentAttempts ?? 0}, время решения: ` }}
            <Time :time="opponentTime" />
          </div>
        </div>
      </div>
      <highlightjs
        class="field opponent"
        :code="opponentText"
        language="ts"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  flex-grow: 1;
  display: flex;
  gap: .5rem;
}

.actions {
  height: 2rem;
  align-items: center;
}

.field-group {
  max-width: 50%;
  flex-grow: 1;
}

.field-container {
  height: 100%;
  display: flex;
  position: relative;
  flex-grow: 1;
}

.field {
  flex-grow: 1;
  font-family: monospace;
  font-size: 1rem;
  padding: .25rem;
  border: .125rem solid #ccc;
  border-radius: .25rem;
  resize: none;
  overflow: scroll;
}

.field.input {
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: transparent;
  color: transparent;
  border-color: transparent;
  word-wrap: normal;
  caret-color: var(--c-white);
}

.field.player {
  z-index: 1;
  background-color: var(--c-primary-shade);
  border-color: var(--c-primary);
}

.field.opponent {
  background-color: var(--c-danger-shade);
  border-color: var(--c-danger);
  user-select: none;
}

.field :deep(.hljs) {
  padding: 0;
  background-color: transparent;
  overflow: visible;
}
</style>
