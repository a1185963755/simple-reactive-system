import handlers from "../handlers/index.js";
import { isObject } from "../utils/index.js";

const proxyMap = new WeakMap();
export default function reactive(target) {
  if (!isObject(target)) return target;
  //判断是否已经被代理过
  if (proxyMap.has(target)) return proxyMap.get(target);
  const result = new Proxy(target, handlers);
  proxyMap.set(target, result);
  return result;
}
