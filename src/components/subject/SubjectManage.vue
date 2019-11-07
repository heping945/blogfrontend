<template>
  <div class="commonpositiontop p-container" style="z-index: 199">
    <br>
    <Upload :action="url" :format="['md']" :data="uploaddata" name="md_File"
            :on-success="getmd">
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
    <br>
    <div>

    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import {postimgupload} from '../../api/api'
  import {getIndexPost} from '../../api/api'


  export default {
    name: "SubjectManage",
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
          topic: 1
        }
      }
    },
    computed: {
      url() {
        let u = '';
        process.env.NODE_ENV === 'development' ? u = 'http://127.0.0.1:6655/api/v1/chapter/' : u = 'https://zhaoheping.com/api/v1/chapter/';
        return u
      }
    },
    created() {

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
