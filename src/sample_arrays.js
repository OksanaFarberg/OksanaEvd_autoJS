const arr = [1, 2, 1, 4]

arr.push(10)

const strr = arr.join('// ')

console.log(strr)
console.log(arr)

arr.forEach(function (item) {
  console.log(item)
})

// arr.forEach((item) => console.log(item))
// получение последнего элемента
console.log(arr.at(-1))
// фильтр
const filterr = arr.filter(item => item > 3)
console.log(filterr)

const mappedArray = arr.map(item => {
  return {
    старое: item,
    новое: item * 2,
  }
})
console.log(mappedArray)

// reduce
// БонуС! node 'src/sample_arrays' или npx babel-node src/sample_arrays - запустит файл

const sum = arr.reduce((acc, item) => {
  acc += item
  return acc
}, 0)
console.log(sum)

const obj = arr.reduce(
  (acc, item) => {
    if (item % 2 === 0) {
      acc.even += item
    } else {
      acc.odd += item
    }
    return acc
  },
  {
    odd: 0,
    even: 0,
  },
)
console.log(obj)

let e = 0;

const summ = (a,b) => { 
  const sum = a + b
  console.log(e)
  e = sum
  console.log(e)
  // return sum
}
summ(1,2)
console.log(e);