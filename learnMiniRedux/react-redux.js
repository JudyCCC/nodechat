import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './redux'

// connect 负责链接组件，给到redux里的数据放到组件的属性里
// 1.负责接受一个组件， 把state里的一些数据放进去，返回一个组件
// 2.数据变化的时候，能够通知组件
//                                       默认值
// function写connect
// export function connect(mapStateToProps, mapDisptchToProps) {
//   return function (WrapComponent) {
//     return class ConnectComponent extends React.Component{

//     }
//   }
// }
export const connect = (mapStateToProps = state => state, mapDisptchToProps = {}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component{
     static contextTypes = {
       store: PropTypes.object
     }

     constructor(props, context){
       super(props, context)
       this.state = {
         props: {}
       }
     }

     componentDidMount(){
      const { store } = this.context
      store.subscribe(() => this.update())
       this.update()
     } 

     update(){
       // 获取mapStateToProps和mapDisptchToProps 放入this.props里
       const { store } = this.context
       const stateProps = mapStateToProps(store.getState())
       // 方法不能直接给，因为需要dispatch
      //  function addGun() {
      //    return { type: ADD_GUN}
      //  }
      // 直接执行addGun没有任何反应和意义
      // 要addGun = () => store.dispatch(addGun())才有意义
      // 其实就是用dispatch把action包一下
       const dispatchProps = bindActionCreators(mapDisptchToProps, store.dispatch)
       this.setState({
         props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
         }
       })
     }

     render() {
       return <WrapComponent {...this.state.props}></WrapComponent>
     }
  }
}

// Provider  把store放到context里，所有的子元素可以直接取到store
export class Provider extends React.Component{
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context){
    super(props, context)
    this.store = props.store
  }
  render(){
    return this.props.children
  }
}