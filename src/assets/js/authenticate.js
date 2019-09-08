import store from '../../store/store'
import vue from '../../main'


import Cookie from 'vue-cookies'

const authenticate = {
  ifLogin() {
    let authflag = vue.$store.state.userinfo.username;
    if (authflag) {
      return true
    } else {
      return false
    }
  },
  ifCurrentUser(postauthor) {
    if (this.ifLogin()) {
      let authuser = vue.$store.state.userinfo.username;
      if (postauthor == authuser) {
        return true
      }
    } else {
      return false
    }
  }
}

export default authenticate
