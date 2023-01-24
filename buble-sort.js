function initArr (n){
  let arr = [];
  for (let i = 0; i < n; i++){
    arr.push(Math.round( Math.random() * 100 ))
  }
  console.log(`initial array: ${arr}`);
  return arr;
}

function bubbleSort (array) {
  for (let j = 0; j <= array.length; j++){
    for (let i = 0; i < array.length - 1 - j; i++){
      if (array[i] > array[i + 1]){
        const buff = array[i];
        array[i] = array[i + 1];
        array[i + 1] = buff;
        
      }
    }
  }
  console.log(`sorted array: ${array}`)
}

console.time('bubbleSort')
bubbleSort(initArr(1000))
console.timeEnd('bubbleSort')


// arr to test
let arr2 = [ 3, 1, 62, 33, 54, 69, 8, 12, 4, 67, 33, 21, 36, -1, 0, 32]
// bubbleSort(arr2);

