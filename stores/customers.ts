import { defineStore } from 'pinia';
import type { StorePostAuthReq, StorePostCustomersReq } from '@medusajs/medusa';

export const useCustomersStore = defineStore('customers', () => {
  const userData = ref(null);
  const loading = ref<boolean>(false);
  const errorData = ref<Error | string | null>(null);

  const router = useRouter();
  const client = useMedusaClient();

  const loginUser = async (payload: StorePostAuthReq) => {
    loading.value = true;

    try {
      const { customer } = await client.auth.authenticate(payload, {
        'Access-Control-Allow-Origin': 'http://localhost:8000',
        'Access-Control-Allow-Credentials': 'true',
        withCredentials: true
      });
      userData.value = customer;
      router.push('/');
    } catch (error) {
      errorData.value = error;
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const registerUser = async (payload: StorePostCustomersReq) => {
    loading.value = true;

    try {
      const { customer } = await client.customers.create(payload);
      userData.value = customer;
      router.push('/');
    } catch (error) {
      errorData.value = error;
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const getUserSession = async () => {
    try {
      const { customer } = await client.auth.getSession();
      userData.value = customer;
      return customer;
    } catch (error) {
      errorData.value = error;
      console.error(error);
    }
  };

  const logoutUser = async () => {
    loading.value = true;

    try {
      await client.auth.deleteSession();
      userData.value = null;
      router.push('/login');
    } catch (error) {
      errorData.value = error;
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    userData,
    loading,
    errorData,

    loginUser,
    registerUser,
    getUserSession,
    logoutUser
  };
});
