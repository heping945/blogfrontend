<template>
  <div >
    <h1>个人资料</h1>
    <ul>
      <li style="height: 70px;padding: 12px 0;border-bottom:1px solid #F4F5F5;line-height: 45px" v-for="i in 6">
        <Row>
          <Col span="4">title</Col>
          <Col span="18">title</Col>
          <Col span="2">xxxxxxx</Col>
        </Row>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Profile"
  }
</script>

<style scoped>
  h1 {
    font-size: 2rem;
    font-weight: bold;
    padding: 16px 0;
    border-bottom: 1px solid #F4F5F5;
  }
</style>
