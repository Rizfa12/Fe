<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="p-8 bg-white rounded-lg shadow-lg w-96">
      <h2 class="mb-6 text-3xl font-bold text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            class="w-full p-3 mt-1 transition duration-200 ease-in-out border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            class="w-full p-3 mt-1 transition duration-200 ease-in-out border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" class="w-full py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
      <p class="mt-6 text-center text-gray-600">
        Belum punya akun?
        <router-link to="/register" class="text-blue-500 hover:underline">Daftar</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    const redirectRoute = route.query.redirect || '/';
    router.push(redirectRoute as string);
  } catch (error) {
    alert('Login gagal: ' + error.response.data.message);
  }
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}

button:hover {
  background-color: #2563eb;
}

input {
  transition: all 0.2s ease-in-out;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

p a {
  transition: color 0.2s ease;
}

p a:hover {
  color: #1d4ed8;
}
</style>
