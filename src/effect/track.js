export default function track(target, type, key) {
  console.log("track", "原始对象:", target);

  console.log("track", `代理对象的属性：${key},操作类型：${type}，被拦截`);
}
