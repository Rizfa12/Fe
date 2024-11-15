<template>
  <nav class="flex items-center justify-end w-full px-4 py-2 bg-sky-700">
    <!-- Hanya menampilkan tombol Login/Logout -->
    <div class="flex space-x-4">
      <button
        v-if="!authStore.isLoggedIn"
        @click="goToLogin"
        class="px-4 py-2 text-white transition duration-300 rounded-lg hover:bg-gray-600"
      >
        Login
      </button>
      <button
        v-if="authStore.isLoggedIn"
        @click="logout"
        class="px-4 py-2 text-white transition duration-300 rounded-lg hover:bg-gray-600"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const goToLogin = () => {
  router.push("/login");
};

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style scoped>
/* Menambahkan transisi untuk tombol */
button {
  transition: background-color 0.3s ease;
}
</style>
