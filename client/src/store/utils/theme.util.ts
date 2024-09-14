import {
  DARK_CLASS,
  GRAYSCALE_CLASS,
  overrideThemeSettings,
  themeSettings,
  themeVars,
} from "@/config/theme.config";
import { skLocal } from "@/utils/storage";
import { theme as antdTheme, ConfigProviderProps } from "ant-design-vue";
import { getColorPalette } from "@sk/color-preset";
import { removeRgbPrefix, removeVarPrefix } from "@/utils/var";
import { getRgbOfColor } from "@/utils/color";
import { addHtmlClass, removeHtmlClass } from "@/utils";

export function initThemeSetting() {
  const isDev = import.meta.env.DEV;
  if (isDev) return themeSettings;

  const settings = skLocal.get("themeSettings") || themeSettings;
  const isOverride =
    skLocal.get("buildTimestamp") === __APP_INFO__.buildTimestamp;
  if (!isOverride) {
    Object.assign(settings, overrideThemeSettings);
    skLocal.set("buildTimestamp", __APP_INFO__.buildTimestamp);
  }

  return settings;
}

export function getAntdTheme(colors: App.Theme.ThemeColor, darkMode: boolean) {
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;
  const { primary, info, success, warning, error } = colors;
  const theme: ConfigProviderProps["theme"] = {
    token: {
      colorPrimary: primary,
      colorInfo: info,
      colorSuccess: success,
      colorWarning: warning,
      colorError: error,
    },
    algorithm: [darkMode ? darkAlgorithm : defaultAlgorithm],
    components: {
      Button: {
        controlHeightSM: 28,
      },
      Menu: {
        colorSubItemBg: "transparent",
      },
    },
  };

  return theme;
}

// 创建调色板颜色
function createThemePaletteColors(
  colors: App.Theme.ThemeColor,
  isRecommend: boolean
) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorKeys.forEach((key) => {
    const colorMap = getColorPalette(colors[key], isRecommend);
    colorPaletteVar[key] = colorMap.get(500)!;
    colorMap.forEach((hex, num) => {
      colorPaletteVar[`${key}-${num}`] = hex;
    });
  });

  return colorPaletteVar;
}

// 创建主题token
export function createThemeToken(
  colors: App.Theme.ThemeColor,
  isRecommend = false
) {
  const paletteColors = createThemePaletteColors(colors, isRecommend);

  const themeTokens: App.Theme.ThemeToken = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      container: "rgb(255, 255, 255)",
      layout: "rgb(247, 250, 252)",
      inverted: "rgb(0, 20, 40)",
      base_text: "rgb(31, 31, 31)",
    },
    boxShadow: {
      header: "0 1px 2px rgb(0, 21, 41, 0.08)",
      sider: "2px 0 8px 0 rgb(29, 35, 41, 0.05)",
      tab: "0 1px 2px rgb(0, 21, 41, 0.08)",
    },
  };

  const darkThemeTokens: App.Theme.ThemeToken = {
    colors: {
      ...themeTokens.colors,
      container: "rgb(28, 28, 28)",
      layout: "rgb(18, 18, 18)",
      base_text: "rgb(224, 224, 224)",
    },
    boxShadow: {
      ...themeTokens.boxShadow,
    },
  };

  return {
    themeTokens,
    darkThemeTokens,
  };
}

// 根据tokens获取css变量
function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = [];

  for (const [key, tokenVals] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenVal] of Object.entries(tokenVals)) {
      let cssVarsKey = removeVarPrefix(tokenVal);
      let cssVal = tokens[key][tokenKey];

      if (key === "colors") {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { r, g, b } = getRgbOfColor(cssVal);
        cssVal = `${r} ${g} ${b}`;
      }

      styles.push(`${cssVarsKey}: ${cssVal}`);
    }
  }

  return styles.join(";");
}

// 添加主题变量到html元素
export function addThemeVarsToHtml(
  tokens: App.Theme.BaseToken,
  darkTokens: App.Theme.BaseToken
) {
  const cssVar = getCssVarByTokens(tokens);
  const darkCssVar = getCssVarByTokens(darkTokens);

  const css = `
    html {
      ${cssVar}
    }
  `;

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVar}
    }
  `;

  const styleId = "theme-vars";

  const style =
    document.querySelector(`#${styleId}`) || document.createElement("style");

  style.id = styleId;

  style.textContent = css + darkCss;

  document.head.appendChild(style);
}

// 切换css为深色模式
export function toggleCssDarkMode(isDarkMode = false) {
  if (isDarkMode) {
    addHtmlClass(DARK_CLASS);
  } else {
    removeHtmlClass(DARK_CLASS);
  }
}

// 切换css为grayscale模式
export function toggleGrayscaleMode(isGrayscaleMode = false) {
  if (isGrayscaleMode) {
    addHtmlClass(GRAYSCALE_CLASS);
  } else {
    removeHtmlClass(GRAYSCALE_CLASS);
  }
}
