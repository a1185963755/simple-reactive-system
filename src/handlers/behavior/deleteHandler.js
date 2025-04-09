import { TriggerType } from "../../constants/index.js";
import trigger from "../../effect/trigger.js";

export default function deleteHandler(target, key) {
  const hadKey = target.hasOwnProperty(key);
  const result = Reflect.deleteProperty(target, key);
  //只有target有key并且删除成功才触发更新
  if (hadKey && result) {
    trigger(target, TriggerType.DELETE, key);
  }
  return result;
}
