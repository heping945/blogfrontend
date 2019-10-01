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
      id: Cookie.get('id'),
    },
    post_title: 'hello world',
    search_arg: ''
  },
  mutations: {
    SaveToken(state, usertoken) {
      //账号登录
      state.userinfo.username = usertoken.username;
      state.userinfo.token = usertoken.token;
      state.userinfo.avatar = usertoken.avatar;
      state.userinfo.id = usertoken.id;
      Cookie.set('username', usertoken.username, 60 * 60 * 24 * 7);
      Cookie.set('token', usertoken.token, 60 * 60 * 24 * 7);
      Cookie.set('avatar', usertoken.avatar, 60 * 60 * 24 * 7);
      Cookie.set('id', usertoken.id, 60 * 60 * 24 * 7);
    },
    ClearToken(state) {
      // 清除  userinfo 数据,注销登录
      state.userinfo.username = null;
      state.userinfo.token = null;
      state.userinfo.avatar = null;
      state.userinfo.id = null;
      Cookie.remove('username');
      Cookie.remove('token')
      Cookie.remove('avatar')
      Cookie.remove('id')
    },
    SetPostTitle(state, title) {
      state.post_title = title
    },
    PostSearchArg(state, arg) {
      state.search_arg = arg
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
    PostSearchArg(context, arg) {
      context.commit('PostSearchArg', arg)
    },
  },
  getters: {},


})
