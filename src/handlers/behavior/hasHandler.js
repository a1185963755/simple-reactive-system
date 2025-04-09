import { TrackType } from "../../constants/index.js";
import track from "../../effect/track.js";

export default function hasHandler(target, key) {
  //依赖收集
  track(target, TrackType.HAS, key);
  const result = Reflect.has(target, key);
  return result;
}
