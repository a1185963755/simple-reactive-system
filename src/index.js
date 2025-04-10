import effect from "./core/effect.js";
import reactive from "./core/reactive.js";

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

effect(() => {
  console.log(proxyObj.a);
});

proxyObj.a = 2;
