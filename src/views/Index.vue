<template>
  <div>
    <el-button>点击</el-button>
  </div>
</template>

<script>
import request  from "../helpers/request";
export default {
  data() {
    return {};
  },
  created() {
    request("/auth/login", "post", {
      username: "hunger1",
      password: 123458
    }).then(data => {
      console.log(data);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>