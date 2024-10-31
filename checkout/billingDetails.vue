<template>
  <div
    class="bg-[#0142A633] rounded-[20px] sm:pt-6 pt-12 pb-5 sm:pb-3 px-8 sm:px-4 flex flex-col gap-[22px]"
  >
    <div class="flex justify-between items-center gap-2">
      <p class="text-l sm:text-[18px] font-semibold font-secondary">
        {{ t('form.contactPerson') }}
      </p>
      <p
        class="underline cursor-pointer font-primary sm:text-sm"
        @click="emit('goBack')"
      >
        {{ t('global.edit') }}
      </p>
    </div>
    <div class="font-primary sm:text-sm">
      <p>
        {{ billingFormStore?.billingFormData?.company }}
      </p>
      <p>{{ billingFormStore?.billingFormData?.houseNumberAndStreetName }},</p>
      <p>
        {{ billingFormStore?.billingFormData?.zip }}
        {{ billingFormStore?.billingFormData?.city }}
      </p>
      <p>
        {{ t(`countries.${billingFormStore?.billingFormData?.country}`) }}
      </p>
    </div>
    <div class="font-primary sm:text-sm">
      <p class="font-bold">{{ t('form.contactPerson') }}:</p>
      <p>
        {{ billingFormStore?.billingFormData?.firstName }}
        {{ billingFormStore?.billingFormData?.lastName }}
      </p>
      <p>
        {{ billingFormStore?.billingFormData?.roleInCompany }}
      </p>
    </div>

    <div
      v-if="billingFormStore?.billingFormData?.taxNumber"
      class="font-primary sm:text-sm"
    >
      <p class="font-bold">{{ t('form.taxNumber') }}:</p>
      <p>
        {{ billingFormStore?.billingFormData?.taxNumber }}
      </p>
    </div>
    <div
      v-if="billingFormStore?.billingFormData?.vatIdNumber"
      class="font-primary sm:text-sm"
    >
      <p class="font-bold">{{ t('form.vIdNumber') }}:</p>
      <p>
        {{ billingFormStore?.billingFormData?.vatIdNumber }}
      </p>
    </div>
    <div class="font-primary sm:text-sm">
      <p class="font-bold">{{ t('actions.contact') }}:</p>
      <p>
        {{ billingFormStore?.billingFormData?.phoneNumber }}
      </p>
      <p>
        {{ billingFormStore?.billingFormData?.emailAddress }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useBillingDetailsFormStore } from '../stores/billingDetailsForm';
import { useI18n } from 'vue-i18n';
const billingFormStore = useBillingDetailsFormStore();
const emit = defineEmits();
const { t } = useI18n();
</script>

<style></style>
