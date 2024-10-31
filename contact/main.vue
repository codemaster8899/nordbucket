<template>
  <div class="w-full flex lg:flex-col gap-14 sm:gap-6">
    <div class="w-3/5 lg:w-auto">
      <div class="text-lg font-primary">
        {{ contactDataStore?.contactData?.attributes?.subtitle }}
      </div>
      <div
        class="text-2xl lg:text-4xl sm:text-headerMb font-semibold mt-10 lg:mt-6 sm:mt-2"
      >
        {{ contactDataStore?.contactData?.attributes?.title }}
      </div>
      <div class="text-lg sm:text-base font-primary mt-8 lg:mt-7 sm:mt-5">
        {{ contactDataStore?.contactData?.attributes?.description }}
      </div>
    </div>
    <ContactForm
      :agree-label="contactDataStore?.contactData?.attributes?.agree_label"
      :agree-description="
        contactDataStore?.contactData?.attributes?.agree_description
      "
    ></ContactForm>
  </div>
</template>

<script setup lang="ts">
import { useContactDataStore } from '~/stores/contactPageData';
import ContactForm from '../../components/contact/form.vue';
const { locale } = useI18n();
const contactDataStore = useContactDataStore();

contactDataStore.getContactData(locale.value);
</script>

<style scoped>
.custom-border {
  border: 1px solid transparent;
  position: relative;
}

.custom-border::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: inherit;
  border: 1px solid transparent;
  background: linear-gradient(
    85.25deg,
    #0142a6 35.2%,
    #81b2ff 73.23%,
    #0142a6 111.26%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>
