import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const usePrivacyPolicyStore = defineStore('privacyPolicyData', () => {
  const loading = ref<boolean>(false);
  const privacyPolicyData = ref(null);

  const getPrivacyPolicyData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getPrivacyPolicyPageData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching privacy and policy data');
      }
      privacyPolicyData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching privacy and policy data:', error);
    }
  };

  return {
    privacyPolicyData,
    getPrivacyPolicyData
  };
});
