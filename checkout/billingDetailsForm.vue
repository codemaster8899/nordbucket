<template>
  <div>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-12 sm:gap-7">
      <div class="flex flex-col gap-6 sm:gap-4 billing_form">
        <FormField v-slot="{ componentField }" name="company">
          <FormItem class="w-full">
            <FormLabel class="sm:text-xs">{{
              t('form.companyName')
            }}</FormLabel>
            <FormControl>
              <div class="text-input sm:h-[42px]">
                <input
                  type="text"
                  v-bind="componentField"
                  v-model="billingFormStore.billingFormData.company"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="houseNumberAndStreetName">
          <FormItem class="w-full">
            <FormLabel class="sm:text-xs">{{
              t('form.streetHouseNumber')
            }}</FormLabel>
            <FormControl>
              <div class="text-input sm:h-[42px]">
                <input
                  type="text"
                  v-bind="componentField"
                  v-model="
                    billingFormStore.billingFormData.houseNumberAndStreetName
                  "
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex sm:flex-col gap-5">
          <FormField v-slot="{ componentField }" name="zip">
            <FormItem class="w-full">
              <FormLabel class="sm:text-xs">{{
                t('form.postalCode')
              }}</FormLabel>
              <FormControl>
                <div class="text-input sm:h-[42px]">
                  <input
                    type="text"
                    v-bind="componentField"
                    v-model="billingFormStore.billingFormData.zip"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="city">
            <FormItem class="w-full">
              <FormLabel>{{ t('form.city') }}</FormLabel>
              <div class="text-input sm:h-[42px]">
                <input
                  type="text"
                  v-bind="componentField"
                  v-model="billingFormStore.billingFormData.city"
                />
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <FormField v-slot="{ componentField }" name="country">
          <FormItem class="w-full">
            <FormLabel>{{ t('form.country') }}</FormLabel>
            <Select
              v-bind="componentField"
              v-model="billingFormStore.billingFormData.country"
            >
              <FormControl class="custom-border h-[50px]">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="country in billingFormStore.countriesList"
                    :key="country.id"
                    :value="country.iso_2"
                    v-model="billingFormStore.billingFormData.country"
                  >
                    {{ t(`countries.${country.iso_2}`) }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage class="text-[10px] text-[#91281E] font-primary" />
          </FormItem>
        </FormField>

        <p
          class="text-[32px] sm:text-headerMb font-semibold font-secondary pt-5 w-full"
        >
          {{ t('form.contactPerson') }}
        </p>
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem class="w-full">
            <FormLabel class="sm:text-xs">{{ t('form.firstName') }}</FormLabel>
            <FormControl>
              <div class="text-input sm:h-[42px]">
                <input
                  type="text"
                  v-model="billingFormStore.billingFormData.firstName"
                  v-bind="componentField"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem class="w-full">
            <FormLabel class="sm:text-xs">{{ t('form.lastName') }}</FormLabel>
            <FormControl>
              <div class="text-input sm:h-[42px]">
                <input
                  type="text"
                  v-bind="componentField"
                  v-model="billingFormStore.billingFormData.lastName"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="roleInCompany">
          <FormItem class="w-full">
            <FormLabel class="sm:text-xs">{{
              t('form.roleIntheCompany')
            }}</FormLabel>
            <FormControl>
              <div class="text-input sm:h-[42px]">
                <input
                  type="text"
                  v-bind="componentField"
                  v-model="billingFormStore.billingFormData.roleInCompany"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex sm:flex-col gap-5">
          <FormField v-slot="{ componentField }" name="taxNumber">
            <FormItem class="w-full">
              <FormLabel class="sm:text-xs">{{
                t('form.taxNumber')
              }}</FormLabel>
              <FormControl>
                <div class="text-input sm:h-[42px]">
                  <input
                    type="text"
                    v-bind="componentField"
                    v-model="billingFormStore.billingFormData.taxNumber"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="pt-12">
            {{ t('global.or') }}
          </div>
          <FormField v-slot="{ componentField }" name="vatIdNumber">
            <FormItem class="w-full">
              <FormLabel class="sm:text-xs">{{
                t('form.vIdNumber')
              }}</FormLabel>
              <FormControl>
                <div class="text-input sm:h-[42px]">
                  <input
                    type="text"
                    v-bind="componentField"
                    v-model="billingFormStore.billingFormData.vatIdNumber"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <FormField v-slot="{ componentField }" name="phoneNumber">
          <FormItem class="w-full">
            <FormLabel class="sm:text-xs">{{ t('form.phone') }}</FormLabel>
            <FormControl>
              <div class="text-input sm:h-[42px]">
                <input
                  type="text"
                  v-bind="componentField"
                  v-model="billingFormStore.billingFormData.phoneNumber"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="emailAddress">
          <FormItem class="w-full">
            <FormLabel class="sm:text-xs">{{
              t('form.emailAddress')
            }}</FormLabel>
            <FormControl>
              <div class="text-input sm:h-[42px]">
                <input
                  type="text"
                  v-bind="componentField"
                  v-model="billingFormStore.billingFormData.emailAddress"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="w-full">
            <FormLabel class="sm:text-xs">{{ t('form.password') }}</FormLabel>
            <FormControl>
              <div class="text-input sm:h-[42px]">
                <input type="password" v-bind="componentField" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </form>
  </div>
</template>

<script setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { useBillingDetailsFormStore } from '../stores/billingDetailsForm';
import Button from '../ui/button/Button.vue';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';

const billingFormStore = useBillingDetailsFormStore();
const emit = defineEmits();
const { t, locale } = useI18n();

await billingFormStore.getCountriesList();

const formSchema = toTypedSchema(
  z
    .object({
      firstName: z
        .string()
        .min(1, { message: t('vaalidateErrors.firstName') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.firstName')
        }),
      lastName: z
        .string()
        .min(1, { message: t('vaalidateErrors.lastName') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.lastName')
        }),
      phoneNumber: z
        .string()
        .regex(/^\+?[0-9]+$/, t('vaalidateErrors.invalidPhoneNumber'))
        .min(1, { message: t('vaalidateErrors.phoneNumber') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.phoneNumber')
        }),
      country: z
        .string()
        .min(1, { message: t('vaalidateErrors.country') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.country')
        }),
      company: z
        .string()
        .min(1, { message: t('vaalidateErrors.company') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.company')
        }),
      houseNumberAndStreetName: z
        .string()
        .min(1, { message: t('vaalidateErrors.houseNumberAndStreetName') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.houseNumberAndStreetName')
        }),
      city: z
        .string()
        .min(1, { message: t('vaalidateErrors.city') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.city')
        }),
      zip: z
        .string()
        .min(1, { message: t('vaalidateErrors.zip') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.zip')
        }),
      taxNumber: z.string().nullable(),
      vatIdNumber: z.string().nullable(),
      emailAddress: z
        .string()
        .email({ message: t('vaalidateErrors.invalidEmail') })
        .min(1, { message: t('vaalidateErrors.emailAddress') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.emailAddress')
        }),
      password: z
        .string()
        .min(6, { message: t('vaalidateErrors.invalidPassword') })
        .nullable()
        .refine((val) => val !== null, {
          message: t('vaalidateErrors.password')
        })
    })
    .refine(
      (data) => {
        const isTaxNumberFilled =
          data.taxNumber && data.taxNumber.trim().length > 0;
        const isVatIdNumberFilled =
          data.vatIdNumber && data.vatIdNumber.trim().length > 0;
        return isTaxNumberFilled || isVatIdNumberFilled;
      },
      {
        message: t('vaalidateErrors.taxVatNumber'),
        path: ['taxNumber', 'vatIdNumber']
      }
    )
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: billingFormStore.billingFormData
});

const onSubmit = async () => {
  const isValid = await form.validate();

  if (!isValid.valid) {
    emit('formValidated', false);
    return;
  }

  billingFormStore.updateBillingFormData({
    ...form.values,
    locale: locale.value
  });

  emit('formValidated', true);
};

defineExpose({
  onSubmit
});
</script>

<style scoped>
@media (max-width: 800px) {
  .billing_form {
    width: 100%;
  }
}
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
  z-index: -10;
}
</style>
