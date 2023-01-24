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

function selectionSort (array){

  for (let j = 0; j < array.length; j++) {
    let max = -Infinity
    let index = null

    for (let i = 0; i < array.length - j; i++) {
      if (array[i] > max) {
        max = array[i]
        index = i
      }
    }

    let buff = array[array.length - 1 - j]
    array[array.length - 1 - j] = max
    array[index] = buff
  }
  console.log(array)
}

console.log(arr2)
selectionSort(arr2)

console.time('sort by choice')
selectionSort(`sorted array: ${initArr(1000)}`)
console.timeEnd('sort by choice')
