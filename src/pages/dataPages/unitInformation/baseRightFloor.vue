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
                            <el-button type="primary" @click="updatefloor" >修改</el-button>
                            <el-button type="primary" @click="deletefloor" >删除</el-button>
                        </div>
                        <el-row class="imgBox" v-if="urlimg"> 
                            <el-col :span="24">
                                <el-image class="elimage" :src="urlimg" fit="fit"></el-image>
                            </el-col>
                        </el-row>
                        
                    </div>
                </el-col>
                <baseDialog width="30%" ref="addfloor_Dialog" title=" 新增楼层">
                    <el-form :model="add_floorForm"  ref="add_floorForm" label-width="100px" class="add_floorForm">
                        <el-form-item label="建筑名称:"  prop="architectureId">
                                <el-select disabled v-model="add_floorForm.architectureId" placeholder="请选择活动区域">
                                    <el-option 
                                    v-for="(arr,x) in allbuild_data" 
                                    :key="x" 
                                    :label="arr.name" 
                                    :value="arr.id"></el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="楼层名称:" prop="name">
                            <el-input v-model="add_floorForm.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">确定</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </baseDialog>
            </el-row>
    </div>
</template>

<script>
import baseDialog from '../../../components/baseDialog'
export default {
    components:{
        baseDialog
    },
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
            FloorData:Object,
            allbuild_data:[],
            add_floorForm:{
                architectureId:+sessionStorage.getItem('architectureId'),
                id:'',
                name:''
            }
        }
    },
    created(){
       
        //  this.urlimg = this.floor_pic
        this.add_floorForm.name = this.floorinformation.name
        this.add_floorForm.id = this.floorinformation.id
        this.floor_id = this.floorinformation.id
        console.log("floor_id",this.floor_id )
        this.GetListByFireUnitId();
        this.GetFloorById();
    },
    methods:{
         GetListByFireUnitId(){
            let fireunitId = localStorage.getItem('fireUnitID')
            this.$axios.get(this.$api.GetListByFireUnitId,{params:{fireunitId}}).then(res=>{
                console.log("获取总体建筑信息",res)
    
                    this.allbuild_data =  res.data.result
               
            }).catch(err=>{
                console.log("获取总体建筑信息失败",err)
            })
        },
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
        },
        //修改楼层
        updatefloor(){
            this.$refs.addfloor_Dialog.dialogVisible = true
        },
        onSubmit(){
            this.$axios.put(this.$api.UpdateFloor,this.add_floorForm).then(res=>{
                    // console.log("修改楼层信息成功",res)
                    if(res.data.success){
                        this.$message({
                            message: '修改楼层信息成功',
                            type: 'success'
                        });
                        this.$refs.addfloor_Dialog.dialogVisible = false
                        this.$emit('DeleteFloor')
                    }
                }).catch(err=>{
                    console.log("修改楼层信息失败",err)
                })
        },
        //删除
        deletefloor(){
            this.$confirm('确定删除该楼层？',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(()=>{
                this.$axios.delete(this.$api.DeleteFloor,{params:{floorId:this.floor_id}}).then(res=>{
                    // console.log("删除",res)
                    this.$message({
                        message: '删除楼层成功',
                        type: 'success'
                    });
                    this.$emit('DeleteFloor')
                })
            })
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