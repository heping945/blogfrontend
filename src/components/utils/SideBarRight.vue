<template>
  <div class="lg-index-sidebar">
    <Card :bordered="false">
      <p slot="title">关于本站</p>
      <p>Content of no border type. Content of no border type. Content of no border type. Content of no border
        type. </p>
    </Card>
  </div>

</template>

<script>
  export default {
    name: "SideBarRight"
  }
</script>

<style scoped>
  .lg-index-sidebar {
    position: fixed;
    top: 80px;
    width: 240px;
  }
</style>
