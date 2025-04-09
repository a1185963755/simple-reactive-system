import deleteHandler from "./behavior/deleteHandler.js";
import getHandler from "./behavior/getHandler.js";
import hasHandler from "./behavior/hasHandler.js";
import ownKeysHandler from "./behavior/ownKeysHandler.js";
import setHandler from "./behavior/setHandler.js";

export default {
  get: getHandler,
  has: hasHandler,
  ownKeys: ownKeysHandler,
  set: setHandler,
  deleteProperty: deleteHandler,
};
