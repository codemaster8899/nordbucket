import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useOrdersStore = defineStore("orders", () => {
  const orderData = ref(null);
  const loading = ref<boolean>(false);
  const errorData = ref<Error | string | null>(null);

  const router = useRouter();

  const completeOrder = async () => {
    loading.value = true;

    const { data, error } = await useFetch("/api/setCheckoutData");

    if (data.value) {
      orderData.value = data.value;
      router.push("/");
      // const response = client.carts.complete(data.value.id)
      // console.log(response, 'response');
    } else {
      errorData.value = error.value.data;
    }

    loading.value = false;
  };

  return {
    orderData,
    loading,
    errorData,

    completeOrder,
  };
});
