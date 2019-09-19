import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import '../../index.css'

const RadioItem = Radio.RadioItem

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'    // 或者boss
    }
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  handleRegister = () => {
    this.props.register(this.state)
    console.log(this.state)
  }

  render(){
    return (
      <div>
        <Logo />
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem 
            onChange={(v) => this.handleChange('user', v)}
          >
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem 
            onChange={(v) => this.handleChange('pwd', v)}
            type='password'
          >
            密码
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={(v) => this.handleChange('repeatpwd', v)}
            type='password'
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem 
            checked={this.state.type==='genius'}
            onChange={() => this.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem 
            checked={this.state.type==='boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >
            Boss
          </RadioItem>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register