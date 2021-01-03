// 输入 [['a', 'b'], ['n', 'm'], ['0', '1']] => ["an0", "an1", "am0", "am1", "bn0", "bn1", "bm0", "bm1"]

function compose(arr) {
  const result = [];
  let len = arr.length;
  backtracking(arr, '', 0)

  function backtracking(arr, str, index) {
    if (index === len) {
      result.push(str);
      return;
    }
    for(let i = 0; i < arr[index].length; i++) {
      backtracking(arr, str + arr[index][i], index + 1);
    }
  }
  return result;
}

let ar = [['a', 'b'], ['n', 'm'], ['0', '1'], ['c', 'd'], ['aa', 'dd', 'ee']];
let res = compose(ar);
// ac


