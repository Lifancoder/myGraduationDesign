<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="horizontal">
      <el-aside width="210px">
        <div class="logo">
          <span class="System_name">魔力公寓 <span class="System_name_english">Magic Apartment</span> </span>
        </div>
        <el-menu :default-active="$route.path"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse"
                 background-color="rgba(0, 0, 0, 0)" text-color="#848391" active-text-color="#ffffff">
          <el-menu-item @click="jump(1)" index="/Overviewpreview"><i class="my-icongaikuang" style="margin-right: 5px"></i>概况预览
          </el-menu-item>
          <el-menu-item @click="jump(2)" index="/RentManage"><i class="my-iconfangwufangchan" style="margin-right: 5px"></i>租务管理
          </el-menu-item>
          <el-menu-item @click="jump(3)" index="/MeterReadingManage"><i class="my-iconchaobiao" style="margin-right: 5px"></i>抄表管理
          </el-menu-item>
          <el-menu-item @click="jump(4)" index="/ReportManage"><i class="my-iconforms" style="margin-right: 5px"></i>报表管理
          </el-menu-item>
          <el-menu-item @click="jump(5)" index="/FinancialManage"><i class="my-iconfinance" style="margin-right: 5px"></i>财务管理
          </el-menu-item>
          <el-menu-item @click="jump(6)" index="/RightsManage"><i class="my-iconquanxianguanli-" style="margin-right: 5px"></i>权限管理
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="90px" class="header">
          <div class="Top-bar">

            <div><i class="my-iconshouqi"></i>
<!--              <div class="menu-name">{{menuNmae}}</div>-->
            </div>
            <el-popover
              placement="bottom"
              width="250"
              trigger="hover">
              <div
                style="height: 60px;background-color: #ffffff;display: flex;flex-direction: row;justify-content: space-around">
                <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                  <i class="my-icongerenzhongxin"></i>
                  <span class="account-text">个人中心</span>
                </div>
                <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                  <i class="my-iconxiugaimima"></i>
                  <span class="account-text">修改密码</span>
                </div>
                <div style="display: flex;flex-direction: column;justify-content: center;align-items: center" @click="exit">
                  <i class="my-iconanquantuichu"></i>
                  <span class="account-text">安全退出</span>
                </div>
              </div>
              <div class="account " slot="reference">
                <span style="font-size: 16px;font-weight: 600">超级管理员</span>
                <div class="account-image">
                  <el-image
                    style="width: 100%; height: 100%;  border-radius:50%; display: flex;border-radius: 50%;
                  align-items: center;justify-content: center;overflow: hidden;"
                    :src="imageUrl"
                    fit='fill'></el-image>
                </div>
                <i class="my-iconshezhi"></i>
              </div>
            </el-popover>
          </div>
          <div class="Top-tabs">

          </div>
        </el-header>

        <el-main>
          <transition name="fade" mode="out-in">
              <router-view ></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "HomeOverview",
    data() {
      return {
        isCollapse: false,
        menuNmae: '概况',
        active_router: '1',
        imageUrl: require('@/assets/image/accountImage.jpg'),
      }
    },

    methods: {
      //导航展开
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      //导航收起
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //顶部导航名称
   /*   menuNameShow() {
        console.log('path:'+ $route.path)
        if (this.$route.path == '/Overviewpreview') {
          this.menuNmae = '概况'
        } else if (this.$route.path == '/RentManage') {
          this.menuNmae = '租务'
        } else if (index == 3) {
          this.menuNmae = '抄表'
        } else if (index == 4) {
          this.menuNmae = '报表'
        } else if (index == 5) {
          this.menuNmae = '财务'
        } else {
          this.menuNmae = '权限'
        }
      },*/
   //退出
      exit(){
        this.$router.push('/')
      },
      //跳转
      jump(type) {
        this.active_router = type + ''
        if (type == 1) {
          this.$router.push('/Overviewpreview')
        } else if (type == 2) {
          this.$router.push('/RentManage')
        }else if (type == 3){
          this.$router.push('/MeterReadingManage')
        }else if (type == 4){
          this.$router.push('/ReportManage')
        }else if (type == 5){
          this.$router.push('/FinancialManage')
        }else if (type == 6){
          this.$router.push('/RightsManage')
        }
      }
    },
    watch: {
      '$route.path': {
        handler(val, oldVal) {
          if (val == '/Overviewpreview') {
            this.active_router = '1'
          } else if (val == '/RentManage') {
            this.active_router = '2'
          } else if (val == '/MeterReadingManage') {
            this.active_router = '3'
          } else if (val == '/ReportManage') {
            this.active_router = '4'
          }else if (val == '/FinancialManage') {
            this.active_router = '5'
          }else if (val == '/RightsManage') {
            this.active_router = '6'
          }
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .menu {
    background-image: linear-gradient(#090723, #336666 90%);
    bottom: 0;
    position: absolute;
    width: 180px;
    height: 100%;
  }

  .header {
    width: 100%;
    padding: 0;
    left: 0;
    background: #CCCCCC;
  }


  .header >>> .el-header {
    background-color: #CCCCCC;
    color: #333;
    text-align: center;
    height: 100%;
    padding: 0px !important;
  }

  .el-aside {
    background-image: linear-gradient(#090723, #336666 90%);
    color: #fff;
    text-align: center;
    line-height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .Top-bar {
    height: 60px;
    padding-left: 10px;
    border-bottom: #333333 1px solid;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .account {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .Top-tabs {
    height: 30px;
    width: 100%;
    background: #ffffff;
  }


  .el-menu-vertical-demo[data-v-33a7e0b0]:not(.el-menu--collapse) {
    width: 210px;
    border: none;
    min-height: 400px;
  }

  .logo {
    width: 100%;
    height: 59px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: #999999 2px solid;
  }

  .System_name {
    font-size: 25px;
    display: block;
    float: left;
    width: 120px;
    height: 20px;
    color: rgba(255, 255, 255, 0.8);
    font-family: 华文隶书;
  }

  .System_name_english {
    font-size: 13px;
    width: 120px;
    color: rgba(255, 255, 255, 0.8);
    display: block;
    float: left;
    font-family: AcmeFont;
  }

  .menu-name {
    width: 50px;
    height: 20px;
    line-height: 20px;
    border-left: #333333 1px solid;
    margin-left: 10px;
    display: inline-block;
  }

  .account-image {
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }

  .account-text {
    display: inline-block;
  }
</style>
