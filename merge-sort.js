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

function mergeSort(array) {
  if (array.length > 1) {
    let mid = Math.floor(array.length / 2),
    leftHalf = array.slice(0, mid),
    rightHalf = array.slice(mid)
    mergeSort(leftHalf)
    mergeSort(rightHalf)

    let i = j = k = 0

    while (i < leftHalf.length && j < rightHalf.length) {
      if (leftHalf[i] < rightHalf[j]){
        array[k] = leftHalf[i]
        i++
      } else {
        array[k] = rightHalf[j]
        j++
      }
      k++
    }

    while (i<leftHalf.length) {
      array[k] = leftHalf[i]
      i++
      k++
    }

    while (j<rightHalf.length) {
      array[k] = rightHalf[j]
      j++
      k++
    }
  }
  return array
}

// console.log(mergeSort(arr2))

console.time('merge sort')
console.log(`sorted array: ${mergeSort(initArr(1000))}`)
console.timeEnd('merge sort')