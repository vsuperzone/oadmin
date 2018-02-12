<template>
  <div class="login">
    <div class="box">
      <div class="logo"></div>
      <div class="submit">
        <div class="input-box">
          <icon name="user-o" scale="2"></icon>
          <input type="text" v-model="username">
        </div>
        <div class="input-box">
          <icon name="key" scale="2"></icon>
          <input type="password" v-model="password">
        </div>
        <el-button type="primary" @click="login()" style="width: 100%; margin-top: 20px;">登录后台</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: 'passwoo@163.com',
      password: 'secret'
    }
  },
  methods: {
    login: function () {
      var post = {
        'grant_type': 'password',
        'client_id': 2,
        'client_secret': process.env.CLIENT_SECRET,
        'username': this.username,
        'password': this.password,
        'scope': '*'
      }
      this.axios.post('/server/oauth/token', post)
        .then(res => {
          localStorage.accessToken = res.data.access_token
          this.setToken(res.data.access_token)
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({ name: 'home' })
        })
        .catch(e => {
          this.$message.error('登录失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: linear-gradient(#6fefb6, #51dde6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    width: 340px;
    height: 590px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 0 15px #26a09a;
    background: #fff url(../assets/login_bg.png) center bottom no-repeat;

    .logo {
      height: 100px;
      margin-top: 70px;
      background: url(../assets/long.png) center center no-repeat;
    }

    .submit {
      margin-top: 50px;
      padding: 0 30px;
    }

    .input-box {
      color: #49b1d4;
      margin-bottom: 20px;
      display: flex;
      align-items: flex-end;

      .fa-icon {
        padding-right: 30px;
        height: 25px;
        width: 25px;
      }

      input {
        width: 100%;
        line-height: 25px;
        border: 0;
        border-bottom: 1px solid #a7c8d1;
        outline: none;
      }
    }
  }
}
</style>
