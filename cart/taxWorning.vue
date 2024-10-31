<template>
  <div
    class="rounded-[20px] py-8 sm:py-5 px-10 sm:px-2 w-full gap-y-4 flex sm:flex-col items-center justify-between"
    style="background-color: #003f3c"
  >
    <div class="text-xs mt-1" v-html="localeMessage.message"></div>
    <div>
      <img src="https://www.karma-genius.com/logo_tuerkis.svg" alt="Logo" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { currencyConverter } from '../../helpers/index';

const { locale } = useI18n();

const props = defineProps({
  price: Number
});

const amount = computed(() => {
  return currencyConverter(props.price, 'EUR');
});

const messages = computed(() => {
  return [
    {
      locale: 'en',
      message: `An offer for the transfer of services is available for your selected hardware. <br/> You will receive ${amount.value} per month for 36 months plus 19% VAT for the selected hardware.`
    },
    {
      locale: 'de',
      message: `Für ihre ausgewählte Hardware liegt ein Angebot zur Leistungsübernahme vor. <br/> Übernahme Leistung aus gewählter Hardware erhalten Sie ${amount.value} mtl. Für 36 Monate zzgl. 19% Umsatzssteuer`
    }
  ];
});

const localeMessage = computed(() => {
  return messages.value.find((item) => item.locale === locale.value);
});
</script>
