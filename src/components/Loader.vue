<template>
  <div class="overlay">
    <div class="loader" />
    <slot />
  </div>
</template>

<style scoped>
.loader {
  width: 3rem;
  height: 3rem;
  border: .5rem solid var(--c-white);
  border-radius: 3rem;
  border-right-color: transparent;
  border-left-color: transparent;
  animation: spin 1s linear infinite;
}
</style>
