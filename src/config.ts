import { DEFAULT_CONFIG } from "./services/DefaultConfig";

const defaultHostUrl = process.env.DEFAULT_HOSTURL || "https://raw.githubusercontent.com/shadel/comfyui-parts/refs/heads/master";
function addPrefixToStringValuesProxy<T extends Record<string, any>>(obj: T, prefix: string): T {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      if (typeof value === 'string') {
        // Add prefix to string values dynamically
        return `${prefix}/${value}`;
      } else if (typeof value === 'object' && value !== null) {
        // Recursively apply Proxy to nested objects
        return addPrefixToStringValuesProxy(value, prefix);
      }

      // Return the value as-is for non-string or null/undefined types
      return value;
    }
  });
}

export function getDefaultConfig() {
  return DEFAULT_CONFIG;
}
export function getRemoteConfigWithHostUrl(hostUrl: string) {
  return addPrefixToStringValuesProxy(getDefaultConfig(), hostUrl);
}
export function getDefaultRemoteConfig() {
  return getRemoteConfigWithHostUrl(defaultHostUrl);
}
