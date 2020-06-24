<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app{
  width: 100%;
  height: 100%;
  background: #00060e;
  box-sizing: border-box;
}
  #nprogress .bar {
      background: rgb(1, 132, 255) !important; //自定义颜色
    }
</style>
