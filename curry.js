function curry(fn, args) {
  // 函数需要接收的参数个数
  let len = fn.length;
  // 之前已经缓存过的参数
  args = args || [];
  return function() {
      let _args = [...args];
      for (let i = 0; i < arguments.length; i++) {
          _args.push(arguments[i]);
      }
      if (_args.length < len) {
          return curry.call(this, fn, _args);
      }
      else {
          return fn.apply(this, _args);
      }
  }
}

function curry(fn, args = []) {
  let len = fn.length;
  return function(...args2) {
    let _args = [...args, ...args2];
    if (_args.length < len) {
      return curry.call(this, fn, _args)
    } else {
      fn.apply(this. _args);
    }
  }
}

// 这个时候让你实现一个call
Function.prototype.myCall = function myCall(context = window, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myApply = function myApply(context = window, args = []) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myBind = function myBind(context = window, ...args1) {
  const Fn = this;
  return function a(...args2) {
    let arg = [...args1, ...args2];
    return Fn.apply(context, ...arg);
  }
}


var fn = curry(function(a, b, c) {
  console.log([a, b, c], +new Date);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]