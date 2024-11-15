import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useSuratMasukStore = defineStore('surat-Masuk', {
  state: () => ({
    suratMasukList: [],
  }),
  actions: {
    async fetchSuratMasuk() {
   try {
      const response = await axiosInstance.get('/surat-masuk');
      console.log(response.data);
      this.suratMasukList = response.data;
   } catch (error) {
      console.error('Error fetching Surat Masuk:', error);
   }
},
    async addSuratMasuk(newSurat) {
   try {
      await axiosInstance.post('/surat-masuk', newSurat, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      await this.fetchSuratMasuk();
   } catch (error) {
      console.error('Error adding Surat Masuk:', error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.errors) {
         console.error('Validation errors:', error.response.data.errors);
      }
   }
},


    async deleteSuratMasuk(id) {
      try {
        await axiosInstance.delete(`/surat-masuk/${id}`); 
        await this.fetchSuratMasuk();
      } catch (error) {
        console.error('Error deleting Surat Masuk:', error);
      }
    },
  },
});

