import { defineNuxtRouteMiddleware } from '#app';
import { createError, useRuntimeConfig, useCookie } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { localeNavigateTo } = useTranslation();
  const config = useRuntimeConfig();
  const router = useRouter();
  const refId = (to.query.ref || from.query.ref) as string | undefined;
  const BASE_URL = (config.public.refValidUrl || '') as string;
  const AUTH_TOKEN = config.public.validAuthToken || '';

  const customer_id = useCookie('customer_id');
  const validRefID = useCookie('ref_id');

  if (customer_id.value) {
    return;
  }

  if (validRefID.value && validRefID.value === refId) {
    return;
  }

  if (validRefID.value && !refId) {
    router.push({
      path: to.path,
      query: {
        ref: validRefID.value
      }
    });

    return;
  }

  if (
    !(
      to.fullPath.includes('ecommerce') ||
      to.fullPath.includes('shoppingCard') ||
      to.fullPath.includes('checkout') ||
      to.fullPath.includes('register')
    )
  ) {
    return;
  }

  if (to.fullPath.includes('login')) {
    return;
  }

  if (refId) {
    try {
      const response = await $fetch<{ valid: boolean }>(BASE_URL, {
        query: { ref: refId },
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      });

      if (response) {
        validRefID.value = refId;

        localeNavigateTo({
          path: to.fullPath
        });

        return;
      }
    } catch (error) {
      validRefID.value = null;

      router.push({
        path: '/error'
      });

      throw createError({
        statusCode: 404,
        statusMessage: 'Ref ID validation failed'
      });
    }
  } else {
    router.push({
      path: '/error'
    });

    throw createError({
      statusCode: 404,
      statusMessage: 'Ref ID not found'
    });
  }
});
