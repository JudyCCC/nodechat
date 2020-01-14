export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }
  function subscribe(listener) {
    currentListeners.push(listener)
  }
  function dispatch(action) {
    currentState =  reducer(currentState, action)
    currentListeners.forEach(v => v())    // 监听器全部执行
    return action
  }
  dispatch({type: '@@INIT/MINIREDUX'})
  return { getState, subscribe, dispatch }
}

export function applyMiddleware(...middlewares){
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)
    // dispatch = middleware(midApi)(dispatch)
    // middleware(midApi)(dispatch)(action)
    return {
      ...store,
      dispatch
    }
  }
}

// compose(fn1, fn2, fn3)
// fn1(fn2(fn3))
export function compose(...funcs){
  if(func.length === 0){
    return arg => arg
  }
  if(funcs.length === 1){
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}

// 透传
// addGun(参数)
// dispatch(addGun(参数))
bindActionCreator(creator, dispatch){
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch){
  // 写法1
  let bound = {}
  Object.keys(creators).forEach(v => {
    let creator = creators[v]
    bound[v] = bindActionCreator(creator, dispatch)
  })
  return bound

  // 写法2 res结果， item元素
  // return Object.keys(creators).reduce((res, item) => {
  //   ret[item] = bindActionCreator(creators[item], dispatch)
  // }, {})
}