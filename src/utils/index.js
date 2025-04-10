export function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

export function hasChanged(val, newValue) {
  return !Object.is(val, newValue);
}

export const RAW = Symbol("raw");
