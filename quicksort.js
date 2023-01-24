function initArr (n){
  let arr = [];
  for (let i = 0; i < n; i++){
    arr.push(Math.round( Math.random() * 100 ))
  }
  console.log(`initial array: ${arr}`);
  return arr;
}

function quicksort(array) {
  if (array.length < 2) {
    return array
  }

  const index = Math.floor(Math.random() * array.length)
  const currentItem = array[index]

  const more = []
  const less = []

  for (let i = 0; i < array.length; i++) {
    if (i === index) {
      continue
    }

    if (array[i] > currentItem){
      more.push(array[i])
    }

    else {
      less.push(array[i])
    }
  }

  return [
    ...quicksort(less),
    currentItem,
    ...quicksort(more)
  ]
}

console.time('quicksort')
console.log(`sorted array: ${quicksort(initArr(1000))}`)
console.timeEnd('quicksort')

