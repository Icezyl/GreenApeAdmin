<template>
  <div class="box">
    <h2 class="title">用户活跃量</h2>
    <div class="active">
      <ul>
        <li>
          <p class="num blue">30</p>
          <p class="txt">新增用户</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.title {
  padding: 10px 32px;
}
.active ul {
  display: flex;
}
.active ul li {
  width: 15%;
  text-align: center;
}
.num {
  font-size: 40px;
  font-weight: 600;
}
.txt {
  font-size: 16px;
}
.blue {
  color: #409EFF;
}
</style>
