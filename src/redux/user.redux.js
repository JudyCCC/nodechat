import axios from "axios"
import { getRedirectPath } from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',   // 跳转到
  isAuth: '',  // 是否
  user: '',   // 用户名
  pwd: '',    // 密码
  type: '',   // 用户类型
  msg: '',    // 后台返回失败消息
}

// reducer
export function user(state=initState, {type, payload, msg}){
  switch(type){
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(payload), isAuth: true, ...payload}
    case LOGIN_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(payload), isAuth: true, ...payload}
    case LOAD_DATA:
      return {...state, ...payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: msg} 
    default: 
      return state
  }
}

function loginSuccess(data){
  return { type: LOGIN_SUCCESS, payload: data }
}

function registerSuccess(data){
  return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg){
  return {msg, type: ERROR_MSG}
}

// 存储用户信息
export function loadData(userinfo){
  return {type: LOAD_DATA, payload: userinfo}
}

// 登录
export function login({user, pwd }){
  if(!user || !pwd){
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).then(res => {
      if(res.status === 200 && res.data.code === 0){
        dispatch(loginSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 注册
export function register({user, pwd, repeatpwd, type}){
  if(!user || !pwd || !type){
    return errorMsg('用户名密码必须输入')
  }
  if(pwd !== repeatpwd){
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then(res => {
      if(res.status === 200 && res.data.code === 0){
        dispatch(registerSuccess({user, pwd, type}))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}