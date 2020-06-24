<template>
  <div class="baseInformationBox">
      <div class="total_tips">
          <img src="../../../assets/image/index/zhuyi.png" alt="">
          <p>黄色字段为必填字段哦</p>
      </div>
        <el-row 
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <!-- 左板块 -->
            <el-col class="left_box" :span="14">
                <el-form ref="form"  :rules="rules" :model="form" label-width="160px">
                    <!--  -->
                    <el-row>
                        <el-col :span="12">
                            <el-form-item class="bordernone" label="单位名称：">
                                <el-input disabled v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="bordernone" label="单位类型：">
                                <el-input disabled v-model="form.type"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--  -->
                    <el-row class="required">
                        <el-col :span="12">
                            <el-form-item label="法人/单位负责人：" prop="legalPerson">
                                <el-input placeholder="请填写法人/单位负责人" v-model="form.legalPerson"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话：" prop="legalPersonPhone">
                                <el-input  placeholder="请填写联系电话" v-model="form.legalPersonPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--  -->
                    <el-row class="required">
                        <el-col :span="12">
                            <el-form-item label="消防管理负责人：" prop="contractName">
                                <el-input placeholder="请填写消防管理负责人" v-model="form.contractName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话："  prop="contractPhone">
                                <el-input placeholder="请填写联系电话"  v-model="form.contractPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--  -->
                    <el-row class="address_row">
                        <el-col :span="22">
                            <el-form-item  class="address_form-item bordernone" label="地图定位：">
                                <el-input disabled v-model="form.address"></el-input>
                                <div class="imgbox">
                                    <img @click="openMap" src="../../../assets/image/index/report_img_066.png" alt="">
                                </div>
                            </el-form-item> 
                        </el-col>
                        
                           
                        <!-- 弹窗 -->
                        <base-dialog ref="mapDialog" title="地图位置">
                                <base-map :lat="form.lat" :lng="form.lng"></base-map>
                        </base-dialog>

                       
                    </el-row>
                   
                    <el-form-item class="bordernone" label="所属区域：">
                        <el-input disabled v-model="form.area"></el-input>
                    </el-form-item>
                    <!-- 分割线 -->
                    <el-divider content-position="left"><i class="el-icon-sort"></i></el-divider>
                    <!--  -->
                    <el-row class="required">
                        <el-col :span="12">
                            <el-form-item label="专/兼职消防员数量：" prop="firemanNum">
                                <el-input placeholder="请填写专/兼职消防员数量" v-model="form.firemanNum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职工人数：" prop="workerNum">
                                <el-input placeholder="请填写职工人数" v-model="form.workerNum" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--  -->
                    <el-form-item class="bordernone" label="消防管理归口部门：">
                        <el-input disabled v-model="form.fireDeptName"></el-input>
                    </el-form-item>
                    <!--  -->
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="归口部门联系人：">
                                <el-input placeholder="请填写归口部门联系人" v-model="form.fireDeptContractName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话：">
                                <el-input placeholder="请填写联系电话" v-model="form.fireDeptContractPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                </el-form>
            </el-col>
            <!-- 右板块 -->
            <el-col class="right_box" :span="10">
                <el-row>
                    <!--  -->
                    <el-row>
                        <baseUploadImg  v-model="form.zP_Picture"></baseUploadImg>
                    </el-row>
                    <!--  -->
                   <!--  <el-row class="displayFlex marginTop40">
                        <el-button @click="openDialog" class="dataButton" icon="el-icon-s-data">数据汇总报表</el-button>
                        <basereport ref="basereport"></basereport>
                    </el-row> -->
                    <!--  -->
                    <el-row class="displayFlex"> 
                        <el-row class="save_cancel"> 
                            <el-col :span="12">
                            <el-button @click="submit" class="save">保存</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button class="cancel" @click="reset">取消</el-button>
                            </el-col>
                        </el-row>
                    </el-row>
                   
                </el-row>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import baseUploadImg from '../../../components/baseUploadImg'
