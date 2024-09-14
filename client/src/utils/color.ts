import { colord, extend } from "colord";

export function getRgbOfColor(color: string) {
  return colord(color).toRgb();
}
