<template>
  <div class="uploadImgBox">
      <!-- 这里是新增 -->
      <div class=""  v-if="!isedit">
        <div class="uploadImg" @click="openfile" v-if="!base64Img">
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <div @click="openfile" v-else>
             <el-avatar  shape="circle" :size="80" fit="cover" :src="base64Img"></el-avatar>
        </div>
          <input type="file"  @change="upload" ref="input_file" name="file" class="input">
         
      </div>
      <!-- 这里是编辑 -->
      <div v-else>

      </div>

  </div>
</template>

<script>
export default {
   /*  model:{
        prop:'base64Img',
        event:"change"
    }, */
    props: {
       isedit:{
           type:Boolean,
           default:false
       },
       base64Img:String
    },
    data(){
        return{
        }
    },
    methods:{
        openfile(){
            
            let input = this.$refs.input_file
            input.click();
        },
        upload(e){
          let $target = e.target || e.srcElement
          let file = $target.files[0]
            if($target && file){
                this.fileToBase64(file).then(res=>{
                    
                    this.base64reduce(res).then(res2=>{
                        this.$emit('update:base64Img', res2)
                    })
                })
            }
           


        },
        fileToBase64(file){
            console.log("file",file)
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

         
        },
        base64reduce(url){
            let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            image = new Image(),
            MAX_WH = 450;
            image.crossOrigin = "Anonymous";
           
            return new Promise((resolve,reject)=>{
                image.onload = function(){
                    if (image.height>MAX_WH) {
                        image.width *= MAX_WH/image.height;
                        image.height = MAX_WH
                    }
                    if (image.width>MAX_WH) {
                        image.height *= MAX_WH/ image.width;
                        image.width = MAX_WH;
                    }
                    canvas.height = image.height;
                    canvas.width = image.width;
                    ctx.drawImage(image, 0, 0,image.width,image.height);
                    let dataURL = canvas.toDataURL( "image/png/jpg"); 
                    if(dataURL){
                        resolve(dataURL)
                    }else{
                        reject("err")
                    }
                }
                image.src =url
            })
        }
    }
}
</script>

<style lang="less">
    .uploadImgBox{
        display: flex;
        justify-content: center;
        padding: 20px 0px;
        input{
            display: none;
        }
    }
    .uploadImg{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px dotted white;
        display: flex;
        align-items: center;
        justify-content: center;
        .avatar-uploader-icon{
            font-size: 28px;
        }
       
    }
</style>