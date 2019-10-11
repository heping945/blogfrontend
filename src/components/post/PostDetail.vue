<template>
  <div id="postdetail" class="postdetail p-container commonpositiontop">
    <ArticleSuspendedPanel></ArticleSuspendedPanel>
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="18">
        <!--左侧文章区域-->
        <article class="lg-left-main">
          <Card :bordered="true" style="background: #fbfbfb">
            <!--头侧作者信息区-->
            <div class="author-info-box" style="width: 100%;min-height: 40px">
              <div style="float: left;margin-top: 5px">
                <Avatar icon="ios-person" :src="author.avatar"/>
              </div>
              <div style="float: left">
                <div style="font-size: 1.3rem;font-weight: bold;margin: 1px 0 1px 5px;color: #333333">
                  <div v-if="author.nickname">
                    {{author.nickname}}
                  </div>
                  <div v-else v-text="author.username"></div>
                </div>
                <div style="font-size: 1.1rem;margin: 12px 0 0 5px">
                  {{fomatdate}}&nbsp;&nbsp;阅读 {{postdatail.views_count}}
                </div>
              </div>

              <div style="float:right;">
                <template v-if="ifAuthor">
                  <Button type="default" icon="ios-create-outline" size="small"
                          class="xs-sm-hidden" @click="toedit" ghost>编辑
                  </Button>
                </template>
                <template v-else>
                  <Button type="default" size="small" ghost>关注</Button>
                </template>
              </div>
            </div>
            <!--标题-->
            <h3 style="text-align: center">{{postdatail.title}}</h3>
            <!--主体文章body区-->
            <main>
              <mavon-editor v-model="value" :codeStyle="postdatail.codestyle" :boxShadow="false"
                            :toolbarsFlag="false" ref="md" :subfield="false" defaultOpen="preview"/>
            </main>
          </Card>
        </article>
        <!--        评论区-->
        <div id="hpcomment">
          <CommentList></CommentList>
        </div>

      </Col>
      <!--右侧响应式面板区域-->
      <Col :xs="0" :sm="0" :md="0" :lg="6">
        <!--        <SideBarRight></SideBarRight>-->
        <!--        <compoent is="SideBarRight"></compoent>-->
        <!--        <div style="position: fixed;top: 100px;width:240px;padding: 14px 16px;font-size: 1.2rem" v-if="catlog.length">-->
        <!--          <Anchor show-ink >-->
        <!--            <div v-for="item in catlog">-->
        <!--              <AnchorLink :href="'#'+item.id" :title="item.title"/>-->
        <!--            </div>-->
        <!--          </Anchor>-->
        <!--        </div>-->
        <CatLog :catlog="catlog"></CatLog>

      </Col>
    </Row>
    <SuspensionPanelBottom v-if="bottom"></SuspensionPanelBottom>
    <SuspensionPanel></SuspensionPanel>
  </div>
</template>

