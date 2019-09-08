<template>
  <div class="authen">
    <Row>
      <Col :xs="0" :sm="0" :md="24" :lg="24">
        <div :class="{'container':true,'right-panel-active':ifshow}" id="container">
          <div class="form-container sign-up-container">
            <div class="inputform">
              <h1>注册</h1>
              <div class="social-container">
                <a href="">
                  <Avatar icon="ios-person" size="large"/>
                </a>
                <a href="">
                  <Avatar icon="ios-person" size="large"/>
                </a>
                <a href="">
                  <Avatar icon="ios-person" size="large"/>
                </a>
              </div>
              <span>第三方账号注册</span>
              <input type="text" placeholder="名称"/>
              <input type="email" placeholder="邮箱"/>
              <input type="password" placeholder="密码"/>
              <button>注册</button>
            </div>
          </div>
          <div class="form-container sign-in-container">
            <div class="inputform">
              <h1>登录</h1>
              <div class="social-container">
                <a href="">
                  <Avatar icon="ios-person" size="large"/>
                </a>
                <a href="">
                  <Avatar icon="ios-person" size="large"/>
                </a>
                <a href="">
                  <Avatar icon="ios-person" size="large"/>
                </a>
              </div>
              <span style="margin-bottom: 20px">第三方账号注册</span>
              <Form ref="formInline" :model="userinfo" :rules="ruleInline">
                <FormItem prop="username">
                  <Input type="text" v-model="userinfo.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input type="password" v-model="userinfo.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="denglu('formInline')">登录</Button>
                </FormItem>
                <a href="#">忘记密码？</a>
              </Form>
            </div>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>欢迎回来！</h1>
                <p>请您先登录的个人信息，进行操作。</p>
                <button class="ghost" id="signIn" @click="signIn">登录</button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>你好朋友！</h1>
                <p>输入您的个人信息注册账号。</p>
                <button class="ghost" id="signUp" @click="signUp">注册</button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>


  </div>
</template>

<script>
  import {login} from "../../api/api";

  export default {
    name: "Login",
    data() {
      return {
        err: '',
        ifshow: false,
        userinfo: {
          username: 'heping',
          password: 'pp123456',
        },
        ruleInline: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    }
    ,
    mounted() {
      if (this.$store.state.userinfo.token) {
        this.$router.push({name: 'index'})
      }
    }
    ,
    methods: {
      signUp() {
        this.ifshow = !this.ifshow
      }
      ,
      signIn() {
        this.ifshow = !this.ifshow
      }
      ,
      denglu() {
        this.$refs.formInline.validate((valid) => {
          if (valid) {
            // 验证成功,发送数据
            // this.$Message.success('Success!');
            {
              login(
                this.userinfo
              ).then(data => {
                // console.log('success');
                this.$Message.info({
                  content: '登录成功',
                  duration: 1,
                  closable: true,
                  top: 200
                });
                console.log(data);
                console.log(this.$store);
                this.$store.commit('SaveToken', {
                  token: data.data.token,
                  username: data.data.username,
                  avatar: data.data.avatar
                });
                console.log(this.$store.state.userinfo.token);
                console.log(this.$store.state.userinfo.username);
                console.log(this.$store.state.userinfo.avatar);
                //  如果登录成功,且有参数
                var backurl = this.$route.query.backurl;
                console.log(backurl)
                if (backurl) {
                  this.$router.push({path: backurl})
                } else {
                  this.$router.push({path: '/'})
                }
              }).catch(err => {
                this.$Message.error({
                  content: '用户名或密码错误',
                });
                console.log(err.response);
                this.error = '用户名或密码错误'
              })
            }
          } else {
            this.$Message.error('请检查输入');
          }
        })
      },

    }
  }
</script>

<style scoped>

  * {
    box-sizing: border-box;
  }

  .authen {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    position: relative;
    top: 20vh;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  h2 {
    text-align: center;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    /* 	text-decoration: none; */
    margin: 15px 0;
  }

  button {
    border-radius: 20px;
    border: 1px solid #FF4B2B;
    background-color: #FF4B2B;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
  }

  .inputform {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: #FF416C;
    background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
    background: linear-gradient(to right, #FF4B2B, #FF416C);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .social-container {
    margin: 20px 20px;
  }

  .social-container a {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }

  /*自定义*/
  .ivu-input-icon-normal .ivu-input {
    padding-left: 32px;
  }

  .ivu-input-icon-normal {
    padding-right: 32px;
  }
</style>
