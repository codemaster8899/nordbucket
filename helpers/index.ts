export const currencyConverter = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
};

export const getImage = (url: string) => {
  const runtimeConfig = useRuntimeConfig();
  const strapiURL = runtimeConfig.public.strapiURL;

  const imgUrl = `${strapiURL}${url}`;
  return imgUrl;
};

export const formattedDate = (date: string) => {
  const createdDate = new Date(date);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedDate = formatter.format(createdDate);
  return formattedDate;
};

export const downloadFile = async (filename: string, url: string) => {
  const runtimeConfig = useRuntimeConfig();
  const strapiURL = runtimeConfig.public.strapiURL;
  const fileUrl = strapiURL + url;
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};
