<template>
  <div>
    <section class="user-info">
      <img src="@/assets/logo.png" alt="这是头像" />
      <h3>前端异步大揭秘</h3>
      <p>
        <a href="#">用户名</a>发布于好多天前
      </p>
    </section>
    <section class="content">
      <p>css很简单的</p>
    </section>
  </div>
</template>

<script>
export default {};
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