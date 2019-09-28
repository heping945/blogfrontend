<template>
  <div id="indexpostlist">
    <div v-for="item in postlist" :key="item.id">
      <Card :bordered="false">
        <!--信息-->
        <div class="media-list">
          {{item.author}}·
          <span v-if="$route.query.sort!='mod'">{{handleDate(item.create_date)}}</span>
          <span v-else>{{handleDate(item.mod_date)}}</span>
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
    <LoadingSpain v-show="loadingspainflag"></LoadingSpain>
    <NoContent v-if="!next"></NoContent>
  </div>
</template>

<script>
  import {getIndexPost} from '../../api/api'
  import {handleDate} from '../../assets/js/datetimeformat'
  import LoadingSpain from '../utils/LoadingSpain'
  import NoContent from '../utils/NoContent'
  import Axios from 'axios'

  export default {
    name: "IndexPostList",
    data() {
      return {
        postlist: [],
        loadingspainflag: false,
        tobottomonce: true,
        next: '',
        orderparams: {},
      }
    },
    components: {
      LoadingSpain,
      NoContent
    },
    created() {
      // 初始化postlist
      this.initIndexPost();
    },
    mounted() {
      window.addEventListener('scroll', this.scrollHander)
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollHander)
    },
    computed: {
      sortquery() {
        let query_param = this.$route.query.sort;
        switch (query_param) {
          case "latest":
            this.orderparams = {ordering: 'create_date'};
            break;
          case "popular":
            this.orderparams = {ordering: '-views_count'};
            break;
          case "mod":
            this.orderparams = {ordering: '-mod_date'};
            break;
        }
        return this.orderparams
      }
    },
    methods: {
      initIndexPost() {
        getIndexPost(
          {
            params: this.sortquery
          }
        ).then(data => {
          this.postlist = data.data.results;
          this.next = data.data.next
          console.log(data.data, '1111')
          console.log(this.postlist, '2222')
          console.log(this.next, '3333')
        }).catch(err => {
          console.log('err.response', err.response);
        })
      },
      //监视滚动条到底部的方法 ，
      scrollHander() {
        var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
        var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
        var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
        if (scr + clientHeight + 10 >= scrHeight) {
          //  滚到底部
          if (this.next && this.tobottomonce) {
            this.loadingspainflag = true
            this.tobottomonce = false
            setTimeout(() => {
              this.getmorepost()
            }, 1000)
          }
        } else {
        }
      },
      async getmorepost() {
        Axios.get(this.next).then(res => {
          this.next = res.data.next
          this.postlist = this.postlist.concat(res.data.results)
          this.tobottomonce = true
          this.loadingspainflag = false
        }).catch(err => {
          console.log(err)
        })
      }
      ,
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


</style>
