class EventHub {
  cache = {};
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  off(eventName, fn) {
    const index = this.cache[eventName].indexOf(fn);
    if (index === -1) return;
    this.cache[eventName].splice(index, 1);
  }
  emit(eventName) {
    this.cache[eventName].forEach((fn) => fn());
  }
}

class EventHub {
  cache = {}
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn)
  }
  off(eventName, fn) {
    const index = this.cache[eventName].indexOf(fn);
    if (index === -1) return;
    this.cache[eventName].splice(index, 1)
  }
  emit(eventName) {
    this.cache[eventName].forEach(function(fn) {
      fn();
    })
  }
}


//line=readline()
//print(line)
console.log('Hello World!');
class EventEmitter {
  cache = {}
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  emit(eventName, ...args) {
    this.cache[eventName].forEach(function(fn) {
      fn(...args);
    })
  }
  off(eventName, fn) {
    const index = this.cache[eventName].findIndex(e => e === fn);
    if (index > -1) this.cache[eventName].splice(index, 1);
  }
  once(eventName, fn) {
    function onceFn(...args) {
      fn(...args)
      this.off(eventName, onceFn);
    }
    this.on(eventName, onceFn);
  }
}