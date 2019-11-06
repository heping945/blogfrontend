<template>
  <div class="p-container commonpositiontop">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="18">
        <div class="subjectindex">
          <Card>
            <Button @click="fn1">dianwo</Button>
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
    name: "SubjectIndex",
    data() {
      return {}
    },
    created() {
      console.log(moment('2019-11-01 02:19').fromNow())
      console.log(moment)
    },
    methods: {
      fn1() {
        this.$router.push({name: 'subjectcontent', params: {title: 'django', id: 111}})
      }
    }
  }
</script>

<style scoped lang="scss">
  @media (min-width: 992px) {
    .subjectindex {
      padding-right: 20px;
    }
  }
</style>
