// 登录或注册成功时定向地址
export function getRedirectPath({ type, avatar }){
  // 根据用户信息 返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = ( type === 'boss' ) ? '/boss' : '/genius'
  console.log(avatar)
  if(!avatar){
    url += 'info'
  }
  return url
}