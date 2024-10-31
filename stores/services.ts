import { defineStore } from 'pinia';

export const useServicesStore = defineStore('services', () => {
  const loading = ref<boolean>(false);
  const services = ref([]);
  const techSpecs = ref([
    {
      spec: 'CPU, HPC, and Storage Server',
      options: [
        'Latest processors and storage solutions for the highest performance and reliability'
      ]
    },
    {
      spec: 'Redundant Data Connections and PUE Values',
      options: [
        'Multiple redundant data connections for maximum availability.',
        'PUE value of 1.15 with 2N-UPS and inline cooling.',
        'Guaranteed PUE value of under 1.10 for solutions without UPS backup and with DLC or immersion cooling.'
      ]
    },
    {
      spec: 'High Data Security and Availability',
      options: [
        'Requirements for an Information Security Management System (ISMS) fulfilled.',
        'Location with Uptime Tier III design certification.'
      ]
    },
    {
      spec: 'Clustering',
      options: [
        'State-of-the-art SPINE/LEAF architecture for efficient data processing.'
      ]
    },
    {
      spec: 'Quality Management',
      options: ['ISO 9001:2015 certified']
    },
    {
      spec: 'Energy Supply',
      options: [
        'The site is supplied by the national power grid with several nearby hydroelectric power plants.',
        '100% renewable energy, with minimal network losses'
      ]
    }
  ]);

  const getServices = async () => {
    loading.value = true;
  };

  return {
    services,
    techSpecs,
    getServices
  };
});
