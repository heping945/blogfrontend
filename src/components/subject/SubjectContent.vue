<template>
  <div class="commonpositiontop scindex">
    <div id="chaptersummary">
      <Card :style="{'margin-left':(collAndshadow?'-320px':0)}">
        <Timeline>
          <TimelineItem color="green">发布1.0版本</TimelineItem>
          <TimelineItem color="green">发布2.0版本</TimelineItem>
          <TimelineItem color="red">严重故障</TimelineItem>
          <TimelineItem color="blue">发布3.0版本</TimelineItem>
          <TimelineItem color="green">发布1.0版本</TimelineItem>
          <TimelineItem color="green">发布2.0版本</TimelineItem>
          <TimelineItem color="red">严重故障</TimelineItem>
          <TimelineItem color="blue">发布3.0版本</TimelineItem>
          <TimelineItem color="green">发布1.0版本</TimelineItem>
          <TimelineItem color="green">发布2.0版本</TimelineItem>
          <TimelineItem color="red">严重故障</TimelineItem>
          <TimelineItem color="blue">发布3.0版本</TimelineItem>
          <TimelineItem color="green">发布1.0版本</TimelineItem>
          <TimelineItem color="green">发布2.0版本</TimelineItem>
          <TimelineItem color="red">严重故障</TimelineItem>
          <TimelineItem color="blue">发布3.0版本</TimelineItem>
          <TimelineItem color="green">发布1.0版本</TimelineItem>
          <TimelineItem color="green">发布2.0版本</TimelineItem>
          <TimelineItem color="red">严重故障</TimelineItem>
          <TimelineItem color="blue">发布3.0版本</TimelineItem>
          <TimelineItem color="green">发布1.0版本</TimelineItem>
          <TimelineItem color="green">发布2.0版本</TimelineItem>
          <TimelineItem color="red">严重故障</TimelineItem>
          <TimelineItem color="blue">发布3.0版本</TimelineItem>
        </Timeline>
      </Card>
    </div>
<!--    <button @click="coll=!coll;ifdisplay=false" style="margin-left: 400px;margin-top: -100px">点击</button>-->
    <Row>
      <Col :xs="0" :sm="0" :md="24" :lg="24">
        <div class="chaptercontent" :style="{'margin-left':(collAndshadow?'0':'320px')}">
          <Card>
            <mavon-editor v-model="value" codeStyle="monokai" :boxShadow="false"
                          :toolbarsFlag="false" ref="md" :subfield="false" defaultOpen="preview"/>

          </Card>
        </div>
      </Col>
      <Col :xs="24" :sm="24" :md="0" :lg="0">
        <div class="chaptercontent">
          <Card>
            <mavon-editor v-model="value" codeStyle="monokai" :boxShadow="false"
                          :toolbarsFlag="false" ref="md" :subfield="false" defaultOpen="preview"/>

          </Card>
        </div>
      </Col>
    </Row>
    <div :class="{shadow:true,ifdisplay:collAndshadow} " @click="setcollAndshadow"></div>

    <SuspensionPanel></SuspensionPanel>
  </div>
</template>

