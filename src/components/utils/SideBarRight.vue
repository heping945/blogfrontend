<template>
  <div class="lg-index-sidebar">
    <Card :bordered="false">
      <p slot="title">关于本站</p>
      <p>Content of no border type. Content of no border type. Content of no border type. Content of no border
        type. </p>
    </Card>
    <div class="info">
      <p>
        <span> <a href="">关于</a></span>
        ·
        <span>使用指南</span>
      </p>
      <p>
        <span><a href="/feedback" target="_blank">建议反馈</a></span>
        ·
        <span>联系作者</span>
      </p>
    </div>
  </div>

</template>

<script>
  export default {
    name: "SideBarRight"
  }
</script>

<style scoped lang="scss">
  .lg-index-sidebar {
    position: fixed;
    top: 80px;
    width: 240px;
  }

  .info {
    color: #909090;
    font-size: 1rem;
    line-height: 1.6;
    margin-top: 1rem;

    a:hover {
      color: #007fff;
    }
  }
</style>
