export default function trigger(target, type, key) {
  console.log("trigger", `代理对象的属性：${key},操作类型：${type}，被拦截`);
}
