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


var fn = curry(function(a, b, c) {
  console.log([a, b, c], +new Date);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]