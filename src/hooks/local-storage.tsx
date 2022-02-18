import { useState } from "react";

function init(item: string, defaultValue: string) {
  if (!localStorage.getItem(item)) {
    localStorage.setItem(item, defaultValue);
    return defaultValue;
  } else {
    return localStorage.getItem(item);
  }
}

export function useLocalStorage(
  item: string,
  value: string
): [string | null, (arg0: string) => void] {
  const [v, sv] = useState(init(item, value));
  function setv(nv: string) {
    localStorage.setItem(item, nv);
    sv(nv);
  }
  return [v, setv];
}
