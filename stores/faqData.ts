import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useFaqDataStore = defineStore('faqData', () => {
  const loading = ref<boolean>(false);
  const faqData = ref(null);
  const faqPageData = ref(null);
  const getFaqPageData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getFaqPageData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching faq data');
      }
      faqPageData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching faq data:', error);
    }
  };
  const getFaqData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getFaqQuestions?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching faq data');
      }
      faqData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching faq data:', error);
    }
  };

  return {
    faqData,
    getFaqData,
    faqPageData,
    getFaqPageData
  };
});
