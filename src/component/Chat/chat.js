import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

const { Item } = List;

const socket = io('ws://localhost:9093')

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false,
    }
  }

  componentDidMount(){
    const { chat } = this.props
    const { chatmsg } = chat
    if (!chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    this.fixCarousel() ;
  }

  componentWillUnmount(){
    const { match, readMsg } = this.props
    const to = match.params.user
    readMsg(to);
  }

  fixCarousel = () => {
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    },0)
  }

  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: ''
    })
  }

  render(){
    const { match, chat, history, user} = this.props
    const { params } = match
    const { chatmsg, users } = chat
    const { _id } = user    // 当前用户id
    const userid = params.user  // 聊天对象的id
    const chatid = getChatId(userid, _id)
    const chatmsgs = chatmsg.filter(v => v.chatid === chatid)
    const { showEmoji, text } = this.state
    if(!users[userid]){
      return null
    }

    const emoji = '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 😘 😗 😚 😙 😋 😋 😛 😜 😝 🤑 🤗 🤔 🤐 😐 😐 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴'
                    .split(' ')
                    .filter(v => v)
                    .map(v => ({text: v}))

    return(
      <div id="chat-page">
        <NavBar 
          mode="dark" 
          icon={<Icon type="left" />}
          onLeftClick={() => {
            history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {
          chatmsgs.map(v => {
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === userid
            ? (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            )
            : (
              <List key={v._id}>
                <Item extra={<img src={avatar} alt="avatar" />} className="chat-me">{v.content}</Item>
              </List>
            )
          })
        }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => {this.setState({text: v})}}
              extra={
                <div>
                  <span
                    style={{marginRight: 5}}
                    onClick={
                      () => {
                        this.setState({
                          showEmoji: !showEmoji
                        })
                        this.fixCarousel();
                      }
                    }
                  >
                    😃
                  </span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
              }
            >
            信息
            </InputItem>
          </List>
          {
            showEmoji && (
              <Grid
                data={emoji}
                columnNum={9}
                carouselMaxRow={4}
                isCarousel
                onClick={
                  el => {
                    this.setState({
                      text: text + el.text
                    })
                  }
                }
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default Chat