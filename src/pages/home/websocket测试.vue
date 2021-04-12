<template>
  <div class="testIndex">
      <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即发送</el-button>
                <el-button @click="goout">取消</el-button>
            </el-form-item>
      </el-form>

      <div class="">
          <h1>接收到的消息:</h1>
            <p v-for="(i,index) in receiveMsg" :key="index">{{i}}</p>

      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            socket:{},//socket创建实例对象
            path:'ws://10.10.77.88:64494/ws',//需要连接的地址
            form:{
                name:''
            },
            receiveMsg:[],
        }
    },
    created(){
        this.init();
    },
    methods:{
            init(){
                if(typeof(WebSocket) === "undefined"){
                    alert("您的浏览器不支持socket")
                }else{
                    // 实例化socket
                    this.socket = new WebSocket(this.path)
                    // 监听socket连接
                    this.socket.onopen = this.open
                    // 监听socket错误信息
                    this.socket.onerror = this.error
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage
                }
            },
            open(){
                console.log("连接成功")
            },
            error(){
                 console.log("连接错误")
            },
            getMessage(res){
                console.log("收取到的信息",res)
                this.receiveMsg.push(res.data)
            },
            close(){
                 console.log("关闭连接")
            },
            //发送信息
            onSubmit(){
                console.log(this.form.name)
                this.socket.send(this.form.name)
            },
            goout(){
                this.$router.push({
                    path:'/dataPage'
                })
            }
    },
    destroyed () {
        console.log("关闭页面")
        // 销毁监听
        this.socket.onclose = this.close()
    }
}
</script>

<style lang="less">
    .testIndex{
        width: 100%;
        height: 100%;
        background: white;
    }
</style>