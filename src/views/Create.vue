<template>
  <div>
    <section class="create-container">
      <h1>创建文章</h1>
      <h2>文章标题</h2>
      <el-input placeholder="文章标题" v-model="articleTitle"></el-input>
      <p>限30个字</p>
      <h2>内容简介</h2>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="内容简介"
        v-model="articleIntro"
      ></el-input>
      <p>限30个字</p>
      <h2>文章内容</h2>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 30}"
        placeholder="文章内容"
        v-model="articleContent"
      ></el-input>
      <p>限30个字</p>
      <span class="left-position">
        <label>是否展示到首页</label>
        <el-switch v-model="showIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </span>
      <el-button @click="onCreate">确定</el-button>
    </section>
  </div>
</template>

<script>
import blog from "@/api/blog.js";
export default {
  data() {
    return {
      articleTitle: "",
      articleIntro: "",
      articleContent: "",
      showIndex: false
    };
  },
  methods: {
    onCreate() {
      blog
        .createBlog({
          title: this.articleTitle,
          content: this.articleContent,
          description: this.articleIntro,
          atIndex: this.showIndex
        })
        .then((response) => {
          this.$message({
            type: "success",
            message: "创建成功!"
          });
          this.$router.push({path:`/detail/${response.data.id}`})
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.create-container {
  padding-bottom: 20px;
  h1 {
    margin: 20px 0;
    font-size: 2em;
    text-align: center;
  }
  h2 {
    margin-bottom: 10px;
  }
  p {
    text-align: right;
    color: #999;
    margin: 10px 0;
    font-size: 12px;
  }
  button {
    text-align: right;
  }
  .left-position {
    text-align: left;
    display: block;
    margin-bottom: 20px;
  }
}
</style>