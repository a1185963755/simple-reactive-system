import { TrackType } from "../../constants/index.js";
import reactive from "../../core/reactive.js";
import track from "../../effect/track.js";
import { isObject } from "../../utils/index.js";

export default function getHandler(target, key, receiver) {
  //依赖收集
  track(target, TrackType.GET, key);
  //使用Reflect.get获取对象的属性值
  const result = Reflect.get(target, key, receiver);
  //如果属性值是对象，则递归使用reactive进行代理
  if (isObject(result)) {
    return reactive(result);
  }
  return result;
}
