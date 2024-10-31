import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useSustainabilityDataStore = defineStore(
  'sustainabilityData',
  () => {
    const loading = ref<boolean>(false);
    const sustainabilityData = ref(null);

    const getSustainabilityData = async function (locale: string) {
      loading.value = true;

      try {
        const { data, error } = await useFetch(
          `/api/getSustainabilityPageData?locale=${locale}`
        );
        if (error.value) {
          throw new Error('Error fetching Sustainability data');
        }
        sustainabilityData.value = data.value.data;
        return data.value.data;
      } catch (error) {
        console.error('Error fetching Sustainability data:', error);
      }
    };

    return {
      sustainabilityData,
      getSustainabilityData
    };
  }
);
