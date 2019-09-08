<template>
  <div class="indexcontent p-container commonpositiontop">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="18">
        <div class="indexpost">
          <Card :bordered="false">
            <p>
              <span>
                <router-link :to="{name:'index',query:{sort:'latest'}}">最新</router-link>
              </span>
             &nbsp;| &nbsp;
              <router-link :to="{name:'index',query:{sort:'popular'}}">热门</router-link>
            </p>
          </Card>
          <div id="postlist">
            <IndexPostList></IndexPostList>
          </div>

        </div>
      </Col>

        <Col :xs="0" :sm="0" :md="0" :lg="6">
  <SideBarRight></SideBarRight>
        </Col>

    </Row>
    <SuspensionPanel></SuspensionPanel>
  </div>
</template>

<script>
  import SuspensionPanel from '../utils/SuspensionPanel'
  import SideBarRight from '../utils/SideBarRight'
  import IndexPostList from './IndexPostList'

  export default {
    name: "IndexContent",
    data() {
      return {}
    },
    components: {
      SuspensionPanel,
      IndexPostList,
      SideBarRight
    },
    mounted() {
      var _screenwidth = document.body.offsetWidth;
      this.screenwidth = _screenwidth
      console.log(this.screenwidth)
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

  @media (min-width: 992px) {
    .indexpost {
      padding-right: 20px;
    }
  }

  .indexcontent {
    height: 100%;
    .indexpost {
      span {
        font-size: 14px;
      }
    }
  }

</style>
