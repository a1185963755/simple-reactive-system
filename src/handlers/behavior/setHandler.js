import { TriggerType } from "../../constants/index.js";
import trigger from "../../effect/trigger.js";
import { hasChanged } from "../../utils/index.js";

export default function setHandler(target, key, value) {
  //这里要判断类型是ADD 还是SET
  let type = TriggerType.ADD;
  if (target.hasOwnProperty(key)) {
    type = TriggerType.SET;
  }
  const oldValue = target[key];
  const result = Reflect.set(target, key, value);
  //只有有值发生改变才触发更新
  if (hasChanged(value, oldValue)) {
    trigger(target, type, key);
  }
  return result;
}
