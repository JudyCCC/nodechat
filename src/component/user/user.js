import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Result, List, WhiteSpace, Modal, Button} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component{

  logout = () =>{
    console.log(111)
    alert('注销', '确定退出登录？', [{
      text: '取消', onPress: () => console.log('Canceled')
    },{
      text: '确定', onPress: () => {
        browserCookies.erase('userid')
        this.props.logoutSubmit()
      }
    }])
  }

  render(){
    const {avatar, user, type, company, title, desc, money, redirectTo} = this.props

    return user ? (
      <div>
        <Result
          img={<img style={{width: 50}} alt="" src={require(`../img/${avatar}.png`)}></img>}
          title={user}
          message={type === 'boss' && company}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {title}
            {
              desc.split('\n').map(d => <Brief key={d}>{d}</Brief>)
            }
            {money && <Brief>薪资；{money}</Brief>}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    )
    : <Redirect to={redirectTo} />
  }
}

export default User