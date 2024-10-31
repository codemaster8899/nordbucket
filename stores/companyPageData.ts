import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useCompanyDataStore = defineStore('companyData', () => {
  const loading = ref<boolean>(false);
  const companyData = ref(null);

  const getCompanyData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getCompanyPageData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching company data');
      }
      companyData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  return {
    companyData,
    getCompanyData
  };
});
