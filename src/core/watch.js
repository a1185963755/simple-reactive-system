import effect, { cleanup } from "./effect.js";

export default function watch(target, callback, options = {}) {
  const { getter } = normalize(target);
  let oldValue;
  let newValue;
  const job = () => {
    newValue = effctFn();
    callback(newValue, oldValue);
    oldValue = newValue;
  };
  const effctFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      if (options.flush === "post") {
        Promise.resolve().then(job);
      } else {
        job();
      }
    },
  });
  const { immediate } = options;
  if (immediate) {
    job();
  } else {
    oldValue = effctFn();
  }
  return () => {
    cleanup(effctFn);
  };
}

function normalize(target) {
  if (typeof getterOptions === "function") {
    return {
      getter: getterOptions,
    };
  }
  return {
    getter: () => traverse(target),
  };
}

// 工具方法，用于递归地遍历对象的所有属性，以便于在依赖收集时可以正确地收集到所有的依赖
// 比如：const obj = { a: { b: { c: 1 } } }，当我们访问 obj.a.b.c 时，我们需要递归地遍历 obj.a.b，以便于在依赖收集时可以正确地收集到所有的依赖
function traverse(value, seen = new Set()) {
  if (typeof value !== "object" || value === null || seen.has(value)) return value;
  seen.add(value);
  for (const key in value) {
    traverse(value[key], seen);
  }
  return value;
}
