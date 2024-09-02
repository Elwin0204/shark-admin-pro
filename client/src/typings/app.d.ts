declare namespace App {
  namespace Theme {
    interface ThemeConfig {
      themeColor: string;
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
