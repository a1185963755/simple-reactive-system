let shouldTrack = true;

export function pauseTracking() {
  shouldTrack = false;
}

export function resetTracking() {
  shouldTrack = true;
}

export default function track(target, type, key) {
  if (!shouldTrack) {
    return;
  }
  console.log("track", `代理对象的属性：${key},操作类型：${type}，被拦截`);
}
