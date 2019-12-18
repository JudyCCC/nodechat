import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import HocForm from '../../component/hoc-form/hoc-form'

@connect(
  state => state.user,
  { login }
)
@HocForm
class Login extends React.Component{

  // 跳转到注册
  register = () => {
    this.props.history.push('/register')
  }

  // 登录操作
  handleLogin = () => {
    this.props.login(this.props.state)
  }

  render(){
    const { redirectTo, msg, handleChange } = this.props;

    return (
      <div>
        { redirectTo && redirectTo !== '/login' ? <Redirect to={redirectTo} /> : null }
        <Logo />
        <WingBlank>
          <List>
            {msg ? <p className='error-msg'>{msg}</p> : null}
            <InputItem onChange={(v) => handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={(v) => handleChange('pwd', v)}>密码</InputItem>
          </List>
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login