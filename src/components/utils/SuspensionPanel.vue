<template>
  <div class="sidebarright">
    <div class="feedbackbutton">
      <router-link to="/feedback" title="建议反馈" target="_blank">
          <Icon type="ios-chatbubbles" :size="20" color="#007FFF"/>
      </router-link>

    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>


  export default {
    name: "SuspensionPanel",
  }
</script>

<style lang="scss" scoped>
  .feedbackbutton {
    z-index: 9999;
    position: fixed;
    bottom: 70px;
    right: 30px;
    height: 30px;
    width: 30px;
    /*cursor: pointer;*/
    border-radius: 50%;
    background: white;
    border: 1px solid #f1f1f1;
    .ivu-icon{
      position: relative;
      left: 4px;
      top:4px
    };
  }

  /*backup*/
  .ivu-back-top{
    z-index: 9999;
  }
  /deep/ .ivu-back-top-inner {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background: white !important;
    border: 1px solid #f1f1f1;
    .ivu-icon {
      position: relative;
      right: 9px;
      bottom: 6px;

    }
  ;
    i {
      color: #909090;
    }
  }


</style>
