<template>
    <div class="pipeNetworkBox">

        <div class="topBox">
            <el-button @click="addNew">新增</el-button>
        </div>
        <baseTable
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :tableThead="tableThead"
            :tableData="tableData"
            :totalCount='totalCount'
            :pageSize="10"
            @deleteInfo="DeleteFireWaterDevice"
            @showdetails="GetFireWaterDeviceById"
            @pageChange="Prev_next"
        >
        </baseTable>
        <!-- 新增或修改弹窗 -->
        <baseDialog  @closeDialog="closeDialog" class="pipeNetworkDialog" ref="pipeNetworkDialog" title="消防设备信息">
            <el-form class="formBox" :rules="rules" ref="form" :model="piepNetworkForm" label-width="80px">
                <!-- 基本 -->
                <el-row class="baseBox" :gutter="20">
                    <el-col class="left_box" :span="4">
                        <div class="grid-content basetitle">基本</div>
                    </el-col>
                    <el-col :span="20">
                        <div class="grid-content">
                            <el-row class="pd20" :gutter="20">
                                <el-col :span="12">
                                    <el-form-item  label="设备地址" prop="deviceAddress">
                                        <el-input v-model="piepNetworkForm.deviceAddress" placeholder="请选填写设备地址"></el-input >
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <p v-if="piepNetworkForm.id"  class="marginleft10">
                                        设备状态：
                                        <span style="color:rgb(59, 218, 11)"  v-if="piepNetworkForm.state == 2 ">良好</span> 
                                        <span style="color:#F56C6C" v-if="piepNetworkForm.state == -2 ">超限</span> 
                                        <span style="color:#ccc" v-if="piepNetworkForm.state == -1 ">离线</span> 
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row class="margin20 pd20">
                                <el-col :span="24">
                                    <el-form-item  label="安装位置">
                                        <el-input  v-model="piepNetworkForm.location" placeholder="请输入设备型号"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <!-- 联网网关 -->
                <el-row class="baseBox" :gutter="20">
                    <el-col class="left_box" :span="4">
                        <div class="grid-content basetitle">联网网关</div>
                    </el-col>
                    <el-col :span="20">
                        <div class="grid-content">
                            <el-row class="pd20" :gutter="20">
                                <el-col :span="12">
                                    <el-form-item  label="设备型号" prop="gateway_Model">
                                        <el-select  v-model="piepNetworkForm.gateway_Model" placeholder="请选择设备型号">
                                            <el-option 
                                                v-for="item in FireWaterDeviceTypes"
                                                :key="item"
                                                :label="item"
                                                :value="item"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  label="设备编号" prop="gateway_Sn">
                                        <el-input  v-model="piepNetworkForm.gateway_Sn" placeholder="请填写设备编号"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="pd20">
                                <el-col :span="24">
                                    <el-form-item  label="安装位置">
                                        <el-input  v-model="piepNetworkForm.gateway_Location" placeholder="请输入网关安装位置"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="pd20" :gutter="20">
                                <el-col :span="12">
                                    <el-form-item  label="通讯方式" prop="gateway_NetComm">
                                        <el-select  v-model="piepNetworkForm.gateway_NetComm" placeholder="请选择通讯方式">
                                            <el-option label="以太网" value="以太网"></el-option>
                                            <el-option label="WIFI" value="WIFI"></el-option>
                                            <el-option label="NB-IOT" value="NB-IOT"></el-option>
                                            <el-option label="4G" value="4G"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col  :span="12">
                                    <p v-if="piepNetworkForm.gateway_DataRate" class="marginleft10">数据采集频率：{{piepNetworkForm.gateway_DataRate}}</p>
                                    <p v-else class="marginleft10">数据采集频率：2小时</p>
                                
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <!-- 参数 -->
                <el-row class="baseBox" :gutter="20">
                    <el-col class="left_box" :span="4">
                        <div class="grid-content basetitle">参数</div>
                    </el-col>
                    <el-col :span="20">
                        <div class="grid-content">
                            <el-row class="pd20">
                                <el-col :span="6">
                                    <el-form-item  label="监测类型" prop="">
                                       <el-radio v-model="piepNetworkForm.monitorType" :label="1">液位</el-radio>
                                    </el-form-item>
                                </el-col>
                                <el-col v-if="piepNetworkForm.monitorType == 1"  :span="18">
                                    <div class="range_box">
                                        <span>监测范围:</span> 
                                        <el-input v-model="piepNetworkForm.minThreshold">
                                            <template slot="append">m</template>
                                        </el-input>
                                        <p>—</p>
                                        <el-input v-model="piepNetworkForm.maxThreshold">
                                            <template slot="append">m</template>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="pd20">
                                <el-col :span="6">
                                    <el-form-item  label="  " prop="">
                                       <el-radio v-model="piepNetworkForm.monitorType" :label="2">水压</el-radio>
                                    </el-form-item>
                                </el-col>
                                <el-col v-if="piepNetworkForm.monitorType == 2" :span="18">
                                   <div class="range_box">
                                        <span>监测范围:</span> 
                                        <el-input v-model="piepNetworkForm.minThreshold">
                                            <template slot="append">MPa</template>
                                        </el-input>
                                        <p>—</p>
                                        <el-input v-model="piepNetworkForm.maxThreshold">
                                            <template slot="append">MPa</template>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="pd20">
                                <el-col :span="24">
                                    <el-form-item  label="超限动作" prop="">
                                        <el-checkbox v-model="piepNetworkForm.enableCloudAlarm">云端报警</el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <!-- 按按钮 -->
                <el-row class="btns">
                    <el-button @click="addupdate_Sbumit">提交</el-button>
                    <el-button class="cancel" @click="cancel(piepNetworkForm.id)">取消</el-button>
                </el-row>
                

            </el-form>

        </baseDialog>
    </div>
