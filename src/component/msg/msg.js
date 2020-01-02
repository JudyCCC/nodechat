import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const { Item } = List
const { Brief } = Item

@connect(state => state)
class Msg extends React.Component{

  getLast = (arr) => {
    return arr[arr.length - 1]
  }

  render() {
    const { chat, user } = this.props
    const { chatmsg } = chat
    const userid = user._id
    const userinfo = chat.users
    const msgGroup = {}

    chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })

    const chatList = Object.values(msgGroup)

    // 按照聊天用户分组，根据chatid
    return (
      <div>
        {
          chatList.map(v => {
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const unreadNum = v.filter(v => !v.read && v.to === userid).length
            if(!userinfo[targetId]){
              return null
            }
            return (
              <List key={lastItem._id}>
                <Item 
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                >
                  {lastItem.content}
                  <Brief>{ userinfo[targetId].name }</Brief>
                </Item>
              </List>
            )
          })
        }
      </div>
    )
  }
}

export default Msg