import { defineStore } from 'pinia';
import type { Product } from '../types/product';
import { useFetch } from 'nuxt/app';

export const useProductsStore = defineStore('products', () => {
  const productsFeatures = ref(null);
  const productsData = ref<Product>([]);
  const productData = ref<Product>();
  const productTabContent = ref(null);
  const loading = ref<boolean>(false);
  const errorData = ref<Error | string | null>(null);
  const cartProducts = ref([]);
  const checkoutProducts = ref([]);
  if (process.client) {
    const items = localStorage.getItem('cart');
    cartProducts.value = JSON.parse(items);
  }

  const setCartItems = (v) => (cartProducts.value = v);
  const setCheckoutItems = (items) => (checkoutProducts.value = items);
  const handleSetCart = (newProduct) => {
    let products: unknown[] = [];
    if (cartProducts?.value) {
      products = [...cartProducts.value];
    }
    products = [...products, newProduct];
    cartProducts?.value?.push(newProduct);
    localStorage.setItem('cart', JSON.stringify(products));
  };

  const getProductsFeature = async (locale: string) => {
    loading.value = true;
    const { data, error } = await useFetch(
      `/api/getProductsFeatures?locale=${locale}`
    );
    if (data.value) {
      productsFeatures.value = data.value?.data?.attributes;
    } else {
      errorData.value = error.value?.data;
    }

    loading.value = false;
  };

  const getProducts = async (locale: string) => {
    loading.value = true;
    const { data, error } = await useFetch(`/api/getProducts?locale=${locale}`);

    if (data.value) {
      productsData.value = data.value;
    } else {
      errorData.value = error.value?.data;
    }

    loading.value = false;
  };

  const getProductById = async (productId: string, locale: string) => {
    loading.value = true;
    const { data, error } = await useFetch('/api/getProductById', {
      query: {
        id: productId,
        locale
      }
    });

    if (data.value) {
      productData.value = data.value;
    } else {
      errorData.value = error.value?.data;
    }

    loading.value = false;
  };

  const getProductTabContent = async (tabID: string, locale: string) => {
    loading.value = true;
    const { data, error } = await useFetch('/api/getProductTabContent', {
      query: {
        id: tabID,
        locale
      }
    });

    if (data.value) {
      productTabContent.value = data.value;
    } else {
      errorData.value = error.value?.data;
    }

    loading.value = false;
  };

  return {
    loading,
    errorData,
    productsData,
    productData,
    productTabContent,
    productsFeatures,
    cartProducts,
    checkoutProducts,

    getProducts,
    getProductById,
    getProductsFeature,
    getProductTabContent,
    handleSetCart,
    setCartItems,
    setCheckoutItems
  };
});
