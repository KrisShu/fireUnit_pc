<template>
  
    <div class="baserightform">
        <!--top  -->
        <el-row class="right_box_top">
            <el-col :span="12">
                <el-row v-if="isadd" class="right_box_top_SaveCancel">
                    <el-col :span="12">
                        <el-button @click="addNew" class="save">保存</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button @click="cancel" class="cancel">取消</el-button>
                    </el-col>
                
                </el-row>
                <el-row v-if="!isadd" class="right_box_top_SaveCancel">
                    <el-col :span="8">
                        <el-button @click="totalSave" class="save">保存</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button class="cancel" @click="cancel">取消</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button @click="deletebuild" class="cancel">删除</el-button>
                    </el-col>
                
                </el-row>
                <!--top表单  -->
                <el-form ref="form" :model="facilitiesForm" label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item class="must_label" label="建筑名称">
                                <el-input placeholder="请输入建筑名称" v-model="facilitiesForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="must_label" label="消防联系人">
                               <el-select v-model="facilitiesForm.fireUnitUserId" placeholder="请选择消防联系人">
                                    <el-option
                                    v-for="item in firePractitioners"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <!--  -->
                    <!--   <el-row class="floor_box"> 
                        <el-col class="el_col_tips" :span="5">
                            <span class="must_label floorNum">建筑层数</span>
                        </el-col>
                        <el-col :span="19">
                            <el-row>
                                <el-col :span="12">
                                <el-form-item class="up up_down" label="地上">
                                    <el-input-number v-model="facilitiesForm.aboveNum"  :min="1" :max="50" label="地上层数"></el-input-number>
                                </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                <el-form-item class="up_down" label="地下">
                                    <el-input-number v-model="facilitiesForm.belowNum"  :min="0" :max="10" label="地下层数"></el-input-number>
                                </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row> -->
                    <!--  -->
                    <el-form-item label="建造年代">
                        <el-input placeholder="请输入年份" v-model="facilitiesForm.buildYear">
                        <template slot="append">年</template>
                        </el-input>
                    </el-form-item>
                    <!--  -->
                    <el-form-item label="建筑面积(M²)">
                        <el-input placeholder="请输入建筑面积" v-model="facilitiesForm.area"></el-input>
                    </el-form-item>
                    <el-form-item label="建筑高度(M)">
                        <el-input  placeholder="请输入建筑高度" v-model="facilitiesForm.height"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <!-- 上传图片 --> 
            <el-col :span="10" :offset="2">
                <baseUploadImg v-model="facilitiesForm.outward_Picture"></baseUploadImg>
            </el-col>
        </el-row>
        <!--分割线  -->
        <el-divider content-position="left">
            <i>消防设施情况</i>
        </el-divider>
        <!-- 消防设施情况 -->
        <table class="baseTable">
            <!-- 楼梯间 -->
            <tr>
                <td class="left_title">楼梯间</td>
                <td>
                <div class="ishave_top">
                    <el-radio-group v-model="facilitiesForm.fireDevice_LTJ_Exist" >
                        <el-radio  :label="true">有</el-radio>
                        <el-radio  :label="false">无</el-radio>
                    </el-radio-group>
                        
                </div>
                <div v-if="facilitiesForm.fireDevice_LTJ_Exist" class="select_box">
                    <div class="row">
                        <div class="demo-input-suffix width50 ">
                        <span class="left_title">敞开楼梯间数量：</span>
                        <el-input  v-model="facilitiesForm.fireDevice_LTJ_Detail.open"></el-input>
                        </div>
                        <div class="demo-input-suffix width50">
                            <span class="left_title">封闭楼梯间数量： </span>
                        <el-input  v-model="facilitiesForm.fireDevice_LTJ_Detail.close"></el-input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="demo-input-suffix width50">
                            <span class="left_title">防烟楼梯间数量： </span>
                            <el-input  v-model="facilitiesForm.fireDevice_LTJ_Detail.nosmoke"></el-input>
                        </div>
                        <div class="demo-input-suffix width50">
                            <span class="left_title">室外楼梯间数量： </span>
                        <el-input  v-model="facilitiesForm.fireDevice_LTJ_Detail.outside"></el-input>
                        </div>
                    </div>

                </div>
                </td>
            </tr>
            <!-- 火灾自动报警系统 -->
            <tr>
                <td class="left_title">火灾自动报警系统</td>
                <td>
                    <div class="ishave_top">
                        <el-radio-group v-model="facilitiesForm.fireDevice_HJ_Exist">
                            <el-radio  :label="true">有</el-radio>
                            <el-radio  :label="false">无</el-radio>
                        </el-radio-group>
                            
                    </div>
                    <div v-if="facilitiesForm.fireDevice_HJ_Exist" class="select_box">
                        <div class="row">
                            <span>报警形式：</span>
                            <el-checkbox-group v-model="facilitiesForm.fireDevice_HJ_Detail.callpoliceWay">
                                <el-checkbox label="控制中心报警"></el-checkbox>
                                <el-checkbox label="集中报警"></el-checkbox>
                                <el-checkbox label="区域报警"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="police_row row">
                            <div class="demo-input-suffix width30">
                                <span class="left_title">温感探头数量: </span>
                                <el-input  v-model="facilitiesForm.fireDevice_HJ_Detail.Warmsensation"></el-input>
                            </div>
                            <div class="demo-input-suffix width30">
                                <span class="left_title">烟感探头数量： </span>
                                <el-input  v-model="facilitiesForm.fireDevice_HJ_Detail.Smokesensation"></el-input>
                            </div>
                            <div class="demo-input-suffix width30">
                                <span class="left_title">可燃气体探头数量： </span>
                                <el-input  v-model="facilitiesForm.fireDevice_HJ_Detail.combustiblegas"></el-input>
                            </div>
                        </div>

                    </div>
                </td>
            </tr>
            <!-- 自动灭火形式 -->
            <tr>
                <td class="left_title">自动灭火形式</td>
                <td>
                    <div class="ishave_top">
                        <el-radio-group v-model="facilitiesForm.fireDevice_MH_Exist" >
                            <el-radio  :label="true">有</el-radio>
                            <el-radio  :label="false">无</el-radio>
                        </el-radio-group>
                            
                    </div>
                    <div v-if="facilitiesForm.fireDevice_MH_Exist" class="select_box">
                        <div class="row">
                            <span>系统形式：</span>
                            <el-checkbox-group v-model="facilitiesForm.fireDevice_MH_Detail.forms">
                                <el-checkbox label="水"></el-checkbox>
                                <el-checkbox label="泡沫"></el-checkbox>
                                <el-checkbox label="气体"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="system_row row">
                            <div class="demo-input-suffix width50">
                                <span class="left_title">喷雾数量: </span>
                                <el-input  v-model="facilitiesForm.fireDevice_MH_Detail.spray"></el-input>
                            </div>
                            <div class="demo-input-suffix width50">
                                <span class="left_title">消防泵数量： </span>
                                <el-input  v-model="facilitiesForm.fireDevice_MH_Detail.Firepump"></el-input>
                            </div>
                        </div>

                    </div>
                </td>
            </tr>
            <!-- 通风和防排烟系统 -->
            <tr>
                <td class="left_title">通风和防排烟系统</td>
                <td>
                <div class="ishave_top">
                    <el-radio-group v-model="facilitiesForm.fireDevice_TFPY_Exist"> 
                        <el-radio  :label="true">有</el-radio>
                        <el-radio  :label="false">无</el-radio>
                    </el-radio-group>
                        
                </div>
                <div v-if="facilitiesForm.fireDevice_TFPY_Exist" class="select_box">
                    <div class="row police_row">
                        <div class="demo-input-suffix width50 ">
                        <span class="left_title">排烟风机数量：</span>
                        <el-input  v-model="facilitiesForm.fireDevice_TFPY_Detail.SmokeExhausting"></el-input>
                        </div>
                        <div class="demo-input-suffix width50">
                            <span class="left_title">排烟防火阀数量： </span>
                            <el-input  v-model="facilitiesForm.fireDevice_TFPY_Detail.Smokefiredamper"></el-input>
                        </div>
                        <div class="demo-input-suffix width50">
                            <span class="left_title">正压送风机数量： </span>
                            <el-input  v-model="facilitiesForm.fireDevice_TFPY_Detail.Positivepressureblower"></el-input>
                        </div>
                    
                    </div>
                    <div class="row police_row">
                        <div class="demo-input-suffix width50">
                            <span class="left_title">通风空调风机数量： </span>
                            <el-input  v-model="facilitiesForm.fireDevice_TFPY_Detail.Airconditioner"></el-input>
                        </div>
                        <div class="demo-input-suffix width50">
                            <span class="left_title">防风阀数量： </span>
                            <el-input  v-model="facilitiesForm.fireDevice_TFPY_Detail.Windbreakvalve"></el-input>
                        </div>
                        <div class="demo-input-suffix width50">
                            <span class="left_title">自然排烟口数量： </span>
                            <el-input  v-model="facilitiesForm.fireDevice_TFPY_Detail.Smokevent"></el-input>
                        </div>
                    </div>

                </div>
                </td>
            </tr>
            <!-- 消火栓系统-->
            <tr>
                <td class="left_title">消火栓系统</td>
                <td>
                <div class="ishave_top">
                    <el-radio-group v-model="facilitiesForm.fireDevice_XHS_Exist">
                        <el-radio  :label="true">有</el-radio>
                        <el-radio  :label="false">无</el-radio>
                    </el-radio-group>
                        
                </div>
                <div v-if="facilitiesForm.fireDevice_XHS_Exist" class="select_box">
                    <div class="row">
                        <div class="demo-input-suffix width50 ">
                            <span class="left_title">室内消火栓数量:</span>
                            <el-input  v-model="facilitiesForm.fireDevice_XHS_Detail.inside"></el-input>
                        </div>
                        <div class="demo-input-suffix width50">
                            <span class="left_title">室外消火栓数量: </span>
                        <el-input  v-model="facilitiesForm.fireDevice_XHS_Detail.outside"></el-input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="demo-input-suffix width50">
                            <span class="left_title">消火栓泵数量: </span>
                            <el-input  v-model="facilitiesForm.fireDevice_XHS_Detail.Hydrantpump"></el-input>
                        </div>
                        <div class="demo-input-suffix width50">
                            <span class="left_title">水泵结合器数量: </span>
                        <el-input  v-model="facilitiesForm.fireDevice_XHS_Detail.Waterpumpcombiner"></el-input>
                        </div>
                    </div>

                </div>
                </td>
            </tr>
            <!--  消防水源-->
            <tr>
                <td class="left_title">消防水源</td>
                <td>
                    <div class="ishave_top">
                        <el-radio-group v-model="facilitiesForm.fireDevice_XFSY_Exist" >
                            <el-radio  :label="true">有</el-radio>
                            <el-radio  :label="false">无</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-if="facilitiesForm.fireDevice_XFSY_Exist" class="select_box">
                            <div class="row">
                                <el-checkbox-group v-model="facilitiesForm.fireDevice_XFSY_Detail.checkbox">
                                    <el-checkbox label="市政供水"></el-checkbox>
                                    <el-checkbox label="消防水池/箱"></el-checkbox>
                                </el-checkbox-group>
                                <div v-if="facilitiesForm.fireDevice_XFSY_Detail.checkbox.indexOf('消防水池/箱') != -1" class="fireDevice_XFSY_Detail">
                                    <el-input  v-model="facilitiesForm.fireDevice_XFSY_Detail.volume"></el-input>
                                    <span class="left_title">容积m³ </span>
                                </div>
                            </div>

                    </div>
                </td>
            </tr>
            <!--  -->
            <tr>
                <td class="left_title">防火门</td>
                <td>
                    <div class="ishave_top">
                        <el-radio-group v-model="facilitiesForm.fireDevice_FHM_Exist" >
                            <el-radio  :label="true">有</el-radio>
                            <el-radio  :label="false">无</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-if="facilitiesForm.fireDevice_FHM_Exist" class="select_box">
                        <div class="demo-input-suffix width50 ">
                            <span class="left_title">数量：</span>
                            <el-input  v-model="facilitiesForm.fireDevice_FHM_Detail"></el-input>
                        </div>
                    </div>
                </td>
            </tr>
            <!--  -->
            <tr>
                <td class="left_title">防火卷帘</td>
                <td>
                    <div class="ishave_top">
                        <el-radio-group v-model="facilitiesForm.fireDevice_FHJL_Exist" >
                            <el-radio  :label="true">有</el-radio>
                            <el-radio  :label="false">无</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-if="facilitiesForm.fireDevice_FHJL_Exist" class="select_box">
                        <div class="demo-input-suffix width50 ">
                            <span class="left_title">数量：</span>
                            <el-input  v-model="facilitiesForm.fireDevice_FHJL_Detail"></el-input>
                        </div>
                    </div>
                </td>
            </tr>
            <!--  -->
            <tr>
                <td class="left_title">灭火器</td>
                <td>
                    <div class="ishave_top">
                        <el-radio-group v-model="facilitiesForm.fireDevice_MHQ_Exist"> 
                            <el-radio  :label="true">有</el-radio>
                            <el-radio  :label="false">无</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-if="facilitiesForm.fireDevice_MHQ_Exist" class="select_box">
                        <div class="demo-input-suffix width50 ">
                            <span class="left_title">数量：</span>
                            <el-input  v-model="facilitiesForm.fireDevice_MHQ_Detail"></el-input>
                        </div>
                    </div>
                </td>
            </tr>
            <!--  -->
            <tr>
                <td class="left_title">应急照明</td>
                <td>
                    <div class="ishave_top">
                        <el-radio-group v-model="facilitiesForm.fireDevice_YJZM_Exist" >
                            <el-radio  :label="true">有</el-radio>
                            <el-radio  :label="false">无</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-if="facilitiesForm.fireDevice_YJZM_Exist" class="select_box">
                        <div class="demo-input-suffix width50 ">
                            <span class="left_title">数量：</span>
                            <el-input  v-model="facilitiesForm.fireDevice_YJZM_Detail"></el-input>
                        </div>
                    </div>
                </td>
            </tr>
            <!--  -->
            <tr>
                <td class="left_title">疏散指示标志</td>
                <td>
                    <div class="ishave_top">
                        <el-radio-group v-model="facilitiesForm.fireDevice_SSZS_Exist" >
                            <el-radio  :label="true">有</el-radio>
                            <el-radio  :label="false">无</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-if="facilitiesForm.fireDevice_SSZS_Exist" class="select_box">
                        <div class="demo-input-suffix width50 ">
                            <span class="left_title">数量：</span>
                            <el-input  v-model="facilitiesForm.fireDevice_SSZS_Detail"></el-input>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import baseUploadImg from "../../../components/baseUploadImg";
