<template>
  <div>
    <el-button>点击</el-button>
  </div>
</template>

<script>
import auth from "@/api/auth";
export default {
  data() {
    return {};
  },
  created() {
    this.test({userId:0})
    auth.getInfo().then(data => {
      console.log(data);
    });
  },
  methods: {
    test({ page = 1, userId, atIndex } = { page: 2 }) {
      console.log(page)
      console.log(userId)
      console.log(atIndex)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>