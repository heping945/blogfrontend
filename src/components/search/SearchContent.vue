<template>
  <div id="searchcontent" class="p-container commonpositiontop">

    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="18">
        <div class="serachquery">
          <Card>
            <span v-for="item,index in searcharg" @click="changei_search(index,item)">
              <router-link :to="{name:'search',query:{q:arg,type:item.type}}"
                           :class='cindex==index? "active" :""'>
                {{item.title}}
              </router-link>
              <Divider type="vertical"/></span>
            <span style="float: right">共
              <strong>{{rescount}}</strong>
              条数据</span>
          </Card>
        </div>
        <main class="searchres" v-for='r,i in searchres' v-show='cindex==i ? true : false'>
          <Card :name="r.type">
            {{r.res}}
          </Card>
        </main>
      </Col>
    </Row>
  </div>
</template>

<script>
  import storage from '../../assets/js/storage'
  import {search} from '@/api/api'

  export default {
    name: "SearchContent",
    data() {
      return {
        arg: '',
        type: '',
        rescount: 1000,
        searcharg: [
          {title: '文章', type: 'post'},
          {title: '标签', type: 'tag'},
          {title: '分类', type: 'category'},
        ],
        searchres: [
           {id:0,res: [1212], type: 'post'},
          {id:1,res: [31313], type: 'tag'},
          {id:2,res: [12121], type: 'category'},
        ],
        cindex: 0,
      }
    },
    mounted() {
      let res = storage.get('searcharg', '')
      if (res) {
        this.arg = res;
        this.initsearch()
      }
      ;
    },
    methods: {
      changei_search(index, item) {
        this.cindex = index;
        // console.log(this.$route.query)
        this.initsearch()
      },
      initsearch() {
        let type = this.$route.query.type
        let searchq = this.$route.query.q
        search(
          {
            type: type,
            keyword: {search: searchq}
          }
        ).then(res => {
          console.log(res);
          console.log(this.searchres)
          console.log(type)
          var r = this.searchres.filter(item => {
            return item.type == type
          })[0];
          // console.log(r)
          // r.res = res.data
          console.log(r, '<-----r的值是')
          // console.log(res.data.results)
          r.res = res.data.results
          this.rescount = res.data.count
          console.log(r, '<-----r的值是')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .serachquery {
    span {
      cursor: pointer;
    }
  }

  .searchres {
    margin-top: 1rem;

  }

  .active {
    color: red;
  }
</style>
