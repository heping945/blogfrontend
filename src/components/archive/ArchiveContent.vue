<template>
  <div class="p-container commonpositiontop">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="18">
        <div class="allcontent">
          <Card>
            <Tabs value="cat">
              <!--              分类 包括标签和专题-->
              <TabPane label="分类" name="cat">
                <Input placeholder="过滤......" v-model="tofilval" suffix="ios-funnel-outline"/>"/>
                <Tabs value="name" type="card" style="margin-top: 30px">
                  <!--                  分类-->
                  <TabPane label="分类" name="name">
                    <p>
                      <Tag :color="color[Math.floor(Math.random()*color.length)]" v-for="i in topcatlist" :key="i.id"
                           @click.native="selectc(i)">
                        {{i.name}}
                      </Tag>
                    </p>
                    <p>
                      <Tag :color="color[Math.floor(Math.random()*color.length)]" v-for="i in midcatlist" :key="i.id"
                           @click.native="selectc(i)">
                        {{i.name}}
                      </Tag>
                    </p>
                    <p>
                      <Tag :color="color[Math.floor(Math.random()*color.length)]" v-for="i in botcatlist" :key="i.id"
                           @click.native="selectc(i)">
                        {{i.name}}
                      </Tag>
                    </p>
                    <Breadcrumb separator=">" style="margin-top: 15px;font-weight: bolder"
                                v-show="Object.keys(catselected).length > 0">
                      <BreadcrumbItem v-if="catselected.parent_category">{{catselected.parent_category.name}}
                      </BreadcrumbItem>
                      <BreadcrumbItem>{{catselected.name}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Alert type="success" style="margin-top: 20px" v-if="postres.length">
                      <List>
                        <ListItem v-for="item,index in postres" :key="item.id" @click.native="topost(item.id)">
                          <b style="color: #2b85e4">{{index+1}}</b>：&nbsp;&nbsp;{{item.title}}
                        </ListItem>
                      </List>
                    </Alert>
                  </TabPane>
                  <!--                  标签区-->
                  <TabPane label="标签" name="name2">
                    <Badge :count="parseInt(i.get_post_count)" v-for="i in mattag" :key="i.id">
                      <Tag :color="color[Math.floor(Math.random()*color.length)]" @click.native="selectt(i)">
                        {{i.name}}
                      </Tag>
                    </Badge>
                    <Alert type="success" style="margin-top: 20px" v-if="postres2.length">
                      <List>
                        <ListItem v-for="item,index in postres2" :key="item.id" @click.native="topost(item.id)">
                          <b style="color: #2b85e4">{{index+1}}</b>：&nbsp;&nbsp;{{item.title}}
                        </ListItem>
                      </List>
                    </Alert>
                  </TabPane>
                  <!--                  专题区-->
                  <TabPane label="专题" name="name3">
                    <Alert type="success" style="margin-top: 20px" v-if="matsubject.length">
                      <List>
                        <ListItem v-for="item,index in matsubject" :key="item.id" @click.native="selects(item)">
                          <b style="color: #2b85e4;overflow: hidden">{{index+1}}：&nbsp;&nbsp;{{item.title}}</b>
                        </ListItem>
                      </List>
                    </Alert>

                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane label="归档" name="name2">功能开发中。。。</TabPane>
            </Tabs>

          </Card>
        </div>
      </Col>
      <Col :xs="0" :sm="0" :md="0" :lg="6">
        <SideBarRight></SideBarRight>
      </Col>
    </Row>
  </div>
</template>

<script>
  const SideBarRight = () => import('../utils/SideBarRight')
  import {getCategory} from '@/api/api'
  import {gettaglist} from '@/api/api'
  import {getIndexPost} from '@/api/api'
  import {getSubject} from '@/api/api'

  export default {
    name: "ArchiveContent",
    components: {
      SideBarRight
    },
    data() {
      return {
        color: ['default', 'primary', 'success', 'warning',
          'error', 'blue', 'green', 'red', 'yellow', 'pink', 'magenta', 'volcano',
          'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple'],
        catlist: [],
        taglist: [],
        catselected: {},
        postres: [],
        postres2: [],
        subjectlist: [],
        tagselected: {},
        subselected: {},
        tofilval: ''
      }
    },
    computed: {
      //忽略了大小写
      filval() {
        return this.tofilval.toLowerCase()
      },
      matcat() {
        return this.catlist.filter((item) => {
          return item.name.toLowerCase().match(this.filval)
        })
      },
      mattag() {
        return this.taglist.filter((item) => {
          return item.name.toLowerCase().match(this.filval)
        })
      },
      matsubject() {
        return this.subjectlist.filter((item) => {
          return item.title.toLowerCase().match(this.filval)
        })
      },
      topcatlist() {
        let r = this.matcat.filter(i => {
          return i.parent_category == null
        })
        return r
      },
      midcatlist() {
        let x = this.matcat.filter(i => {
          return i.parent_category != null
        })
        let y = x.filter(i => {
          return i.sub_cat.length > 0
        })
        return y
      },
      botcatlist() {
        let x = this.matcat.filter(i => {
          return i.parent_category != null
        })
        let y = x.filter(i => {
          return i.sub_cat.length == 0
        })
        return y
      },
    },
    created() {
      this.initcategory();
      this.inittag();
      this.initsubjectdata()
    },
    methods: {
      initcategory() {
        getCategory({}).then(res => {
          console.log(res);
          this.catlist = res.data.results
        })
      },
      inittag() {
        gettaglist({}).then(res => {
          console.log(res);
          this.taglist = res.data.results
        })
      },
      initsubjectdata() {
        getSubject().then(res => {
          this.subjectlist = res.data.results;
          console.log(this.subjectlist)
        }).catch(err => {
          console.log(err.response)
        })
      },
      //选中分类
      selectc(x) {
        console.log(x);
        //重复点击的优化
        if (x != this.catselected) {
          this.catselected = x;
          getIndexPost({top_category: x.id}).then(res => {
            console.log(res);
            this.postres = res.data.results
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //选中标签
      selectt(x) {
        console.log(x);
        //重复点击的优化
        if (x != this.tagselected) {
          this.tagselected = x;
          getIndexPost({tags: x.id}).then(res => {
            console.log(res);
            this.postres2 = res.data.results
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //选中专题
      selects(x) {
        console.log(x);
        this.$router.push({name: 'subjectcontent', params: {title: x.urltag, id: x.get_first_id}})
      },
      topost(k) {
        this.$router.push({name: 'postdetail', params: {id: k}})
      }
    }
  }
</script>

<style scoped lang="scss">
  @media (min-width: 992px) {
    .allcontent {
      padding-right: 20px;
    }
  }

  /*列表指针*/
  .ivu-list-item {
    cursor: pointer;
  }

  .ivu-badge {
    margin-right: 12px;
    margin-bottom: 12px;
  }
</style>
