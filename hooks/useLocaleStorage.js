import { useState } from "react";

const useLocaleStorage = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  });
  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
    }
  };
  const remove = () => {
    try {
      setStoredValue(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
    }
  };
  return [ storedValue, setValue, remove ];
}

export default useLocaleStorage;