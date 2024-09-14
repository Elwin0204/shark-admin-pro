export function createColorPaletteVars() {
  const colors: App.Theme.ThemeColorKey[] = [
    "primary",
    "info",
    "success",
    "warning",
    "error",
  ];
  const colorPaletteNumbers: App.Theme.ColorPaletteNumber[] = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ];

  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colors.forEach((color) => {
    colorPaletteVar[color] = `rgb(var(--${color}-color))`;
    colorPaletteNumbers.forEach((number) => {
      colorPaletteVar[`${color}-${number}`] =
        `rgb(var(--${color}-${number}-color))`;
    });
  });

  return colorPaletteVar;
}

export function removeVarPrefix(value: string) {
  return value.replace("var(", "").replace(")", "");
}

export function removeRgbPrefix(value: string) {
  return value.replace("rgb(", "").replace(")", "");
}
