<style lang="less">
    #loginContainer{
        width: 100%;
        height: 100%;
        background:url("../../assets/image/login/load_img_bg.png")  no-repeat;
      /*   background-size: cover; */
      background-size: 100% 100%;

        position: relative;
        .loginBox{
            width: 786px;
            height: 400px;
            background: url("../../assets/image/login/load_img_bg01.png");
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            justify-content: flex-end;
            .loginFrom{
                height: 100%;
                width: 314px;
                padding: 40px 20px;
                box-sizing: border-box;
                .el-form-item{
                    margin-bottom: 44px;
                }
 
                .el-form-item__content{
                    margin: 0px !important;
                    display: flex;
                    align-items: center;
                    .el-form-item__error{
                        color: #00b4ff;
                    }
                    .el-input{
                       border: none;
                       background-color: #1f3769;
                     /*   margin-bottom: 20px; */
                       .el-input__inner{
                            border: none;
                            background-color:  #1f3769;
                            color: white;
                       }
                     
                    }
                    .el-button{
                        width: 100%;
                        background: url('../../assets/image/login/load_btn_load.png') no-repeat;
                        background-size: cover;
                        border: none;
                        height: 38px;
                    }
                }
                .login_code{
                    .el-form-item__content{
                       .el-input{
                           width: 130px;
                       }
                       a{
                           color: #fefefe;
                       }
                    }
                }
            }
        }
    }
</style>
<template>
    <div id="loginContainer">
        <div class="loginBox">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">
                    <div class="loginFrom">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="80px">
                            <!-- 用户名 -->
                            <el-form-item  prop="name">
                                <el-input  placeholder="请输入您的用户名" v-model="ruleForm.name">
                                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                                </el-input>
                                
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input  type="password" placeholder="请输入您的密码" v-model="ruleForm.password">
                                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="login_code">
                                <el-input  placeholder="请输入验证码" v-model="ruleForm.code">
                                    <i slot="prefix" class="el-input__icon  el-icon-key"></i>
                                </el-input>
                                <img :src="code" alt="">
                                <a @click="changeCode" href="#">换一张</a>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit(ruleForm)"></el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            </el-tabs>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeName:'first',
            ruleForm: {
                name: '',
                password: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            
            },
            code:'',//验证码
        }
    },
    methods:{
        handleClick(){

        },
        /* 用户登录 */
        onSubmit(formName){
            /* this.$router.push({
                        path:'/home'
                    }) */
            this.$refs.ruleForm.validate((valid) => {
            if (valid) {
            let account = this.ruleForm.name
            let password = this.ruleForm.password
            let verifyCode = this.ruleForm.code

            console.log("参数",account,password)
            let that = this;
            this.$axios({
                    method:'post',
                    url:that.$api.USER_LOGIN,
                    data:{
                        account,
                        password,
                        verifyCode,
                        isPersistent:false
                    } 
            }).then(res=>{
                if(res.data.result.success){
                        console.log("登录成功",res)
                        localStorage.setItem('fireUnitID',res.data.result.fireUnitID)
                        localStorage.setItem('fireUnitName',res.data.result.fireUnitName)
                        localStorage.setItem('userId',res.data.result.userId)
                        localStorage.setItem('userName',res.data.result.name)
                        localStorage.setItem('islogin',true)
                        localStorage.setItem('contractPhone',res.data.result.contractPhone)
                        localStorage.setItem('miniFireStationId',res.data.result.miniFireStationId)
                        localStorage.setItem('miniFireStationName',res.data.result.miniFireStationName)
                        that.$router.push({
                            name:'home'
                        })
                }else{
                        that.$message.error(res.data.result.failCause);
                        console.log("登录成功",res)
                }
            }).catch(res=>{
                    that.$message.error('登录失败，请填写正确的登录信息');
            })
            } else {
                return false;
            }
            })
        },
        /* 获取验证码 */
        getCode(){
            let that = this;
            this.$axios({
                method:'get',
                url:that.$api. GET_VERIFY_CODE,
                responseType:'blob'
            }).then(res=>{
                console.log("获取验证码",res)
                that.code = window.URL.createObjectURL(res.data)
            }).catch(res=>{
                 console.log("获取验证码失败",res)
            })
        },
        /* 更换二维码 */
        changeCode(){
            let that = this;
            this.$axios({
                method:'get',
                url:that.$api. GET_VERIFY_CODE,
                responseType:'blob'
            }).then(res=>{
                console.log("获取验证码",res)
                that.code = window.URL.createObjectURL(res.data)
            }).catch(res=>{
                 console.log("获取验证码失败",res)
            })
        }

    },
    mounted(){
        this.getCode();
    },
    created(){

      if(localStorage.getItem('islogin')) {
           this.$router.push({
                        path:'/'
                    })
      } 
    }
}
</script>

