<template>
  <div class="commentaction">
    <div class="infoAndaction">
      <Row>

      </Row>
      <span v-if="i">
        {{i.time}}
      </span>
        <span v-if="item">
        {{item.time}}
      </span>
      <span>
        <Button type="text">回复</Button>
      </span>
      <span>
        <Button type="text" ghost>删除</Button>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentAction",
    props:['item','i']
  }
</script>

<style scoped lang="scss">
  .infoAndaction {
    margin-left: 56px;
    margin-bottom: 5px;

    span {
      margin-right: 20px;
    }
  }
</style>
