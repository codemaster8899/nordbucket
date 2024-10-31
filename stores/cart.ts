import { defineStore } from 'pinia';
import type {
  StorePostCartReq,
  StorePostCartsCartLineItemsReq,
  StorePostCartsCartLineItemsItemReq
} from '@medusajs/medusa';

export const useCartStore = defineStore('cart', () => {
  const cartData = ref(null);
  const loading = ref<boolean>(false);
  const errorData = ref<Error | null>(null);

  const client = useMedusaClient();

  const createCart = async (payload: StorePostCartReq = null) => {
    loading.value = true;

    client.carts.create(payload).then(({ cart }) => {
      localStorage.setItem('cart_id', cart.id);
      console.log('cart', cart);

      cartData.value = cart;

      console.log('cartStore cartData', cartData.value);
    });

    // const { data, error } = await useFetch("/api/getCart", {
    //   method: "POST",
    //   body: payload ?? {},
    // });

    // if (data.value) {
    //   cartData.value = data.value;
    //   if (!data.value.customer_id) {
    //     const { customer } = await client.auth.getSession();
    //     const { data: cartResponse, error: errorResponse } = await useFetch(
    //       "/api/updateCart",
    //       {
    //         query: {
    //           customerId: customer.id,
    //         },
    //       }
    //     );

    //     if (cartResponse.value) {
    //       cartData.value = data.value;
    //     } else {
    //       errorData.value = errorResponse.value.data;
    //     }
    //   }
    // } else {
    //   errorData.value = error.value.data;
    // }

    loading.value = false;
  };

  const getCart = async (id: string) => {
    loading.value = true;

    client.carts.retrieve(id).then(({ cart }) => {
      cartData.value = cart;
      console.log(cart.id);
    });

    loading.value = false;
  };

  const updateCart = async (
    cartID: string,
    payload: StorePostCartReq = null
  ) => {
    loading.value = true;

    client.carts.update(cartID, payload).then(({ cart }) => {
      console.log('cart', cart);
      cartData.value = cart;

      console.log('cartStore cartData', cartData.value);
    });

    loading.value = false;
  };

  const addLineItem = async (
    payload: StorePostCartsCartLineItemsReq = null
  ) => {
    loading.value = true;
    const cartID = localStorage.getItem('cart_id');

    if (!cartID) {
      await createCart();
    }

    client.carts.lineItems.create(cartID, payload).then(({ cart }) => {
      console.log('lllllllllllll', cart.id);
      cartData.value = cart;
    });

    // const { data, error } = await useFetch('/api/addLineItem', {
    //   method: 'POST',
    //   body: payload ?? {}
    // });
    // if (data.value) {
    //   cartData.value = data.value;
    // } else {
    //   errorData.value = error.value.data;
    // }

    loading.value = false;
  };

  const deleteLineItem = async (itemId: string = '') => {
    loading.value = true;

    const { data, error } = await useFetch('/api/deleteLineItem', {
      query: { lineItemId: itemId }
    });
    if (data.value) {
      cartData.value = data.value;
    } else {
      errorData.value = error.value.data;
    }

    loading.value = false;
  };

  const updateLineItem = async (
    payload: StorePostCartsCartLineItemsItemReq = null,
    itemId: string = ''
  ) => {
    loading.value = true;

    const { data, error } = await useFetch('/api/updateLineItem', {
      method: 'POST',
      body: payload ?? {},
      query: { lineItemId: itemId }
    });
    if (data.value) {
      cartData.value = data.value;
    } else {
      errorData.value = error.value.data;
    }

    loading.value = false;
  };

  return {
    cartData,
    loading,
    errorData,

    createCart,
    getCart,
    updateCart,
    addLineItem,
    deleteLineItem,
    updateLineItem
  };
});
