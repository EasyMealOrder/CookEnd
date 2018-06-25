<template>
    <div class="loginWrapper">
        <div class = "imgtest">
            <figure>
                <div>
                    <img src="/static/images/test.png"/>
                </div>
            </figure>
        </div>
        <div class="bd">
            <el-form :model="loginForm">
                <el-form-item>
                <el-input type="userName" v-model="loginForm.username" placeholder="请输入账号或者用户名"></el-input>
                </el-form-item>
                <el-form-item>
                <el-input placeholder="请输入密码" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" class="submitBtn" @click="cookLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    cookLogin () {
      console.log(this.loginForm)
      const loginUrL = '/api/signin/'

      var params = new URLSearchParams()
      params.append('username', this.loginForm.username)
      params.append('password', this.loginForm.password)
      axios.post(loginUrL, params, {withCredentials: true})
        .then(response => {
          if (response.data.success === true) {
            // console.log(this.$store.csrftoken)
            this.$router.push('/main/cookEnd')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
<style>
.imgtest {
    overflow:hidden;
    }
.list_ul figcaption p{
    font-size:0px;color:#aaa;
    }
.imgtest figure div{
    display:inline-block;
    width:130px;
    height:130px;
    border-radius:130px;
    border:0px solid #fff;
    overflow:hidden;
    -webkit-box-shadow:0 0 3px #ccc;
    box-shadow:0 0 3px #ccc;
    }
.imgtest img{
    width:100%;
    min-height:100%;
    text-align:center;
    }
.loginWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-size: 18px;
}
.loginWrapper .hd {
  width: 300px;
}
.loginWrapper .hd h2 {
    font-weight: 400;
    color: #20A0FF;
}
.loginWrapper .hd p {
  font-size: 15px;
  color: #1f2f3d;
}
.loginWrapper .bd {
    width: 300px;
}
.loginWrapper .bd .submitBtn {
  width: 100%;
}
.loginWrapper .bd .el-form-item:last-child {
  margin-bottom: 10px;
}
.loginWrapper .ft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
}
.loginWrapper .ft a {
  font-size: 14px;
  text-decoration: none;
  color: #20A0FF;
}
</style>
