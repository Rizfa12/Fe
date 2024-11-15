import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/utils/axios";

export const useSuratKeluarStore = defineStore("surat-keluar", () => {
  const suratKeluar = ref([]);
  const kategoriList = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSuratKeluar = async () => {
    try {
      loading.value = true;
      const response = await axiosInstance.get("/surat-keluar");
      suratKeluar.value = response.data;
    } catch (err) {
      console.error("Error fetching Surat Keluar:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/kategori");
      kategoriList.value = response.data;
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const addSuratKeluar = async (newSurat) => {
    try {
      if (
        !newSurat.get("pengirim") ||
        !newSurat.get("penerima") ||
        !newSurat.get("tanggal_kirim") ||
        !newSurat.get("subject") ||
        !newSurat.get("isi_surat") ||
        !newSurat.get("status_surat") ||
        !newSurat.get("kategori_id")
      ) {
        console.error("Data Surat Keluar tidak lengkap");
        return;
      }

      await axiosInstance.post("/surat-keluar", newSurat, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchSuratKeluar();
    } catch (err) {
      console.error("Error adding Surat Keluar:", err);
    }
  };

  const deleteSuratKeluar = async (id) => {
    try {
      await axiosInstance.delete(`/surat-keluar/${id}`);

      suratKeluar.value = suratKeluar.value.filter((surat) => surat.id !== id);

      console.log(`Deleted surat with ID: ${id}`);
    } catch (err) {
      console.error(`Error deleting Surat Keluar with ID: ${id}`, err);
    }
  };

  return {
    suratKeluar,
    kategoriList,
    loading,
    error,
    fetchSuratKeluar,
    fetchCategories,
    addSuratKeluar,
    deleteSuratKeluar,
  };
});
