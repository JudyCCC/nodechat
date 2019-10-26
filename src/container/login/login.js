import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user: '',
      pwd: '',
    }
  }

  // 跳转到注册
  register = () => {
    this.props.history.push('/register')
  }

  // 表单数据改变
  handleChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  // 登录操作
  handleLogin = () => {
    this.props.login(this.state)
  }

  render(){
    const { redirectTo, msg } = this.props;

    return (
      <div>
        { redirectTo ? <Redirect to={redirectTo} /> : null }
        <Logo />
        <WingBlank>
          <List>
            {msg ? <p className='error-msg'>{msg}</p> : null}
            <InputItem onChange={(v) => this.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
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