import React from 'react'

export default function imoocForm(Comp){
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
    }

    // 表单数据改变
    handleChange = (key, val) => {
      this.setState({
        [key]: val
      })
    }

    render (){
      return (
        <Comp 
          handleChange={this.handleChange} 
          state={this.state} 
          {...this.props}
        >
        </Comp>
      )
    }
  }
}