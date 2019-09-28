<template>
  <div class="commonpositiontop p-container">
    <!--    这里是postcontent页面-->
    <!--    <Row>-->
    <!--      <Col :xs="24" :sm="24" :md="24" :lg="24">-->
    <!--        <Icon custom="icofont icon-weixin" size="24"/>-->
    <!--      </Col>-->
    <!--    </Row>-->
    <!--    <div>-->
    <!--      <input type="file" id="upload_ele" multiple="false" accept="image/*" @change="uploadFile()" ref="img"/>-->
    <!--    </div>-->
    <!--    <hr>-->
    <!--    <br>-->
    <!--    <div><img :src="xi" alt="图"></div>-->
    <!--    <h1>测试get请求的query</h1>-->
    <!--    <button @click="getpost">getpost</button>-->
    <!--    <Table stripe :columns="columns1" :data="postlist"></Table>-->
    <hr>
    <br>
    <Upload action="http://127.0.0.1:6655/api/v1/chapter/" :format="['md']" :data="uploaddata" name="md_File"
            :on-success="getmd">
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
    <br>
    <div>
      <mavon-editor v-model="value" :boxShadow="false"
                    :toolbarsFlag="false" ref="md" :subfield="false" defaultOpen="preview"/>

    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import {postimgupload} from '../../api/api'
  import {getIndexPost} from '../../api/api'


  export default {
    name: "PostContent",
    data() {
      return {
        codestylelist: [],
        codestyle: '',
        xi: '',
        value: `<code>hello world</code>`,
        postlist: [],
        columns1: [
          {
            title: 'Title',
            key: 'title'
          },
          {
            title: 'Url',
            key: 'url'
          },
        ],
        uploaddata: {
          topic: 3
        }
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
        postimgupload(formdata).then(res => {
          alert('success')
          console.log(res.data)
          this.xi = res.data.img
        }).catch(err => {
          console.log(err.response)
        })
      },
      getpost() {
        getIndexPost(
          {
            params: {
              'page': 2
            }
          }
        ).then(data => {
          this.postlist = data.data.results
        }).catch(err => {
          console.log('err.response', err.response);
        })
      },
      getmd(response, file, fileList) {
        console.log(response)
        console.log(file)
        console.log(fileList)
        this.value = response.md_body
      }
    }
  }
</script>

<style scoped>
  .ivu-icon {
    font-family: 'iconfont'
  }
</style>
