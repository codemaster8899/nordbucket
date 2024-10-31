<template>
  <div>
    <div v-html="processedContent"></div>
  </div>
</template>

<script setup>
import { marked } from 'marked';
import { ref } from 'vue';
import { getImage } from '~/helpers';
marked.setOptions({
  gfm: true,
  breaks: true,
  smartLists: true
});
const props = defineProps({
  text: String
});

const convertMarkdownToHtml = (markdown) => {
  return marked(markdown);
};

const processHtml = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img');
  images.forEach((img) => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('//')) {
      img.src = getImage(src);
    }
  });
  return doc.body.innerHTML;
};

const processedContent = ref(processHtml(convertMarkdownToHtml(props.text)));
</script>

<style scoped>
/* Apply default styles to headers */
::v-deep h1 {
  @apply text-[36px] font-extrabold mb-6;
}

::v-deep h2 {
  @apply text-[30px] font-bold mb-5;
}

::v-deep h3 {
  @apply text-[24px] font-semibold mb-4;
}

::v-deep h4 {
  @apply text-[20px] font-medium mb-3;
}

::v-deep h5 {
  @apply text-[18px] font-medium mb-2;
}

::v-deep h6 {
  @apply text-[16px] font-normal mb-1;
}

/* Apply default styles to paragraphs */
::v-deep p {
  @apply text-base leading-relaxed mb-4;
}

/* Apply default styles to links */
::v-deep a {
  @apply text-blue-500 hover:text-blue-700;
}

/* Apply default styles to lists */
::v-deep ul {
  @apply list-disc pl-5 mb-4;
}

::v-deep ol {
  @apply list-decimal pl-5 mb-4;
}

::v-deep li {
  @apply mb-2;
}

/* Apply default styles to blockquotes */
::v-deep blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic mb-4;
}

/* Apply default styles to code blocks */
::v-deep pre {
  @apply bg-gray-200 p-4 rounded-md overflow-x-auto mb-4;
}

::v-deep code {
  @apply bg-gray-100 p-1 rounded-sm;
}
</style>
