<template>
  <div
    class="bg-[#0142A633] sm:pt-6 py-12 sm:pb-12 px-8 lg:px-5 sm:px-3 rounded-[20px] min-w-[530px] lg:min-w-[350px] sm:w-full sm:min-w-full"
  >
    <p
      class="border_gradient relative pb-5 text-l sm:text-lg font-semibold font-secondary"
    >
      {{ t('card.product') }}
    </p>

    <div class="flex items-center justify-between pt-11 sm:pt-6">
      <div class="flex items-center gap-4 sm:gap-2">
        <img :src="product?.thumbnail" alt="" class="w-[83px] sm:w-14" />
        <div>
          <p class="text-sm font-secondary font-semibold sm:text-xs">
            {{ product?.title }}
          </p>
          <p class="text-[8px] font-primary">
            <span>{{ t('card.quantity') }}</span> {{ product.quantity }}
          </p>
        </div>
      </div>
      <p class="font-primary sm:text-sm">
        {{ currencyConverter(product?.subtotal / 100, 'EUR') }}
      </p>
    </div>
    <div
      v-if="maintenance"
      class="flex items-center justify-between pt-11 sm:pt-6"
    >
      <div class="flex items-center gap-4 sm:gap-2">
        <img :src="maintenance?.thumbnail" alt="" class="w-[83px] sm:w-14" />
        <div>
          <p class="text-sm font-secondary font-semibold sm:text-xs">
            {{ maintenance?.title }}
          </p>
          <p class="text-[8px] font-primary">
            {{ t('card.monthlySubscription') }}
          </p>
        </div>
      </div>
      <p class="font-primary sm:text-sm">
        {{
          currencyConverter(
            maintenance.product_variant.data.attributes.prices *
              product.quantity,
            'eur'
          )
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { currencyConverter } from '../../helpers/index';
const { t } = useI18n();
const props = defineProps({
  product: Object,
  quantity: Number
});

const maintenance = computed(() => {
  return props.product?.metadata?.maintenance_product;
});
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
