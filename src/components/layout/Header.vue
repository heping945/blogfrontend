<template>
  <div>
    <div class="header" v-if="backFlag">
      <header class="p-container">
        <Row>
          <!--小屏幕下的logo-->
          <Col :xs="3" :sm="0" :md="0" :lg="0">
            <div class="simpleheaderlogo">
              <router-link to="/">
                <img src="../../../static/logo-xs.png" alt="logo" width="30" height="30">
              </router-link>

            </div>
          </Col>
          <!--大屏幕（md以上）的logo-->
          <Col :xs="0" :sm="4" :md="4" :lg="3">
            <div class="superheaderlogo">
              <router-link to="/">
                <img src="../../../static/logo-sm-md-lg.png" alt="logo" height="35" width="80">
              </router-link>
            </div>
          </Col>
          <!--小屏幕下的dropmenu-->
          <Col :xs="5" :sm="6" :md="0" :lg="0">
            <div class="headerdropmenu">
              <Dropdown trigger="click" @on-click="selectmenu">
                <a href="javascript:void(0)">
                  {{indexshow}}
                  <!--                <Icon type="ios-arrow-down"></Icon>-->
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="(item,index) in droplist" :key="index"
                                :divided="item.divided" :name="item.title">
                    <router-link :to="item.url">
                      {{item.title}}
                    </router-link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Col>
          <!--中大屏幕的nav-->
          <Col :xs="0" :sm="0" :md="10" :lg="9">
            <div class="navlist">
              <ul>
                <li v-for="(item,index) in droplist">
                  <router-link :to="item.url"> {{item.title}}</router-link>
                </li>
              </ul>
            </div>
          </Col>
          <Col :xs="10" :sm="9" :md="6" :lg="8" :xl="7">
            <div class="header-search">
              <Input search placeholder="搜索本站..." :maxlength="24" clearable/>
            </div>
          </Col>
          <Col :xs="0" :sm="0" :md="0" :lg="2" :xl="2">
            <div class="about">
              关于
            </div>
          </Col>
          <Col :xs="6" :sm="5" :md="4" :lg="2" :xl="3">
            <div class="auth">
              <template v-if="this.$store.state.userinfo.token">
                <Dropdown trigger="click" @on-click="selectmenu">
                  <a href="javascript:void(0)">
                    <Avatar icon="ios-person" :src="avatar"/>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>
                      <div @click="logout">注销</div>
                    </DropdownItem>
                    <DropdownItem>
                      <router-link :to="{name:'userindex'}">主页</router-link>
                    </DropdownItem>
                    <DropdownItem>
                      <router-link :to="{name:'postadd'}">写文章</router-link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
              <template v-else>
                <router-link to="/login" target="_blank"> 登录 | 注册</router-link>
              </template>

            </div>
          </Col>
        </Row>
      </header>
    </div>

    <div v-else :class="{'header':true,'ifshow':postheadershow}" id="show-in-post">
      <header class="p-container">
        {{this.$store.state.post_title}}
      </header>
    </div>


  </div>

</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        droplist: [
          {title: '首页', url: '/', divided: false},
          {title: '文章', url: '/post', divided: false},
          {title: '分类', url: '/category', divided: false},
          {title: '专题', url: '/subject', divided: false},
          {title: '系统设计', url: '/design', divided: true},
        ],
        indexshow: '首页',
        host: 'http://127.0.0.1:6655',
        backFlag: true,
        ifshow: true,
        scrollB: 0
      }
    },
    computed: {
      avatar() {
        if (this.$store.state.userinfo) {
          return this.host + this.$store.state.userinfo.avatar
        }
      },
      postheadershow() {
        if (this.$route.name == 'postdetail') {
          this.ifshow = false
          return this.ifshow
        } else {
          this.ifshow = true
          return this.ifshow
        }
      }
    },
    mounted() {
      console.log(this.$route, '123');
      console.log(this.$store.state.userinfo);
      window.addEventListener('scroll', this.showBtn) //scroll 滚动事件
    },
    methods: {
      // 切换dropmenu 选择dropitem进行路由切换
      selectmenu(name) {
        this.indexshow = name;
      },
      //注销
      logout() {
        this.$store.commit('ClearToken');
        if (this.$route.meta.requireAuth) {
          this.$router.push({name: 'index'})
        }
      },
      showBtn() { // 计算距离顶部的高度，当高度大于40显示回顶部，小于40则隐藏（默认隐藏）
        /*获取当前页面滚动条纵坐标的位置
        IE9及以上：可以使用window.pageYOffset或者document.documentElement.scrollTop ，
        safari： window.pageYOffset 与document.body.scrollTop都可以
        Chrome：谷歌浏览器只认识document.body.scrollTop;*/
        let that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollB = scrollTop
        if (that.scrollB > 300) {
          that.backFlag = false
        } else {
          that.backFlag = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@import "../../assets/scss/base";*/

  .header {
    background: #FFF;
    width: 100%;
    border-bottom: 1px solid #F1F1F1;
    font-size: 16px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 250;

    .simpleheaderlogo img {
      position: relative;
      top: 10px;
      left: 7.5px;
    }
  ;

    .superheaderlogo img {
      position: relative;
      top: 12.5px;
      text-align: center;
    }
  ;

    .headerdropmenu {
      text-align: center;

      .ivu-dropdown-item {
        font-size: 14px !important;
      }
    }
  ;

    .navlist {
      display: inline-block;
      height: 60px;

      li {
        float: left;
      }
    ;

      li + li {
        margin-left: 20px;
      }
    }
  ;

    .about {
      text-align: center;
    }

    @media (min-width: 1200px) {
      .about {
        text-align: right;
      }
    };

    .header-search {
      width: 90%;
      margin: 0 auto;
    }
  ;

    .auth {
      text-align: right;
      color: #007fff;
      cursor: pointer;
      padding-right: 5px;
      margin-left: -10px;

      .ivu-dropdown-item {
        text-align: center;
        font-size: 14px !important;
        /*padding: 2px 5px;*/
      }
    }
  }

  .ifshow {
    display: none;
  }

  #show-in-post{
    padding-left: 2rem;
    font-size: 2rem;

  }
</style>
