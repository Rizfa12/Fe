<template>
  <div class="container p-6 mx-auto my-8 text-white rounded-lg bg-sky-700">
    <h1 class="mb-6 text-4xl font-bold text-center text-white">Surat Keluar</h1>

    <div class="relative flex items-center justify-between mb-4">
      <button
        @click="showModal = true"
        class="px-6 py-2 font-semibold text-white transition duration-300 rounded-lg shadow bg-sky-400 hover:bg-sky-500"
      >
        + Tambah Surat Keluar
      </button>

      <div class="w-1/3 ml-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari Surat..."
          class="w-full px-4 py-2 text-white border rounded-lg bg-sky-400 border-sky-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
    </div>

    <div v-if="loading" class="text-center text-white">Loading...</div>
    <div v-else>
      <div v-if="suratKeluar.length > 0" class="overflow-x-auto">
        <table
          class="w-full text-left border border-collapse border-white rounded-lg bg-sky-500"
        >
          <thead class="bg-sky-600">
            <tr>
              <th class="px-6 py-3 text-white border">No</th>
              <th class="px-6 py-3 text-white border">Penerima</th>
              <th class="px-6 py-3 text-white border">Tanggal Kirim</th>
              <th class="px-6 py-3 text-white border">Nomor Surat</th>
              <th class="px-6 py-3 text-white border">Kategori</th>
              <th class="px-6 py-3 text-center text-white border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(surat, index) in paginatedSuratKeluarList"
              :key="surat.id"
              class="transition duration-300"
            >
              <td class="px-6 py-3 text-white border">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-6 py-3 text-white border">{{ surat.penerima }}</td>
              <td class="px-6 py-3 text-white border">
                {{ surat.tanggal_kirim }}
              </td>
              <td class="px-6 py-3 text-white border">{{ surat.no_surat }}</td>
              <td class="px-6 py-3 text-white border">
                {{ surat.kategori?.nama }}
              </td>

              <td class="px-6 py-3 text-center border">
                <div class="flex justify-center space-x-4">
                  <button
                    @click="viewDetail(surat)"
                    class="p-2 text-gray-600 hover:text-gray-700"
                    aria-label="View Details"
                  >
                    <font-awesome-icon :icon="['fas', 'search']" />
                  </button>

                  <button
                    @click="deleteSurat(surat.id)"
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
      <div v-else class="text-center text-gray-400">
        Tidak ada data surat keluar.
      </div>
    </div>

    <div
      v-if="showDetailModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="relative w-full p-6 bg-sky-700 text-white rounded-lg shadow-lg max-w-[90%] sm:max-w-[600px]"
      >
        <button
          @click="closeDetailModal"
          class="absolute text-gray-400 top-2 right-2 hover:text-white"
        >
          ✖
        </button>
        <h2 class="mb-4 text-xl font-bold text-center text-white">
          Detail Surat Keluar
        </h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Pengirim:</strong> {{ detailSurat.pengirim }}</div>
          <div><strong>Penerima:</strong> {{ detailSurat.penerima }}</div>
          <div>
            <strong>Tanggal Kirim:</strong>
            {{ dayjs(detailSurat.tanggal_kirim).format("DD MMMM YYYY") }}
          </div>
          <div><strong>Subject:</strong> {{ detailSurat.subject }}</div>
          <div>
            <strong>Status Surat:</strong> {{ detailSurat.status_surat }}
          </div>
          <div><strong>Nomor Surat:</strong> {{ detailSurat.no_surat }}</div>
          <div><strong>Kategori:</strong> {{ detailSurat.kategori?.nama }}</div>
          <div class="col-span-2">
            <strong>Isi Surat:</strong> {{ detailSurat.isi_surat }}
          </div>
          <div v-if="detailSurat.lampiran" class="col-span-2 mt-2">
            <strong>Lampiran:</strong>
            <div
              v-if="isImage(detailSurat.lampiran)"
              class="flex justify-center"
            >
              <img
                :src="baseURL + detailSurat.lampiran"
                alt="Lampiran"
                class="w-auto max-w-[150px] h-auto max-h-[150px] mt-2 rounded-lg cursor-pointer"
                @click="openImageModal(baseURL + detailSurat.lampiran)"
              />
            </div>
            <div
              v-else-if="isPdf(detailSurat.lampiran)"
              class="flex justify-center"
            >
              <embed
                :src="baseURL + detailSurat.lampiran"
                type="application/pdf"
                class="w-full max-w-[400px] mt-2 rounded-lg h-[300px]"
              />
            </div>
            <div v-else>
              <a
                :href="baseURL + detailSurat.lampiran"
                target="_blank"
                class="text-blue-400 underline"
                >Download Document</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showImageModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
    >
      <div class="relative">
        <img
          :src="imageSrc"
          alt="Lampiran"
          class="w-auto h-auto max-w-full max-h-screen rounded-lg"
        />
        <button
          @click="closeImageModal"
          class="absolute top-0 right-0 mt-2 mr-2 text-white"
        >
          ✖
        </button>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="w-full max-h-screen p-6 overflow-y-auto text-white rounded-lg shadow-lg bg-sky-700 sm:w-4/5 lg:w-1/2"
      >
        <h2 class="mb-4 text-2xl font-bold text-center text-white">
          Tambah Surat Keluar
        </h2>
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="mb-4">
              <label
                for="pengirim"
                class="block mb-2 font-semibold text-gray-400"
                >Pengirim</label
              >
              <input
                v-model="form.pengirim"
                type="text"
                id="pengirim"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nama Pengirim"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="penerima"
                class="block mb-2 font-semibold text-gray-400"
                >Penerima</label
              >
              <input
                v-model="form.penerima"
                type="text"
                id="penerima"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nama Penerima"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="tanggal_kirim"
                class="block mb-2 font-semibold text-gray-400"
                >Tanggal Kirim</label
              >
              <input
                v-model="form.tanggal_kirim"
                type="date"
                id="tanggal_kirim"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="subject"
                class="block mb-2 font-semibold text-gray-400"
                >Subject</label
              >
              <input
                v-model="form.subject"
                type="text"
                id="subject"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Subject"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="singkatan_penerima"
                class="block mb-2 font-semibold text-gray-400"
                >Singkatan Penerima</label
              >
              <input
                v-model="form.singkatan_penerima"
                type="text"
                id="singkatan_penerima"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Singkatan Penerima"
              />
            </div>
            <div class="col-span-3 mb-4">
              <label
                for="isi_surat"
                class="block mb-2 font-semibold text-gray-400"
                >Isi Surat</label
              >
              <textarea
                v-model="form.isi_surat"
                id="isi_surat"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Isi Surat"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label
                for="status_surat"
                class="block mb-2 font-semibold text-gray-400"
                >Status Surat</label
              >
              <select
                v-model="form.status_surat"
                id="status_surat"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="terkirim">Terkirim</option>
              </select>
            </div>
            <div class="mb-4">
              <label
                for="no_surat"
                class="block mb-2 font-semibold text-gray-400"
                >Nomor Surat</label
              >
              <input
                :value="noSurat"
                type="text"
                id="no_surat"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                readonly
              />
            </div>

            <div class="mb-4">
              <label
                for="kategori"
                class="block mb-2 font-semibold text-gray-400"
                >Kategori</label
              >
              <select
                v-model="form.kategori_id"
                id="kategori"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Pilih Kategori</option>
                <option
                  v-for="kategori in kategoriStore.kategoriList"
                  :key="kategori.id"
                  :value="kategori.id"
                >
                  {{ kategori.nama }}
                </option>
              </select>
            </div>
            <div class="col-span-3 mb-4">
              <label
                for="lampiran"
                class="block mb-2 font-semibold text-gray-400"
                >Lampiran</label
              >
              <input
                @change="handleFileUpload"
                type="file"
                id="lampiran"
                class="w-full px-4 py-2 text-white border border-white rounded-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
            </div>
          </div>
          <div class="flex justify-end col-span-3 mt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 mr-2 text-white transition bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
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
import { ref, onMounted, computed } from "vue";
import { useSuratKeluarStore } from "@/stores/suratKeluarStore";
import { useKategoriStore } from "@/stores/kategoriStore";
import dayjs from "dayjs";
import { faTrash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const baseURL = "http://localhost:8000/storage/";
const showModal = ref(false);
const showImageModal = ref(false);
const showDetailModal = ref(false);
const imageSrc = ref("");
const formData = new FormData();
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

const noSurat = computed(() => {
  const id = form.value.id ? form.value.id.toString().padStart(3, "0") : "000";

  // Find the selected category by id
  const kategori = kategoriStore.kategoriList.find(
    (kat) => kat.id === form.value.kategori_id
  );

  // Ensure categoryCode uses the actual category ID with padding
  const categoryCode = kategori
    ? kategori.id.toString().padStart(2, "0")
    : "00";
  const categoryAbbreviation = kategori ? kategori.singkatan : "UNK"; // Category abbreviation
  const receiverAbbreviation = form.value.singkatan_penerima || "XX"; // Singkatan Penerima
  const date = dayjs(form.value.tanggal_kirim);
  const monthInRoman = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ][date.month()];
  const year = date.year();

  // Format no_surat with Singkatan Penerima in parentheses
  return `${categoryCode}.${id}/${categoryAbbreviation}/(${receiverAbbreviation})/${monthInRoman}/${year}`;
});