</template>

<script>
import baseTable from '../../../components/baseTable/index'
import baseDialog from '../../../components/baseDialog'
export default {
    components:{
        baseTable,
        baseDialog
    },
    data(){
        return{
            loading:false,
            tableData:[],
            tableThead:[
                {
                    name:'设备地址',
                    prop:'deviceAddress'
                },
                {
                    name:'监控类型',
                    prop:'monitorType'
                },
                {
                    name:'安装位置',
                    prop:'location'
                },
                {
                    name:'状态',
                    prop:'state'
                },
                {
                    name:'当前数值',
                    prop:'currentValue'
                },
                {
                    name:'操作'
                },
            ],
            piepNetworkPage:{
                fireUnitId:localStorage.getItem('fireUnitID'),
                SkipCount:0,
                MaxResultCount:10
            },
            rules:{
                deviceAddress:[{ required: true, message: "请填写设备地址", trigger: "change" }]
            },
            totalCount:0,
            FireWaterDeviceTypes:[],//设备类型
            piepNetworkForm:{
                monitorType:1,
                enableCloudAlarm:true,
                minThreshold:'0.5',
                maxThreshold:'10'
            },
            piepNetworkForm_add:{
                monitorType:1,
                enableCloudAlarm:true,
                minThreshold:'0.5',
                maxThreshold:'10'
            },
        }
    },
    created(){
        this.GetFireWaterDeviceList()
        this.GetFireWaterDeviceModels()//获取设备类型
    },
    methods:{
        GetFireWaterDeviceList(){
            this.loading = true
            this.$axios.get(this.$api.GetFireWaterDeviceList,{params:this.piepNetworkPage}).then(res=>{
                console.log("GetFireWaterDeviceListtable列表",res)
                this.loading = false;
                ({items:this.tableData,totalCount:this.totalCount} = res.data.result);
                if(res.data.result.items.length == 0 && res.data.result.totalCount>0){
                    this.piepNetworkPage.SkipCount = 0
                    this.GetFireWaterDeviceList()
                }

            }).catch(err=>{
                console.log("GetFireWaterDeviceListtable列表失败",err)
            })
        },
        GetFireWaterDeviceModels(){
            this.$axios.get(this.$api.GetFireWaterDeviceModels,{params:{}}).then(res=>{
                console.log("GetFireWaterDeviceModels",res)
                this.FireWaterDeviceTypes = res.data.result
            }).catch(err=>{
                console.log("GetFireWaterDeviceTypeserr",err)
            })
        },
        //打开新增弹窗口
        addNew(){
            this.$refs.pipeNetworkDialog.dialogVisible = true;
            let stringform = JSON.stringify(this.piepNetworkForm_add)
            this.piepNetworkForm = JSON.parse(stringform)
        },
        addupdate_Sbumit(){
            console.log(localStorage.getItem('fireUnitID'))
            this.$refs.form.validate(valid => {
                if(valid){
                    this.piepNetworkForm.fireUnitId = localStorage.getItem('fireUnitID');
                    console.log("提交",this.piepNetworkForm)
                    let as = this.piepNetworkForm.id ?
                    this.$axios.put(this.$api.UpdateFireWaterDevice,this.piepNetworkForm):
                    this.$axios.post(this.$api.AddFireWaterDevice,this.piepNetworkForm);

                    as.then(res=>{
                        console.log("新增或者修改成功",res)
                        this.$message.success(  `${this.piepNetworkForm.id ? "修改" : "新增"}消防管网成功`)
                        this.$refs.pipeNetworkDialog.dialogVisible = false;
                        this.GetFireWaterDeviceList();
                    }).catch(err=>{
                        console.log("新增或者修改失败",err)
                        this.$message.error(`${err.error.message}`);
                    })
                }
            })
           

        },
        //取消
        cancel(id){
            if(id){
                 this.$refs.pipeNetworkDialog.dialogVisible = false;
            }else{
                let stringform = JSON.stringify(this.piepNetworkForm_add)
                this.piepNetworkForm = JSON.parse(stringform)
            }
        },
        //获取详情
        GetFireWaterDeviceById(item){
            console.log("查看详情",item)
            this.$refs.pipeNetworkDialog.dialogVisible = true
            let deviceId = item.id
            this.$axios.get(this.$api.GetFireWaterDeviceById,{params:{deviceId}}).then(res=>{
                console.log("查看详情成功",res)
                this.piepNetworkForm = res.data.result
            }).catch(err=>{
                console.log("查看详情失败",err)
            })
        },
        //删除
        DeleteFireWaterDevice(item){
            console.log("删除的id",item)
            let deviceId = item.id
            this.$axios.delete(this.$api.DeleteFireWaterDevice,{params:{deviceId}}).then(res=>{
                console.log("删除成功",res)
                this.$message({
                    message: '删除数据成功',
                    type: 'success'
                });
                this.GetFireWaterDeviceList();
            }).catch(err=>{
                console.log("删除数据失败",err)
            })

        },
        //关闭弹窗
        closeDialog(){
             this.$refs.form.resetFields();
        },
        //table上下页
        Prev_next(page){
            this.piepNetworkPage.SkipCount = (page-1)*this.piepNetworkPage.MaxResultCount
            this.GetFireWaterDeviceList();
        },
      
       
    }
}
</script>

