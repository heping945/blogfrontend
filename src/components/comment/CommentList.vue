<template>
  <div id="commentlist">
    <Card :bordered="true" style="background: #fbfbfb">
      <div class="commentlist">
        <List item-layout="vertical">

          <ListItem v-for="item,index in commentlist" :key="item.id">
            <div class="maincomment">
              <ListItemMeta
                :avatar="item.author.avatar"
                :title="item.author.username+' ： '+item.content"/>
              <CommentAction :item="item"></CommentAction>
            </div>

            <div class="extracomment" v-if="item.sub_comments">

              <List item-layout="vertical" v-for="i in item.sub_comments" :key="i.id">
                <ListItemMeta v-if="i.reply_to"
                  :avatar="i.author.avatar"
                  :title="i.author.username+'：@'+i.reply_to.author.username+'：'+i.content"/>
                <ListItemMeta v-else
                  :avatar="i.author.avatar"
                  :title="i.author.username+'：'+i.content"/>
                <CommentAction :i="i"></CommentAction>

              </List>
            </div>

          </ListItem>

        </List>
      </div>
      <div class="addcomment">
        <Input v-model="newcom" type="textarea" :autosize="true" :maxlength="240" clearable placeholder=">__<..."/>
      </div>
    </Card>
  </div>
</template>

<script>
  import CommentAction from './CommentAction'
  import {getComment} from '../../api/api'
  import {createComment} from '../../api/api'

  export default {
    name: "CommentList",
    components: {
      CommentAction
    },
    data() {
      return {
        newcom: 'hello world',
        comment: [
          {
            username: 'heping',
            avatar: 'http://127.0.0.1:6655/media/avatars/heping--7132df/avatar/521eb36d.gif',
            content: 'hp太帅了爱了',
            time: '2019-8-8',
            id: 1,
            sub_comment: null
          },
          {
            username: 'jack',
            avatar: 'http://127.0.0.1:6655/media/avatars/default.png',
            content: 'dsdwsdwdwd',
            time: '2019-8-3',
            id: 5,
            parent: null,
            sub_comment: [
              {
                username: 'heping',
                id: 3,
                avatar: 'http://127.0.0.1:6655/media/avatars/heping--7132df/avatar/521eb36d.gif',
                content: 'dwdwdwdwdwdwd',
                time: '2019-4-8',
                reply_to: null
              },
              {
                username: 'jack',
                avatar: 'http://127.0.0.1:6655/media/avatars/default.png',
                content: '哈哈水中贵族xxxxxxxxxx',
                id: 4,
                time: '3232-9-8',
                reply_to: 3
              },
            ]
          },
          {
            username: 'jack',
            avatar: 'http://127.0.0.1:6655/media/avatars/default.png',
            content: '你好啊哥哥',
            time: '2019-8-3',
            id: 6,
            sub_comment: [
              {
                username: 'heping',
                id: 3,
                avatar: 'http://127.0.0.1:6655/media/avatars/heping--7132df/avatar/521eb36d.gif',
                content: '没有啊嘻嘻',
                time: '2019-4-8',
                reply_to: null
              },
              {
                username: 'jack',
                avatar: 'http://127.0.0.1:6655/media/avatars/default.png',
                content: '哈哈哈哈哈埃斯你了',
                id: 4,
                time: '3232-9-8',
                reply_to: 3
              },
            ]
          },
        ],
        commentquery: {},
        commentlist: []
      }
    },
    computed: {
      cq() {
        let post_id = this.$route.params.id;
        this.commentquery = {exist_parent_comment: 2, post: post_id}
        return this.commentquery
      }
    },
    mounted() {
      this.initcommentlist()
    },
    methods: {
      initcommentlist() {
        getComment(this.cq).then(res => {
          this.commentlist = res.data.results
          console.log(this.commentlist)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #commentlist {
  }

  /*以下是恢复列表框内容的定制*/
  /*额外操作行（extra）*/
  .ivu-list-vertical .ivu-list-item-extra li {
    display: inline-block;
    margin-top: 20px;
    margin-right: 20px;
  }

  /*头像*/
  /deep/ .ivu-avatar {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
  }

  /deep/ .extracomment .ivu-avatar {
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
  }

  /deep/ .ivu-list-vertical .ivu-list-item-meta-title {
    /*padding-right: 100px;*/
  }

  /* 主回复操作行*/
  .maincomment .ivu-list-item-action {
    margin-top: 0;
    margin-left: 56px;
  }

  /*item-meta外边距*/
  .ivu-list-vertical .ivu-list-item-meta {
    margin-bottom: 0;
  }

  /deep/ .ivu-list-item-action > li .ivu-icon {
    /*margin-right: 3px;*/
  }

  /*  子评论*/
  .extracomment {
    margin-left: 15px;
    padding-left: 25px;
    border-left: 2px solid #8a8a8a;

    /deep/ .ivu-list-item-meta-title {
      font-weight: 400;
    }
  }


</style>
