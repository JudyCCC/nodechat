import { Map, is } from 'immutable';

// immutable优点：
// 1.减少内存使用
// 2.并发安全
// 3.降低项目复杂度
// 4.便于比较复杂数据，定制shouldComponentUpdate方便
// 5.时间旅行功能方便
// 6.函数式编程
// 缺点：
// 1.学习成本
// 2.库的大小  可用seamless-immutable
// 3.对原有项目入侵太严重  新项目使用，老项目评估再用

/**
 * 1
 */
// let obj = {name: 1}
// let obj1 = {name: 1}

// // 递归对比，复杂度太高，react不可接受
// // react建议，只做浅层比较，即只有一级数据
// function compareObj(obj1, obj2){
//   if(obj1 === obj2){
//     return true
//   }
//   if(Object.keys(obj1).length !== Object.keys(obj2).length){
//     return false
//   }
//   for(let k in obj1){
//     if(typeof obj1[k] === 'object'){    // react不建议
//       return compareObj(obj1[k], obj2[k])
//     } else if(obj1[k] !== obj2[k]){
//       return false
//     }
//   }
//   return false
// }

/**
 * 2
 */
// let obj = Map({
//   name: 'imooc',
//   course: Map({name: 'react + redux'})
// })
// let obj1 = obj.set('name','Judy')
// console.log(obj.get('course') === obj1.get('course'))   // true
// console.log(obj === obj1) // false

/**
 * 3
 */
let obj = Map({name: 1, title: 'imooc'})
let obj1 = Map({name: 1, title: 'imooc'})
console.log(is(obj,obj1)) // true