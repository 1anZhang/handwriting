function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function shallowEqual(obj1, obj2) {
  if (!isObject(obj2) || !isObject(obj2)) {
    return obj1 === obj2;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false
  }
  for (let i = 0; i < keys2.length; i++) {
    if (keys1[i] !== keys2[i]) {
      return false;
    }
  }
  return true;
}

function deepEqual(obj1, obj2) {
  if (!isObject(obj2) || !isObject(obj2)) {
    return obj1 === obj2;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false
  }
  for (let i = 0; i < keys2.length; i++) {
    if(isObject(keys1[i])) {
      return deepEqual(keys1[i], keys2[i])
    } else {
      if (keys1[i] !== keys2[i]) {
        return false;
      }
    }
  }
  return true;
}

const hero1 = {
  name: "Batman",
  address: {
    city: "Gotham",
  },
};
const hero2 = {
  name: "Batman",
  address: {
    city: "Gotham",
  },
};
let res = deepEqual(hero1, hero2); // => true