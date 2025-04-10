import { TrackType } from "../constants/index.js";
import { activeEffect, targetMap } from "../core/effect.js";
import { ITERATE_KEY } from "../utils/index.js";

let shouldTrack = true;

export function pauseTracking() {
  shouldTrack = false;
}

export function resetTracking() {
  shouldTrack = true;
}

export default function track(target, type, key) {
  if (!shouldTrack || !activeEffect) {
    return;
  }

  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }

  if (type === TrackType.ITERATE) {
    key = ITERATE_KEY;
  }
  let typeMap = propMap.get(key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(key, typeMap);
  }

  // 最后一步，根据 type 值去找对应的 Set
  let depSet = typeMap.get(type);
  if (!depSet) {
    depSet = new Set();
    typeMap.set(type, depSet);
  }

  // 现在找到 set 集合了，就可以存储依赖了
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
    activeEffect.deps.push(depSet); // 将集合存储到 deps 数组里面
  }
}
