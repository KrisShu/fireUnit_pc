<style  lang="less">
#baseHeaderContainer {
  padding: 10px 20px;
  height: 8%;
  width: 100%;
  min-height: 74px;
  color: white;
  background: #00060e;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .el-row{
    width: 100%;
  }
  .logoBox {
    height: 56px;
    display: flex;
    align-items: center;
    .logo {
      width: 136px;
      height: 46px;
    }
  }
  .logoCenter {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
      height: 56px;
    }
  }
  .time {
    height: 56px;
    display: flex;
    align-items: center;
    color: #9fb6d5;
    font-size: 14px;
    justify-content: right;
    .userName,
    .logout {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #7ec9fe;
      margin:0px 10px;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
        margin-right: 6px;
      }
    }

    .userName {
      border-right: 1px solid #0b438a;
    }
  }

  .logOut_dialog{
      .el-dialog{
        width: 500px;
        height: 300px;
        border-image:url("../../assets/image/home/home_img_bg.png") 22 24 repeat stretch;
        border-style: solid;
        border-width: 24px 24px;
        background: #072041;
      }
      .el-dialog__headerbtn{
          display: none;
      }
      .el-dialog__header{
          text-align: center;
          font-size: 18px;
          .el-dialog__title{
               color: #fff;
          }
      }
       .el-dialog__body{
         height: 65px !important;
      }
      .el-dialog__footer{
          .dialog-footer{
            display: flex;
            justify-content: space-around;
            .el-button{
                width: 140px;
                height: 50px;
                padding: 0;
                border: none;
                span{
                    color: #fff;
                    font-size: 14px;
                }
            }
            .el-button--default{
                background-color: #04a8c6;
            }
          }
          
      }
      
      
  }
}
</style>
<template>
  <div id="baseHeaderContainer">
    <el-row>
      <el-col :span="4">
        <div @click="back" class="grid-content bg-purple logoBox">
          <img class="logo" src="../../assets/image/home/logo.png" alt />
        </div>
      </el-col>
      <el-col :span="16">
        <div  @click="go" class="grid-content logoCenter bg-purple-light">
          <img src="../../assets/image/home/home_img_topBg.png" alt />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple time">
            <div class="userName">
              <img src="../../assets/image/login/user_img.png" alt />
              <span>{{fireUnitName}}：{{userName}}</span>
            </div>
            <div class="logout" @click="logOutDialog">
              <img src="../../assets/image/login/logout_img.png" alt />
              <span>注销</span>
            </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog class="logOut_dialog" title="您确定要注销吗？" :visible.sync="dialogVisible" width="30%" >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    ishome:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
        dialogVisible:false
    };
  },
  mounted() {
    let that = this;
  },
  computed: {
    userName: function() {
      return localStorage.getItem("userName");
    },
    fireUnitName: function() {
      return localStorage.getItem("fireUnitName");
    }
  },
  methods: {
    // 获取当前时间函数
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10   ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm =  new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTime = year + "-" + month + "-" + date + "  " + hh + ":" + mm + ":" + ss;
      // console.log(this.nowTime);
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
    },
    /* 跳转到首页 */
    go() {
      console.log("sssssssssssssss")
      if(this.ishome){
         this.$router.push({
          path: "/dataPage"
        });
      }else {
        
         this.$router.push({
          path: "/"
        });
      }
      
    },
    /* 返回数据大屏 */
    back() {
      this.$router.push({
        path: "/"
      });
    },
    /* 退出登录 */
    logOutDialog() {
        this.dialogVisible = true
    },
    /*  */
    logout(){
         this.dialogVisible = false;
         localStorage.clear();
          this.$router.push({
                name:'login'
            })
    }
  }
};
</script>



