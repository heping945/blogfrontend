<template>
  <div id="commentlist">
    <Card :bordered="true" style="background: #fbfbfb">
      <div class="commentlist">
        <List item-layout="vertical">
          <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="This is title"
                          description="This is description, This is description, This is description, This is description, This is description, This is description, this is description."/>
            <div>
              xssssssssssssss
            </div>
          </ListItem>
          <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="This is title" description="This is description, this is description."/>
          </ListItem>
          <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="This is title" description="This is description, this is description."/>
            <template slot="action">
              <li>
                <a href="">Edit</a>
              </li>
              <li>
                <a href="">More</a>
              </li>
            </template>
          </ListItem>
          <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="This is title" description="This is description, this is description."/>
            <template slot="action">
              <li>
                <a href="">Edit</a>
              </li>
              <li>
                <a href="">More</a>
              </li>
            </template>
            <template slot="extra">
              <li>
                <a href="">删除</a>
              </li>
              <li>
                <a href="">回复</a>
              </li>
            </template>
          </ListItem>
        </List>
      </div>
      <div class="addcomment" :autosize="true">
        <Input v-model="newcom" type="textarea" :autosize="true" :maxlength="240" placeholder=">__<..."/>
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "CommentList",
    data() {
      return {
        newcom: 'hello world'
      }
    }
  }
</script>

<style scoped lang="scss">
  #commentlist {
    height: 1660px;
    /*background: #007fff;*/
    /*padding: 10px 10px;*/
  }
.ivu-list-vertical .ivu-list-item-extra li{
  display: inline-block;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
