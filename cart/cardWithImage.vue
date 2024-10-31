<template>
  <div class="card-wrapper">
    <div
      class="content h-full flex flex-col"
      :class="{ 'justify-end': articleImage }"
      :style="styleObject"
    >
      <div
        class="flex flex-col gap-4 p-6"
        :class="{
          gradient: gradient,
          'default-bg h-full': !article?.image?.data
        }"
      >
        <div
          class="text-3xl lg:text-headerMb text-secondary font-semibold lg:font-medium"
        >
          {{ article?.title }}
        </div>
        <div class="font-primary text-base lg:text-sm">
          {{ article?.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getImage } from '~/helpers';
const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  gradient: {
    type: Boolean,
    required: false
  }
});

const articleImage = ref(props?.article?.image?.data?.attributes?.url || '');
const imagePath = ref(getImage(articleImage.value));

const styleObject = computed(() => {
  return articleImage.value
    ? {
        backgroundImage: `url(${imagePath.value})`
      }
    : '';
});
</script>

<style scoped>
.card-wrapper {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content {
  border-radius: 7px;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
}

.gradient {
  background: linear-gradient(
    89.59deg,
    #030817 0.23%,
    rgba(3, 8, 23, 0) 99.55%
  );
}

.default-bg {
  background: linear-gradient(0deg, #0a1b30, #0a1b30),
    linear-gradient(180deg, rgba(3, 8, 23, 0) 0%, #030817 106.54%);
  border-radius: 7px;
}
</style>
