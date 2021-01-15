let data = [
  { parent_id: 0, id: 1, value: 'XXX' },
  { parent_id: 1, id: 3, value: 'XXX' },
  { parent_id: 4, id: 6, value: 'XXX' },
  { parent_id: 3, id: 5, value: 'XXX' },
  { parent_id: 2, id: 4, value: 'XXX' },
  { parent_id: 1, id: 2, value: 'XXX' },
];

function buildTree(arr, index) {
  let obj = {
    id: arr[index].id,
    value: arr[index].value
  }
  let childData = arr.filter(e => {
    return e.parent_id === arr[index].id
  })
  if (childData.length > 0) {
    obj.children = []
    for(let i = 0; i < childData.length; i++) {
      obj.children.push(buildTree(arr, arr.findIndex(e => e.id === childData[i].id)))
    }
  }
  return obj;
}

let tree = buildTree(data, 0);