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
  const oldLen = Array.isArray(target) ? target.length : undefined;
  const result = Reflect.set(target, key, value);
  //只有有值发生改变才触发更新
  if (hasChanged(value, oldValue)) {
    trigger(target, type, key);
    // 需要判断 length 是否有变化，如果有变化，需要对 length 进行派发更新
    if (Array.isArray(target) && oldLen !== target.length) {
      //隐式改变length
      if (key !== "length") {
        trigger(target, TriggerType.SET, "length");
      } else {
        for (let i = target.length; i < oldLen; i++) {
          trigger(target, TriggerType.DELETE, i);
        }
      }
    }
  }
  return result;
}
