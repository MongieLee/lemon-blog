<template>
  <header :class="{login:isLogin,'un-login':!isLogin,isCheck:isCheck}">
    <template v-if="isLogin">
      <h1 @click="toIndex">Let's share!</h1>
      <div class="actions">
        <i @click="create" class="el-icon-plus edit"></i>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link pull-down-container">
            <img class="avatar" :src="user.avatar" alt />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command="my">我的</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
    <template v-else>
      <h1 @click="toIndex">Let's share!</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <router-link to="/login">
          <el-button>立即登录</el-button>
        </router-link>
        <router-link to="/register">
          <el-button>点击注册</el-button>
        </router-link>
      </div>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isCheck: true
    };
  },
  computed: {
    ...mapGetters(["user", "isLogin"])
  },
  created() {
    this.checkLogin().then(() => {
      this.isCheck = false;
    });
  },
  methods: {
    ...mapActions(["checkLogin", "logout"]),
    handleCommand(command) {
      if (command === "logout") {
        this.logout().then(() => {
          this.$router.push({ path: "/" });
        });
      }
      if (command === "my") {
        this.$router.push("/my");
      }
    },
    create() {
      this.$router.push("/create");
    },
    toIndex() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
header.isCheck {
  visibility: hidden;
}
header.un-login {
  background-color: $bgColor;
  display: grid;
  justify-items: center;
  color: #fff;
  padding-bottom: 30px;
  h1 {
    &:hover {
      cursor: pointer;
    }
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

header.login {
  padding: 0 12%;
  background: $bgColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    cursor: pointer;
  }
  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    .pull-down-container {
      display: flex;
      .avatar {
        width: 40px;
        height: 40px;
        border: 1px solid #fff;
        border-radius: 50%;
        margin-left: 15px;
      }
    }
    .edit {
      color: #fff;
      cursor: pointer;
      font-size: 40px;
    }
  }
}

::v-deep .el-button {
  color: #006600;
}
</style>