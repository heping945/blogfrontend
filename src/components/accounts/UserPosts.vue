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
    methods: {
      initcuruserpost(){
        getIndexPost({})
      }
    }
  }
</script>

<style scoped>

</style>
