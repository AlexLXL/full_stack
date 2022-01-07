//定义state
import {getUserInfoApi, loginApi} from "@/services/userService";
import {ActionContext} from "vuex"
import {RootState} from "@/store";
import {setUserId, setToken, setExpireTime} from "@/utils/auth";
import {LoginResult} from "@/services/userModel";

export type UserState = {
  token: string,
  userId: string,
  permissions: string[]
}
export const state: UserState = {
  token: '',
  userId: '',
  permissions: []
}

//定义actions
export const actions = {
  login({commit}: ActionContext<UserState, RootState>, loginModel: any): Promise<LoginResult> {
    return new Promise((resolve, reject) => {
      loginApi(loginModel).then((res) => {
        if (res.code == 200) {
          commit('setToken', res.token)
          commit('setUserId', res.id)
          //存到cookies ==> sessioStorage
          setUserId(res.id)
          setToken(res.token)
          setExpireTime(res.expireTime)
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getUserInfo({commit}: ActionContext<UserState, RootState>) {
    return new Promise((resolve, reject) => {
      getUserInfoApi().then((res) => {
        if (res.code == 200) {
          commit('setRoles', res.data.roles)
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

//定义mutations
export const mutations = {
  setToken(state: UserState, token: string) {
    state.token = token
  },
  setUserId(state: UserState, userId: string) {
    state.userId = userId
  },
  setRoles(state: UserState, roles: string[]) {
    state.permissions = roles;
  }
}

//定义getters
export const getters = {
  //获取用户的权限字段
  getPermissions(state: UserState) {
    return state.permissions
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
