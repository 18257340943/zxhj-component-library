
declare function setLocalStorage(key: string, value: string): void;

declare function getLocalStorage(key: string): string;

declare function removeLocalStorage(key: string): void;


interface LocalStorage {
  setLocalStorage: typeof setLocalStorage,
  getLocalStorage: typeof getLocalStorage,
  removeLocalStorage: typeof removeLocalStorage
}


declare const localStorage: LocalStorage;

export default localStorage;