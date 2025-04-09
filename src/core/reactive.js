import handlers from "../handlers/index.js";

export default function reactive(target) {
  return new Proxy(target, handlers);
}
