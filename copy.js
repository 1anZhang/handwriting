function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

function shallowCopy(obj) {
  if (!isObject(obj)) {
    return obj
  }
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj;
}

function deepCopy(obj) {
  if (!isObject(obj)) {
    return obj
  }
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
    }
  }
  return newObj;
}

let cache = new Map();

function deepCopyWithCircle(obj) {
  if (!isObject(obj)) {
    return obj
  }
  if (cache.has(obj)) {
    return cache.get(obj)
  } else {
    let newObj = Array.isArray(obj) ? [] : {};
    cache.set(obj, newObj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          newObj[key] = deepCopyWithCircle(obj[key]);
      }
    }
    return newObj;
  }
}

let obj1 = {
};
let obj2 = {
  b: obj1
};
obj1.a = obj2;

let d = deepCopyWithCircle(obj1);

