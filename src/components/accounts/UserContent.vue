<template>
  <div id="user" class="p-container commonpositiontop">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="18">
        <div class="profile">
          <div class="userprofile">
                <Card :bordered="false">
              <div style="text-align:center">
                <h3>A high quality UI Toolkit based on Vue.js</h3>
                <h3><router-link :to="{name:'userposts'}">userposts</router-link></h3>
                <h3><router-link :to="{name:'userindex'}">userindex</router-link></h3>
              </div>
          </Card>
          </div>

          <div id="userdetail">
            <router-view name="userdetail"></router-view>
          </div>
        </div>
      </Col>

      <Col :xs="0" :sm="0" :md="0" :lg="6">
        <!--        <SideBarRight></SideBarRight>-->
           <Card :bordered="false">
              <div style="text-align:center">
                <h3>A high quality UI Toolkit based on Vue.js</h3>
              </div>
          </Card>
      </Col>

    </Row>
  </div>
</template>

<script>
  export default {
    name: "UserContent"
  }
</script>

<style scoped lang="scss">
  @media (min-width: 992px) {
    .profile {
      padding-right: 20px;
    }
  }

  .commonpositiontop {
    height: 100%;
    .profile {
      span {
        font-size: 14px;
      };
      .userprofile{
        margin-bottom: 1rem;
      }
    }
  }

</style>
