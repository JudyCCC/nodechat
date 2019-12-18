import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux'

@connect(
  state => state.user,
  {update}
)
class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      avatar: '',
      desc: '',
    }
  }

  onChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  selectAvatar = (imgname) => {
    this.setState({
      avatar: imgname
    })
  }

  render(){
    const { update, redirectTo, location } = this.props
    const state = this.state
    const path = location.pathname

    return (
      <div className="gi-content">
        {redirectTo && redirectTo !== path ? <Redirect to={redirectTo}></Redirect> : null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
        <InputItem onChange={(v) => this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem 
          onChange={(v) => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='个人简介'
        ></TextareaItem>
        <Button type="primary" onClick={() => update(state)}>保存</Button>
      </div>
    )
  }
}

export default GeniusInfo