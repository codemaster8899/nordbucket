import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore('checkout', () => {
  const cartData = ref(null);
  const cartID = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const client = useMedusaClient();

  const createCart = async (payload) => {
    loading.value = true;

    const { cart } = await client.carts.create(payload);

    console.log('cart', cart);
    cartData.value = cart;
    localStorage.setItem('cart_id', cart.id);
    cartID.value = cart.id;

    console.log('cartStore cartData', cartData.value);

    loading.value = false;

    return cart;
  };

  const getCart = async (id: string) => {
    const { cart } = await client.carts.retrieve(id);

    cartData.value = cart;
    return cart;
  };

  const addLineItem = async (payload) => {
    let cartId = localStorage.getItem('cart_id');

    if (!cartId) {
      const { metadata, items, ...data } = payload;
      await createCart(data);

      if (cartID.value) {
        cartId = cartID.value;
      }
    }

    // const cartID = localStorage.getItem('cart_id');

    const { cart } = await client.carts.lineItems.create(cartId, {
      ...payload.items[0],
      metadata: payload.metadata
    });

    cartData.value = cart;
  };

  const updateLineItem = async (
    cartID: string,
    lineID: string,
    quantity: number
  ) => {
    const { cart } = await client.carts.lineItems.update(cartID, lineID, {
      quantity
    });

    cartData.value = cart;
  };

  const removeLineItem = async (cartID: string, lineID: string) => {
    client.carts.lineItems.delete(cartID, lineID).then(({ cart }) => {
      cartData.value = cart;
    });
  };

  return {
    loading,
    error,
    cartData,
    cartID,
    getCart,
    createCart,
    addLineItem,
    updateLineItem,
    removeLineItem
  };
});
