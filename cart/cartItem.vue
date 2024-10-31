<template>
  <li class="flex py-6 sm:py-10">
    <div class="flex-shrink-0">
      <img
        :src="lineItem.thumbnail"
        :alt="lineItem.thumbnail"
        class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
      />
    </div>

    <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
      <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
        <div>
          <div class="flex justify-between">
            <h3 class="text-sm">
              <NuxtLink
                :to="`product/${lineItem.variant.lineItem_id}`"
                class="font-medium text-gray-700 hover:text-gray-800"
                >{{ lineItem.title }}</NuxtLink
              >
            </h3>
          </div>
          <div class="mt-1 flex text-sm">
            <p v-if="lineItem.description" class="text-gray-500">
              {{ lineItem.description }}
            </p>
          </div>
          <p class="mt-1 text-sm font-medium text-gray-900">
            {{ lineItem.quantity }} x {{ currencyConverter(lineItem.unit_price, currencyCode) }}
          </p>
        </div>

        <div class="mt-4 sm:mt-0 sm:pr-9">
          <label :for="`quantity-${lineItem.id}`" class="sr-only"
            >Quantity, {{ lineItem.title }}</label
          >
          <select
            :id="`quantity-${lineItem.id}`"
            :value="lineItem.quantity"
            :name="`quantity-${lineItem.id}`"
            class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            @change="(e) => emit('update:line-item', e.target.value, lineItem.id)"
          >
            <option
              v-for="i in 10"
              :key="`item-${lineItem.id}-${i}`"
              :value="i"
            >
              {{ i }}
            </option>
          </select>

          <div class="absolute right-0 top-0">
            <button
              type="button"
              @click="emit('delete:line-item', lineItem.id)"
              class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Remove</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <p class="mt-4 flex space-x-2 text-sm text-gray-700">
        <CheckIcon
          class="h-5 w-5 flex-shrink-0 text-green-500"
          aria-hidden="true"
        />
        <span> In stock </span>
      </p>
    </div>
  </li>
</template>

<script setup>
import { currencyConverter } from "../../helpers";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  lineItem: {
    type: Object,
    required: true,
  },
  currencyCode: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["update:line-item", "delete:line-item"]);
</script>
