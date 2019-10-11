<template>
  <div id="indexpostlist">
    <!--        <div v-for="item in postlist" :key="item.id">-->
    <Card :bordered="false">
      <!--            &lt;!&ndash;信息&ndash;&gt;-->
      <!--            <div class="media-list">-->
      <!--              {{item.author}}·-->
      <!--      <span v-if="$route.query.sort!='mod'">{{handleDate(item.create_date)}}</span>-->
      <!--      <span v-else>{{handleDate(item.mod_date)}}</span>-->
      <!--              ·{{item.category}}-->
      <!--            </div>-->
      <!--            &lt;!&ndash;标题&ndash;&gt;-->
      <!--            <div class="title">-->
      <!--              <router-link :to="'/post/'+item.id">{{item.title}}</router-link>-->
      <!--            </div>-->
      <!--            &lt;!&ndash;操作列表&ndash;&gt;-->
      <!--            <div class="action-list">-->
      <!--              <ButtonGroup size="small">-->
      <!--                <Button icon="ios-thumbs-up" disabled>{{item.upvote_count}}</Button>-->
      <!--                <Button icon="md-chatbubbles" disabled>{{item.comment_count}}</Button>-->
      <!--                <Button icon="md-eye" disabled>{{item.views_count}}</Button>-->
      <!--              </ButtonGroup>-->
      <!--            </div>-->
      <List item-layout="vertical">
        <ListItem v-for="item in postlist" :key="item.id" @click.native="todetail(item)">
          <ListItemMeta :avatar="item.author.avatar" :title="item.title" :description="item.excerpt|excerptshort"/>
          <template slot="action">
            <li>
              <Icon type="ios-thumbs-up"/>
              {{item.upvote_count}}
            </li>
            <li>
              <Icon type="md-chatbubbles"/>
              {{item.comment_count}}
            </li>
            <li>
              <Icon type="md-eye"/>
              {{item.views_count}}
            </li>
            <li v-if="$route.query.sort!='mod'">
              <Icon type="md-calendar"/>
              {{handleDate(item.create_date)}}

            </li>
            <li v-else>
              <Icon type="md-calendar"/>
              {{handleDate(item.mod_date)}}
            </li>
          </template>
          <template slot="extra">
            <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
          </template>
        </ListItem>
      </List>
    </Card>
    <!--        </div>-->

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
        time: '1111111'
      }
    },
    components: {
      LoadingSpain,
      NoContent
    },
    filters: {
      excerptshort(value) {
        return value.slice(0, 35) + '……'
      }
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
          case "oldest":
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
          this.sortquery
        ).then(data => {
          this.postlist = data.data.results;
          this.next = data.data.next
          // console.log(data.data, '1111')
          // console.log(this.postlist, '2222')
          // console.log(this.next, '3333')
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
      handleDate,
      xx(x) {
        console.log(x)
      },
      todetail(item) {
        this.$router.push({name: 'postdetail', params: {id: item.id}})
      }
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

  .ivu-list-item-action > li {
    cursor: default;
  }

  .ivu-list-item {
    cursor: pointer;
  }
</style>
