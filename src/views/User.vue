<template>
  <div>
    <section class="user-info">
      <img :src="user.avatar" alt="这是头像" />
      <h3>{{user.username}}</h3>
    </section>
    <section class="content">
      <router-link
        v-for="(blog,index) in blogs"
        :key="index"
        :to="`/detail/${blog.id}`"
        class="content-item"
      >
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}月</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination-container">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :current-page="page"
        :total="total"
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
      user: {},
      page: 1,
      total: 1,
      userId: null
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    this.page = parseInt(this.$route.query.page) || 1;
    blog.getBlogsByUserId(this.userId, { page: this.page }).then(response => {
      this.blogs = response.data;
      this.page = response.page;
      this.total = response.total;
      response.data.length > 0 && (this.user = response.data[0].user);
    });
  },
  methods: {
    handleCurrentChange(newPage) {
      blog.getBlogsByUserId(this.userId, { page: newPage }).then(response => {
        this.blogs = response.data;
        this.page = response.page;
        this.total = response.total;
        this.$router.push({
          path: `/user/${this.userId}`,
          query: { page: newPage }
        });
      });
    },
    splitDate(dateStr) {
      let dateObj = typeof dateStr === "object" ? dateStr : new Date(dateStr);
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
      };
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
  align-items: center;
  img {
    grid-row: 1/3;
    grid-column: 1;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  h3 {
    grid-column: 2;
    grid-row: 1 / span 2;
    margin: 5px 0;
  }
}
.content {
  margin-top: 20px;
  margin-bottom: 20px;

  .content-item {
    display: grid;
    grid: auto auto auto/80px 1fr;
    h3 {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .date {
      grid-row: 1 / span 3;
      text-align: center;
      grid-column: 1;
      span {
        display: block;
        color: $textLighterColor;
      }
      .day {
        font-size: 40px;
      }
    }
    p {
      grid-row: 2;
      grid-column: 2;
    }
  }
}
.pagination-container {
  display: grid;
  justify-items: center;
}
</style>