// 'a.b.c.d.e' ---> 

// {
//     a: {
//         b: {
//             c: {d: }        }
//     }
// }

function change(str) {
  const arr = str.split('.');
  const len = arr.length;
  const res = {};
  arr.reduce((total, cur, index) => {
    total[cur] = index === len - 1 ? null : {}
    return total[cur]
  }, res);
  return res;
}

let res = change('a.b.c.d.e')