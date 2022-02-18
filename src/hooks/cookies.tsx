import { useState, useEffect } from "react";

export function getCookie(cname: string) {
  var cookieArray: string[] = document.cookie.split(";");
  var cookieObj: any = {};
  for (var i = 0; i < cookieArray.length; i++) {
    let splited = cookieArray[i].split("=");
    let name = splited[0];
    try {
      let value = splited[1].replace(";", "");
      cookieObj[name] = value;
    } catch (error) {
      // no active cookie name :cname
    }
  }
  if (!cookieObj[cname]) {
    return "";
  } else {
    return cookieObj[cname];
  }
}
export function setCookie(cname: string, _value: string) {
  var cookieArray: string[] = document.cookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    let splited = cookieArray[i].split("=");
    let name = splited[0];
    if (name.includes(" ")) {
      name = name.replace(" ", "");
    }
    let value = splited[1];
    if (name === cname) {
      if (value === _value) {
        return;
      }
      cookieArray[i] = `${name}=${_value}`;
    }
  }
  var newCookieString = "";
  for (var i = 0; i < cookieArray.length; i++) {
    newCookieString += cookieArray[i];
  }
  document.cookie = newCookieString;
}

export function useCookie(cname: string): [string, (arg0: string) => void] {
  const [browserCookie, setBrowserCookie] = useState(document.cookie);

  useEffect(() => {
    setBrowserCookie(document.cookie);
    console.log(document.cookie);
  }, [document.cookie]);

  const value = get();

  function get() {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(browserCookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function set(_value: string) {
    const exdays = 30;
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + _value + ";" + expires + ";path=/";
  }
  return [value, set];
}
