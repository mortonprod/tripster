export function getOffset (el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

export function getSize (el: HTMLElement) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}