<template>
  <div class="flex min-h-screen bg-white">
    <Sidebar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <div
      :class="[
        'flex-1 min-h-screen flex flex-col transition-all duration-300',
        { 'ml-1': isSidebarOpen },
      ]"
    >
      <Navbar />

      <main class="flex-1 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
.flex-1 {
  transition: margin-left 0.3s ease;
}
</style>
