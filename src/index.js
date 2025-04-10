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
const arr = [1, obj, 3];

const proxyArr = reactive(arr);
// proxyArr[0];
// proxyArr.length;
// for (let key in proxyArr) {
//   proxyArr[key];
// }
// console.log(proxyArr.includes(1));
// console.log(proxyArr.indexOf(1));
// console.log(proxyArr.lastIndexOf(1));

// console.log(proxyArr.includes(obj));
// console.log(proxyArr.indexOf(obj));
// console.log(proxyArr.lastIndexOf(obj));
proxyArr.push(4);
// proxyArr[4] = 5;
// proxyArr.length = 2;

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

// delete proxyObj.a;
// proxyObj.c;