const filteredSuratKeluarList = computed(() => {
  if (!searchQuery.value) {
    return suratKeluar;
  }
  return suratKeluar.filter(
    (surat) =>
      surat.penerima.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      surat.no_surat.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      surat.kategori?.nama
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

const paginatedSuratKeluarList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSuratKeluarList.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredSuratKeluarList.value.length / itemsPerPage);
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

const form = ref({
  pengirim: "",
  penerima: "",
  tanggal_kirim: dayjs().format("YYYY-MM-DD"),
  subject: "",
  isi_surat: "",
  status_surat: "Terkirim",
  no_surat: "",
  kategori_id: "",
});

const detailSurat = ref({});
const store = useSuratKeluarStore();
const kategoriStore = useKategoriStore();
const {
  suratKeluar,
  loading,
  fetchSuratKeluar,
  addSuratKeluar,
  deleteSuratKeluar,
} = store;

library.add(faTrash, faPlus, faSearch);

onMounted(async () => {
  await kategoriStore.fetchCategories();
  await fetchSuratKeluar();
});

const submitForm = async () => {
  try {
    formData.append("pengirim", form.value.pengirim);
    formData.append("penerima", form.value.penerima);
    formData.append("tanggal_kirim", form.value.tanggal_kirim);
    formData.append("subject", form.value.subject);
    formData.append("isi_surat", form.value.isi_surat);
    formData.append("status_surat", form.value.status_surat);
    formData.append("kategori_id", form.value.kategori_id);
    formData.append(
      "singkatan_penerima",
      form.value.singkatan_penerima || "XX"
    );

    formData.set("kategori_id", form.value.kategori_id);
    console.log(formData.get("kategori_id"));
    await addSuratKeluar(formData);
    await fetchSuratKeluar();
    showModal.value = false;
    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
    alert(
      "Terjadi kesalahan saat menambah surat. Mohon cek kembali input Anda."
    );
  }
};

const resetForm = () => {
  form.value = {
    pengirim: "",
    penerima: "",
    tanggal_kirim: dayjs().format("YYYY-MM-DD"),
    subject: "",
    isi_surat: "",
    status_surat: "Terkirim",
    no_surat: "",
    kategori_id: "",
  };
  formData.value = new FormData();
};

const deleteSurat = async (id) => {
  try {
    await deleteSuratKeluar(id);
    console.log(`Surat dengan ID: ${id} berhasil dihapus`);
  } catch (error) {
    console.error("Gagal menghapus surat:", error);
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.append("lampiran", file);
  }
};

const viewDetail = (surat) => {
  detailSurat.value = surat;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const openImageModal = (src) => {
  imageSrc.value = src;
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  imageSrc.value = "";
};

const isImage = (file) => /\.(jpg|jpeg|png)$/i.test(file);
const isPdf = (file) => /\.pdf$/i.test(file);
</script>

<style scoped></style>
