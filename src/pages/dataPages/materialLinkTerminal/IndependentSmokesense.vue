<template>
    <div class="IndependentSmokesenseBox">
        <!--  -->
        <el-row class="allStatus">
            <el-col class="allStatus_left" :span="21">
                <el-button
                    v-for="item in buttonarr"
                    :key="item.text"
                    round 
                    plain
                    :type="item.type"
                    @click="screen(item.text)"
                >
                    <i v-if="screensign == item.text" class="el-icon-check  el-icon--right"></i>
                    {{item.text}}{{item.num}}
                </el-button>
            </el-col>
             <el-col class="allStatus_right" :span="3">
                 <el-button @click="openDialog" type="primary" plain>新增</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <base-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :tableThead="tabelThead"
            :tableData='tableData'
            :totalCount="TotalCount"
            :pageSize="10"
            @showdetails="showdetails"
            @deleteInfo ="DeleteIndependentDetector"
            @pageChange="prev_next"
        >
        </base-table>

        <!-- 新增和修改的弹窗 -->
        <base-dialog ref="trendDialog" title=" 设备信息">
            <el-form class="formBox" :rules="rules" ref="SmokesenseFrom" :model="SmokesenseFrom" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="设备编号" prop="detectorSn">
                            <el-input  v-model="SmokesenseFrom.detectorSn" placeholder="请输入设备编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="设备品牌" prop="brand">
                            <el-input  v-model="SmokesenseFrom.brand" placeholder="请输入设备品牌"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="安装位置" prop="location">
                            <el-input  v-model="SmokesenseFrom.location" placeholder="请输入安装位置"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="设备故障时">
                        <el-checkbox  v-model="SmokesenseFrom.enableFaultSMS" label="推送短信通知" name="type"></el-checkbox>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="设备火警时">
                        <el-checkbox v-model="SmokesenseFrom.enableAlarmSMS" label="推送短信通知" name="type"></el-checkbox>
                        <el-row v-if="SmokesenseFrom.enableAlarmSMS">
                            <p class="tips">短信通知手机号码（多个手机号以英文逗号分隔）</p>
                            <el-input  v-model="SmokesenseFrom.smsPhones" placeholder="请输入接收手机"></el-input>
                        </el-row>
                        
                    </el-form-item>
                </el-row>
                <el-row class="btn_row">
                    <el-button @click="submit_update">提交</el-button>
                    <el-button @click="cancel('SmokesenseFrom')">取消</el-button>
                </el-row>

            </el-form>
        </base-dialog>
        
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
            buttonarr:[
                {
                    type:'primary',
                    text:'全部'                 
                },
                {
                    type:'success',
                    text:'正常',
                    num:0
                },
                {
                    type:'warning',
                    text:'故障',
                    num:0
                },
                {
                    type:'info',
                    text:'离线',
                    num:0
                }
            ],
            screensign:'全部',
            loading:false,
            tabelThead:[
                {
                    name:'设备编号',
                    prop:'detectorSn',
                    with:'200px'
                },
                {
                    name:'品牌',
                    prop:'brand',
                },
                {
                    name:'具体位置',
                    prop:'location',
                },
                {
                    name:'当前电量',
                    prop:'powerNum', 
                },
                {
                    name:'状态',
                    prop:'state', 
                },
                {
                    name:'操作'
                }
            ],
            TotalCount:0,
            tableData:[],
            page:{
                fireunitId:localStorage.getItem('fireUnitID'),
                SkipCount:0,
                MaxResultCount:10,
                state:''
            },
            SmokesenseFrom:{
                fireUnitId:localStorage.getItem('fireUnitID'),
                enableFaultSMS:true,
                enableAlarmSMS:true
            },
            rules:{
                detectorSn: [
                    { required: true, message: "请填写设备型号", trigger: "blur" }
                ],
                location:[
                    { required: true, message: "请填写设备安装位置", trigger: "blur" }
                ]
            },
            clearFlag:false

        }
    },
    mounted(){
        this.GetIndependentDetectorList()
    },
    methods:{
        //获取状态数量
        GetIndependentDetectorStatesNum(){
            this.$axios.get(this.$api.GetIndependentDetectorStatesNum,{params:{fireunitId:localStorage.getItem('fireUnitID')}}).then(res=>{
                // console.log("状态数量",res);
                this.buttonarr[1].num = res.data.result.normalNum;
                this.buttonarr[2].num = res.data.result.faultNum;
                this.buttonarr[3].num = res.data.result.offlineNum;
            })
        },
        screen(state){
             if(state == '全部'){
                this.page.state = ''
            }else{
                this.page.state = state
            }
                this.screensign = state
                this.page.SkipCount =0;
                this.GetIndependentDetectorList();
        },
        GetIndependentDetectorList(){
            this.loading = true;
            this.$axios.get(this.$api.GetIndependentDetectorList,{params:this.page}).then(res=>{
                // console.log("获取列表",res);
                for(let arr of res.data.result.items){
                    if(arr.state == 1){
                        console.log("ssssssssssss")
                        arr.state = '正常'
                    }else if(arr.state == 2){
                        arr.state = '故障'
                    }
                     
                }
                this.loading = false;
                ({items:this.tableData,totalCount:this.TotalCount} = res.data.result);
                if(res.data.result.items.length == 0 && res.data.result.totalCount>0){
                    this.page.SkipCount = 0
                    this.GetIndependentDetectorList()
                }
                this.GetIndependentDetectorStatesNum();
            })
        },
        //
        openDialog(){
            if(this.clearFlag){
                this.$refs['SmokesenseFrom'].resetFields();
            }
            // this.clearFlag = false;
            this.$refs.trendDialog.dialogVisible = true;
            let contractPhone = localStorage.getItem('contractPhone')
            this.$set(this.SmokesenseFrom,'smsPhones',contractPhone)
        },
        //提交更新
        submit_update(){
            console.log("submit_update",this.SmokesenseFrom);
            this.$refs.SmokesenseFrom.validate(valid => {
                if(valid){
                    let as = this.SmokesenseFrom.detectorId ? this.$axios.put(this.$api.UpdateIndependentDetector,this.SmokesenseFrom):
                    this.$axios.post(this.$api.AddIndependentDetector,this.SmokesenseFrom);
                    as.then(res=>{
                        console.log("更新或者修改",res)
                        this.$message.success(
                            `${this.SmokesenseFrom.detectorId ? "修改" : "新增"}设备成功`
                        );
                        this.$refs.trendDialog.dialogVisible = false;
                        this.GetIndependentDetectorList()
                    }).catch(err=>{
                        console.log("失败",err)
                        
                    })
                }
            })
        },
        cancel(formName){
            this.$refs[formName].resetFields();
            this.$refs.trendDialog.dialogVisible = false;
        },
        showdetails(items){
            // console.log("items",items)
            if(this.clearFlag){
                this.$refs['SmokesenseFrom'].resetFields();
            }
          
            this.clearFlag = true;
            this.$refs.trendDialog.dialogVisible = true;
            this.GetIndependentDetector(items.detectorId)

        },
        //获取详情
        GetIndependentDetector(detectorId){
            this.$axios.get(this.$api.GetIndependentDetector,{params:{detectorId}}).then(res=>{
                console.log("详情",res)
                let result = JSON.stringify(res.data.result) ;
                this.SmokesenseFrom = JSON.parse(result)

            
            })
        },
        DeleteIndependentDetector(items){
            console.log("删除",items)
            this.$axios.delete(this.$api.DeleteIndependentDetector,{params:{detectorId:items.detectorId}}).then(res=>{
                console.log("删除数据成功")
                this.$message.success(
                    '删除数据成功'
                );
                this.GetIndependentDetectorList()
            })
        },
        //分页
        prev_next(page){
            // console.log("page",page)
            this.page.SkipCount = (page-1)* this.page.MaxResultCount
            this.GetIndependentDetectorList()
        },
    }
}
</script>

<style lang="less">
    .IndependentSmokesenseBox{
        .allStatus{
            .allStatus_right{
                .el-button{
                    width: 200px;
                    background: #025691;
                }
            }
        }
        .el-dialog__body{
            display: flex;
            justify-content: center;
            .formBox{
                width: 60%;
                padding: 20px;
                border: 1px solid darkblue;
                box-shadow: 0 2px 12px 0 #29d;
                padding-top: 40px;
                .el-form-item__label{
                    color: white;
                }
                .el-input__inner {
                    background: #025691;
                    color: white;
                }
                .el-checkbox__label{
                    color: white;
                }
                .el-checkbox__input.is-checked+.el-checkbox__label {
                    color: #409EFF !important;
                }
                .tips{
                    color: white;
                }
                .btn_row{
                    display: flex;
                    justify-content: center;
                    .el-button{
                        width: 24%;
                        background: #025691;
                        color: white;
                        &:nth-child(2){
                             color: rgb(109, 109, 109);
                        }
                    }
                }
            }
        }
    }
</style>