export default {
    components:{
        baseUploadImg
    },
    model:{
            prop:'facilitiesForm',
            event:'change'
        },
    props:{
        facilitiesForm:Object,
        isadd:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    created(){
        console.log("总建筑的图片",this.facilitiesForm.outward_Picture)
        this.getfirePractitioners();
    },
    data(){
        return{
            firePractitioners:[],
            form: {
               
            },
            //楼梯间
            fireDevice_LTJ_Exist: "",
            isshow_one:false,
            //火灾自动报警系统
            fireDevice_HJ_Exist:'',
            isshow_two:false,
            //灭火形式
            fireDevice_MH_Exist:'',
            isshow_three:false,
            //通风
            fireDevice_TFPY_Exist:'',
            isshow_four:false,
            //消火栓
            fireDevice_XHS_Exist:'',
            isshow_five:false,
            //消防水源
            fireDevice_XFSY_Exist:'',
            isshow_six:false,
            //防火门
            fireDevice_FHM_Exist:'',
            isshow_seven:false,
            //防火卷帘
            fireDevice_FHJL_Exist:'',
            isshow_eight:false,
            //灭火器
            fireDevice_MHQ_Exist:'',
            isshow_nine:false,
            //应急照明
            fireDevice_YJZM_Exist:'',
            isshow_ten:false,
            //
            fireDevice_SSZS_Exist:'',
            isshow_eleven:false
        }
    },
    methods:{
        getfirePractitioners(){
            let AccountID = localStorage.getItem('userId')
            this.$axios.get(this.$api.GetFireUnitPeople,{params:{AccountID}}).then(res=>{
                console.log("获取从业人员shuju",res)
                  this.loading = false
                this.firePractitioners = res.data.result
            }).catch(err=>{
                console.log("获取从业人员失败",err)
            })
        },
        //-----------------------------------------------
        //新增
        addNew(){
            let string1 = JSON.stringify(this.facilitiesForm)
            let form = JSON.parse(string1)
            form.fireDevice_LTJ_Detail = JSON.stringify(form.fireDevice_LTJ_Detail) 
            form.fireDevice_HJ_Detail = JSON.stringify(form.fireDevice_HJ_Detail) 
            form.fireDevice_TFPY_Detail = JSON.stringify(form.fireDevice_TFPY_Detail) 
            form.fireDevice_MH_Detail = JSON.stringify(form.fireDevice_MH_Detail) 
            form.fireDevice_XHS_Detail = JSON.stringify(form.fireDevice_XHS_Detail) 
            form.fireDevice_XFSY_Detail = JSON.stringify(form.fireDevice_XFSY_Detail) 

            console.log("总得数据",form)
            this.$axios.post(this.$api.ArchitectureAdd,form).then(res=>{
                console.log('添加建筑成功',res)
                this.$message({
                    message: '添加建筑成功',
                    type: 'success'
                });
                this.$emit('deletebuild')
            }).catch(err=>{
                console.log("添加建筑失败",err)
            })
        },
        //修改
        totalSave(){
            console.log("总得数据",this.facilitiesForm)
             this.$confirm('确定修改该建筑的信息吗？',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(()=>{
                let stringform = JSON.stringify(this.facilitiesForm)
                let newform = JSON.parse(stringform)
                newform.fireDevice_LTJ_Detail = JSON.stringify(newform.fireDevice_LTJ_Detail) 
                newform.fireDevice_HJ_Detail = JSON.stringify(newform.fireDevice_HJ_Detail) 
                newform.fireDevice_TFPY_Detail = JSON.stringify(newform.fireDevice_TFPY_Detail) 
                newform.fireDevice_MH_Detail = JSON.stringify(newform.fireDevice_MH_Detail) 
                newform.fireDevice_XHS_Detail = JSON.stringify(newform.fireDevice_XHS_Detail) 
                newform.fireDevice_XFSY_Detail = JSON.stringify(newform.fireDevice_XFSY_Detail) 
                this.$axios.put(this.$api.ArchitectureUpdate,newform).then(res=>{
                    console.log('修改建筑成功',res)
                    this.$message({
                        message: '修改建筑信息成功',
                        type: 'success'
                    });
                    this.$emit("deletebuild")
                }).catch(err=>{
                    console.log("修改建筑失败",err)
                })
            }).catch(()=>{

            })
            
        },
        //取消
        cancel(){
            
            this.$emit('cancel',this.isadd,this.facilitiesForm.id)

        },
        //删除
        deletebuild(){
            this.$confirm('确定删除该数据？',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(()=>{
               this.$axios.delete(this.$api.Delete,{params:{id:this.facilitiesForm.id}}).then(res=>{
                    console.log("删除成功",res)
                    this.$message({
                        message: '删除建筑成功',
                        type: 'warning'
                    });
                    this.$emit("deletebuild")
                }).catch(err=>{
                    console.log("删除失败",err)
                })
            }).catch(()=>{

            })
           
            
        }
    }
}
</script>

<style lang="less" >
    .baserightform{
        .right_box_top{
            .must_label{
                color:rgb(255, 252, 191) !important;
                font-size: 14px;
                .el-form-item__label{
                    color:rgb(255, 252, 191) !important;
                }
            }
            .el-form-item__label{
                color: white ;
                text-align: right;
            }
            .el-input__inner{
                border: 1px solid #025691;
                background: #020d1c;
                color: #abd5ff;
            }   
            .up_down{
                .el-input-number{
                    width: 160px;
                }
                .el-form-item__label{
                    width: 60px !important;
                }
                .el-form-item__content{
                    margin-left: 0px !important;
                }
            }
            .floor_box{
                .el_col_tips{
                    text-align: right;
                }
            }

            .floorNum{
                color: white;
                display: inline-block;
                margin-top: 10px;
                text-align: right;
                margin-right: 18px;
            }
        
            .right_box_top_SaveCancel{
                margin-bottom: 40px;
                .el-col{
                    text-align: right;
                }
                .el-button{
                    width: 160px;
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
            }
            .el-input-group__append{
                background: #025691;
                border-color:#025691;
                color:white;
            }
            .el-input-number{
                .el-input-number__decrease{
                    background: #025691;
                    color: white;
                }
                .el-input-number__increase{
                    background: #025691;
                    color: white;
                }
            }
        }
         // 
        .el-divider--horizontal{
            width: 80%; 
            .el-divider__text{
                background: #020d1c;
                color: white;
            }
        }
       
        .baseTable {
            width: 80% !important; 
            color: white;
            tr {
                td {
                border: 1px solid rgb(255, 255, 255);
                padding: 20px;

                &.left_title {
                    width: 200px;
                    text-align: center;
                }
                }
            }
            .ishave_top{
                margin-bottom: 20px;
                .el-radio-group{
                    .el-radio__label{
                        color: white;
                    }
                    .is-checked{
                        .el-radio__label{
                            color: #409EFF;
                        } 
                    }
                }
            }
            .select_box{
                .row{
                    display: flex;
                }
                .width50{
                        width: 50%;
                        display: flex;
                        padding: 10px 0px;
                    }
                    .width30{
                        width: 34%;
                        display: flex;
                        padding: 10px 0px;
                        box-sizing:border-box;
                    }
                    .left_title{
                        display: inline-block;
                        width: 220px;
                    }
                    .el-input__inner{
                        background: #020d1c;
                        border-radius:0%;
                        border: none;
                        border-bottom: 1px solid white;
                        height: 20px;
                        font-size: 20px;
                        width: 100px;
                        padding: 0 6px;
                        color: white;
                    }
                    .police_row{
                        width: 100%;
                        box-sizing: border-box;
                        .left_title {
                            width: 150px;
                            text-align:left;
                        }
                        .el-input{width: auto;}
                        .el-input__inner{
                            width: 50px;
                        }
                    }
                    .el-checkbox-group{
                        .el-checkbox__label{
                            color: white;
                        }
                        .is-checked{
                            .el-checkbox__label{
                                color: #409EFF;
                            }
                        }
                    }
            }
            .fireDevice_XFSY_Detail{
                display: flex;
                margin-left: 40px;
                .el-input{
                    width: 30%;
                }
                .el-input__inner{
                    width: 60px;
                }
            }
        
        
        }
    }
</style>