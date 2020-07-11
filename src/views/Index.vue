<template>
  <div>
    <section class="blog-list">
      <div class="blog-item">
        <router-link v-for="(blog,index) of blogs" :to="`/detail/${blog.id}`" :key="index">
          <figure>
            <img :src="blog.user.avatar" :alt="blog.user.username" />
            <figcaption>{{blog.user.username}}</figcaption>
          </figure>
          <h3>
            {{blog.title}}
            <span>{{blog.createdAt}}</span>
          </h3>
          <p>{{blog.description}}</p>
        </router-link>
      </div>
    </section>
    <section class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
      ></el-pagination>
    </section>
  </div>
</template>

<script>
import blog from "@/api/blog.js";
export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1
    };
  },
  created() {
    this.page = parseInt(this.$route.query.page) || 1;
    console.log(this.page);
    blog.getIndexBlogs({ page: this.page }).then(res => {
      this.blogs = res.data;
      this.total = res.total;
      this.page = res.page;
      console.log(res);
    });
  },
  methods: {
    handleCurrentChange(toPage) {
      console.log(`我的要跳转到到椰树`, toPage);
      blog.getIndexBlogs({ page: toPage }).then(res => {
        this.blogs = res.data;
        this.total = res.total;
        this.page = res.page;
        console.log(res);
        this.$router.push({ path: "/", query: { page: toPage } });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.pagination {
  display: grid;
  justify-items: center;
}
.blog-item {
  a {
    text-decoration: none;
    color: inherit;
    display: grid;
    grid: auto auto / 100px 1fr;
    margin-top: 20px;
    margin-bottom: 20px;
    figure {
      grid-column: 1;
      grid-row: 1 / span 2;
      justify-self: center;
      text-align: center;
      img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
      }
    }
    h3 {
      grid-column: 2;
      grid-row: 1;
      & > span {
        color: $textLighterColor;
        font-size: 12px;
        font-weight: normal;
      }
    }
    p {
      grid-column: 2;
      grid-row: 2;
    }
  }
}
</style>