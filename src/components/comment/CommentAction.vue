<template>
  <div class="commentaction">
    <div class="infoAndaction">
      <Row>
        <span v-if="i">
        {{i.create_time}}
        </span>
        <span v-if="item">
        {{item.create_time}}
         </span>
        <span class="h">
        <Button type="text" ghost @click="reply" size="small">回复</Button>
        </span>
        <span v-if="ifcandel">
        <Button type="text" ghost @click="deletec">删除</Button>
         </span>
      </Row>
      <Row v-if="f">
        <Input v-model="cv" type="textarea" :autosize="true" :maxlength="240" clearable placeholder=">__<..."/>
        <div class="confb">
          <Button @click="canc">取消</Button>
          <Button @click="postcommentdata" type="success">回复</Button>
        </div>

      </Row>

    </div>
  </div>
</template>

<script>
  import {createComment} from '../../api/api'
  import {deleteComment} from '../../api/api'

  export default {
    name: "CommentAction",
    props: ['item', 'i'],
    data() {
      return {
        f: false,
        cv: '',
        post_id: this.$route.params.id,
        cuser: this.$store.state.userinfo.username
      }
    },
    computed: {
      //判断是否有删除权限
      ifcandel() {
        if (this.i) {
          if (this.i.author.username == this.cuser) {
            return true
          }
        } else {
          if (this.item.author.username == this.cuser) {
            return true
          }
        }
      }
    },
    methods: {
      reply() {
        this.f = !this.f
      },
      canc() {
        this.f = false
      },
      postcommentdata() {
        if (this.cv) {
          if (this.item) {
            createComment(
              {
                "content": this.cv,
                "post": this.post_id,
                "reply_to": null,
                "parent_comment": this.item.id
              }
            ).then(res => {
              console.log(res)
              this.f = false
              this.cv = ''
            }).catch(err => {
              console.log(err)
            })
          } else {
            createComment(
              {
                "content": this.cv,
                "post": this.post_id,
                "reply_to": this.i.id,
                "parent_comment": this.i.parent_id
              }
            ).then(res => {
              console.log(res)
              this.f = false
              this.cv = ''
            }).catch(err => {
              console.log(err)
            })
          }
        }
      },
      deletec() {
        let t = this.i || this.item
        deleteComment({id: t.id}).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .infoAndaction {
    margin-left: 56px;
    margin-bottom: 5px;

    span {
      margin-right: 20px;
    }
  }

  .extracomment .infoAndaction {
    margin-left: 48px;
    font-size: 1rem;
  }

  .h .ivu-btn-text:hover {
    color: rebeccapurple;
  }

  .confb {
    text-align: right;
    margin-top: 5px;
  }
</style>
