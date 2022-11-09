<script setup lang="ts"></script>
<template>
  <div class="layout-wrap">
    <div class="top">
      <div class="title">艾尼科技可视化大屏</div>
      <div class="test"></div>
      <div class="time">
        <span>2022年11月09日</span>
        <span>22:14:12</span>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-wrap {
  background-color: #1e2b4f;
  // background: url('@/assets/desk/win11.jpg');
  height: 100%;
  width: 100%;
  position: fixed;
  background-size: 100% 100%;
  color: #fff;
  .top {
    text-align: center;
    border-bottom: 1px solid #1e2b4f;
    position: relative;
    height: 60px;
    box-shadow: 0 0 10px #0c0ce1;
    .title {
      z-index: 1;
      position: absolute;
      top: 0;
      /* left: 36%; */
      top: 20px;
      width: 100%;
      height: 39px;
      background-color: #1e2b4f;
      font-size: 32px;
      font-weight: 600;
      letter-spacing: 4px;
    }
    .test {
      background: transparent;
      position: absolute;
      width: 500px;
      height: 40px;
      background: red;
      left: 37%;
      top: 59px;
      z-index: 0;
      transform: perspective(-360deg) rotateX(30deg);
      transform: perspective(100px) rotateX(-15deg);
      border-bottom: red;
      border-bottom: 1px solid #0c0ce1;
      border-left: 1px solid #0c0ce1;
      border-right: 1px solid #0c0ce1;
      background: #1e2b4f;
      box-shadow: 0 0 10px #0c0ce1;
    }
    .time {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 2;
      letter-spacing: 4px;
      span {
        padding: 10px;
      }
    }
  }
  .main {
    margin-top: 100px;
    margin-left: 50px;
    margin-right: 50px;
    height: 650px;
    border-radius: 30px;
    box-shadow: 0 0 10px #0c0ce1;
    border: 1px solid #1e2b4f;
    overflow-y: auto;
    padding: 50px;
  }
  .bottom {
  }
}
</style>
