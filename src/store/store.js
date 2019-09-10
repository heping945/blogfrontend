import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    userinfo: {
      username: Cookie.get('username'),
      token: Cookie.get('token'),
      avatar: Cookie.get('avatar'),
    },
    post_title: 'hello world'
  },
  mutations: {
    SaveToken(state, usertoken) {
      //账号登录
      state.userinfo.username = usertoken.username;
      state.userinfo.token = usertoken.token;
      state.userinfo.avatar = usertoken.avatar;
      Cookie.set('username', usertoken.username, 60 * 60 * 24 * 7);
      Cookie.set('token', usertoken.token, 60 * 60 * 24 * 7);
      Cookie.set('avatar', usertoken.avatar, 60 * 60 * 24 * 7);
    },
    ClearToken(state) {
      // 清除  userinfo 数据,注销登录
      state.userinfo.username = null;
      state.userinfo.token = null;
      state.userinfo.avatar = null;
      Cookie.remove('username');
      Cookie.remove('token')
      Cookie.remove('avatar')
    },
    SetPostTitle(state, title) {
      state.post_title = title
    },
  },
  actions: {
    SaveToken({commit}, usertoken) {
      commit('SaveToken', usertoken)
    },
    ClearToken({commit}) {
      commit('ClearToken')
    },
    SetPostTitle(context, title) {
      context.commit('SetPostTitle', title)
    },
  },
  getters: {},


})
