// 写法1
// function add(x){
//   return function(y){
//     return x+y+3 
//   }
// }

// 写法2
const add = x => y => x+y+3
const res = add(2)(3)
console.log(res)    // 8

const obj = {name: 'Judy', type: 'React'}
console.log(Object.keys(obj))   // ["name","type"]

function sayHello(...args){
  console.log(args)   // ["hello","React","And","Node"]
}
sayHello('hello', 'React', 'And', 'Node')