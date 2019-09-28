<template>
  <div >
    <div class="topfix">
      <div class="p-container topixtop">
        <ul>
          <li v-for="item,index in tablist" @click="changei(index)">
            <router-link :to="{name:item.pathname}" :class='cindex==index? "active" :""'>{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>

    <main >
      <Card>
        <router-view name="settingtab"></router-view>
      </Card>
    </main>

  </div>
</template>

<script>
  export default {
    name: "SettingsContent",
    data() {
      return {
        tablist: [
          {title: '个人资料', pathname: 'settprofile'},
          {title: '文章管理', pathname: 'settposts'},
        ],
        cindex:0
      }
    },
    methods:{
      changei(i){
        this.cindex=i
      }
    }
  }
</script>

<style scoped lang="scss">
  .topfix {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: #FFF;
    width: 100%;
    height: 4rem;

    .topixtop {
      line-height: 4rem;
      font-size: 1.1rem;

      li {
        display: inline;
        margin-right: 1rem;
        margin-left: 5px;
      }
    }
  }

  @media (max-width: 576px) {
    .topfix {
      top: 50px;
    }
  }
main{
  position: relative;
  top: 120px;
  z-index: 100;
}

</style>
