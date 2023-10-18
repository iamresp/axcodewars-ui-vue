<script lang="ts" setup>
import { useVibrate } from '@vueuse/core';
import { computed } from 'vue';

const QUICK_VIBRATION_PATTERN = {
  pattern: [30, 30, 30],
};

interface IProps {
    alwaysActive?: boolean;
    disabled?: boolean;
    modelValue?: boolean;
    name?: string;
}

interface IEmits {
    (event: 'update:modelValue', value: boolean): void;
    (event: 'click'): void;
}

/**
 * Компонент переключателя.
 */

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
const { vibrate } = useVibrate(QUICK_VIBRATION_PATTERN);

const update = (nextValue: boolean) => {
  emit('update:modelValue', nextValue);
};

const current = computed({
  get () {
    return props.modelValue;
  },
  set (nextValue: boolean) {
    update(nextValue);
  },
});

const handleClick = () => {
  vibrate();
  update(!current.value);
};

</script>

<template>
  <div
    class="switch"
    :class="{
      active: modelValue || alwaysActive,
      'always-active': alwaysActive,
      disabled,
      enabled: modelValue,
    }"
    @click="handleClick"
  >
    <button class="switch-button" :name="name" :title="name" />
    <input :v-model="current" class="switch-input" type="checkbox" :disabled="disabled" />
  </div>
</template>

<style scoped>
.switch {
  width: 5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  padding-left: 0rem;
  border: 1px solid var(--c-secondary);
  border-radius: 2.5rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease-out;
}

.switch.disabled {
  filter: grayscale(100%);
}

.switch-button {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--c-tetriary);
  border: .25rem solid var(--c-secondary);
  border-radius: 50%;
  cursor: pointer;
  color: var(--c-primary);
  transition: all 0.25s ease-out;
}

.switch.enabled {
  padding-left: 2.5rem;
}

.switch.active {
  border: 1px solid var(--c-primary);
}

.switch.active .switch-button {
  background-color: var(--c-primary);
  border-color: var(--c-primary);
  color: var(--c-white);
}

.switch.active.enabled:not(.always-active) .switch-button {
  background-color: var(--c-accent);
}

.switch-input {
  display: none;
}
</style>
