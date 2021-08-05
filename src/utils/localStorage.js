/**
 * 存储localStorage
 */
const setLocalStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
const getLocalStorage = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
const removeLocalStorage = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

const localStorage = {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
};

export default localStorage;