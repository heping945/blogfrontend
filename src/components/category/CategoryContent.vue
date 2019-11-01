<template>
     <div class="p-container commonpositiontop">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="18">
        <div class="categorycontent">
          <Card>

          </Card>
        </div>
      </Col>
      <Col :xs="0" :sm="0" :md="0" :lg="6">
        <Card></Card>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default {
        name: "CategoryContent"
    }
</script>

<style scoped lang="scss">
  @media (min-width: 992px) {
    .categorycontent {
      padding-right: 20px;
    }
  }
</style>
