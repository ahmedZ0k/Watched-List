import { useState, useEffect } from "react";
export function useLocalStorageState(initialValue, key) {
  const [value, setValue] = useState(function () {
    const localStorageValue = localStorage[key];
    return localStorageValue ? JSON.parse(localStorageValue) : initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
