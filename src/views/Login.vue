<template>
  <div>
    <section class="login-container">
      <p>用户名</p>
      <el-input v-model="username" type="text" placeholder="用户名"></el-input>
      <p>密码</p>
      <el-input show-password v-model="password" @keyup.enter.native="onLogin" placeholder="密码"></el-input>
      <el-button size="small" @click="onLogin">立即登录</el-button>
      <p class="tips">
        没有账号？
        <router-link to="/register">立即注册</router-link>
      </p>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    onLogin() {
      this.login({ username: this.username, password: this.password }).then(
        () => {
          console.log(this.$route.query.redirect);
          this.$router.push({ path: this.$route.query.redirect || "/" });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.login-container {
  padding-top: 30px;
  display: grid;
  justify-content: center;
  ::v-deep input {
    width: 400px;
  }
  p {
    color: black;
    font-weight: bold;
    margin: 10px 0 5px;
  }
  .tips {
    font-size: 12px;
    color: #999;
    margin-top: 30px;
    text-align: center;
    a {
      color: $themeLighterColor;
      text-decoration: none;
    }
  }
  button {
    margin-top: 30px;
    justify-self: start;
  }
}
</style>