<template>
  <header :class="{login:isLogin,'un-login':!isLogin}">
    <template v-if="isLogin">
      <h1>Let's share!</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <el-button>立即登录</el-button>
        <el-button>点击注册</el-button>
      </div>
    </template>
    <template v-else>
      <h1>Let's share!</h1>
      <img class="avatar" src="@/assets/logo.png" alt />
    </template>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";

header.login {
  background-color: $bgColor;
  display: grid;
  justify-items: center;
  color: #fff;
  h1 {
    font-size: 40px;
    margin-top: 60px;
    text-transform: uppercase;
  }
  p {
    margin-top: 15px;
  }
  button {
    margin: 20px 5px 0;
  }
}

header.un-login {
  padding: 0 12% 30px 12%;
  background: $bgColor;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
  }
}
</style>