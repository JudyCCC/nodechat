import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../../component/usercard/usercard'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Boss extends React.Component{

  componentDidMount(){
    this.props.getUserList('genius')
  }

  render(){
    const { userList } = this.props;

    return (
      <UserCard userList={userList} />
    )
  }
}

export default Boss