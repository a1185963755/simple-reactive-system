import { TrackType, TriggerType } from "../constants/index.js";
import track from "../effect/track.js";
import trigger from "../effect/trigger.js";
import effect from "./effect.js";

function normalize(getterOptions) {
  if (typeof getterOptions === "function") {
    return {
      getter: getterOptions,
      setter: () => {},
    };
  }
  const { get, set } = getterOptions;
  return {
    getter: get,
    setter: set,
  };
}

export default function computed(getterOptions) {
  const { getter, setter } = normalize(getterOptions);
  let dirty = true;
  let value = undefined;
  const effctFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      trigger(obj, TriggerType.SET, "value");
    },
  });
  const obj = {
    get value() {
      track(obj, TrackType.GET, "value");
      if (dirty) {
        value = effctFn();
        dirty = false;
      }
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };
  return obj;
}
