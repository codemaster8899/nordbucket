<template>
  <div>
    <div class="flex flex-col gap-6 sm:gap-4">
      <YourOrderProduct
        v-for="item in productsList"
        :key="item.id"
        :product="item"
        :quantity="item.quantity"
      />
    </div>

    <div class="flex flex-col">
      <div class="px-10 sm:px-5 sm:px pt-12 lg:pt-8 font-primary">
        <div
          class="relative border_gradient flex items-center justify-between gap-24 pb-5 sm:pb-3 sm:px-4"
        >
          <p class="font-semibold text-l font-secondary">
            19% {{ t('product.taxAlert') }}
          </p>
          <p class="font-primary sm:text-base">
            {{
              currencyConverter(checkoutStore.cartData?.tax_total / 100, 'EUR')
            }}
          </p>
        </div>

        <div
          class="flex justify-between text-[32px] sm:text-[24px] font-secondary font-semibold pt-6 sm:pt-3"
        >
          <p>{{ t('card.total') }}</p>
          <p>
            {{ currencyConverter(checkoutStore.cartData.total / 100, 'EUR') }}
          </p>
        </div>
      </div>
      <div v-if="errorMessage" class="text-center mt-8 text-destructive">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import YourOrderProduct from './yourOrderProduct.vue';
import Button from '../ui/button/Button.vue';
import { useTranslation } from '~/composables/useTranslation';
import { useBillingDetailsFormStore } from '../stores/billingDetailsForm';
import { useProductsStore } from '../stores/products';
import { useCheckoutStore } from '../../stores/checkout';
import { currencyConverter } from '../../helpers/index';

defineProps({
  continueButton: Boolean
});

const { t } = useI18n();
const errorMessage = ref('');
const productsStore = useProductsStore();
const billingFormStore = useBillingDetailsFormStore();

const checkoutStore = useCheckoutStore();
const cartID = localStorage.getItem('cart_id');

onMounted(async () => {
  await checkoutStore.getCart(cartID);
  // const items = localStorage.getItem('checkout products');
  productsStore.setCheckoutItems(checkoutStore.cartData.items);
});

const productsList = computed(() => {
  return checkoutStore.cartData?.items.filter(
    (prod) => prod.metadata.maintenance_product
  );
});

const totalQuantity = computed(() => {
  return checkoutStore.cartData.items.reduce((total, item) => {
    return item.metadata.maintenance_product
      ? total + item.quantity + 1
      : total + item.quantity;
  }, 0);
});

const createOrder = () => {
  billingFormStore.createDraftOrder();
};
</script>

<style scoped>
.border_gradient::after {
  content: '';
  height: 1px;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    85.25deg,
    #0142a6 35.2%,
    #81b2ff 73.23%,
    #0142a6 111.26%
  );
}
</style>
