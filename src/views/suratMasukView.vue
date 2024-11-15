<template>
  <div
    class="container p-6 mx-auto my-8 text-white bg-sky-700 rounded-lg shadow-lg"
  >
    <h1 class="mb-6 text-4xl font-bold text-center">Surat Masuk</h1>

    <div class="relative flex items-center justify-between mb-4">
      <button
        @click="openModal"
        class="px-6 py-2 font-semibold text-white transition duration-300 bg-sky-400 rounded-lg shadow hover:bg-sky-500"
      >
        + Tambah Surat Masuk
      </button>

      <div class="w-1/3 ml-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari Surat..."
          class="w-full px-4 py-2 text-white bg-sky-400 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="w-full max-h-screen p-6 overflow-y-auto text-white bg-sky-700 rounded-lg shadow-lg sm:w-4/5 lg:w-1/2"
      >
        <h2 class="mb-4 text-2xl font-bold text-center">Tambah Surat Masuk</h2>
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="mb-4">
              <label for="pengirim" class="block mb-2 font-semibold"
                >Pengirim</label
              >
              <input
                v-model="form.pengirim"
                type="text"
                id="pengirim"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Nama Pengirim"
                required
              />
            </div>
            <div class="mb-4">
              <label for="penerima" class="block mb-2 font-semibold"
                >Penerima</label
              >
              <input
                v-model="form.penerima"
                type="text"
                id="penerima"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Nama Penerima"
                required
              />
            </div>

            <div class="mb-4">
              <label for="tanggal_terima" class="block mb-2 font-semibold"
                >Tanggal Terima</label
              >
              <input
                v-model="form.tanggal_terima"
                type="date"
                id="tanggal_terima"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div class="mb-4">
              <label for="subject" class="block mb-2 font-semibold"
                >Subject</label
              >
              <input
                v-model="form.subject"
                type="text"
                id="subject"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Subject"
                required
              />
            </div>

            <div class="col-span-3 mb-4">
              <label for="isi_surat" class="block mb-2 font-semibold"
                >Isi Surat</label
              >
              <textarea
                v-model="form.isi_surat"
                id="isi_surat"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Isi Surat"
                required
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="status_surat" class="block mb-2 font-semibold"
                >Status Surat</label
              >
              <select
                v-model="form.status_surat"
                id="status_surat"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                required
              >
                <option value="terima">Diterima</option>
                <option value="proses">Proses</option>
                <option value="arsip">Diarsipkan</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="no_surat" class="block mb-2 font-semibold"
                >Nomor Surat</label
              >
              <input
                v-model="form.no_surat"
                type="text"
                id="no_surat"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Nomor Surat"
                required
              />
            </div>

            <div class="mb-4">
              <label for="kategori" class="block mb-2 font-semibold"
                >Kategori</label
              >
              <select
                v-model="form.kategori"
                id="kategori"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
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
              <label for="lampiran" class="block mb-2 font-semibold"
                >Lampiran</label
              >
              <input
                @change="handleFileUpload"
                type="file"
                id="lampiran"
                class="w-full px-4 py-2 text-white bg-sky-500 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
            </div>
          </div>
          <div class="flex justify-end col-span-3 mt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 mr-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-400"
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

    <div
      v-if="showDetailModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="relative w-full p-6 bg-sky-700 text-white rounded-lg shadow-lg max-w-[90%] sm:max-w-[600px]"
      >
        <button
          @click="closeDetailModal"
          class="absolute text-sky-200 top-2 right-2 hover:text-white"
        >
          ✖
        </button>
        <h2 class="mb-4 text-xl font-bold text-center">Detail Surat Masuk</h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Pengirim:</strong> {{ detailSurat.pengirim }}</div>
          <div><strong>Penerima:</strong> {{ detailSurat.penerima }}</div>
          <div>
            <strong>Tanggal Terima:</strong>
            {{ dayjs(detailSurat.tanggal_terima).format("DD MMMM YYYY") }}
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

    <div v-if="suratMasukList.length > 0" class="overflow-x-auto">
      <table
        class="w-full text-left text-white bg-sky-500 border border-collapse border-black rounded-lg table-auto"
      >
        <thead class="bg-sky-600">
          <tr>
            <th class="px-6 py-3 text-white border">No</th>
            <th class="px-6 py-3 text-white border">Pengirim</th>
            <th class="px-6 py-3 text-white border">Tanggal Terima</th>
            <th class="px-6 py-3 text-white border">Nomor Surat</th>
            <th class="px-6 py-3 text-white border">Kategori</th>
            <th class="px-6 py-3 text-center text-white border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(surat, index) in paginatedSuratMasukList"
            :key="surat.id"
            class="transition duration-300"
          >
            <td class="px-6 py-3 text-white border">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="px-6 py-3 text-white border">{{ surat.pengirim }}</td>
            <td class="px-6 py-3 text-white border">
              {{ dayjs(surat.tanggal_terima).format("DD MMMM YYYY") }}
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

    <div class="flex items-center justify-between mt-4">
      <div>
        <span class="text-white"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
      </div>
      <nav class="flex space-x-1">
        <button
          @click="previousPage"
          class="px-4 py-2 text-white bg-sky-400 rounded-lg hover:bg-sky-500"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          class="px-4 py-2 text-white bg-sky-400 rounded-lg hover:bg-sky-500"
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
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useSuratMasukStore } from "@/stores/suratMasukStore";
import { useKategoriStore } from "@/stores/kategoriStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const baseURL = "http://localhost:8000/storage/";
const suratMasukStore = useSuratMasukStore();
const kategoriStore = useKategoriStore();
const suratMasukList = ref([]);
const showModal = ref(false);
const showDetailModal = ref(false);
const detailSurat = ref({});
const formData = ref(new FormData());
const showImageModal = ref(false);
const imageSrc = ref("");
const alertVisible = ref(false);
const alertTitle = ref("");
const alertType = ref("success");
const alertDescription = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;
const searchQuery = ref("");

