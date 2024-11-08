export function getLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || 'null');
}

export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}
