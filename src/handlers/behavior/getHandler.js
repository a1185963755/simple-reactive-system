import { TrackType } from "../../constants/index.js";
import reactive from "../../core/reactive.js";
import track, { pauseTracking, resetTracking } from "../../effect/track.js";
import { isObject, RAW } from "../../utils/index.js";

const arrayInstrumentations = {};
["includes", "indexOf", "lastIndexOf"].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    //先从代理对象里面找
    const res = Array.prototype[key].apply(this, args);
    if (res < 0 || res === false) {
      //找不到就从原始数组找
      return Array.prototype[key].apply(this[RAW], args);
    }
    return res;
  };
});

["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    pauseTracking();
    //先对数组进行操作
    const res = Array.prototype[key].apply(this, args);
    resetTracking();
    return res;
  };
});

export default function getHandler(target, key, receiver) {
  //因为修改了数组的原型方法，在从原始数组找值时会对RAW进行访问，从而触发gethandler
  if (key === RAW) {
    return target;
  }
  //依赖收集
  track(target, TrackType.GET, key);
  if (arrayInstrumentations.hasOwnProperty(key) && Array.isArray(target)) {
    return arrayInstrumentations[key];
  }
  //使用Reflect.get获取对象的属性值
  const result = Reflect.get(target, key, receiver);
  //如果属性值是对象，则递归使用reactive进行代理
  if (isObject(result)) {
    return reactive(result);
  }
  return result;
}
