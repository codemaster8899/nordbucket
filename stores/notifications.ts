import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", () => {
  const showNotification = ref<boolean>(false);
  const title = ref<string>("Successfully saved!");
  const link = ref<string>("");

  const hanldeNotification = (
    show: boolean,
    titleValue: string = "Successfully saved!",
    linkValue: string = ""
  ) => {
    showNotification.value = show;
    title.value = titleValue;
    link.value = linkValue;
  };

  return {
    showNotification,
    title,
    link,

    hanldeNotification
  };
});
