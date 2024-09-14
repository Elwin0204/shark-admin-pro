import { StoreId } from "@/enums/StoreId.enum";
export const useUserStore = defineStore(StoreId.USER, () => {
  const userInfo = reactive({
    userId: "",
    userName: "",
    roles: [],
    buttons: [],
  });

  return {
    userInfo,
  };
});
