import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useHardwareDataStore = defineStore('hardwareData', () => {
  const loading = ref<boolean>(false);
  const hardwareData = ref(null);

  const getHardwareData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getHardwarePageData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching hardware data');
      }
      hardwareData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching hardware data:', error);
    }
  };

  return {
    hardwareData,
    getHardwareData
  };
});
