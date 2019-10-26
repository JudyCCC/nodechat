import React from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types'

const Header = Card.Header
const Body = Card.Body

class UserCard extends React.Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render(){
    const {userList} = this.props

    return(
      <WingBlank>
        <WhiteSpace />
        {
          userList.map(v => (
            v.avatar && (
              <Card key={v._id}>
                <Header
                  title={v.user}
                  thumb={<img style={{width: 50}} alt="" src={require(`../img/${v.avatar}.png`)}></img>}
                  extra={<span>{v.title}</span>}
                >
                </Header>
                <Body>
                  {v.type === 'boss' && <div>公司：{v.company}</div>}
                  {
                    v.desc.split('\n').map(d => (
                      <div key={d}>{d}</div>
                    ))
                  }
                  {v.type === 'boss' && <div>薪资：{v.money}</div>}
                </Body>
              </Card>
            )
          ))
        }
      </WingBlank>
    )
  }
}

export default UserCard