import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from '#app';

export const useTranslation = () => {
  const localeRoute = useLocaleRoute();
  const router = useRouter();

  const localeNavigateTo = (params: RouteLocationRaw) => {
    const route = localeRoute(params);

    const { path, query } = route;
    const newUrl = {
      path,
      query: { ...router.currentRoute.value.query, ...query } // Preserve existing query params and add/update
    };

    router.push(newUrl);
  };

  const updateQueryParams = (newQuery: Record<string, any>) => {
    const currentQuery = router.currentRoute.value.query;
    const updatedQuery = { ...currentQuery, ...newQuery };

    router.push({
      path: router.currentRoute.value.path,
      query: updatedQuery
    });
  };

  const navigateToPreviousPage = () => {
    router.back();
  };

  return {
    localeNavigateTo,
    updateQueryParams,
    navigateToPreviousPage
  };
};
