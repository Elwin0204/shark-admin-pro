declare namespace UnionKey {
  // 主题模式
  type ThemeMode = "light" | "dark" | "auto";
  // 布局模式
  type ThemeLayoutMode =
    | "vertical"
    | "horizontal"
    | "vertical-mix"
    | "horizontal-mix";
  // 切换页面动画
  type ThemePageAnimateMode =
    | "fade"
    | "fade-slide"
    | "fade-bottom"
    | "fade-scale"
    | "zoom-fade"
    | "zoom-out"
    | "none";
  // 登录模式
  type LoginMode =
    | "pwd-login"
    | "code-login"
    | "register"
    | "reset-pwd"
    | "bind-wechat";
  /**
   * 内容溢出时滚动模式
   * - Wrapper: the layout component's wrapper element has a scrollbar
   * - Content: the layout component's content element has a scrollbar
   * @default 'wrapper'
   */
  type LayoutScrollMode = "wrapper" | "content";
  type ThemeScrollMode = LayoutScrollMode;

  /**
   * tab样式
   * - Button: button style
   * - Chrome: chrome style
   * @default chrome
   */
  type PageTabMode = "button" | "chrome";
  type ThemeTabMode = PageTabMode;

  /** Unocss animate key */
  type UnoCssAnimateKey =
    | "pulse"
    | "bounce"
    | "spin"
    | "ping"
    | "bounce-alt"
    | "flash"
    | "pulse-alt"
    | "rubber-band"
    | "shake-x"
    | "shake-y"
    | "head-shake"
    | "swing"
    | "tada"
    | "wobble"
    | "jello"
    | "heart-beat"
    | "hinge"
    | "jack-in-the-box"
    | "light-speed-in-left"
    | "light-speed-in-right"
    | "light-speed-out-left"
    | "light-speed-out-right"
    | "flip"
    | "flip-in-x"
    | "flip-in-y"
    | "flip-out-x"
    | "flip-out-y"
    | "rotate-in"
    | "rotate-in-down-left"
    | "rotate-in-down-right"
    | "rotate-in-up-left"
    | "rotate-in-up-right"
    | "rotate-out"
    | "rotate-out-down-left"
    | "rotate-out-down-right"
    | "rotate-out-up-left"
    | "rotate-out-up-right"
    | "roll-in"
    | "roll-out"
    | "zoom-in"
    | "zoom-in-down"
    | "zoom-in-left"
    | "zoom-in-right"
    | "zoom-in-up"
    | "zoom-out"
    | "zoom-out-down"
    | "zoom-out-left"
    | "zoom-out-right"
    | "zoom-out-up"
    | "bounce-in"
    | "bounce-in-down"
    | "bounce-in-left"
    | "bounce-in-right"
    | "bounce-in-up"
    | "bounce-out"
    | "bounce-out-down"
    | "bounce-out-left"
    | "bounce-out-right"
    | "bounce-out-up"
    | "slide-in-down"
    | "slide-in-left"
    | "slide-in-right"
    | "slide-in-up"
    | "slide-out-down"
    | "slide-out-left"
    | "slide-out-right"
    | "slide-out-up"
    | "fade-in"
    | "fade-in-down"
    | "fade-in-down-big"
    | "fade-in-left"
    | "fade-in-left-big"
    | "fade-in-right"
    | "fade-in-right-big"
    | "fade-in-up"
    | "fade-in-up-big"
    | "fade-in-top-left"
    | "fade-in-top-right"
    | "fade-in-bottom-left"
    | "fade-in-bottom-right"
    | "fade-out"
    | "fade-out-down"
    | "fade-out-down-big"
    | "fade-out-left"
    | "fade-out-left-big"
    | "fade-out-right"
    | "fade-out-right-big"
    | "fade-out-up"
    | "fade-out-up-big"
    | "fade-out-top-left"
    | "fade-out-top-right"
    | "fade-out-bottom-left"
    | "fade-out-bottom-right"
    | "back-in-up"
    | "back-in-down"
    | "back-in-right"
    | "back-in-left"
    | "back-out-up"
    | "back-out-down"
    | "back-out-right"
    | "back-out-left";
}
