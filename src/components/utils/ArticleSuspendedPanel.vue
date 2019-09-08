<template>
  <div class="article-suspended-panel">
    <ul>
      <li>
        <!--<Badge :count="100">-->
        <Icon type="md-thumbs-up"/>
        <!--</Badge>-->
      </li>
      <li>
        <Icon type="ios-chatbubbles"/>
      </li>
      <li>
        <Icon type="md-star"/>
      </li>
      <div>
        分享
      </div>
      <li>
        <Icon custom="icofont icon-qq" class="shareicon"/>
      </li>
      <li>
        <Icon custom="icofont icon-weixin" class="shareicon"/>
      </li>
      <li>
        <Icon custom="icofont icon-weibo1" class="shareicon"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ArticleSuspendedPanel"
  }
</script>

<style scoped lang="scss">
  .article-suspended-panel {
    position: fixed;
    top: 16rem;
    margin-left: -7rem;
    div {
      height: 36px;
      width: 36px;
      text-align: center;
      line-height: 36px;
      padding: 0 0 0 10px;
      margin: 1.5rem 0 1rem;
      font-size: 1rem;
      color: #c6c6c6;
      user-select: none;
    }
  ;
    li {
      margin: 0 0 9px 5px;
      width: 36px;
      height: 36px;
      background: white;
      border-radius: 50%;
      padding: 3px;
      border: 1px solid #f1f1f1;
      box-shadow: 0 1px 2px 0;
      .ivu-icon {
        font-size: 20px;
        color: #B2BAC2;
        position: relative;
        top: 3px;
        left: 4px;
      }
    ;
      .ivu-icon:hover {
        color: #86ADD3;
        cursor: pointer;
      }
    }
  ;
    li:last-child {
      margin: 0 0 0 5px;
    }
  }

    @media (max-width: 992px) {
    .article-suspended-panel {
      display: none;
    }
  }
  .shareicon{
    font-family: iconfont;
  }
</style>
