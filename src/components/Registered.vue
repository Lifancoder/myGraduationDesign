<template>
  <div class="background-image">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="image_mask">
      <div class="image_center">
        <span class="System_name">魔力公寓 <span class="System_name_english">Magic Apartment</span> </span>
        <div class="login_mask">
          <span class="login_text">找回密码</span>
          <div class="login_content">
            <div style="height: 20px;width: 80%">
              <i class="my-iconzhanghao-copy" ></i><span class="login_content_text">账号</span>
            </div>
            <el-input class="recharge_input"  v-model="account" placeholder="手机号/邮箱"></el-input>
            <div style="height: 20px;width: 80%;margin-top: 30px">
              <i class="my-iconyanzhengma" ></i><span class="login_content_text ">验证码</span>
            </div>
            <el-input class="recharge_input_verification" v-model="VerificationCode" placeholder="请输入验证码" ></el-input>
            <el-link :underline="false" class="forget_pwd">获取验证码</el-link>
            <el-button  @click="next">下一步</el-button>
          </div>
          <span class="system_developers">For Graduation Design Use Only  --Lifan</span>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
    export default {
        name: "Registered",
      data() {
        return {
          account:'',
          VerificationCode:'',
        }
      },
      methods:{
          //校验
        checkVerificationCode(){
          if (this.account == ''){
            this.$message.info('请输入账号！')
            return false
          } else if (this.VerificationCode == ''){
            this.$message.info('请输入验证码！')
            return false
          }
          return true
        },
          //【下一步】
          next(){
          if (!this.checkVerificationCode()){
            return false
          }
            this.$router.push({path:'/ChangePassword'})
          },
      },
      mounted() {
      }
    }
</script>

<style scoped>
  .background-image {
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url("../assets/image/mohamed-nohassi-odxB5oIG_iA-unsplash.jpg");
    background-repeat: no-repeat;
  }

  .image_mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .image_center {
    position: relative;
    width: 80%;
    height: 90%;
    background-size: cover;
    background-position: center;
    background-image: url("../assets/image/mohamed-nohassi-odxB5oIG_iA-unsplash.jpg");
    background-repeat: no-repeat;
  }

  .login_mask {
    width: 30%;
    height: 100%;
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .System_name{
    margin-top: 10px;
    font-size: 16px;
    display: block;
    float: left;
    width: 120px;
    height: 20px;
    color:rgba(255, 255, 255, 0.8);
    font-family: 华文隶书;
  }
  .System_name_english{
    font-size: 13px;
    width: 120px;
    color:rgba(255, 255, 255, 0.8);
    display: block;
    float: left;
    font-family: AcmeFont;
  }
  .login_content{
    width: 70%;
    height: 50%;
    margin: 5% 10%;
    text-align: left;
  }
  .login_text{
    color: #FFFFFF;
    display: block;
    font-family: "Microsoft YaHei UI";
    font-size: 16px;
    height:20px;
    margin-top: 40%;
  }
  .login_content_text{
    color: #CCCCCC;
    font-size: 13px;
    display: inline-block;
    margin-left: 5px;
  }
  .recharge_input >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0);
    background-image: none;
    border-radius:0;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid #CCCCCC;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #CCCCCC;
    display: block;
    font-size: inherit;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    font-size: 12px;
    width: 100%;
    margin-top: 10px;
  }
  .recharge_input_verification >>>.el-input__inner{
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0);
    background-image: none;
    border-radius:0;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid #CCCCCC;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #CCCCCC;
    display: block;
    font-size: inherit;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    font-size: 12px;
    width: 100%;
    margin-top: 10px;

  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    height: 50px!important;
  }
  .forget_pwd{
    color: #CCCCCC;
    font-size: 13px;
    display: block;
    margin-top: 10px;
  }
  .el-button {
    width: 100%;
    display: inline-block;
    height: 40px!important;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: rgba(67, 100, 191, 0.8) !important;
    border: none!important;
    color: #FFFFFF!important;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin-top:15% !important;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 300!important;
    padding: 12px 20px;
    font-size: 13px!important;
    border-radius: 4px;
  }
  .VerificationCode_button /deep/.el-button{
    width: 50% !important;
    display: inline-block;
    height: 30px!important;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: rgba(67, 100, 191, 0.8) !important;
    border: none!important;
    color: #FFFFFF!important;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    float: right;
    margin-top:0 !important;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 300!important;
    padding: 12px 20px;
    font-size: 13px!important;
    border-radius: 4px;
  }
  .system_developers{
    color: rgba(255, 255, 255, 0.8);
    display: block;
    font-family: "Microsoft YaHei UI";
    font-size: 12px;
    height:20px;
    position: absolute;
    bottom: 1%;
  }

</style>
