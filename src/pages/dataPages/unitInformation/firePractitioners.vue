<template>
  <div class="firePractitionersBox">
      <div class="top_box">
          <el-button @click="addNew">新增</el-button>

      </div>
      <baseTable 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :tableThead="tableThead" 
        :tableData="tableData"
        @showdetails="showdetails"
        @deleteInfo = "deleteInfo"
        @pageChange="Prev_next"
      ></baseTable>
      <baseDialog @closeDialog="closeDialog" title="从业人员" ref="basedialog">
        <div style="width:100%" slot="soltContent">
            <el-row :gutter="20">
                <!--  -->
                <el-col :span="12">
                    <!--  -->
                    <el-form :model="PractitionersForm" :rules="rules"  ref="PractitionersForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item class="must_label" label="姓名" prop="name">
                            <el-input v-model="PractitionersForm.name"></el-input>
                        </el-form-item>
                         <el-form-item class="must_label" label="职务" prop="rolelist">
                          
                            <el-select multiple  v-model="PractitionersForm.rolelist" placeholder="请选择职务">
                                <el-option
                                    v-for="(item,index) in joboptions"
                                    :key="index"
                                    :label="item"
                                    :value="item"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item class="must_label" label="手机号" prop="account">
                            <el-input v-model="PractitionersForm.account"></el-input>
                        </el-form-item> 
                        <el-form-item label="职业资格" prop="qualifications">
                             <el-input v-model="PractitionersForm.qualification"></el-input>
                        </el-form-item> 
                        <el-form-item label="证书编号" prop="certificateNumber">
                            <el-input v-model="PractitionersForm.qualificationNumber"></el-input>
                        </el-form-item> 
                        <el-form-item label="证书有效期" prop="qualificationValidity">
                            <el-date-picker
                            v-model="PractitionersForm.qualificationValidity"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            
                            >
                            </el-date-picker>
                        </el-form-item> 
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">提交</el-button>
                            <el-button @click="cancel(PractitionersForm.id)" class="cancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                    <!--  -->
                </el-col>
                <el-col :span="12">
                    <div>
                        <baseUploadImg v-model="PractitionersForm.photo"></baseUploadImg>
                    </div>
                </el-col>
            </el-row>
        </div>
      </baseDialog>
  </div>
</template>

<script>
import baseTable from '../../../components/baseTable/index';
import baseDialog from '../../../components/baseDialog/index'
import baseUploadImg from '../../../components/baseUploadImg'
export default {
    components:{
        baseTable,
        baseDialog,
        baseUploadImg
    },
    data(){
        return{
            loading:false,
            isadd:false,
            tableThead:[

                {
                    prop:'name',
                    name:"姓名"
                },
                {
                    prop:'rolelist',
                    name:"职务"
                },
                {
                    prop:'account',
                    name:"手机"
                },
                {
                    prop:'qualification',
                    name:"职务资格"
                },
                {
                    prop:'qualificationNumber',
                    name:"证书编号"
                },
                {
                    prop:'qualificationValidity',
                    name:"证书有效期"
                },
                {
                    name:"操作",
                    width:"200px"
                }
            ],
            tableData:[],
            rules:{
                name:[{ required: true, message: "请填写姓名", trigger: "blur" }],
                account:[{ required: true, message: "请填写手机号", trigger: "blur" }],
                // rolelist:[{ required: true, message: "请选择职务", trigger: "change" }],
            },
            PractitionersForm:{},
            joboptions:['消防管理员','值班员','巡查员']
        }
    },
    created(){
        this.GetFireUnitPeople()
    },
    methods:{
        //获取table数据
        GetFireUnitPeople(){
            this.loading = true
            let AccountID = localStorage.getItem('userId')
            this.$axios.get(this.$api.GetFireUnitPeople,{params:{AccountID}}).then(res=>{
                console.log("获取从业人员shuju",res)
                this.loading = false;
                this.tableData = res.data.result
            }).catch(err=>{
                console.log("获取从业人员失败",err)
            })
        },
        //
        showdetails(item){
            let A = this.$refs.basedialog
            A.dialogVisible = true
            let strings = JSON.stringify(item)
            this.PractitionersForm = JSON.parse(strings)
        },
        //
        deleteInfo(index){
            console.log("要删除的",index)
            let UserId = index.id
            if( UserId == localStorage.getItem('userId')){
                this.$message({
                    message: '该人员不能删除',
                    type: 'error'
                });
                return
                
            }
            this.$axios.delete(this.$api.DeleteUser,{params:{UserId}}).then(res=>{
                console.log("删除成功",res)
                if(res.data.result.success){
                    this.$message({
                        message: '删除工作人员成功',
                        type: 'warning'
                    });
                    this.GetFireUnitPeople()
                }
            }).catch(err=>{
                console.log("删除失败",err)
            })
        },
        //新增
        addNew(){
            let A = this.$refs.basedialog
            A.dialogVisible = true
            this.PractitionersForm ={}
            this.PractitionersForm.fireUnitInfoID=localStorage.getItem('fireUnitID')
        },
        //提交修改信息
        submitForm(){
            this.$refs.PractitionersForm.validate(valid => {
                if(valid){
                    let as = 
                    this.PractitionersForm.id ? 
                    this.$axios.put(this.$api.UpdateUserInfo,this.PractitionersForm):
                    this.$axios.post(this.$api.AddUser,this.PractitionersForm);
                    console.log(this.PractitionersForm.id,this.PractitionersForm)
                    this.$confirm( `确定${this.PractitionersForm.id ? "修改" : "新增"}人员吗？`,{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        console.log("打印",this.PractitionersForm)
                        as.then(res=>{
                            console.log("修改人员信息成功",res)
                            if(res.data.result.success){
                                this.$refs.basedialog.dialogVisible = false;
                                this.$message(
                                    `${this.PractitionersForm.id ? "修改" : "新增"}人员成功`,
                                );
                                this.GetFireUnitPeople();
                            }
                        }).catch(err=>{
                            console.log("修改人员信息失败",err)
                            this.$message({
                                message: '修改人员失败',
                                type: 'warning'
                            });
                        })
                    }).catch(()=>{

                    })
                }
            })
            
           
        },
        //取消
        cancel(id){
            if(id){
                this.$refs.basedialog.dialogVisible = false
            }else{
                this.PractitionersForm ={}
            }
        },
        //上下页
        Prev_next(page){

        },
         //关闭弹窗
        closeDialog(){
             this.$refs.PractitionersForm.resetFields();
        },
        
    }
}
</script>

<style lang="less">
.firePractitionersBox{
    .top_box{
        width: 100%;
        text-align: right;
        .el-button{
            width: 200px;
            background: #025691;
            color: white;
        }
    }
    .demo-ruleForm{
        .el-form-item{
            &.must_label{
                .el-form-item__label{
                    
                    color:rgb(255, 252, 191) !important;
                } 
            }
            .el-form-item__label{
                color: white !important;
            }
            .el-form-item__content{
                .el-input__inner{
                   background: #011c41;
                   color: white;
                }
                .el-button{
                    width: 174px;
                }
            }
        }
    }
    .el-select{
        width: 100%;
    }
    .el-date-editor{
        width: 100%;
    }
    .cancel{
        color: white;
        background: #011c41;
    }
}
   
</style>