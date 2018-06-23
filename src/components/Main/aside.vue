<template>
    <el-aside class='aside-list'>
      <el-row>
        <router-link class="route-button" v-for="item in items" :key="item.msg" :to="item.link">
          <el-col>{{ item.msg }}</el-col>
        </router-link>
      </el-row>
    </el-aside>
</template>

<script>

export default {
  name: 'aside-list',
  props: ['items']
}
</script>
>

<style>
.aside-list {
  position: fixed;
  width: 10% ! important;
  height: 100%;
  left: 0;
  background-color: #4e4b43;
}

.el-row {
  position: absolute;
  height: 100%;
  width: 100%;
}

.route-button {
  display: table;
  position: relative;
  height: 50px;
  width: 100%;
  text-align: center;
  padding-top: 10%;
  background-color: #4e4b43;
}

.el-col {
  color: #ffffff;
  position: relative;
  height: 100%;
}
</style>
