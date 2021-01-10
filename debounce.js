/**
 * 防抖是啥：防抖就是，当事件持续触发时，一定时间段内没有再触发事件，
 * 事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
 */

function debounce(fn, wait) {
  let timeout = null;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, wait);
  };
}


function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn.apply(context, args), wait)
  }
}

function throttle(fn, wait) {
  let pre = 0;
  return function (...args) {
    let context = this;
    let cur = +new Date();
    if (cur - pre > wait) {
      fn.apply(context, args)
      pre = cur;
    }
  }
}

function throttle2(fn, wait) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (!timer) {
      setTimeout(() => {
          fn.apply(context, args);
          timer = null;
      }, wait);
    }
  }
}