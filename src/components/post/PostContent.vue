<template>
  <div class="commonpositiontop p-container">
    这里是postcontent页面
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Icon custom="icofont icon-weixin" size="24"/>
      </Col>
    </Row>
    <div>
      <input type="file" id="upload_ele" multiple="false" accept="image/*" @change="uploadFile()" ref="img"/>
    </div>
    <hr>
    <br>
    <div><img :src="xi" alt="图"></div>
    <div><img src="http://127.0.0.1:6655/media/postserver/img/20190916233953-650.png" alt=""></div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import {postimgupload} from '../../api/api'


  export default {
    name: "PostContent",
    data() {
      return {
        codestylelist: [],
        codestyle: '',
        xi:''
      }
    },
    async created() {
      let codestyle = await Axios.get('./static/codestyle.json')
      this.codestylelist = codestyle.data.codestyle
      // console.log(this.codestylelist.codestyle)
    },
    methods: {
      uploadFile() {
        var img = this.$refs.img.files[0]
        var formdata = new FormData();
        formdata.append('img', img);
        // Axios({
        //   url: 'http://127.0.0.1:6655/api/v1/postimg/',
        //   method: 'post',
        //   data: formdata,
        //   headers: {'Content-Type': 'multipart/form-data'},
        postimgupload(formdata).then(res=>{
          alert('success')
          console.log(res.data)
          this.xi = res.data.img
        }).catch(err=>{
          console.log(err.response)
        })
      }
    }
  }
</script>

<style scoped>
  .ivu-icon {
    font-family: 'iconfont'
  }
</style>
