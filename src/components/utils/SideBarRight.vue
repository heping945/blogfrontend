<template>
  <div class="lg-index-sidebar">
    <Card :bordered="false">
      <p slot="title">关于本站</p>
      <ul>
        <li>
          后端：django drf
        </li>
        <li>
          前端：vue iview
        </li>
        <li>
          部署：gunicorn nginx
        </li>
      </ul>
      <!--      <p>-->
      <!--        后端：django   drf-->
      <!--      </p>-->
      <!--      <p>-->
      <!--        前端：vue iview-->
      <!--      </p>-->
      <!--      <p>-->
      <!--        部署 gunicorn nginx supervisor-->
      <!--      </p>-->
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
      <p>苏ICP备19007507号-1</p>
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

    li {
      margin: 5px 0;
      font-weight: 800;
    }
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
