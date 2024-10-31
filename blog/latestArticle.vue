<template>
  <div
    class="cursor-pointer rounded-[20px] bg-[#0142A633] relative read_parrent"
  >
    <div
      class="absolute flex justify-center items-center text-headerMb sm:text-l w-full h-full rounded-[20px] font-secondary font-semibold opacity-0 read_more"
    >
      <p>Read More</p>
    </div>
    <NuxtImg
      v-if="data?.cover_image?.data"
      :src="getImage(data?.cover_image?.data?.attributes?.url)"
      alt="article"
      class="w-full rounded-t-[20px] object-cover"
    />
    <div
      class="pt-6 lg:pt-5 sm:pt-4 pb-10 lg:pb-7 sm:pb-5 px-10 lg:px-6 sm:px-4"
    >
      <p
        v-if="data?.title"
        class="text-[32px] lg:text-headerMb sm:text-[22px] font-semibold font-secondary leading-[37px] break-words"
      >
        {{ data?.title }}
      </p>
      <div class="flex justify-between gap-5 items-center pt-8 lg:pt-7 text-xs">
        <div v-if="data?.tags?.length" class="flex gap-2 items-center">
          <p class="tech text-xs">
            <span>{{ data?.tags[0]?.name }} </span>
          </p>
          <p v-if="data?.tags?.length > 1">+ {{ data?.tags?.length - 1 }}</p>
        </div>
        <p class="font-primary">{{ formattedDate(data?.createdAt) }}</p>
      </div>
      <p v-if="!data?.cover_image?.data" class="pt-11 break-words">
        {{ data?.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { formattedDate, getImage } from '~/helpers';
defineProps({
  data: Object
});
</script>

<style scoped>
.tech {
  position: relative;
  padding: 3px 15px;
}

.tech span {
  position: relative;
  z-index: 2;
}

.tech::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #071746;
  border-radius: 6px;
  z-index: 1;
}

.tech::after {
  content: '';
  position: absolute;
  left: -1px;
  right: -1px;
  top: -1px;
  bottom: -1px;
  z-index: -2;
  border-radius: 6px;
  background: linear-gradient(
    85.25deg,
    #0142a6 35.2%,
    #81b2ff 73.23%,
    #0142a6 111.26%
  );
}

.read_more {
  transition: 0.3s;
}

.read_parrent:hover .read_more {
  opacity: 1;
  background: rgba(0, 0, 0, 0.877);
  z-index: 1000;
}
</style>
