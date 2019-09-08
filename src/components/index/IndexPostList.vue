<template>
  <div id="indexpostlist">
    <div v-for="item in postlist" :key="item.id">
      <Card :bordered="false">
        <!--信息-->
        <div class="media-list">
          {{item.author}}·
          {{handleDate(item.create_date)}}
          ·{{item.category}}
        </div>
        <!--标题-->
        <div class="title">
          <router-link :to="'/post/'+item.id">{{item.title}}</router-link>
        </div>
        <!--操作列表-->
        <div class="action-list">
          <ButtonGroup size="small">
            <Button icon="ios-thumbs-up">{{item.upvote_count}}</Button>
            <Button icon="md-chatbubbles">{{item.comment_count}}</Button>
            <Button icon="md-eye">{{item.views_count}}</Button>
          </ButtonGroup>
        </div>
      </Card>
    </div>
    <!--    <div class="bottommore"></div>-->
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import {getIndexPost} from '../../api/api'
  import {handleDate} from '../../assets/js/datetimeformat'

  export default {
    name: "IndexPostList",
    data() {
      return {
        postlist: []
      }
    },
    created() {
      // 初始化postlist
      this.initIndexPost();
      console.log(handleDate('2019-08-08T17:07:14.281579'))
    },
    computed: {},
    methods: {
      initIndexPost() {
        getIndexPost(
          {}
        ).then(data => {
          this.postlist = data.data.results
          console.log('this.postlist------->', this.postlist);
          console.log(data)
        }).catch(err => {
          console.log('err.response', err.response);
          console.log("xwxsssssssssssssssss");

        })
      },
      handleDate
    }
  }
</script>

<style scoped>
  .media-list {
    color: #b2bac2;
    font-size: 1rem;
  }

  .title {
    margin: 6px 0 12px;
    font-size: 1.66rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .bottommore {
    height: 1020px;
  }
</style>
