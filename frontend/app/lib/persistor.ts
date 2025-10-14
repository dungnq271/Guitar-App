import { useState, useEffect, useRef } from "react";

export class LocalStorageManager {
  _storage;
  constructor() {
    this._storage = window.sessionStorage;
  }
  get(key: string) {
    const value = this._storage.getItem(key);
    return typeof value === "string" ? value : null;
  }
  set(key: string, value: string) {
    this._storage.setItem(key, value);
  }
  remove(key: string) {
    this._storage.removeItem(key);
  }
}

export function usePersistor(
  key: string,
  initialData: string,
  driver: LocalStorageManager,
) {
  const [storedData, _setStoredData] = useState<string>(() => initialData);
  const _channel = useRef(new BroadcastChannel(key)).current;

  const _readValue = () => {
    const value = driver.get(key);
    return value ?? initialData;
  };

  const setValue = (data: string) => {
    driver.set(key, data);
    _setStoredData(data);
    _channel.postMessage({ message: key, data });
  };

  useEffect(() => {
    const value = _readValue();
    _setStoredData(value);
  }, []);

  useEffect(() => {
    function _listener(e: MessageEvent) {
      switch (e.data.message) {
        case "NEW_TAB":
          // console.log("send to new tab", _readValue());
          _channel.postMessage({ message: key, data: _readValue() });
          break;
        case key:
          // console.log("receive data:", e.data);
          _setStoredData(e.data.data);
          break;
      }
    }

    _channel.postMessage({ message: "NEW_TAB" });
    _channel.addEventListener("message", _listener);

    return () => {
      _channel.removeEventListener("message", _listener);
    };
  }, []);

  return [storedData, setValue];
}