<script>
  import {getPostDetail} from '../../api/api'
  import {getFav} from '../../api/api'
  import {getAllFavs, getAllVote} from '../../api/api'
  import {dateFormat} from '../../assets/js/dateformat'
  import {toToc} from '../../assets/js/transtoc'
  import SideBarRight from '../utils/SideBarRight'
  import ArticleSuspendedPanel from '../utils/ArticleSuspendedPanel'
  import SuspensionPanelBottom from '../utils/SuspensionPanelBottom'
  import SuspensionPanel from '../utils/SuspensionPanel'
  import CatLog from '../utils/CatLog'
  import CommentList from '../comment/CommentList'
  import authenticate from '../../assets/js/authenticate'

  import {mapActions} from 'vuex'
  import Axios from 'axios'


  export default {
    name: "PostDetail",
    data() {
      return {
        value: `<code>hello world</code>`,
        author: {},
        postdatail: {},
        toolbars: {
          readmodel: true,
        },
        catlog: [],
        ifauthor: false,
        ifauth: false,
        bottom: false
      }
    },
    components: {
      SideBarRight,
      ArticleSuspendedPanel,
      SuspensionPanelBottom,
      SuspensionPanel,
      CatLog,
      CommentList
    },
    computed: {
      fomatdate() {
        return dateFormat(this.postdatail.create_date)
      },
      authstate() {
        if (authenticate.ifLogin()) {
          this.ifauth = true
          return this.ifauth
        }
      },
      ifAuthor() {
        let aname = this.author.username
        if (authenticate.ifCurrentUser(aname)) {
          this.ifauthor = true
          return this.ifauthor
        }
      }
    },
    created() {
      this.initdata();
      if (this.$store.state.userinfo.token) {
        this.initFavsVote();
      }
    },
    methods: {
      ...mapActions(['PostFavstate', 'PostVotestate', 'PostUpvoteCount']),
      // 初始化post数据
      initdata() {
        getPostDetail(
          {id: this.$route.params.id}
        ).then(
          res => {
            this.postdatail = res.data;
            this.PostUpvoteCount(this.postdatail.upvote_count);
            this.author = this.postdatail.author;
            this.catlog = this.toToc(this.postdatail.body)
            // 配置 postdetail 页的标题栏
            this.$store.dispatch('SetPostTitle', this.postdatail.title);

            if (this.$store.state.userinfo.username) {
              if (this.$store.state.userinfo.username == this.author.username) {
                this.editauth = true
              }
            } else {
            }
            if (this.postdatail.body_md) {
              this.value = this.postdatail.body_md;
            } else {
              this.value = this.postdatail.body
            }
          }
        ).catch(
          err => {
            // 返回首页
            this.$router.push('/')
          }
        )
      },
      initFavsVote() {
        Axios.all([getAllFavs(), getAllVote()]).then(Axios.spread((favres, voteres) => {
          //处理fav数据
          let favlist = favres.data.results;
          let f = favlist.filter(item => {
            return item.post == this.$route.params.id
          });
          if (f.length) {
            this.PostFavstate(true)
          } else {
            this.PostFavstate(false)
          }
          //处理vote数据
          let votelist = voteres.data.results;
          let v = votelist.filter(item => {
            return item.post == this.$route.params.id
          });
          console.log(v)
          if (v.length) {
            console.log(v[0].vote, 'vvvvvvvvvvvvvvvvvvvvvvvvvv')
            this.PostVotestate(v[0].vote)
          } else {
            this.PostVotestate(null)
          }
        })).catch(Axios.spread((faverr, voteerr) => {
          console.log(faverr, 'faverr');
          console.log(voteerr, 'voteerr');
        }));
      },
      dateFormat,
      toToc,
      // 跳转到文章编辑页面
      toedit() {
        const postid = this.$route.params.id;
        this.$router.push({name: "PostEdit", params: {id: postid}})
      },
    }
  }
</script>

<style scoped lang="scss">

  @media (min-width: 992px) {
    /*宽度大于992px时，main区增加右内边距20px*/
    .lg-left-main {
      padding-right: 20px;
    }
    #hpcomment {
      padding-right: 20px;
    }
  }

  @media (max-width: 765px) {
    .xs-sm-hidden {
      display: none;
    }
  }

  .postdetail {
    z-index: 240;
    margin-bottom: 2rem;

    .v-show-content {
      padding: 0 0;
    }
  }

  .lg-left-main {
    h3 {
      font-size: 2.5rem;
      margin: 1.6rem 0;
    }
  ;

    .author-info-box {
      width: 100%;
      height: 40px;
      margin: 1.6rem 0;
    }
  }

  @media (max-width: 576px) {
    .lg-left-main {
      h3 {
        font-size: 2rem;
        margin: 1.3rem 0;
      }
    }
  }

  #hpcomment{
    margin-top: 2rem;
  }
</style>
