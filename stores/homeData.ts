import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useHomeDataStore = defineStore('homeData', () => {
  const loading = ref<boolean>(false);
  const homeData = ref(null);
  const homeIndustries = ref(null);

  const getHomeData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getHomePageData?locale=${locale}`
      );

      if (error.value) {
        throw new Error('Error fetching home data');
      }

      homeData.value = data.value.data;
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  const getHomeIndustries = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getHomeIndustries?locale=${locale}`
      );

      if (error.value) {
        throw new Error('Error fetching home data');
      }

      console.log('home industries', data.value.data);

      homeIndustries.value = data.value.data;
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  return {
    homeData,
    homeIndustries,
    getHomeData,
    getHomeIndustries
  };
});
