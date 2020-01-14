// context是全局的，组件里声明， 所有子元素可以直接获取
// 需安装prop-types
import React from 'react'
import PropTypes from 'prop-types'

class Page extends React.Component{
  static childContextTypes = {
    user:PropTypes.string
  }
  constructor(props){
    super(props)
    this.state = {
      user: 'Judy'
    }
  }  

  getChildContext() {
    return this.state
  }

  render() {
    const { user } = this.state

    return (
      <div>
        <p>{user}</p>
        <SideBar />
      </div>
    )
  }
}

class SideBar extends React.Component{
  render() {
    return (
      <div>
        <p>侧边栏</p>
        <NavBar />
      </div>
    )
  }
}

class NavBar extends React.Component{
  static contextTypes = {
    user: PropTypes.string
  }
  render() {
    const { user } = this.context
    return (
      <div>
        {user}的导航栏 
      </div>
    )
  }
}