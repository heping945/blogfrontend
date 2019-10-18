<template>
  <div>
    <Card :bordered="false">

    </Card>
  </div>
</template>

<script>
  import {getIndexPost} from '../../api/api'

  export default {
    name: "UserPosts",
    data() {
      return {}
    },
    created() {
      this.initcuruserpost()
    },
    methods: {
      initcuruserpost() {
        let username = this.$route.params.username
        getIndexPost({author__username: username}).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
