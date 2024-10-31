<template>
  <form
    @submit.prevent="onSubmit"
    class="w-[70%] lg:w-auto flex flex-wrap gap-5"
  >
    <FormField v-slot="{ componentField }" name="firstName">
      <FormItem class="w-[48%] sm:w-full">
        <FormLabel>{{ t('form.firstName') }}</FormLabel>
        <FormControl>
          <div class="text-input">
            <input type="text" v-bind="componentField" />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="lastName">
      <FormItem class="w-[48%] sm:w-full">
        <FormLabel>{{ t('form.lastName') }}</FormLabel>
        <FormControl>
          <div class="text-input">
            <input type="text" v-bind="componentField" />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="phoneNumber">
      <FormItem class="w-full">
        <FormLabel>{{ t('form.phone') }}</FormLabel>
        <FormControl>
          <div class="text-input">
            <input type="text" v-bind="componentField" />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="emailAddress">
      <FormItem class="w-full">
        <FormLabel>{{ t('form.emailAddress') }}</FormLabel>
        <FormControl>
          <div class="text-input">
            <input type="text" v-bind="componentField" />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="industry">
      <FormItem class="w-full">
        <FormLabel>{{ t('form.industry') }}</FormLabel>
        <Select v-bind="componentField">
          <FormControl class="custom-border h-[52px]">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="industry in industriesStore.contactIndustries"
                :key="industry.id"
                :value="industry.attributes.value"
              >
                {{ industry.attributes.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="message">
      <FormItem class="w-full">
        <FormLabel>{{ t('form.message') }}</FormLabel>
        <FormControl>
          <div class="text-input">
            <Textarea v-bind="componentField" class="border-none resize-none" />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-if="agreeLabel"
      v-slot="{ handleChange, value }"
      type="checkbox"
      name="receiveInfo"
    >
      <FormItem
        class="w-full items-top flex space-x-2 space-y-0 gap-x-5 sm:gap-x-1"
      >
        <FormControl>
          <div class="w-5 h-5 custom-border rounded-md">
            <Checkbox
              id="terms1"
              :checked="value"
              @update:checked="handleChange"
            />
          </div>
        </FormControl>
        <div class="grid gap-1.5 leading-none">
          <label
            for="terms1"
            class="text-xs font-light font-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {{ agreeLabel }}
          </label>
          <p v-if="agreeDescription" class="text-xs font-light font-primary">
            {{ agreeDescription }}
          </p>
        </div>
      </FormItem>
    </FormField>
    <Button
      type="submit"
      class="w-full mt-11 lg:mt-6 sm:mt-3 g-recaptcha"
      content="Submit"
    >
      {{ t('actions.send-message') }}
    </Button>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
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
import Button from '../ui/button/Button.vue';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { useGoogleRecaptcha } from '../../composables/useGoogleRecaptcha';
import { useIndustriesStore } from '../stores/industries';
import { useTranslation } from '~/composables/useTranslation';

const { localeNavigateTo } = useTranslation();

defineProps({
  agreeLabel: String,
  agreeDescription: String
});

const { t, locale } = useI18n();
const { executeRecaptcha } = useGoogleRecaptcha();

const industriesStore = useIndustriesStore();
await industriesStore.getContactIndustries(locale.value);

const formSchema = toTypedSchema(
  z.object({
    firstName: z
      .string({ required_error: 'First name is required' })
      .min(2)
      .max(50),
    lastName: z
      .string({ required_error: 'Last name is required' })
      .min(2)
      .max(50),
    phoneNumber: z
      .string({ required_error: 'Phone number is required' })
      .min(10)
      .max(15),
    emailAddress: z
      .string({ required_error: 'Email Address is required' })
      .email(),
    message: z.string({ required_error: 'Message is requried' }).min(10),
    receiveInfo: z.boolean().default(false).optional(),
    isRecaptchaChecked: z.boolean().default(false).optional(),
    recaptchaToken: z.string().optional()
  })
);

const form = useForm({
  validationSchema: formSchema
});

const onSubmit = async () => {
  const x = industriesStore?.contactIndustries?.find(
    (elm) => elm.attributes.value == form.values.industry
  )?.attributes;
  const { value, label } = x;
  const chosenIndustry = { value, label };

  const isValid = await form.validate();

  if (!isValid.valid) {
    console.warn('Form validation failed:', form.errors);
    return;
  }

  const { token } = await executeRecaptcha('submit');
  if (!token) return;
  form.values = {
    ...form.values,
    industry: chosenIndustry,
    recaptchaToken: token
  };
  try {
    const response = await $fetch('/api/sendContactMessage', {
      method: 'POST',
      body: {
        data: form.values
      },
      params: {
        locale: locale.value
      }
    }).then((res) => localeNavigateTo('/contactSuccess'));
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
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
  z-index: -10;
}
</style>
