<template>
    <el-container id="main" style="min-width:900px">
      <el-header class="head">EasyMealOrder商家端系统</el-header>
      <el-container class="body">
        <aside-list :items="children"></aside-list>
        <router-view></router-view>
      </el-container>
    </el-container>
</template>

<script>
import asideList from './aside.vue'

export default {
  components: { asideList },
  data () {
    return {
      children: [
        {
          msg: '个人信息',
          link: {name: 'CookEnd'}
        },
        {
          msg: '全部订单',
          link: {name: 'Order'}
        }
      ]
    }
  }
}
</script>

<style>
#main {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 810px;
  min-height: 600px;
}

.head {
  position: fixed;
  top: 0;
  height: 10% ! important;
  width: 100%;
  font-size: 25px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  line-height: 25px;
  background-color: #3b3b3b;
  color: rgb(214, 213, 213);
  padding-top: 15px;
}

.body {
  position: absolute;
  width: 100%;
  left: 0;
  top: 10%;
  height: 90%;
}

aside {
  width: 10%;
}
</style>
