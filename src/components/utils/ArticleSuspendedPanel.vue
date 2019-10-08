<template>
  <div class="article-suspended-panel">
    <ul>
      <li>
        <Icon type="md-thumbs-up"/>
      </li>
      <li>
        <Icon type="ios-chatbubbles"/>
      </li>
      <li :class='favstate? "fav" :""' @click="favOrdisfav">
        <Icon type="md-star"/>
      </li>
      <div>
        分享
      </div>
      <li>
        <Icon custom="icofont icon-qq" class="shareicon"/>
      </li>
      <li>
        <Icon custom="icofont icon-weixin" class="shareicon"/>
      </li>
      <li>
        <Icon custom="icofont icon-weibo1" class="shareicon"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import {delFav} from '@/api/api'
  import {addFav} from '@/api/api'
  import {mapActions, mapGetters, mapState} from 'vuex'


  export default {
    name: "ArticleSuspendedPanel",
    props: ['hasFav',],
    data() {
      return {
        curhasfav: this.$store.state.favstate
      }
    },
    computed: {
      ...mapGetters({
        favstate: 'favstate'
      }),
      ...mapState({
        post_title: 'post_title'
      })
    },
    methods: {
      ...mapActions(['PostFavstate']),
      favOrdisfav() {
        let postid = this.$route.params.id
        //已收藏
        let log = this.$store.state.userinfo.token;
        if (!log){
          this.needlog()
          return
        }
        if (this.favstate) {
          delFav(postid).then(res => {
            console.log(res);
            this.$Notice.open({
              title: '取消收藏成功',
              duration: 1
            });
            this.PostFavstate(false)
            console.log(this.$store.state.favstate, '之前是yes，现在该变成false了')
          }).catch(err => {
            console.log(err.response, 'hasfav')
          })
        } else {
          //未收藏
          addFav(
            {post: postid}
          ).then(res => {
            console.log(res);
            this.$Notice.open({
              title: '文章“' + this.post_title + '”收藏成功',
              duration: 1
            });
            this.PostFavstate(true)
          }).catch(err => {
            console.log(err.response, 'nohasfav')
          })
        }
      },
      needlog() {
        if (!this.$store.state.userinfo.token) {
          // 未登录
          this.$Message.error({
            content: "您尚未登录,将返回登录页面",
            duration: 1,
          });
          setTimeout(
            ()=>{
              this.$router.push({name: 'Login', query: {backurl: 'post/' + this.$route.params.id}})
            }, 600
          );
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .article-suspended-panel {
    position: fixed;
    top: 16rem;
    margin-left: -7rem;

    div {
      height: 36px;
      width: 36px;
      text-align: center;
      line-height: 36px;
      padding: 0 0 0 10px;
      margin: 1.5rem 0 1rem;
      font-size: 1rem;
      color: #c6c6c6;
      user-select: none;
    }
  ;

    li {
      margin: 0 0 9px 5px;
      width: 36px;
      height: 36px;
      background: white;
      border-radius: 50%;
      padding: 3px;
      border: 1px solid #f1f1f1;
      box-shadow: 0 1px 2px 0;

      .ivu-icon {
        font-size: 20px;
        color: #B2BAC2;
        position: relative;
        top: 3px;
        left: 4px;
      }
    ;

      .ivu-icon:hover {
        color: #86ADD3;
        cursor: pointer;
      }
    }
  ;

    li:last-child {
      margin: 0 0 0 5px;
    }
  }

  @media (max-width: 992px) {
    .article-suspended-panel {
      display: none;
    }
  }

  .fav .ivu-icon {
    color: gold !important;
  }
</style>
