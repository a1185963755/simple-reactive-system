import { TrackType } from "../../constants/index.js";
import track from "../../effect/track.js";

export default function ownKeysHandler(target) {
  //依赖收集
  track(target, TrackType.ITERATE);
  const result = Reflect.ownKeys(target);
  return result;
}
