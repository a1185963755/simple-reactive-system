import computed from "./core/computed.js";
import effect from "./core/effect.js";
import reactive from "./core/reactive.js";
import watch from "./core/watch.js";

const obj = {
  a: 1,
  b: 2,
  c: [
    {
      name: "张三",
      age: 18,
    },
  ],
};

const proxyObj = reactive(obj);

// effect(() => {
//   console.log(proxyObj.b);
// });

// proxyObj.b = 2;

const sum = computed(() => {
  console.log("执行了 sum");

  return proxyObj.a + proxyObj.b;
});

watch(
  sum.value,
  (newValue, oldValue) => {
    console.log("sum 变化了");
    console.log(newValue, oldValue);
  },
  {
    immediate: true,
  }
);
proxyObj.a = 5;
