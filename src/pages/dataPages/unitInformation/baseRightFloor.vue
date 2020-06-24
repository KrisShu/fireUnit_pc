<template>
    <div class="baseRightFloor">
       
            <el-row>
                <el-col :span="24">
                    <div class="grid-content">
                        <div class="top_box">
                            <span>楼层平面图：</span>
                            <el-button class="choose" @click="uploadImg" >选择图片<i class="el-icon-picture-outline el-icon--right"></i></el-button>
                            <el-button class="upload" @click="update" >上传<i class="el-icon-upload el-icon--right"></i></el-button>

                            <!-- 2019/1/9 -->
                            <el-button class="upload" @click="Markerpoint()" >火警点位</el-button>
                            <input type="file" ref="uploadInput" @change="upload">
                        </div>
                        <el-row class="imgBox" v-if="urlimg"> 
                            <el-col :span="24">
                                <el-image class="elimage" :src="urlimg" fit="fit"></el-image>
                            </el-col>
                        </el-row>
                        
                    </div>
                </el-col>
            </el-row>
    </div>
</template>

<script>
export default {
    model:{
        prop:'floorinformation',
        event:"change"
    },
    props:{
        // floor_pic:String,
        floorinformation:Object,
        floorinformation_id:'',
    },
    watch:{
       floorinformation_id(val,oldval){
           console.log(val,oldval)
           if(val != oldval){
               this.floor_id = val;
               this.GetFloorById()
           }
       }
    },
    data(){
        return{
            urlimg:"",
            floor_id :"",
            FloorData:Object
        }
    },
    created(){
       
        //  this.urlimg = this.floor_pic
      
        this.floor_id = this.floorinformation.id
        console.log("floor_id",this.floor_id )
        this.GetFloorById();
    },
    methods:{
        GetFloorById(){
            this.$axios.get(this.$api.GetFloorById,{params:{floorId:this.floor_id}}).then(res=>{
                console.log("获取楼层的信息",res)
                this.FloorData = res.data.result
                if(res.data.result.floor_Picture){
                    this.urlimg = res.data.result.floor_Picture;
                }else{
                     this.urlimg =""
                }

            })
        },
        //
        uploadImg(){
            this.$refs.uploadInput.click();
        },
        upload(){
            let input = this.$refs.uploadInput
            let imgFile = input.files[0]
            this.fileToBase64(imgFile).then(res=>{
                this.urlimg = res;
                this.urlimg = res;
               
            })

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
        },
        //修改楼层信息
        update(){
            console.log(this.floorinformation)
            this.$confirm('确定上传该楼层的平面图？',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(()=>{
                let p = {}
                // p.name = this.FloorData.name;
                p.floor_Picture = this.urlimg;
                // p.architectureId = this.FloorData.architectureId;
                p.id = this.FloorData.id;
                this.$axios.put(this.$api.UpdateFloor,p).then(res=>{
                    console.log("修改楼层信息成功",res)
                    if(res.data.success){
                        this.$message({
                            message: '上传楼层图片成功',
                            type: 'success'
                        });
                    }
                }).catch(err=>{
                    console.log("修改楼层信息失败",err)
                })
            }).catch(()=>{

            })
           
        },
        //火警点位
        Markerpoint(){
            const {href} = this.$router.resolve({
                name: "fireAlarmLocation",
                query:{
                    floor_id:this.floor_id
                }
            });
            window.open(href, '_blank');
        }

    }
}
</script>

<style lang="less">
.baseRightFloor{
    .grid-content{
        .top_box{
            &>span{
                color: white;
            }
            input{
                display: none;
            }
            .el-button{
                width: 160px;
                margin-left: 40px;
                color: white;
                &.choose{
                    background: black;
                    
                }
                &.upload{
                  background: #093169;
                }
            }
        }
        // ------------
        .imgBox{
            margin-top: 40px;
        }
        .elimage{
            width: 100%;
            height: 600px;
        }
    }
}

</style>