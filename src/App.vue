<template>
  <router-view />
</template>

<script lang="ts">
export default {};
</script>

<style>
html, body {
  overflow: auto;
  scrollbar-width: none;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}
main {
  padding: 1rem;
}

nav {
  padding-right: 0;
}

.container {
  max-width: 100%;
}
</style>
