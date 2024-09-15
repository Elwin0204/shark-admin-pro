import type { PiniaPluginContext } from "pinia";
import { cloneDeep } from "lodash-es";
import { StoreId } from "@/enums/StoreId.enum";
import { valuesFromConstEnum } from "@/utils";

// 重置store插件(store使用setup语法时)
export function createResetPlugin(context: PiniaPluginContext) {
  const setupSyntaxIds = valuesFromConstEnum(StoreId) as string[];

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;

    const defaultStore = cloneDeep($state);

    context.store.$reset = () => {
      context.store.$patch(defaultStore);
    };
  }
}
