import { StoreId } from "@/enums/StoreId.enum";
export const useAppStore = defineStore(StoreId.APP, () => {
  const lang = ref();
  return {
    lang,
  };
});
