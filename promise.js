// 接下来就是最重要的实现Promise了，首先，Promise有三种状态。
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

// 然后就是最重要的构造函数了，万物之始，因为Promise已经被占用了，我们给他起个别的名字吧，
// 就叫Lie，简洁，方便，还能表达意思，毕竟，男人的嘴，骗人的鬼，写的代码也都是骗人的

/**
 *
 * @param {*} promise2 then函数new出来的promise
 * @param {*} x 传入代码执行后的结果，可能是一个新的promise
 * @param {*} resolve promise2中的resolve函数
 * @param {*} reject promise2中的reject函数
 */
const resolvePromise = (promise2, x, resolve, reject) => {
  // 说实话这里我没看懂，不太确定什么时候promise2可以等于x
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  // Promise只能调用一次，这里也没理解
  let called;
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果x是个普通值就直接返回 resolve 作为结果
    resolve(x);
  }
};

class Lie {
  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    //解决onFulFilled，onRejected没有传值的问题
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2 = new Lie((resolve, reject) => {
      if (this.status === FULFILLED) {
        //因为then的执行一定是在Event Loop一次循环后的，所以需要用settimeout模拟一下。
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  // finally其实就是再调用一下then，然后不管这个then是resolve的，还是reject的，都去执行这个回调callback
  finally(callback) {
    return this.then(
      (v) => {
        return Lie.resolve(callback()).then(() => v);
      },
      (r) => {
        return Lie.resolve(callback()).then(() => {
          throw r;
        });
      }
    );
  }

  //catch其实就是then的一个语法糖
  catch(errCallback) {
    return this.then(null, errCallback);
  }

  static resolve(value) {
    return new Lie((resolve) => resolve(value));
  }

  static reject(value) {
    return new Lie((_, reject) => reject(value));
  }
}

const promise = new Lie((resolve, reject) => {
  // reject('失败');
  resolve('yes');
})
  .then((data) => {
    console.log('wwww1', data);
    return Lie.resolve('成功');
  })
  .then((data) => {
    console.log('wwww2', data);
    return '成功2';
  })
  .then(
    (data) => {
      console.log('wwww3', data);
    },
    (err) => {
      console.log('err', err);
    }
  );

/**
 * 最简单的，先实现Promise的finally方法，因为小程序中的Promise是没有这个方法的，
 * 所以我们可以自己实现这样一个polyfill。
 * 因为Promise已经实现了，所以我们使用Lie来替代。
 */

/**
 * 实现Promise的all方法
 * 查阅MDN的API，我们知道，all方法接收一个iterable的参数，我们常用的就是数组以及Set，
 * 返回值同样是一个Promise。
 * 当有任意一个子promise在pending状态时，pending，当所有promise都resolve后resolve，resolve的顺序要按照传入的顺序
 * 当任意一个子promise reject时，reject第一个。
 * Promise.all([promise1, promise2, promise3]).then((values) => {
 *   console.log(values);
 * });
 */
Lie.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let resolvedCounter = 0;
    let promiseNum = promises.length;
    let resolvedValues = new Array(promiseNum);
    for (let i = 0; i < promiseNum; i++) {
      // 因为传入的可能不是Promise，需要用Promise的resolve包一层，同时要保证传入的顺序。
      Promise.resolve(promises[i])
        .then(function (value) {
          // 记录resolve的次数，全部resolve时return resolve
          resolvedCounter++;
          resolvedValues[i] = value;
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues);
          }
        })
        .catch(function (reason) {
          // 遇到的第一个reject，reject掉
          return reject(reason);
        });
    }
  });
};

// MDN上的测试用例
// this will be counted as if the iterable passed is empty, so it gets fulfilled
// var p = Lie.all([1, 2, 3]);
// // this will be counted as if the iterable passed contains only the resolved promise with value "444", so it gets fulfilled
// var p2 = Lie.all([1, 2, 3, Promise.resolve(444)]);
// // this will be counted as if the iterable passed contains only the rejected promise with value "555", so it gets rejected
// var p3 = Lie.all([1, 2, 3, Promise.reject(555)]);

// // using setTimeout we can execute code after the stack is empty
// setTimeout(function () {
//   console.log(p);
//   console.log(p2);
//   console.log(p3);
// });

/**
 * race和all的区别在于，遇到第一个完成的Promise，无论成功还是失败，都会立刻返回。
 */
Lie.race = function (promises) {
  return new Promise(function (resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          return resolve(value);
        })
        .catch((reason) => {
          return reject(reason);
        });
    }
  });
};

// 测试
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 500, 'one');
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'two');
// });

// Lie.race([promise1, promise2]).then((value) => {
//   console.log(value);
//   // Both resolve, but promise2 is faster
// });
// expected output: "two"


//参考 https://juejin.cn/post/6850037281206566919#heading-9