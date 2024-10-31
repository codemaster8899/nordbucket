import { defineStore } from 'pinia';

export const useNavigateStore = defineStore('navigates', () => {
  const headerMenuItems = [
    {
      id: 0,
      name: 'home',
      url: '/'
    },
    {
      id: 1,
      name: 'company',
      url: '/company'
    },
    {
      id: 2,
      name: 'services',
      url: '/services'
    },
    {
      id: 3,
      name: 'hardware',
      url: '/hardware'
    },
    {
      id: 6,
      name: 'products',
      url: '/ecommerce'
    },
    {
      id: 4,
      name: 'solutions',
      url: '/solutions'
    },
    {
      id: 5,
      name: 'sustainability',
      url: '/sustainability'
    }
  ];
  const footerMenuItems = [
    {
      id: 0,
      name: 'about-us',
      url: '/company'
    },
    {
      id: 1,
      name: 'services',
      url: '/services'
    },
    {
      id: 3,
      name: 'hardware',
      url: '/hardware'
    },
    {
      id: 4,
      name: 'solutions',
      url: '/solutions'
    },
    {
      id: 5,
      name: 'sustainability',
      url: '/sustainability'
    }
  ];
  const footerInfoItems = [
    {
      id: 0,
      name: 'contact-us',
      url: '/contact'
    },
    {
      id: 1,
      name: 'faq',
      url: '/faq'
    },
    {
      id: 3,
      name: 'privacy-policy',
      url: '/privacyPolicy'
    },
    {
      id: 4,
      name: 'blog',
      url: '/blog'
    },
    {
      id: 5,
      name: 'imprint',
      url: '/imprint'
    }
  ];

  return {
    headerMenuItems,
    footerMenuItems,
    footerInfoItems
  };
});
