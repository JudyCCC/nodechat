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
class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      avatar: '',
      desc: '',
      company: '',
      money: '',
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
      <div>
        {redirectTo && redirectTo !== path ? <Redirect to={redirectTo}></Redirect> : null}
        <NavBar mode="dark">Boss完善信息页</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
        <InputItem onChange={(v) => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v) => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v) => this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem 
          onChange={(v) => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='职位要求'
        ></TextareaItem>
        <Button type="primary" onClick={() => update(state)}>保存</Button>
      </div>
    )
  }
}

export default BossInfo