<script>
  const SuspensionPanel = () => import('@/components/utils/SuspensionPanel')
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "SubjectContent",
    components: {
      SuspensionPanel
    },
    data() {
      return {
        coll: true,
        ifdisplay: true,
        value: '# 服务器 5：【单进程异步】模型服务器 5：【单进程异步】模型服务器 5：【单进程异步】模型\n' +
          '\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '本小节我们开始讲 RPC 的异步模型。异步模型是现代服务器的通用模型，它比古典的同步模型在效率上要高出一大截，但是编程难度上也要加大不少，需要程序员有较高的编程素养。关于如何应用异步模型，我们需要要先从非阻塞 IO 开始讲起，逐步理解基本原理和必备的工具和库之后，再用代码实现。\n' +
          '\n' +
          '## 非阻塞 IO\n' +
          '\n' +
          '操作系统提供的文件读写操作默认都是同步的，它必须等到数据就绪后才能返回，如果数据没有就绪，它就会阻塞当前的线程，其它的事什么都干不了，这是对操作系统线程资源的一种浪费。\n' +
          '\n' +
          '为了解决这个问题，操作系统给文件读写提供了非阻塞选项。当我们读写文件时，提供一个 O\\_NONBLOCK 选项，读写操作就不会阻塞。\n' +
          '\n' +
          '内核套接字的 ReadBuffer 有多少字节，read 操作就返回多少字节。内核套接字的 WriteBuffer 有多少剩余字节空间，write 操作就写多少字节。我们通过读写的返回值就可以知道读写了多少数据。接下来线程就可以继续干别的事去了，稍后再继续进行读写。\n' +
          '\n' +
          '```py\n' +
          'socket = socket.socket()\n' +
          'socket.setblocking(0)  # 开启非阻塞模式\n' +
          'socket.read()  # 有多少读多少\n' +
          'socket.write()  # 能写多少是多少\n' +
          '\n' +
          '```\n' +
          '\n' +
          '## 事件轮询'
      }
    },
    created() {
      console.log(this.$route.params);
      this.SetSubject({title: this.$route.params.title, id: this.$route.params.id})
    },
    computed: {
      ...mapState({
        can_scroll: 'can_scroll',
        collAndshadow: 'collAndshadow',
      })
    },
    methods: {
      ...mapActions(['SetSubject','setcollAndshadow']),
      fn1() {
        alert(1)
      }
    },
  }
</script>

<style scoped lang="scss">
  /*遮罩层*/
  .shadow {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: -20px;
    z-index: 1999;
    background-color: #000;
    opacity: 0.6;
    /*display:block;*/
  }

  .ifdisplay {
    display: none;
  }

  /*大屏设备固定尺寸*/
  #chaptersummary .ivu-card {
    position: fixed;
    top: 60px;
    left: 0;
    height: 100%;
    border: none;
    width: 320px;
    z-index: 2000;
    /*background: #F0F1F4;*/
    /*background: green;*/
    overflow: auto;
    padding-bottom: 50px;
    cursor: default;
  }

  /*移动端尺寸*/
  @media (max-width: 576px) {
    #chaptersummary .ivu-card {
      top: 50px;
      width: 260px;
    }
  }

  .scindex {
    z-index: 240;
  }

  /*内容区*/
  .chaptercontent .ivu-card {
    max-width: 800px;
    margin: 0 auto;
    padding: 4px 20px 24px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, .15);
    border-radius: 2px;
    box-sizing: border-box;
    background: #fbfbfb
  }

  /deep/ .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    padding: 0 0;
  }


  /*!*写在前面*!*/
  /*!*大设备<lg>* chaptersummary/*/
  /*!*平板设备<md-768>*!*/
  /*!*小设备<sm.xs>*!*/
  /*@media (min-width: 800px) {*/
  /*  main {*/
  /*    width: 800px;*/
  /*    padding: 20px 60px 40px;*/
  /*    background: hotpink;*/
  /*    text-align: center;*/
  /*  }*/
  /*;*/
  /*}*/

  /*@media (max-width: 800px) {*/
  /*  main {*/
  /*    width: 100%;*/
  /*    padding: 20px 60px 40px;*/
  /*    background: red;*/
  /*  }*/
  /*;*/
  /*}*/

  /*/deep/ .ivu-drawer-content {*/
  /*  top: 60px*/
  /*}*/

  /*.chaptersummary {*/
  /*  width: 320px;*/
  /*  position: fixed;*/
  /*  background: yellow;*/
  /*  left: 0;*/
  /*  top: 60px;*/
  /*  height: 100%;*/
  /*  cursor: default;*/
  /*  flex-shrink: 0;*/
  /*  z-index: 2;*/
  /*  border-right: 1px solid #ddd;*/
  /*  transition: all .3s cubic-bezier(.4, 0, .2, 1);*/
  /*  will-change: left;*/
  /*}*/

  /*.chaptercontent {*/
  /*  margin-left: 320px;*/
  /*}*/
</style>
