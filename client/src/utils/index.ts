// 添加class到html标签
export function addHtmlClass(className: string) {
  document.documentElement.classList.add(className);
}

// 从html标签移除class
export function removeHtmlClass(className: string) {
  document.documentElement.classList.remove(className);
}

// 将 const 枚举转换为包含其value的数组
export function valuesFromConstEnum<T extends object>(
  enumType: T
): Array<T[keyof T]> {
  return Object.keys(enumType).map((key) => enumType[key as keyof T]);
}

// 将 const 枚举转换为包含其key的数组
export function keysFromConstEnum<T extends object>(enumType: T): (keyof T)[] {
  return Object.keys(enumType) as (keyof T)[];
}
