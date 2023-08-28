import NodeCache from 'node-cache';

declare global {
  var cachedNodeCache: NodeCache;
}

let nodeCache: NodeCache;
if (process.env.NODE_ENV === "production") {
  nodeCache = new NodeCache({ stdTTL: 3600, checkperiod: 600, deleteOnExpire: true });
} else {
  if (!global.cachedNodeCache) {
    global.cachedNodeCache = new NodeCache({ stdTTL: 3600, checkperiod: 600, deleteOnExpire: true });
  }
  nodeCache = global.cachedNodeCache;
}

export default nodeCache;
