import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useFooterDataStore = defineStore('footerData', () => {
  const loading = ref<boolean>(false);
  const footerData = ref(null);

  const getFooterData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getFooterData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching footer data');
      }
      footerData.value = data.value.data;
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

  return {
    footerData,
    getFooterData
  };
});
