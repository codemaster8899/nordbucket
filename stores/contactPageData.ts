import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useContactDataStore = defineStore('contactData', () => {
  const loading = ref<boolean>(false);
  const contactData = ref(null);

  const getContactData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getContactPageData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching contact data');
      }
      contactData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  return {
    contactData,
    getContactData
  };
});
