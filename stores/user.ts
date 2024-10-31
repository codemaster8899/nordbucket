import { defineStore } from 'pinia';
import { useCookie } from 'nuxt/app';

export const useUserStore = defineStore('user', () => {
  const client = useMedusaClient();
  const runtimeConfig = useRuntimeConfig();
  const medusaAdminToken = runtimeConfig.public.medusaAdminToken;
  const { localeNavigateTo } = useTranslation();
  const userLoggedIn = ref(false);
  const userData = ref(null);

  async function login(data: Object) {
    const { customer } = await client.auth.authenticate(data);

    if (customer && customer.id) {
      useCookie('customer_id').value = customer.id;

      userLoggedIn.value = true;
      userData.value = customer;
    }

    return { customer };
  }

  async function register(data: Object) {
    const { customer } = await client.customers.create(data);
    const refID = useCookie('ref_id').value;

    if (customer) {
      userData.value = customer;
      userLoggedIn.value = true;

      await client.customers.update({
        email: customer.email,
        metadata: {
          refID
        }
      });

      return await login({
        email: data.email,
        password: data.password
      });
    }

    return customer;
  }

  async function fetchUser() {
    const customer_id = useCookie('customer_id').value;
    if (customer_id) {
      const { customer } = await client.customers.retrieve(customer_id);

      if (customer && customer.id) {
        userData.value = customer;
        userLoggedIn.value = true;
      }
    } else {
      userData.value = null;
    }
  }

  function checkUserLoggedIn() {
    if (process.client) {
      const customer_id = useCookie('customer_id').value;

      if (customer_id) {
        userLoggedIn.value = true;
      }
    }
  }

  return {
    userLoggedIn,
    userData,
    login,
    register,
    checkUserLoggedIn,
    fetchUser
  };
});
