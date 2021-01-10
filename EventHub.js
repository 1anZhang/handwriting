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