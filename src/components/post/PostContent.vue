<template>
  <div class="commonpositiontop p-container" >
    这里是postcontent页面
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
      <Icon custom="icofont icon-weixin" size="24" />
      </Col>

    </Row>
  </div>
</template>

<script>
  import Axios from 'axios'


  export default {
    name: "PostContent",
    data() {
      return {
        codestylelist: [],
        codestyle: ''
      }
    },
    async created() {
      let codestyle = await Axios.get('./static/codestyle.json')
      this.codestylelist = codestyle.data.codestyle
      console.log(this.codestylelist.codestyle)
    },
    methods: {}
  }
</script>

<style scoped>
.ivu-icon{
  font-family: 'iconfont'
}
</style>
