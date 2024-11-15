import { defineStore } from "pinia";
import axiosInstance from "../utils/axios";

export const useKategoriStore = defineStore("kategori", {
  state: () => ({
    kategoriList: [] as Array<{ id: number; nama: string }>,
    form: {
      id: null as number | null,
      nama: "",
      singkatan: "",
    },
    loading: false,
    showModal: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCategories() {
      try {
        const response = await axiosInstance.get("/kategori");
        this.kategoriList = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async submitKategori() {
      try {
        if (this.form.id) {
          await axiosInstance.put(`/kategori/${this.form.id}`, this.form);
          const index = this.kategoriList.findIndex(
            (k) => k.id === this.form.id
          );
          if (index !== -1) {
            this.kategoriList[index] = { ...this.form };
          }
        } else {
          const { data } = await axiosInstance.post("/kategori", this.form);
          this.kategoriList.push(data);
        }
        this.showModal = false;
        this.resetForm();
      } catch (error) {
        console.error("Error submitting kategori:", error);
      }
    },

    async fetchKategoriById(id: number) {
      try {
        const { data } = await axiosInstance.get(`/kategori/${id}`);
        this.form = data;
        this.showModal = true;
      } catch (error) {
        console.error("Error fetching kategori for edit:", error);
      }
    },

    async deleteKategori(id: number) {
      try {
        await axiosInstance.delete(`/kategori/${id}`);
        this.kategoriList = this.kategoriList.filter(
          (kategori) => kategori.id !== id
        );
      } catch (error) {
        console.error("Error deleting kategori:", error);
      }
    },

    resetForm() {
      this.form = {
        id: null,
        nama: "",
        singkatan: "",
      };
    },
  },
});
