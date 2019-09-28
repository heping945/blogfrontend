<template>
  <div id="searchcontent" class="p-container commonpositiontop">

    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="18">
        <div class="serachquery">
          <Card>

            <span v-for="item,index in searcharg" @click="changei(index)" :class='cindex==index? "active" :""'>{{item.title}}
              <Divider type="vertical"/></span>
            <span style="float: right">共
              <strong>{{rescount}}</strong>
              条数据</span>
          </Card>
        </div>
        <main class="searchres" v-for='r,i in searchres' v-show='cindex==i ? true : false' :name="r.type">
          <Card>
            {{r.res}}
          </Card>
        </main>

      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "SearchContent",
    data() {
      return {
        arg: '',
        rescount: 1000,
        searcharg: [
          {title: '文章'},
          {title: '标签'},
          {title: '分类'},
        ],
        searchres: [
          {res: [1212], type: 'post'},
          {res: [31313], type: 'tag'},
          {res: [12121], type: 'category'},
        ],
        cindex: 0
      }
    },
    methods: {
      changei(index) {
        this.cindex = index;
        console.log(this.$route)
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
