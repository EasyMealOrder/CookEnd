<template>
  <el-container class="cookEndPage">
    <el-container class="identityMessage">
      <img src="/static/images/timg.jpeg"/>
      <p class="cookName">用户名: {{ name }}</p>
      <p class="cookId">账号: {{ id }}</p>
    </el-container>
  </el-container>
</template>

<script>
// import service from '../../api/unitedInterface'

export default {
  data () {
    return {
      name: '蔡吉涵',
      id: '12138'
    }
  }
}
</script>

<style>
.cookEndPage {
  position: fixed;
  height: 90%;
  right: 0;
  width: 90%;
  bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.identityMessage {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 30%;
  width: 100%;
}

.cookName {
  flex-grow: 0;
  flex-shrink: 0;
  margin: 15px;
  background-color: #f1d586;
}

.cookId {
  flex-grow: 0;
  flex-shrink: 0;
  margin: 15px;
  background-color: #f1d586;
}

img {
  height: 80%;
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
  margin: 10px;
  margin-left: 50px;
  border-radius: 50%;
}
</style>
