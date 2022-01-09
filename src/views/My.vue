<template>
  <div>
    <section class="user-info">
      <img :src="user.avatar || '/avatar/default.png'" alt="这是头像" />
      <h3>{{ user.username }}</h3>
      <el-link @click="toUserCenter" type="primary" style="justify-content:flex-start;width:4em;margin-top:1em"
        >编辑信息</el-link
      >
    </section>
    <section class="content">
      <router-link v-for="(blog, index) of blogs" :key="index" :to="`/detail/${blog.id}`" class="content-item">
        <div class="date">
          <span class="day">{{ splitDate(blog.createdAt).date }}</span>
          <span class="month">{{ splitDate(blog.createdAt).month }}月</span>
          <span class="year">{{ splitDate(blog.createdAt).year }}</span>
        </div>
        <h3>{{ blog.title }}</h3>
        <p>{{ blog.description }}</p>
        <div class="actions">
          <span>
            <router-link :to="`/edit/${blog.id}`">编辑</router-link>
          </span>
          <span @click.prevent="deleteHandle(blog.id)" class="delete">删除</span>
        </div>
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
import blog from '@/api/blog';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters(['user']),
  },
  create() {},
  methods: {
    getData() {
      this.page = parseInt(this.$route.query.page) || 1;
      blog.getBlogsByUserId(this.user.id, { page: this.page }).then((resonse) => {
        this.blogs = resonse.data;
        this.total = resonse.total;
        this.page = resonse.page;
      });
    },
    splitDate(dateStr) {
      let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr);
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear(),
      };
    },
    handleCurrentChange(newPage) {
      blog.getBlogsByUserId(this.user.id, { page: newPage }).then((response) => {
        this.blogs = response.data;
        this.page = response.page;
        this.total = response.total;
        this.$router.push({
          path: `/my`,
          query: { page: newPage },
        });
      });
    },
    toUserCenter() {
      console.log(this.user);
      this.$router.push({
        path: `/userCenter`,
      });
    },
    deleteHandle(blogId) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        blog.deleteBlog({ blogId }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.getData();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
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
    .actions {
      grid-row: 3;
      grid-column: 2;
      span {
        color: $themeLighterColor;
      }
      .delete {
        margin-left: 20px;
      }
    }
  }
}
.pagination-container {
  display: grid;
  justify-items: center;
  margin-bottom: 20px;
}
</style>
