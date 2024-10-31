import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';

export const useBlogsStore = defineStore('blogsData', () => {
  const loading = ref<boolean>(false);
  const blogPageData = ref(null);
  const blogs = ref(null);
  const blog = ref(null);
  const getBlogPageData = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getBlogPageData?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching blog data');
      }
      blogPageData.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };
  const getBlogs = async function (locale: string) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(`/api/getBlogs?locale=${locale}`);
      if (error.value) {
        throw new Error('Error fetching blog data');
      }
      blogs.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };
  const getBlogById = async function (locale: string, id: number) {
    loading.value = true;

    try {
      const { data, error } = await useFetch(
        `/api/getBlogById?id=${id}?locale=${locale}`
      );
      if (error.value) {
        throw new Error('Error fetching blog data');
      }
      blog.value = data.value.data;
      return data.value.data;
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };
  return {
    blogs,
    blog,
    getBlogs,
    getBlogById,
    getBlogPageData,
    blogPageData
  };
});
