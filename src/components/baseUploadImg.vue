<template>
  <div class="uploadimg">
    <el-image v-if="url" :style="{width: imgWidth,height: imgHeight}" :src="url" fit="cover"></el-image>
    <div class="noImg" v-else>
        <img :src="uploadimgIocn" alt="">
    </div>
   
    <el-button  @click="openFile">{{uploadimg}}</el-button>
    <input type="file" ref="uploadInput" @change="upload">
  </div>
</template>

<script>
export default {
    model:{
        prop:'url',
        event:'change'
    },
    props:{
        url:String,
        imgWidth:{
            type:String,
            default(){
                return '200px'
            }
        },
        imgHeight:{
            type:String,
            default(){
                return '200px'
            }
        },
        uploadimg:{
            type:String,
            default :'上传图片'
        }
    },
    data(){
        return{
            uploadimgIocn:require("../assets/image/index/upload.png"),
            urlimg:''
        }
    },
    watch:{
        url(val){
            this.urlimg= val
        },
        // urlimg(val){
        //     console.log(val)
        //     this.$emit('input',val)
        // }
    },
    methods:{
        openFile(){
            let input = this.$refs.uploadInput
            input.click();
        },
        upload(){
            let input = this.$refs.uploadInput
            let imgFile = input.files[0]
            this.fileToBase64(imgFile).then(res=>{
                this.$emit('change',res)
            })
            console.log(imgFile)
        },
        fileToBase64(file){
            let that =this,
            reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve,reject)=>{
                reader.onload = function (e) { 
                    if(this.result){
                        resolve(this.result)
                    }else{
                        reject("err")
                    }

                }
            })  
        }

    }
};
</script>

<style lang="less">
    .uploadimg{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .noImg{
            width: 200px;
            height: 200px;
            border: 1px solid skyblue;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .el-button{
            width: 300px;
            margin-top: 30px;
            background: rgb(1, 0, 80);
            color:white;
        }
        input{
            display: none;
        }
    }
</style>