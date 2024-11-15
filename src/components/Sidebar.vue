<template>
  <div class="p-4 bg-sky-700">
    <div
      v-if="isSidebarOpen"
      class="flex items-center mb-4 text-2xl font-bold text-white cursor-pointer"
      @click="toggleSidebar"
    >
      <i class="text-2xl text-white fas fa-envelope"></i>
      <span class="ml-2">Persuratan</span>
    </div>
    <div
      v-else
      class="flex justify-center mb-4 cursor-pointer"
      @click="toggleSidebar"
    >
      <i class="text-2xl text-white fas fa-envelope"></i>
    </div>

    <ul class="space-y-2 text-white">
      <li>
        <button
          @click="goToSuratMasuk"
          class="flex items-center w-full px-4 py-2 text-left transition duration-300 rounded-lg hover:text-white"
        >
          <i class="text-white fas fa-inbox"></i>
          <span v-if="isSidebarOpen" class="ml-2">Surat Masuk</span>
        </button>
      </li>
      <li>
        <button
          @click="goToSuratKeluar"
          class="flex items-center w-full px-4 py-2 text-left transition duration-300 rounded-lg hover:text-white"
        >
          <i class="text-white fas fa-paper-plane"></i>
          <span v-if="isSidebarOpen" class="ml-2">Surat Keluar</span>
        </button>
      </li>
      <li v-if="authStore.isAdmin || authStore.user?.role === 'staff'">
        <button
          @click="goToKategori"
          class="flex items-center w-full px-4 py-2 text-left transition duration-300 rounded-lg hover:text-white"
        >
          <i class="text-white fas fa-list-alt"></i>
          <span v-if="isSidebarOpen" class="ml-2">Kategori</span>
        </button>
      </li>
      <li v-if="authStore.isAdmin">
        <button
          @click="goToUserManagement"
          class="flex items-center w-full px-4 py-2 text-left transition duration-300 rounded-lg hover:text-white"
        >
          <i class="text-white fas fa-users"></i>
          <span v-if="isSidebarOpen" class="ml-2">User Management</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  isSidebarOpen: Boolean,
});

const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(["toggle-sidebar"]);

const toggleSidebar = () => {
  emit("toggle-sidebar");
};

const goToSuratMasuk = () => router.push("/surat-masuk");
const goToSuratKeluar = () => router.push("/surat-keluar");
const goToKategori = () => router.push("/kategori");
const goToUserManagement = () => router.push("/user-management");
</script>
