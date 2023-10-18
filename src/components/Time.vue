<script lang="ts" setup>
import { computed } from 'vue';

interface IProps {
  time?: number;
}

const props = defineProps<IProps>();
const hh = computed(() => Math.floor((props.time ?? 0) / 3600).toString().padStart(2, '0'));
const mm = computed(() => Math.floor(((props.time ?? 0) % 3600) / 60).toString().padStart(2, '0'));
const ss = computed(() => Math.floor(((props.time ?? 0) % 3600) % 60).toString().padStart(2, '0'));

</script>

<template>{{ `${hh}:${mm}:${ss}` }}</template>
