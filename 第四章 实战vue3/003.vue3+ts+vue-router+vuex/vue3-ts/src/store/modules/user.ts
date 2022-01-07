//定义state
import {loginApi} from "@/services/userService";
import {ActionContext} from "vuex"
import {RootState} from "@/store";
import {setUserId, setToken, setExpireTime} from "@/utils/auth";

export type UserState = {
  token: string,
  userId: string
}
export const state: UserState = {
  token: '',
  userId: '',
}

//定义actions
export const actions = {
  login({commit}: ActionContext<UserState, RootState>, loginModel: any) {
    return new Promise((resolve, reject) => {
      loginApi(loginModel).then((res) => {
        if (res.data.code == 200) {
          commit('setToken', res.data.token)
          commit('setUserId', res.data.id)
          //存到cookies ==> sessioStorage
          setUserId(res.data.id)
          setToken(res.data.token)
          setExpireTime(res.data.expireTime)
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
  }
}

//定义getters
export const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
