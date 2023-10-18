<script lang="ts" setup>
import { useCssVar, useVibrate } from '@vueuse/core';
import { computed } from 'vue';

interface IProps {
  color?: 'primary' | 'secondary' | 'accent' | 'shade' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const BUTTON_VIBRATION_PATTERN = {
  pattern: [50, 50, 50],
};

/**
 * Компонент произвольной кнопки.
 */

const props = withDefaults(
  defineProps<IProps>(),
  {
    color: 'primary',
    size: 'md',
  },
);
const bgColor = computed(() => useCssVar(`--c-${props.color}`).value);
const textColor = computed(() => useCssVar(`--c-${props.color}-alt`).value);
const { vibrate } = useVibrate(BUTTON_VIBRATION_PATTERN);

const handleClick = () => {
  vibrate();
};

</script>

<template>
  <button
    @click="handleClick"
    class="button"
    :class="[
      color && `c-${color}`,
      size && `s-${size}`,
      disabled && 'disabled',
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  z-index: 3;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  background-color: v-bind(bgColor);
  border: none;
  border-radius: .5rem;
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  color: v-bind(textColor);
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.button.c-shade {
  -webkit-backdrop-filter: blur(.25rem);
  backdrop-filter: blur(.25rem);
}

.button.disabled {
  filter: grayscale(100%);
  cursor: default;
}

.button:not(.disabled):active {
  padding: 1px 1.5rem 0;
  box-shadow: 0 calc(.25rem * .4) calc(.25rem * .4) var(--c-shade) inset;
}

.button > :deep(.vue-feather),
.button > :deep(img) {
  width: 1.25rem;
}

.button > :deep(.vue-feather > svg) {
  stroke-width: .125rem;
  height: 0.95rem;
}

.button.s-sm {
  height: 2rem;
  font-size: .75rem;
}

.button.s-lg {
  height: 3.5rem;
  padding: 1rem 2rem;
  font-size: 1.25rem;
}

.button.s-lg:not(.disabled):active {
  padding: calc(1rem + 1px) 2rem 1rem;
}
</style>
