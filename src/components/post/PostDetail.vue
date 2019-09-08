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
              <div style="float: left">
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
                          class="xs-sm-hidden" @click="toedit">编辑
                  </Button>
                </template>
                <template v-else>
                  <Button type="default" size="small">关注</Button>
                </template>
              </div>
              <div style="clear: both">

              </div>

            </div>
            <!--标题-->
            <h3>{{postdatail.title}}</h3>
            <!--主体文章body区-->
            <main>
              <mavon-editor v-model="value" :codeStyle="postdatail.codestyle" :boxShadow="false"
                            :toolbarsFlag="false" ref="md" :subfield="false" defaultOpen="preview"/>
            </main>

          </Card>
        </article>
      </Col>
      <!--右侧响应式面板区域-->
      <Col :xs="0" :sm="0" :md="0" :lg="6">
<!--        <SideBarRight></SideBarRight>-->
        <compoent is="SideBarRight"></compoent>
      </Col>
    </Row>
    <SuspensionPanelBottom></SuspensionPanelBottom>
    <SuspensionPanel></SuspensionPanel>
  </div>
</template>

<script>
  import {getPostDetail} from '../../api/api'
  import {dateFormat} from '../../assets/js/dateformat'
  import SideBarRight from '../utils/SideBarRight'
  import ArticleSuspendedPanel from '../utils/ArticleSuspendedPanel'
  import SuspensionPanelBottom from '../utils/SuspensionPanelBottom'
  import SuspensionPanel from '../utils/SuspensionPanel'
  import authenticate from '../../assets/js/authenticate'


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
        ifauthor: false,
        ifauth: false
      }
    },
    components: {
      SideBarRight,
      ArticleSuspendedPanel,
      SuspensionPanelBottom,
      SuspensionPanel,
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

    },
    methods: {
      // 初始化post数据
      initdata() {
        getPostDetail(
          {id: this.$route.params.id}
        ).then(
          res => {
            this.postdatail = res.data;
            this.author = this.postdatail.author;
            this.$store.commit('SetPostTitle', this.postdatail.title);
            console.log(this.author, '22222222222222')
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
      dateFormat,
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
    .lg-left-main {
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

</style>
