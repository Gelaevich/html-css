// arr to test
const arr2 = [ 3, 1, 62, 33, 54, 69, 8, 12, 4, 67, 33, 21, 36, -1, 0, 32]

function initArr (n){
  let arr = [];
  for (let i = 0; i < n; i++){
    arr.push(Math.round( Math.random() * 100 ))
  }
  console.log(`initial array: ${arr}`);
  return arr;
}

function insertionSort(notSortedArr){
  let sortedArr = []
  for (let i = 0; i < notSortedArr.length; i++) {
    let k = i, buff;

    sortedArr.push(notSortedArr[i]);

    while(k > 0 && sortedArr[k] < sortedArr[k-1]){
      buff = sortedArr[k-1]
      sortedArr[k-1] = sortedArr[k]
      sortedArr[k] = buff
      k--
    }
  }
  return sortedArr;
}

// console.log(arr2)
// console.log(insertionSort(arr2))

console.time('insertion-sort')
console.log(`sorted array: ${insertionSort(initArr(1000))}`)
console.timeEnd('insertion-sort')
