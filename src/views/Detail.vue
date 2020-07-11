<template>
  <div>
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" />
      <h3>{{title}}</h3>
      <p>
        <router-link :to="`/user/${user.id}`">{{user.username}}</router-link>
        发布于{{friendlyDate(createdAt)}}
      </p>
    </section>
    <section class="content" v-html="markdown">{{markdown}}</section>
  </div>
</template>

<script>
import marked from "marked";
import blog from "@/api/blog.js";
let { log } = console;
export default {
  data() {
    return {
      user: {},
      title: "",
      createdAt: "",
      content: ""
    };
  },
  created() {
    const blogId = this.$route.params.blogId;
    blog.getDetail({ blogId }).then(({ data }) => {
      this.title = data.title;
      this.createdAt = data.createdAt;
      this.user = data.user;
      this.content = data.content;
      log(data);
    });
  },
  computed: {
    markdown() {
      return marked(this.content);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.user-info {
  display: grid;
  grid: auto auto / 100px 1fr;
  padding-bottom: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #ebebeb;
  img {
    grid-row: 1/3;
    grid-column: 1;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  h3 {
    grid-column: 2;
    grid-row: 1;
    margin: 5px 0;
  }
  p {
    grid-row: 2;
    grid-column: 2;
    font-size: 12px;
    color: $textLighterColor;
    a {
      color: $themeColor;
      text-decoration: none;
    }
  }
}
.content {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>