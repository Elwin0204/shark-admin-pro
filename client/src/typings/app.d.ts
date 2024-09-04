declare namespace App {
  namespace Theme {
    interface ThemeConfig {
      themeColor: string;
    }

    type ColorPaletteNumber = import("@sk/color-preset").ColorPaletteNumber;

    type ThemeToken = {
      colors: ThemeTokenColor;
      boxShadow: {
        header: string;
        sider: string;
        tab: string;
      };
    };

    interface ThemeSetting {
      themeScheme: UnionKey.ThemeScheme;
      recommendColor: boolean;
      themeColor: string;
      grayscale: boolean;
      otherColor: OtherColor;
      /** Whether info color is followed by the primary color */
      isInfoFollowPrimary: boolean;
      /** Layout */
      layout: {
        mode: UnionKey.ThemeLayoutMode;
        scrollMode: UnionKey.ThemeScrollMode;
      };
      /** Page */
      page: {
        animate: boolean;
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      /** Header */
      header: {
        height: number;
        breadcrumb: {
          visible: boolean;
          showIcon: boolean;
        };
      };
      /** Tab */
      tab: {
        visible: boolean;
        cache: boolean;
        height: number;
        mode: UnionKey.ThemeTabMode;
      };
      /** Fixed header and tab */
      fixedHeaderAndTab: boolean;
      /** Sider */
      sider: {
        inverted: boolean;
        width: number;
        collapsedWidth: number;
        mixWidth: number;
        mixCollapsedWidth: number;
        mixChildMenuWidth: number;
      };
      /** Footer */
      footer: {
        visible: boolean;
        fixed: boolean;
        height: number;
        right: boolean;
      };
    }

    interface OtherColor {
      info: string;
      success: string;
      warning: string;
      error: string;
    }

    interface ThemeColor extends OtherColor {
      primary: string;
    }

    type ThemeColorKey = keyof ThemeColor;

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    };

    type BaseToken = Record<string, Record<string, string>>;

    interface ThemeTokenColor extends ThemePaletteColor {
      nprogress: string;
      container: string;
      layout: string;
      inverted: string;
      base_text: string;
      [key: string]: string;
    }
  }

  namespace I18n {}

  namespace Api {
    interface NetConfig {
      baseURL: string;
      requestTimeout: number;
      contentType: string;
      requestIdKey: string;
    }
  }
}
