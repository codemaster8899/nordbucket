import { defineStore } from 'pinia';

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref([
    {
      title: 'Scalable Infrastructure',
      content:
        'Our data center facility offers 120,000 sqm of available space and a capacity of 60 MW of power for businesses with varying needs. Our innovative modular construction approach allows for fast deployment, reducing your time to market and securing the space and resources you need today.',
      bg: 'card-1.jpeg'
    },
    {
      title: 'Efficient cooling systems',
      content:
        'Employing an advanced cooling infrastructure, our facility achieves an exceptionally low Power Usage Effectiveness (PUE). '
    },
    {
      title: 'Full lifecycle data center support',
      content:
        'Comprehensive data center support covers the entire lifecycle. Our guidance spans every step, from planning your cloud and/or high-performance computing (HPC) infrastructure to selecting the most scalable hardware. Additionally, we provide assistance with housing and ensure optimal operation for your server hardware.',
      bg: 'card-3.png'
    },
    {
      title: 'Low-cost renewable energy',
      content:
        "Norway's abundance of clean, renewable hydropower, which comes at Europe's lowest cost, enables us to power our data centers with 100% renewable energy, significantly reducing carbon footprint and allowing for cost-effective operations."
    },
    {
      title: 'Enhanced security and redundancy',
      content:
        'Implemented through multiple redundant data corrections and state-of-the-art security protocols, these measures maximum availability and efficient protection of your data. They guard againts electromagnetic pulses (EMPs) and solar storms, even when located deep underground.',
      bg: 'card-2.png'
    }
  ]);
  const loading = ref<boolean>(false);

  const getArticles = async () => {
    loading.value = true;
  };

  return {
    articles,
    getArticles
  };
});
