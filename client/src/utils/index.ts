export function addHtmlClass(className: string) {
  document.documentElement.classList.add(className);
}

export function removeHtmlClass(className: string) {
  document.documentElement.classList.remove(className);
}
