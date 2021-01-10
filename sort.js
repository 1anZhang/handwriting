// 首先是一个普通的测试用例
let test = [1, 2, 4, 6, 2, 9, 3, 5, 9, 8, 1, 8, 7];


/**
 * 第一个，冒泡排序，冒泡排序的思路就是，比较相邻的两个数，如果前面的数比较大，就交换两个数
 * 一直到比较到最后一个数字，每次排序完成，有一个最大的数字放在数组的末尾
 * 然后比较剩下的数字。
 * 时间复杂度为O(n2), 空间复杂度为O(1)
 */
function bubbleSort (arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

let r1 = bubbleSort(test);

/**
 * 第二个，快速排序，算法如其名，就是快，
 * 核心思路就是，从数组中随便找一个字符，然后比他小的，放他左边，比他大的放他右边，
 * 这样一轮下来，这个数字就找到位置了，然后递归地找他左边和右边的。
 */
function quickSort(arr, left, right) {
  if (left < right) {
    let partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}
function partition(arr, left, right) {
  let pivot = arr[left];
  while (left < right) {
    while(left < right && arr[right] > pivot) {
      right--;
    }
    arr[left] = arr[high];
    while (left < right && arr[left] <= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[right] = pivot;
  return right;
}

let r2 = quickSort(test);
debugger