import baseDialog from '../../../components/baseDialog'
import baseMap from '../../../components/baseMap'
// import basereport from '../../../components/UnitReport'
export default {
    components:{
        baseUploadImg,
        baseDialog,
        baseMap,
        // basereport
    },
    data(){
        return{
            loading:false,
            zoom:12,//初始化地图显示层级
            center:[104.07,30.67],//地图中心坐标,
            position:[104.07,30.67], //标记点
            form:{},//验证规则
            rules: {
                legalPerson: [
                    { required: true, message: "请输入法人/负责人姓名", trigger: "blur" }
                ],
                legalPersonPhone: [
                    { required: true, message: "请输入法人/负责人电话号码", trigger: "blur" }
                ],
                workerNum: [
                    { required: true, message: "请输入职工人数", trigger: "blur" }
                ],
                firemanNum: [
                    { required: true, message: "请输入专职消防人员数量", trigger: "blur" }
                ],
                contractName: [
                    { required: true, message: "请输入消防管理负责人", trigger: "blur" }
                ],
                contractPhone: [
                    { required: true, message: "请输入消防管理负责人电话", trigger: "blur" }
                ],
            },
        }
    },
    created(){
        this.GetFireUnitInfo()
    },
    methods:{
        //获取基本信息
        GetFireUnitInfo(){
            this.loading = true
            let UserId = localStorage.getItem('userId')
            let Id = localStorage.getItem('fireUnitID')
            this.$axios.get(this.$api.GetFireUnitInfo,{params:{UserId,Id}}).then(res=>{
                console.log("获取基本信息成功",res)
                 this.loading = false
                if(res.data.success){
                    this.form = res.data.result
                    if(!res.data.result.fireDeptName){
                        this.form.fireDeptName = '暂无关联的归口部门'
                    }
                }
            }).catch(err=>{
                console.log("获取基本信息失败",err)
            })
        },
      /*   openDialog(){
            console.log("打印报告",index, this.$refs.basereport)
            let index =localStorage.getItem('fireUnitID')
            this.$refs.basereport.getInfo(index)
           
        }, */
        //打开地图弹窗
        openMap(){
            console.log("打开弹窗")
            let B = this.$refs.mapDialog
            B.dialogVisible = true
        },
        //保存信息
        submit(){
            this.$refs.form.validate(valid => {//对整个
                if(valid){
                    console.log(this.form)
                    this.$confirm('确定修改该单位信息吗？',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                    }).then(()=>{
                        this.$axios.put(this.$api.Update,this.form).then(res=>{
                            console.log("添加信息成功",res)
                            this.$message({
                                message: '修改单位信息成功',
                                type: 'success'
                            });
                        }).catch(err=>{
                            console.log("添加信息失败",err)
                        })
                    }).catch(()=>{})
                }
            })
           
        },
        //取消按钮
        reset(){    
            this.GetFireUnitInfo();
        }
    }

}
</script>

<style lang="less" >
    .baseInformationBox{
        .total_tips{
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            color:rgb(255, 252, 191) !important;
            font-size: 14px;
            img{
                margin-right: 20px;
            }
        }
        .left_box{
            .el-row{
                margin-bottom: 20px;
            }
            .bordernone{
                .el-input__inner{
                    border: none !important;
                }
            }
            .el-form{
                &>.el-form-item{
                    margin-bottom: 42px;
                }
               
            }
            .el-form-item{
                .el-form-item__label{
                    color: white !important;
                }
                .el-input__inner{
                    border: 1px solid #025691;
                    background: #020d1c;
                    color: #abd5ff;
                }
                input::placeholder{
                    color: #b6b5b5;
                }
            }
            .required{
                 .el-form-item__label{
                    color:rgb(255, 252, 191) !important;
                }
            }
            
            .address_row{
                .address_form-item{
                    .el-form-item__content{
                        display: flex;
                        align-content: center;
                        .el-input{
                            width: 30%;
                        }
                    }
                }
                .imgbox{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            }
            .el-divider{
                background: #abd5ff;
            }
            .el-divider__text{
                background: #020d1c;
                color: white;
            }

        }
        .right_box{
            .dataButton{
                width: 300px;
                background: #020d1c;
                border-color: #025691;
                color: white;
            }
            .save_cancel{
                width: 400px;
                margin-top: 100px;
                .el-button{
                    width: 100%;
                    color: white;
                    &.save{
                        background: rgb(1, 0, 80);
                        border-color: #abd5ff;

                    }
                     &.cancel{
                      background: #020d1c;
                      border-color: #025691
                    }
                }
                .el-col{
                    padding: 0 20px;
                }
            }
        }
        
      
    }
</style>