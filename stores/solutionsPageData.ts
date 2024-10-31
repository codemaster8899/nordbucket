import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useSolutionsDataStore = defineStore('solutionsData', () => {
  const loading = ref<boolean>(false);
  const solutionsData = ref(null);

  const getSolutionsData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getSolutionsPageData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching solutions data');
      }
      solutionsData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching solutions data:', error);
    }
  };

  return {
    solutionsData,
    getSolutionsData
  };
});
