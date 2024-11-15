<template>
  <div
    class="container p-6 mx-auto my-8 text-white rounded-lg shadow-lg bg-sky-700"
  >
    <div class="flex justify-center mb-6">
      <h1 class="text-4xl font-bold text-center">Kategori</h1>
    </div>

    <div class="flex justify-between mb-6">
      <!-- Add Button: Only visible for Admins -->
      <button
        v-if="authStore.isAdmin"
        @click="openModal"
        class="px-6 py-2 font-semibold text-white rounded-lg shadow bg-sky-400 hover:bg-sky-500"
      >
        + Tambah Kategori
      </button>

      <input
        v-model="searchQuery"
        placeholder="Cari Kategori..."
        class="w-1/3 px-4 py-2 text-white border-white rounded-lg bg-sky-400"
      />
    </div>

    <!-- Modal for Adding/Editing Categories (Admin Only) -->
    <div
      v-if="authStore.isAdmin && kategoriStore.showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-full max-w-lg p-6 rounded-lg shadow-lg bg-sky-700">
        <h2 class="text-2xl font-semibold text-white">Tambah/Edit Kategori</h2>
        <input
          v-model="kategoriStore.form.nama"
          type="text"
          class="w-full px-4 py-2 mt-4 rounded-lg"
          placeholder="Nama Kategori"
        />
        <input
          v-model="kategoriStore.form.singkatan"
          type="text"
          class="w-full px-4 py-2 mt-4 rounded-lg"
          placeholder="Singkatan Kategori"
        />
        <div class="flex justify-end mt-4 space-x-4">
          <button
            @click="kategoriStore.showModal = false"
            class="px-6 py-2 text-white bg-gray-600 rounded-lg"
          >
            Tutup
          </button>
          <button
            @click="kategoriStore.submitKategori"
            class="px-6 py-2 text-white rounded-lg bg-sky-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <div v-if="kategoriStore.loading" class="text-center">Loading...</div>

    <!-- Table for Category List -->
    <div v-else>
      <div v-if="paginatedKategoriList.length > 0" class="overflow-x-auto">
        <table
          class="w-full text-left border border-collapse border-gray-600 rounded-lg table-auto bg-sky-500"
        >
          <thead class="bg-sky-600">
            <tr>
              <th class="px-6 py-3 text-white border">No</th>
              <th class="px-6 py-3 text-white border">Nama Kategori</th>
              <th
                v-if="authStore.isAdmin"
                class="px-6 py-3 text-center text-white border"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(kategori, index) in paginatedKategoriList"
              :key="kategori.id"
              class="transition duration-300"
            >
              <td class="px-6 py-3 text-white border">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-6 py-3 text-white border">{{ kategori.nama }}</td>

              <!-- Edit and Delete Buttons: Only visible for Admins -->
              <td v-if="authStore.isAdmin" class="px-6 py-3 text-center border">
                <div class="flex justify-center space-x-4">
                  <button
                    @click="editKategori(kategori)"
                    class="p-2 text-green-500 hover:text-green-700"
                    aria-label="Edit"
                  >
                    <font-awesome-icon :icon="['fas', 'edit']" />
                  </button>
                  <button
                    @click="confirmDelete(kategori.id)"
                    class="p-2 text-red-500 hover:text-red-700"
                    aria-label="Delete"
                  >
                    <font-awesome-icon :icon="['fas', 'trash']" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center text-white">Tidak ada data kategori.</div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4">
      <div>
        <span class="text-white"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
      </div>
      <nav class="flex space-x-1">
        <button
          @click="previousPage"
          class="px-4 py-2 text-white rounded-lg bg-sky-400 hover:bg-sky-500"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          class="px-4 py-2 text-white rounded-lg bg-sky-400 hover:bg-sky-500"
          :disabled="currentPage >= totalPages"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useKategoriStore } from "@/stores/kategoriStore";
import { useAuthStore } from "@/stores/auth"; // Import authStore to check user role
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const kategoriStore = useKategoriStore();
const authStore = useAuthStore(); // Initialize authStore
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

library.add(faTrash, faPlus, faEdit);

const openModal = () => {
  kategoriStore.resetForm();
  kategoriStore.showModal = true;
};

const editKategori = (kategori) => {
  kategoriStore.form = { ...kategori };
  kategoriStore.showModal = true;
};

const confirmDelete = (id: number) => {
  if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
    kategoriStore.deleteKategori(id);
  }
};

const filteredKategoriList = computed(() => {
  if (!searchQuery.value) {
    return kategoriStore.kategoriList;
  }
  return kategoriStore.kategoriList.filter((kategori) =>
    kategori.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedKategoriList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredKategoriList.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredKategoriList.value.length / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

onMounted(() => {
  kategoriStore.fetchCategories();
});
</script>

<style scoped></style>
