import { StoreId } from "@/enums/StoreId.enum";
import {
  addThemeVarsToHtml,
  createThemeToken,
  getAntdTheme,
  initThemeSetting,
  toggleCssDarkMode,
  toggleGrayscaleMode,
} from "../utils/theme.util";
import { getPaletteColorByNumber } from "packages/color-preset/src";
import { skLocal } from "@/utils/storage";
export const useThemeStore = defineStore(StoreId.THEME, () => {
  const scope = effectScope();
  const appTheme = usePreferredColorScheme();

  const themeSettings = ref<App.Theme.ThemeSetting>(initThemeSetting());

  // 主题颜色
  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = themeSettings.value;
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info,
    };

    return colors;
  });

  // 深色模式
  const darkMode = computed(() => {
    if (themeSettings.value.themeMode === "auto") {
      return appTheme.value === "dark";
    }
    return themeSettings.value.themeMode === "dark";
  });

  // 灰色模式
  const grayscaleMode = computed(() => themeSettings.value.grayscale);

  // antd主题
  const antdTheme = computed(() =>
    getAntdTheme(themeColors.value, darkMode.value)
  );

  // 配置副本
  const themeSettingsCopy = computed(() => JSON.stringify(themeSettings.value));

  // 设置主题模式
  function setThemeMode(themeMode: UnionKey.ThemeMode) {
    themeSettings.value.themeMode = themeMode;
  }

  // 设置grayscale
  function setGrayscale(isGrayscale: boolean) {
    themeSettings.value.grayscale = isGrayscale;
  }

  // 切换主题模式
  function toggleThemeMode() {
    const themeModeList: UnionKey.ThemeMode[] = ["light", "dark", "auto"];
    const idx = themeModeList.findIndex(
      (item) => item === themeSettings.value.themeMode
    );
    const idxNext = idx === themeModeList.length - 1 ? 0 : idx + 1;
    const themeModeNext = themeModeList[idxNext];
    setThemeMode(themeModeNext);
  }

  // 设置主题布局
  function setThemeLayout(mode: UnionKey.ThemeLayoutMode) {
    themeSettings.value.layout.mode = mode;
  }

  // 更新主题配色
  function updateThemeColors(key: App.Theme.ThemeColorKey, color: string) {
    let colorVal = color;
    if (themeSettings.value.recommendColor) {
      colorVal = getPaletteColorByNumber(color, 500, true);
    }

    if (key === "primary") {
      themeSettings.value.themeColor = colorVal;
    } else {
      themeSettings.value.otherColor[key] = colorVal;
    }
  }

  // 设置主题变量到html元素
  function setThemeVarsToHtml() {
    const { themeTokens, darkThemeTokens } = createThemeToken(
      themeColors.value
    );
    addThemeVarsToHtml(themeTokens, darkThemeTokens);
  }

  // 缓存主题配置
  function cacheThemeSettings() {
    const isDev = import.meta.env.DEV;
    if (isDev) return;
    skLocal.set("themeSettings", themeSettings.value);
  }

  // 重置store
  function resetStore() {
    const themeStore = useThemeStore();
    themeStore.$reset();
  }

  // 页面关闭或者刷新时缓存主题配置
  useEventListener(window, "beforeunload", () => {
    cacheThemeSettings();
  });

  // 监听store
  scope.run(() => {
    watch(
      darkMode,
      (val) => {
        toggleCssDarkMode();
      },
      { immediate: true }
    );

    watch(
      grayscaleMode,
      (val) => {
        toggleGrayscaleMode(val);
      },
      { immediate: true }
    );

    // 主题颜色改变, 更新html元素css变量和缓存主题颜色
    watch(themeColors, (val) => {
      setThemeVarsToHtml();
      skLocal.set("themeColor", val.primary);
    });
  });

  onScopeDispose(() => {
    scope.stop();
  });
  return {
    ...toRefs(themeSettings.value),
    darkMode,
    themeColors,
    antdTheme,
    themeSettingsCopy,
    setGrayscale,
    toggleThemeMode,
    setThemeMode,
    updateThemeColors,
    setThemeLayout,
    resetStore,
  };
});
