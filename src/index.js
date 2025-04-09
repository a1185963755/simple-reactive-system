import reactive from "./core/reactive.js";

const obj = {
  a: 1,
  b: 2,
  c: {
    name: "张三",
    age: 18,
  },
};

const proxyObj = reactive(obj);

// for (let key in proxyObj) {
//   proxyObj[key];
// }
// console.log("d" in proxyObj);
// for (const key in proxyObj) {
//   console.log(key); // 先触发 ownKeys，再输出 "a", "b"
// }
// Object.keys(proxyObj).forEach((key) => {
//   console.log(key);
// });

// proxyObj.a = 1;
// proxyObj.d = "李四";

delete proxyObj.a;
