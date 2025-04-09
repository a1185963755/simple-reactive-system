export default function trigger(target, type, key) {
  console.log("trigger", "原始对象:", target);

  console.log("trigger", `代理对象的属性：${key},操作类型：${type}，被拦截`);
}