const filteredSuratMasukList = computed(() => {
  if (!searchQuery.value) {
    return suratMasukStore.suratMasukList;
  }
  return suratMasukStore.suratMasukList.filter(
    (surat) =>
      surat.pengirim.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      surat.penerima.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      surat.subject.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      surat.no_surat.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const form = ref({
  pengirim: "",
  penerima: "",
  tanggal_terima: new Date().toISOString().substr(0, 10),
  subject: "",
  isi_surat: "",
  status_surat: "terima",
  no_surat: "",
  kategori: "",
});

const showAlert = (title, type, description) => {
  alertTitle.value = title;
  alertType.value = type;
  alertDescription.value = description;
  alertVisible.value = true;
};

const paginatedSuratMasukList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSuratMasukList.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(suratMasukStore.suratMasukList.length / itemsPerPage);
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

const openModal = () => {
  form.value.tanggal_terima = dayjs().format("YYYY-MM-DD");
  form.value.no_surat = "";
  showModal.value = true;
};

const openImageModal = (src) => {
  imageSrc.value = src;
  showImageModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const closeImageModal = () => {
  showImageModal.value = false;
  imageSrc.value = "";
};

const resetForm = () => {
  form.value = {
    pengirim: "",
    penerima: "",
    tanggal_terima: dayjs().format("YYYY-MM-DD"),
    subject: "",
    isi_surat: "",
    status_surat: "terima",
    no_surat: `NS-${Math.floor(Math.random() * 10000)}`,
    kategori: "",
  };
  formData.value = new FormData();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.append("lampiran", file);
  }
};

const viewDetail = (surat) => {
  detailSurat.value = surat;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
};

const submitForm = async () => {
  try {
    const actionFormData = new FormData();
    actionFormData.append("pengirim", form.value.pengirim);
    actionFormData.append("penerima", form.value.penerima);
    actionFormData.append("tanggal_terima", form.value.tanggal_terima);
    actionFormData.append("subject", form.value.subject);
    actionFormData.append("isi_surat", form.value.isi_surat);
    actionFormData.append("status_surat", form.value.status_surat);
    actionFormData.append("no_surat", form.value.no_surat);
    actionFormData.append("kategori_id", form.value.kategori);

    if (formData.value.has("lampiran")) {
      actionFormData.append("lampiran", formData.value.get("lampiran"));
    }

    await suratMasukStore.addSuratMasuk(actionFormData);

    closeModal();

    showAlert("Surat Ditambahkan", "success", "Surat berhasil ditambahkan.");

    Swal.fire({
      icon: "success",
      title: "Surat Ditambahkan",
      text: "Surat berhasil ditambahkan",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    showAlert("Error", "error", "Gagal menyimpan surat.");

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menyimpan surat",
    });
  } finally {
    resetForm();
  }
};

const deleteSurat = async (id) => {
  try {
    await suratMasukStore.deleteSuratMasuk(id);
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Surat berhasil dihapus",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Gagal menghapus surat masuk:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menghapus surat",
    });
  }
};

library.add(faTrash, faPlus, faSearch);

const closeAlert = () => {
  alertVisible.value = false;
};

onMounted(async () => {
  await suratMasukStore.fetchSuratMasuk();
  await kategoriStore.fetchCategories();
  suratMasukList.value = suratMasukStore.suratMasukList;
});

const isImage = (file) => /\.(jpg|jpeg|png)$/i.test(file);
const isPdf = (file) => /\.pdf$/i.test(file);
</script>
