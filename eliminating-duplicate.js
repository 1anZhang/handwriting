const values = ['jane', 'lars', 'jane'];
const uniqueValues = [...new Set(values)];

const members = [
  {
    first: 'Jane',
    last: 'Bond',
    id: '10yejma',
  },
  {
    first: 'Lars',
    last: 'Croft',
    id: '1hhs0k2',
  },
  {
    first: 'Jane',
    last: 'Bond',
    id: '1y15hhu',
  },
  {
    first: 'Jane',
    last: 'Bond',
    id: '1y15hhu',
  },
];

function uniqueObj(data, key) {
  return [...new Map(data.map((el) => [key(el), el])).values()];
}

let r = uniqueObj(members, i => `${i.first}${i.last}`);

console.log(JSON.stringify(r));
