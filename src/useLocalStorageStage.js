import { useState, useEffect } from "react";

export function useLocalStorageState(initialValue, key) {
  const [value, setValue] = useState(function () {
    let storedValue = JSON.parse(localStorage.getItem(key));

    return storedValue ? JSON.parse(localStorage.getItem(key)) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
