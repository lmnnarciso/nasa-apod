import React from "react";

export default function useLocalStorageState(
    key: string,
    defaultValue: string | Function | number = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {},
  ) {
    const [state, setState] = React.useState(() => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })
  
    const prevKeyRef = React.useRef(key)
  
    React.useEffect(() => {
      const prevKey = prevKeyRef.current
      if (prevKey !== key) {
        window.localStorage.removeItem(prevKey)
      }
      prevKeyRef.current = key
      window.localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])
  
    return [state, setState]
  }