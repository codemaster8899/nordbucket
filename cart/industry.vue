<template>
  <div class="industry-card">
    <div class="industry-logo">
      <NuxtImg
        :src="getImage(industry?.logo?.data?.attributes?.url)"
        :alt="industry.name"
        class="w-full"
      />
    </div>
    <div class="industry-name font-secondary text-3xl text-center">
      {{ industry?.title }}
    </div>
    <div class="flex flex-col gap-2 text-center mt-1">
      <span
        v-for="item in industry?.options"
        :key="item.id"
        class="font-primary"
        >{{ item.text }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { getImage } from '~/helpers';

const props = defineProps({
  industry: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.industry-card {
  height: 426px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  border-radius: 21px;
  background-color: #0142a630;
  border-image-source: linear-gradient(
    85.25deg,
    rgba(145, 40, 30, 0) 35.2%,
    rgba(145, 40, 30, 0) 73.23%,
    rgba(145, 40, 30, 0) 111.26%
  );
  padding: 40px 36px;
}

.industry-logo {
  width: 94px;
  height: 94px;
}
</style>
