<template>
  <div class="max-w-3xl p-6 mx-auto rounded-lg shadow-lg bg-sky-700">
    <h2 class="mb-6 text-2xl font-bold text-center text-white">
      Manajemen Pengguna
    </h2>

    <h3 class="text-xl font-semibold text-white">Tambah Pengguna</h3>
    <form @submit.prevent="userStore.register" class="mb-8 space-y-4">
      <div class="form-group">
        <label for="name" class="block text-sm font-medium text-white"
          >Nama</label
        >
        <input
          type="text"
          id="name"
          v-model="userStore.name"
          required
          class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="form-group">
        <label for="email" class="block text-sm font-medium text-white"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="userStore.email"
          required
          class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="form-group">
        <label for="password" class="block text-sm font-medium text-white"
          >Password</label
        >
        <input
          type="password"
          id="password"
          v-model="userStore.password"
          required
          class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="form-group">
        <label
          for="password_confirmation"
          class="block text-sm font-medium text-white"
          >Konfirmasi Password</label
        >
        <input
          type="password"
          id="password_confirmation"
          v-model="userStore.password_confirmation"
          required
          class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="form-group">
        <label for="role" class="block text-sm font-medium text-white"
          >Role</label
        >
        <select
          id="role"
          v-model="userStore.role"
          required
          class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full py-2 font-semibold text-white transition duration-200 rounded-md bg-sky-400 hover:bg-sky-500"
      >
        Tambah Pengguna
      </button>
    </form>

    <h3 class="text-xl font-semibold text-white">Daftar Pengguna</h3>
    <table class="w-full mt-4 border-collapse table-auto">
      <thead>
        <tr class="bg-sky-600">
          <th class="px-4 py-2 text-white border">Nama</th>
          <th class="px-4 py-2 text-white border">Email</th>
          <th class="px-4 py-2 text-white border">Role</th>
          <th class="px-4 py-2 text-white border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user.id">
          <td class="px-4 py-2 text-center text-white border">
            {{ user.name }}
          </td>
          <td class="px-4 py-2 text-white border">{{ user.email }}</td>
          <td class="px-4 py-2 text-center text-white border">
            {{ user.role }}
          </td>
          <td class="flex items-center justify-center px-4 py-2 border">
            <button
              @click="userStore.deleteUser(user.id)"
              class="p-2 text-red-500 hover:text-red-700"
              aria-label="Delete"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useManagementUserStore } from "@/stores/managementUserStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const userStore = useManagementUserStore();

library.add(faTrash);

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<style scoped></style>
