import { createColorPaletteVars } from "@/utils/var";

export const DARK_CLASS = "dark";
export const GRAYSCALE_CLASS = "grayscale";

// 主题变量
export const themeVars: App.Theme.ThemeToken = {
  colors: {
    ...createColorPaletteVars(),
    nprogress: "rgb(var(--nprogress-color))",
    container: "rgb(var(--container-bg-color))",
    layout: "rgb(var(--layout-bg-color))",
    inverted: "rgb(var(--inverted-bg-color))",
    base_text: "rgb(var(--base-text-color))",
  },
  boxShadow: {
    header: "var(--header-box-shadow)",
    sider: "var(--sider-box-shadow)",
    tab: "var(--tab-box-shadow)",
  },
};

// 默认主题配置
export const themeSettings: App.Theme.ThemeSetting = {
  themeMode: "light",
  grayscale: false,
  recommendColor: false,
  themeColor: "#646cff",
  otherColor: {
    info: "#2080f0",
    success: "#52c41a",
    warning: "#faad14",
    error: "#f5222d",
  },
  isInfoFollowPrimary: true,
  layout: {
    mode: "vertical",
    scrollMode: "content",
  },
  page: {
    animate: true,
    animateMode: "fade-slide",
  },
  header: {
    height: 56,
    breadcrumb: {
      visible: true,
      showIcon: true,
    },
  },
  tab: {
    visible: true,
    cache: true,
    height: 44,
    mode: "chrome",
  },
  fixedHeaderAndTab: true,
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64,
    mixWidth: 90,
    mixCollapsedWidth: 64,
    mixChildMenuWidth: 200,
  },
  footer: {
    visible: true,
    fixed: false,
    height: 48,
    right: true,
  },
};

// 如果发布新版本，使用overrideThemeSettings覆盖当前主题设置
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {};
