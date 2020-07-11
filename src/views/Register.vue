<template>
  <div>
    <section class="register-container">
      <p>用户名</p>
      <el-input v-model="username" type="text" placeholder="用户名"></el-input>
      <p>密码</p>
      <el-input v-model="password" type="password" @keyup.enter="onRegister" placeholder="密码"></el-input>
      <el-button size="small" @click="onRegister">立即注册</el-button>
      <p class="tips">
        没有账号？
        <router-link to="/login">立即登录</router-link>
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
    ...mapActions(["register"]),
    onRegister() {
      this.register({
        username: this.username,
        password: this.password
      }).then(() => {
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.register-container {
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