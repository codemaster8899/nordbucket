import { defineStore } from 'pinia';

export const useIndustriesStore = defineStore('industries', () => {
  const loading = ref<boolean>(false);
  const contactIndustries = ref(null);
  const industries = ref([
    {
      logo: 'industry-1.svg',
      name: 'Primary Sectors',
      items: ['Energy & Utilities', 'Manufacturing']
    },
    {
      logo: 'industry-2.svg',
      name: 'Business Services',
      items: [
        'Consulting',
        'Financial Services',
        'Human Resources',
        'Real Estate'
      ]
    },
    {
      logo: 'industry-3.svg',
      name: 'Consumer Discretionary',
      items: [
        'Automotive',
        'Consumer Goods & Retail',
        'Entertainment & Media',
        'Hospitality & Travel'
      ]
    },
    {
      logo: 'industry-1.svg',
      name: 'Primary Sectors',
      items: ['Energy & Utilities', 'Manufacturing']
    },
    {
      logo: 'industry-2.svg',
      name: 'Business Services',
      items: [
        'Consulting',
        'Financial Services',
        'Human Resources',
        'Real Estate'
      ]
    },
    {
      logo: 'industry-3.svg',
      name: 'Consumer Discretionary',
      items: [
        'Automotive',
        'Consumer Goods & Retail',
        'Entertainment & Media',
        'Hospitality & Travel'
      ]
    }
  ]);

  const getIndustries = async () => {
    loading.value = true;
  };

  const getContactIndustries = async (locale: string) => {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getContactIndustries?locale=${locale}`
      );

      if (error.value) {
        throw new Error('Error fetching contact industries data!');
      }

      contactIndustries.value = data.value.data;
    } catch (error) {
      console.error('Error fetching contact industries data:', error);
    }
  };

  return {
    industries,
    contactIndustries,
    getIndustries,
    getContactIndustries
  };
});
