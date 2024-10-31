import { defineStore } from 'pinia';
import { useCookie } from 'nuxt/app';
import { useCheckoutStore } from './checkout';

export const useBillingDetailsFormStore = defineStore('billingFormData', () => {
  const runtimeConfig = useRuntimeConfig();
  const medusaAdminToken = runtimeConfig.public.medusaAdminToken;
  const client = useMedusaClient();
  const regionId = runtimeConfig.public.regionId; // NA region id
  const shippingID = runtimeConfig.public.shippingID;
  const countriesList = ref([]);
  const { localeNavigateTo } = useTranslation();
  const checkoutStore = useCheckoutStore();

  const billingFormData = ref({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    country: null,
    company: null,
    houseNumberAndStreetName: null,
    city: null,
    zip: null,
    emailAddress: null,
    salutation: null,
    roleInCompany: null,
    taxNumber: null,
    vatIdNumber: null,
    // vat: false,
    karmaGenius: false,
    hardwareDelivery: false,
    nbd: false,
    password: null,
    items: ref<Array<{ id: string; quantity: number }>>([])
  });

  async function getCountriesList() {
    const { region } = await client.admin.regions.retrieve(regionId, {
      'x-medusa-access-token': `${medusaAdminToken}`
    });

    countriesList.value = region.countries;
  }

  function updateBillingFormData(data) {
    billingFormData.value = { ...billingFormData.value, ...data };
  }

  // Function to create draft order
  async function createDraftOrder() {
    try {
      // Extract product items
      const productItems = checkoutStore.cartData.items.map((item) => ({
        quantity: item.quantity,
        variant_id: item.variant_id
      }));
      const titles = checkoutStore.cartData.items.map((item) => item.title);
      // Extract maintenance items (filter those with maintenance data)
      const maintenanceItems = checkoutStore.cartData.items
        .filter((item) => item.metadata && item.metadata.maintenance_product)
        .map((item) => {
          return {
            quantity: item.quantity,
            variant_id:
              item.metadata.maintenance_product.product_variant.data.attributes
                .medusa_id,
            titles: [item.metadata.maintenance_product.title]
          };
        });
      // Common draft order structure
      const draftOrderBaseData = {
        email: billingFormData.value.emailAddress,
        region_id: regionId,
        billing_address: {
          first_name: billingFormData.value.firstName,
          last_name: billingFormData.value.lastName,
          phone: billingFormData.value.phoneNumber,
          address_1: billingFormData.value.houseNumberAndStreetName,
          city: billingFormData.value.city,
          country_code: billingFormData.value.country,
          postal_code: billingFormData.value.zip,
          company: billingFormData.value.company,
          metadata: {
            karmaGenius: billingFormData.value.karmaGenius,
            hardwareDelivery: billingFormData.value.hardwareDelivery,
            nbd: billingFormData.value.nbd
          }
        },
        shipping_methods: [{ option_id: shippingID, price: 0 }],
        metadata: {
          salutation: billingFormData.value.salutation,
          tax_number: billingFormData.value.taxNumber,
          vat_id_number: billingFormData.value.vatIdNumber,
          // vat: billingFormData.value.vat,
          locale: billingFormData.value.locale,
          titles
        }
      };

      // Fetch auth token from cookie
      const customer_id = useCookie('customer_id').value;

      // Create one draft order for all product items
      if (productItems.length > 0) {
        const productOrderData = {
          ...draftOrderBaseData,
          items: productItems, // Include only product items
          customer_id
        };

        await client.admin.draftOrders.create(productOrderData, {
          'x-medusa-access-token': `${medusaAdminToken}`
        });

        console.log('Product draft order created successfully!');
      }

      // Create separate draft orders for each maintenance item
      for (const maintenanceProductItem of maintenanceItems) {
        const { titles, ...maintenanceItem } = maintenanceProductItem;
        const maintenanceOrderData = {
          ...draftOrderBaseData,
          customer_id,
          items: [maintenanceItem], // Single maintenance item per draft order
          metadata: {
            locale: billingFormData.value.locale,
            titles
          }
        };

        await client.admin.draftOrders.create(maintenanceOrderData, {
          'x-medusa-access-token': `${medusaAdminToken}`
        });

        console.log(
          'Maintenance draft order created successfully for:',
          maintenanceItem
        );
      }

      localStorage.removeItem('cart_id');
      // Redirect to payment confirmation after creating all orders
      localeNavigateTo('/paymentConfirmation');
    } catch (error) {
      console.error('Error creating draft order:', error);
    }
  }

  return {
    countriesList,
    billingFormData,
    getCountriesList,
    updateBillingFormData,
    createDraftOrder
  };
});
