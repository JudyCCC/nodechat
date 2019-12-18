import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import HocForm from '../../component/hoc-form/hoc-form'
import '../../index.css'

const RadioItem = Radio.RadioItem

@connect(
  state => state.user,
  {register}
)
@HocForm
class Register extends React.Component{

  componentDidMount(){
    this.props.handleChange('type', 'genius')
  }

  // 注册操作
  handleRegister = () => {
    this.props.register(this.props.state)
  }

  render(){
    const { redirectTo, msg, handleChange, state } = this.props;

    return (
      <div>
        { redirectTo ? <Redirect to={redirectTo} /> : null }
        <Logo />
        <List>
          {msg ? <p className='error-msg'>{msg}</p> : null}
          <InputItem 
            onChange={(v) => handleChange('user', v)}
          >
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem 
            onChange={(v) => handleChange('pwd', v)}
            type='password'
          >
            密码
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={(v) => handleChange('repeatpwd', v)}
            type='password'
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem 
            checked={state.type==='genius'}
            onChange={() => handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem 
            checked={state.type==='boss'}
            onChange={() => handleChange('type', 'boss')}
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