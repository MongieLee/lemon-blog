<template>
  <div>
    <div class="index">
      <section class="blog-list">
        <div class="blog-item">
          <figure>
            <img src="@/assets/logo.png" alt="这是头像" />
            <figcaption>Lemon</figcaption>
          </figure>
          <h3>
            前端异步大揭秘
            <span>3天前</span>
          </h3>
          <p>本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的 callback、ES2016中的Promise和Generator、 Node 用于解决回调的co 模块、ES2017中的async/await。适合初步接触 Node.js以及少量 ES6语法的同学阅读...</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import auth from "@/api/auth";
export default {
  data() {
    return {};
  },
  created() {
    this.test({ userId: 0 });
    auth.getInfo().then(data => {
      console.log(data);
    });
  },
  methods: {
    test({ page = 1, userId, atIndex } = { page: 2 }) {
      console.log(page);
      console.log(userId);
      console.log(atIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.blog-item {
  display: grid;
  grid: auto auto / 80px 1fr;
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
</style>