<template>
  <div>
    <section class="user-info">
      <img src="@/assets/logo.png" alt="这是头像" />
      <h3>Limengjie</h3>
    </section>
    <section class="content">
      <router-link to="#" class="content-item">
        <div class="date">
          <span class="year">20</span>
          <span class="month">10月</span>
          <span class="day">21日</span>
        </div>
        <h3>浅谈ES5</h3>
        <div class="actions">
          <span @click="editHandle">编辑</span>
          <span @click="deleteHandle" class="delete">删除</span>
        </div>
      </router-link>
    </section>
    <section class="pagination-container">
      <el-pagination layout="prev, pager, next" :total="1"></el-pagination>
    </section>
  </div>
</template>

<script>
import blog from "@/api/blog";
export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1
    };
  },
  create() {
  },
  methods: {
    deleteHandle() {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editHandle() {
      console.log(90);
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
    }
    .date {
      grid-row: 1 / span 3;
      text-align: center;
      grid-column: 1;
      span {
        display: block;
        color: $textLighterColor;
      }
      .year {
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
}
</style>