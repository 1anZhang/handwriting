Array.prototype.myreduce = function (fn, initialValue) {
  if (!Array.isArray(this)) {
    throw new TypeError('not a array');
  }

  const sourceArray = this;
  // if (sourceArray.length === 0) {
  //   throw new TypeError('empty array');
  // }

  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`);
  }

  // 首先reduce是有的fn是接收4个参数的，accumulator，currentValue, currentIndex, arr

  let accumulator, currentValue, currentIndex;
  if (initialValue) {
    accumulator = initialValue;
    currentIndex = 0;
  } else {
    for (let i = 0; i < sourceArray.length; i++) {
      if (!sourceArray.hasOwnProperty(i)) {
        continue;
      } else {
        currentIndex = i;
        accumulator = arr[i];
        break;
      }
    }
  }

  for (let i = 0; i < sourceArray.length; i++) {
    if (sourceArray.hasOwnProperty(i)) {
      currentValue = sourceArray[i];
      accumulator = fn(accumulator, currentValue, currentIndex, sourceArray)
    }
  }

  return accumulator;
};

const rReduce = ['1', null, undefined, , 3, 4].reduce((a, b) => a + b, 3);
const mReduce = ['1', null, undefined, , 3, 4].myreduce((a, b) => a + b, 3);

console.log(rReduce); // 31nullundefined34
console.log(mReduce); // 31nullundefined34

Array.prototype.myMap = function (callback, context) {
  if (this === null) {
    throw new TypeError('Array.prototype.reduce' + 'called on null or undefined');
  }

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  let arr = [...this];
  let _len = arr.length;
  let aMap = [];

  for (let i = 0; i < _len; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue;
    }
    if (context) {
      aMap[i] = callback.call(context, arr[i], i, this);
    } else {
      aMap[i] = callback(arr[i], i, this);
    }
  }
  return aMap;
};

Array.prototype.selfFilter = function (callback, context) {
  if (this === null) {
    throw new TypeError('Array.prototype.filter' + 'called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  let arr = [...this];
  let _len = arr.length;
  let result = [];
  for (let i = 0; i < _len; i++) {
    if ((!arr.hasOwnProperty(i))) {
      continue;
    }
    if (context) {
      callback.call(context, arr[i], i, this) && result.push(arr[i]);
    } else {
      callback(arr[i], i, this) && result.push(arr[i]);
    }
  }
  return result;
};
