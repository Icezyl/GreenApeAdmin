<template>
  <div class="login">
    <div class="loginbox">
      <div class="img no">
        <img src="@/assets/img/Chimpanzee.png" alt />
      </div>
      <p class="title no">GreenApeAdmin</p>
      <form action class="form">
        <el-input placeholder="请输入用户名" v-model="form.name" clearable></el-input>
        <el-input placeholder="请输入密码" @keyup.enter.native="login" v-model="form.paw" show-password></el-input>
        <el-button class="btn" type="primary" @click="login" :loading="loginState">登录</el-button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginState: false,
      form: {
        name: "admin",
        paw: "admin"
      }
    };
  },
  methods: {
    ...mapMutations(["setToken", "setId"]),
    login() {
      this.$router.push("/home");
      if (this.form.name == "") {
        this.$notify.error({
          title: "错误",
          message: "用户名为空"
        });
      } else if (this.form.paw == "") {
        this.$notify.error({
          title: "错误",
          message: "密码为空"
        });
      } else {
        if (!this.loginState) {
          this.loginState = true;
          this.$api
            .postLogin({ userName: this.form.name, password: this.form.paw })
            .then(res => {
              this.loginState = false;
              if (res.code != 0) {
                this.$notify.error({
                  title: "错误",
                  message: res.msg
                });
              } else {
                this.$notify({
                  title: "成功",
                  message: res.msg,
                  type: "success"
                });
                this.setId({ id: res.id, name: res.name });
                this.setToken(res.token);
                // this.$router.push("/home");
              }
              console.log(res);
            });
        }
      }
    },
    Sign() {
      this.$router.push("/home");
    }
  }
};
</script>
<style scoped>
.login {
  height: 100%;
  background: #001529;
}
.loginbox {
  padding: 100px 50px;
  width: 300px;
  margin: 0 auto;
}
.loginbox .img {
  width: 100px;
  height: 90px;
  margin: auto;
}
.el-input {
  margin-top: 20px;
}
.title {
  text-align: center;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
}
.btn {
  margin-top: 20px;
  width: 100%;
}
</style>
