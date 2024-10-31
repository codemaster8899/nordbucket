import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useServicesDataStore = defineStore('servicesData', () => {
  const loading = ref<boolean>(false);
  const servicesData = ref(null);

  const getServicesData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getServicesPageData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching services data');
      }
      servicesData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching services data:', error);
    }
  };

  return {
    servicesData,
    getServicesData
  };
});
