enum Keys {
  Token = 'token',
  UserId = 'userId',
  ExpireTime = 'expireTime'
}

//存储token到session
export const setToken = (token: string) => {
  sessionStorage.setItem(Keys.Token, token)
}
export const getToken = () => {
  return sessionStorage.getItem(Keys.Token)
}

//存储userId到sessionStorage
export const setUserId = (userId: number) => {
  sessionStorage.setItem(Keys.UserId, JSON.stringify(userId))
}
export const getUserId = () => {
  return sessionStorage.getItem(Keys.UserId)
}

//存储过期时间
export const setExpireTime = (time: number) => {
  sessionStorage.setItem(Keys.ExpireTime, JSON.stringify(time))
}
export const getExpireTime = () => {
  return sessionStorage.getItem(Keys.ExpireTime)
}

//session清空
export const cleanSession = () => {
  sessionStorage.clear()
}