<style lang="less">
    .pipeNetworkBox{
        .topBox{
            display: flex;
            justify-content: flex-end;
            .el-button{
                width: 200px;
                color: white;
                background: #025691;
            }
        }
        // 弹窗
        .pipeNetworkDialog{
            .formBox{
                width: 90%;
                padding: 20px;
                border: 1px solid darkblue;
                box-shadow: 0 2px 12px 0 #29d;
                    .baseBox{
                        display: flex;
                        align-items: center;
                        border: 1px dotted white;
                        border-radius: 4px;
                        padding: 10px 0px;
                        .left_box{
                            height: 80px;
                            line-height: 80px;
                            border-right:1px dotted rgb(124, 123, 123);
                            .basetitle{
                                font-size: 16px;
                                color: white;
                            }
                        }
                        &:nth-of-type(2){
                            margin: 20px 0px;
                        }
                        //
                        .grid-content{
                            .pd20{
                                padding: 6px;
                                display: flex;
                                align-items: center;
                            }
                            .margin20{
                                margin-top: 20px;
                            }
                            .marginleft10{
                                margin-left: 34px;
                                color: white;
                            }
                            .el-form-item{
                                margin: 0px;
                                .el-form-item__label{
                                    font-size: 14px;
                                    color: white;
                                }
                                .el-checkbox__label{
                                    color: #cccccc;
                                }
                                .el-input__inner{
                                    background: #025691;
                                    color:white;
                                }
                                input::placeholder{
                                    color: #999898;
                                }
                                .el-radio{
                                    &.is-checked{
                                        .el-radio__label{
                                            color: #409EFF;
                                        }
                                    }
                                    .el-radio__label{
                                        color: white;
                                    }
                                }
                            }
                            .range_box{
                                display: flex;
                                align-items: center;
                                span{
                                    color: white;
                                    margin-right: 10px;
                                }
                                .el-input{
                                    width: 120px;
                                    .el-input__inner{
                                        background: #025691;
                                        color: white;
                                    }
                                    input::placeholder{
                                        color: #999898;
                                    }
                                    
                                    .el-input-group__append{
                                        padding: 0 6px;
                                        width: 30px;
                                        background: #011524;
                                    }
                                }

                            }
                        }

                    }
                    .btns{
                        display: flex;
                        justify-content: center;
                        margin-top: 20px;
                        .el-button{
                            width: 200px;
                            background: #025691;
                            color: white;
                            &.cancel{
                                background: #011524
                            }
                        }
                    }
                    
            }
        }
    }
</style>