<template>
  <nav class="navigation">
    <section class="navigation-items">
      <Suspense>
        <router-link
          v-for="{meta, path} in $router.getRoutes().filter(({meta}) => !!meta.title)"
          class="navigation-link"
          :class="{highlight: meta.highlight}"
          :key="path"
          :to="path"
        >
          {{ meta.title }}
        </router-link>
      </Suspense>
    </section>
  </nav>
</template>

<style scoped>
.navigation,
.navigation-items {
  height: 100%;
  display: flex;
  align-items: center;
}

.navigation {
  padding-right: 1rem;
  background-color: var(--c-secondary);
}

.navigation-items {
  flex-grow: 1;
}

.navigation-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .25rem 1rem;
  border-radius: .25rem;
  text-decoration: none;
  color: var(--c-white);
  white-space: nowrap;
}

.navigation-link.highlight {
  background-color: var(--c-accent);
}

.router-link-active:not([href="/"]),
.router-link-exact-active {
  font-weight: bold;
}

.navigation-link.disabled {
  color: var(--c-neutral);
}
</style>
