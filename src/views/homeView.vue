<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-white bg-sky-700 rounded-lg"
  >
    <h1 class="mb-6 text-4xl font-bold">
      Selamat Datang di Aplikasi Penomoran Surat
    </h1>

    <p class="mb-8 text-lg">Kelola surat masuk dan keluar dengan mudah.</p>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const redirectToSurat = (type: "masuk" | "keluar") => {
  if (!authStore.isLoggedIn) {
    router.push("/login");
    return;
  }

  router.push(type === "masuk" ? "/surat-masuk" : "/surat-keluar");
};

const goToKategori = () => {
  if (!authStore.isLoggedIn) {
    router.push("/login");
    return;
  }

  router.push("/kategori");
};

defineExpose({
  authStore,
  redirectToSurat,
  goToKategori,
});
</script>

<style scoped></style>
