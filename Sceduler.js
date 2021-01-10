class Scheduler {
  constructor(max) {
    this.max = max;
    this.tasks = [];
    // this.usingTask = [];
    this.runningNumber = 0;
  }
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      promiseCreator.resove = resolve;
      if (this.runningNumber <= this.max) {
        this.runTask(promiseCreator)
      } else {
        this.tasks.push(promiseCreator)
      }
    })
  }

  runTask(promiseCreator) {
      this.runningNumber++;
      // this.usingTask.push(promiseCreator);
    promiseCreator().then(res => {
      promiseCreator.resolve(res);
      // let index = this.usingTask.findIndex(promiseCreator);
      // this.usingTask.splice(index, 1)
      this.runningNumber--;
      if (this.tasks.length > 0) {
        this.runTask(this.tasks.shift())
      }
    })
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order, +new Date()));
};

addTask(400, 4);
addTask(200, 2);
addTask(300, 3);
addTask(100, 1);
