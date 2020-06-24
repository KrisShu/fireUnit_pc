<template>
  <div class="minFirestationBox">
        <el-row>
            <!-- 左边 -->
            <el-col class="left_box" :span="12">
                <p v-if="!ishave" class="tips">该防火单位没有微型消防站，请输入内容进行添加</p>
                <!-- 基础表单 -->
                <el-form :model="minFirestationForm"  :rules="rules" ref="minFirestationForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item  label="站点名称" prop="name">
                        <el-input placeholder="请填写站点名称" v-model="minFirestationForm.name"></el-input>
                    </el-form-item>
                    <el-form-item  class="bordernone" label="所属单位" prop="fireUnitName">
                        <el-input disabled v-model="minFirestationForm.fireUnitName"></el-input>
                    </el-form-item> 
                    <el-form-item placeholder="请选择站点等级"  label="站点等级" prop="level">
                        <el-select  v-model="minFirestationForm.level" placeholder="请选择等级（必填）">
                            <el-option label="一级" :value="1"></el-option>
                            <el-option label="二级" :value="2"></el-option>
                            <el-option label="三级" :value="3"></el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item   label="站长" prop="contactName">
                        <el-input placeholder="请填写站长名称" v-model="minFirestationForm.contactName"></el-input>
                    </el-form-item> 
                    <el-form-item   label="站长手机" prop="contactPhone">
                        <el-input placeholder="请填写站长手机" v-model="minFirestationForm.contactPhone"></el-input>
                    </el-form-item> 
                    <el-form-item class="address_form_item" label="地图定位" prop="address">
                        <el-input disabled  placeholder="请在地图上上标记位置" v-model="minFirestationForm.address"></el-input>
                        <div @click="getmap" class="imgbox">
                                <img src="../../../assets/image/index/report_img_066.png" alt="">
                        </div>                           
                    </el-form-item> 
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">保存</el-button>
                        <el-button class="cancel_btn" @click="cancel(minFirestationForm.id)">取消</el-button>
                    </el-form-item>
                </el-form>
                <!-- 地图弹窗 -->
                <baseDialog title="地图弹窗" ref="baseDialog">
                    <baseMap @getlocation="getlocation" :lat="minFirestationForm.lat" :lng="minFirestationForm.lng" :issearch="true"></baseMap>
                </baseDialog>
            </el-col>
            <!-- 右边 -->
            <el-col class="right_box" :span="12">
                <div class="grid-content">
                    <baseUpload v-model="minFirestationForm.photoBase64"></baseUpload>
                    <!--  -->
                    <div v-if="ishave" class="btns_box">
                        <el-button @click="getstuff_equment_activity('stuff')" type="primary">人员配备</el-button>
                        <el-button @click="getstuff_equment_activity('equment')">设施配备</el-button>
                        <el-button @click="getstuff_equment_activity('activity')">活动记录</el-button>
                    </div>
                </div>
                <!--人员配备和设施配备和活动记录Table弹窗 -->
                <baseDialog title="详情信息" ref="stuff_equment_activity_TableDialog">
                    <div class="addBox">
                        <el-button @click="addNew(tableName)">新增</el-button>
                    </div>
                    <baseTable 
                    :tableName="tableName"
                    :totalCount="totalCount"
                    :pageSize="4"
                    :currentpage="totalPage.current"
                    :tableThead="stuff_equment_activityTableHead" 
                    :tableData="stuff_equment_activityTableData"
                    @showdetails="showdetails"
                    @deleteInfo="deleteInfo"
                    @pageChange='nextClick'
                  
                    
                    >
                    </baseTable>
                </baseDialog>

                <!-- 人员配备详情 -->
                <baseDialog  ref="stuffDialog" :title="tableName">
                    <baseHeadPic :base64Img.sync="staffingForm.photoBase64"></baseHeadPic>
                    <el-form ref="staffingForm"   class="fire-house-form" label-width="100px" :model="staffingForm">
                        <el-form-item  label="姓名：" prop="contactName">
                            <el-input :disabled="staffingForm_disabled" v-model="staffingForm.contactName" placeholder="请输入人员姓名（必填）"></el-input>
                        </el-form-item>
                        <el-form-item  label="岗位：" prop="job">
                            <el-select :disabled="staffingForm_disabled"  v-model="staffingForm.job" placeholder="请选择岗位（必填）">
                                <el-option label="值班员" value="值班员"></el-option>
                                <el-option label="消防员" value="消防员"></el-option>
                                <el-option label="通讯员" value="通讯员"></el-option>
                                <el-option label="驾驶员" value="驾驶员"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="联系手机：" prop="contactPhone">
                            <el-input :disabled="staffingForm_disabled"  v-model="staffingForm.contactPhone" placeholder="请输入联系人电话号码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="submitStuff">提交</el-button>
                        </el-form-item>
                    </el-form>
                </baseDialog>
                <!-- 设施匹配详情 -->
                <baseDialog ref="equmentDialog" :title="tableName">
                    <el-form ref="equmentForm"  class="fire-house-form" label-width="100px" :model="equmentForm">
                        <el-form-item label="类别：">
                        <el-select  v-model="equmentForm.type" @change="selectEqumentClassify($event)" placeholder="请选择设施配备类别">
                            <el-option
                            v-for="(item,index) in equmentClassify"
                            :key="index"
                            :label="item"
                            :value="item"
                            >
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="名称：">
                            <el-select v-model="equmentForm.name"  @change="selectEqumentName" placeholder="请选择设施配备名称">
                            <el-option
                                v-for="(item,index) in equmentName"
                                :key="index"
                                :label="item.name"
                                :value="item.name"
                            >
                            </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数量：" prop="count">
                            <el-input v-model="equmentForm.count" placeholder="请输填写数量"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="submitequment">提交</el-button>
                        </el-form-item>
                        
                    </el-form>
                </baseDialog>
                 <!-- 活动记录详情 -->
                <baseDialog ref="activityDialog" :title="tableName">
                    <el-form ref="activityForm"  class="fire-house-form" label-width="100px" :model="activityForm">
                        <el-form-item label="活动类别：" prop="type">
                            <el-select v-model="activityForm.type" placeholder="请选择设施配备类别">
                            <el-option
                                v-for="item in activityClassify"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label"
                            >
                            </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期：">
                            <el-date-picker
                                v-model="activityForm.date"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="地点：">
                            <el-input v-model="activityForm.address" placeholder="请输入地址（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="参加人员：">
                            <el-input v-model="activityForm.attendUser" placeholder="请输入参与人员"></el-input>
                        </el-form-item>
                        <el-form-item label="活动内容：">
                            <el-input  type="textarea" v-model="activityForm.content"></el-input>
                        </el-form-item>
                        <el-form-item label="问题及情况：">
                            <el-input  type="textarea" v-model="activityForm.problem"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="submitactivity">提交</el-button>
                        </el-form-item>
                    </el-form>
                </baseDialog>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import baseUpload from '../../../components/baseUploadImg'
import baseDialog from '../../../components/baseDialog/index'
import baseMap from '../../../components/baseMap'
import baseTable from '../../../components/baseTable/index'
import baseHeadPic from '../../../components/baseHeadPic'
export default {
    components:{
        baseUpload,
        baseDialog,
        baseMap,
        baseTable,
        baseHeadPic
    },
    data(){
        return{
            ishave:false,
            rules:{
                name: [
                    { required: true, message: "请填写站点名称", trigger: "blur" }
                ],
                level:[
                    { required: true, message: "请选择站点等级", trigger: "change" }
                ],
                contactName: [
                    { required: true, message: "请填写站长名称", trigger: "blur" }
                ],
                contactPhone: [
                    { required: true, message: "请填写联系手机", trigger: "blur" }
                ],
                address: [
                    { required: true, message: "请标记", trigger: "blur" }
                ],
            },
            minFirestationForm:{
                fireUnitName:'',
                personNum:0,
                address:''
            },
            minFirestationForm2:{
                fireUnitName:'',
                personNum:0,
                address:''
            },
            stuff_equment_activityTableData:[],
            stuff_equment_activityTableHead:[],
            // 人员配备
            stuffTableHead:[
               {
                    prop: "contactName",
                    name: "姓名"
                },
                {
                    prop: "job",
                    name: "岗位"
                },
                {
                    prop: "contactPhone",
                    name: "联系手机"
                },
                {
                    width: "140px",
                    name: "操作"
                }
            ],
            stuffTableData:[
                {
                    contactName:'123',
                    contactPhone:'183499900415',
                    job:'工作'
                },
                {
                    contactName:'123',
                    contactPhone:'183499900415',
                    job:'工作'
                },
                {
                    contactName:'123',
                    contactPhone:'183499900415',
                    job:'工作'
                },
                {
                    contactName:'123',
                    contactPhone:'183499900415',
                    job:'工作'
                },
            ],
            //设施配备
            equmentTableHead:[
                {
                prop: "type",
                name: "类别"
                },
                {
                prop: "name",
                name: "名称"
                },
                {
                prop: "count",
                name: "数量"
                },
                {
                width: "140px",
                name: "操作"
                }
            ],
            equmentTableData:[],
            //活动记录
            activityTableHead:[
                {
                prop: "date",
                name: "日期"
                },
                {
                prop: "address",
                name: "地点"
                },
                {
                prop: "type",
                name: "活动类别"
                },
                {
                width: "140px",
                name: "操作"
                }
            ],
            tableName:'',
            totalPage:{
                current:0
            },
            totalPage1:{
                MaxResultCount: 4, // 查询当前页面的数量
                SkipCount: 0, // 跳过的查询的数量
                current: 1 // 当前页面
            },
            totalPage2:{
                MaxResultCount: 4, // 查询当前页面的数量
                SkipCount: 0, // 跳过的查询的数量
                current: 1 // 当前页面
            },
            totalPage3:{
                MaxResultCount: 4, // 查询当前页面的数量
                SkipCount: 0, // 跳过的查询的数量
                current: 1 // 当前页面
            },
            totalCount:5,//总table的总条数
            staffingForm_disabled:false,//站长不可修改
            staffingForm:{
                photoBase64:''
            },//
            equmentForm:{},
             //设施配备的类别数据
            equmentClassify:[],
            //设施配备的名称数据
            equmentName:[],
            //--
            activityForm:{},
            //活动类别
            activityClassify:[
                {
                value:1,
                label:'消防检查巡查'
                },
                {
                value:2,
                label:'消防水源熟悉'
                },
                {
                value:3,
                label:'单位熟悉'
                },
                {
                value:4,
                label:'预案演练'
                },
                {
                value:5,
                label:'消防宣传培训'
                },
                {
                value:6,
                label:'灭火救援'
                },
                {
                value:7,
                label:'日常训练'
                },
        
            ]
        }
    },
    created(){
        this.MiniFireStationGetById();
    },
    methods:{
        // 初始化信息
        MiniFireStationGetById(){
            let fireUnitId = localStorage.getItem('fireUnitID')
            this.$axios.get(this.$api.MiniFireStationGetById,{params:{fireUnitId}}).then(res=>{
                console.log("获取微型消防站数据成功",res)
                if(res.data.result.name == null){
                    console.log("没有")
                    this.ishave = false
                    this.minFirestationForm.fireUnitName =localStorage.getItem('fireUnitName')
                }else{
                      console.log("有")
                    this.ishave = true
                    this.minFirestationForm = res.data.result
                }
            }).catch(err=>{
                console.log("失败了微型消防站",err)
            })
        },
        //提交内容
        submitForm(){
            this.$refs.minFirestationForm.validate(valid => {
                if(valid){
                    console.log(this.minFirestationForm)
                    let as = this.minFirestationForm.id ?
                    this.$axios.post(this.$api.MiniFireStationUpdate,this.minFirestationForm)
                    :  this.$axios.post(this.$api.MiniFireStationAdd,this.minFirestationForm);
         
                    as.then(res=>{
                        console.log("提交微型消防站数据成功",res)
                        if(res.data.result.success){
                            this.$message({
                                message:'提交数据成功',
                                type: 'success'
                            });
                            if(!this.minFirestationForm.id){
                                this.ishave = true
                                localStorage.setItem('miniFireStationId',res.data.result.miniFireStationId)
                            }

                        }else{
                            this.$message({
                                message:res.data.result.failCause ,
                                type: 'error'
                            });
                        }
                    }).catch(err=>{
                        console.log("提交微型消防站数据失败",err)
                    })
                }
            })
            
        },
        //取消
        cancel(id){
            if(id){//如果有内容
                this.MiniFireStationGetById();
            }else{
                let stringform = JSON.stringify(this.minFirestationForm2)
                this.minFirestationForm = JSON.parse(stringform)
                
            }
           
        },
        //打开地图弹窗
        getmap(){
            this.$refs.baseDialog.dialogVisible = true
        },
        getlocation(address,lat,lng){
            console.log("address,lat,lng",address,lat,lng)
            this.minFirestationForm.address = address
            this.minFirestationForm.lat = lat
            this.minFirestationForm.lng = lng
            console.log(this.minFirestationForm)
        },
        //----------------------三总------------------------------------------
        //获取人员配备和活动记录和设施配备的table页弹窗
        getstuff_equment_activity(name){
            console.log("name",name)
            this.$refs.stuff_equment_activity_TableDialog.dialogVisible = true
            if(name == 'stuff'){
                this.tableName = '人员配备详情'
                this.stuff_equment_activityTableHead = this.stuffTableHead
                this.gettotalData('人员配备详情')
            }else if(name == 'equment'){
                this.tableName = '设施配备详情'
                this.stuff_equment_activityTableHead = this.equmentTableHead
                this.gettotalData('设施配备详情')
                this.GetMiniFireEquipmentTypes();
            }else if(name == 'activity'){
                this.tableName = '活动记录详情'
                this.stuff_equment_activityTableHead = this.activityTableHead
                this.gettotalData('活动记录详情')
            }
        },
        //请求总得table数据
        gettotalData(name){
            console.log("name",name)
            //  let p = this.totalPage
            //  console.log(this.totalPage)
             let axios
            //  p.MiniFireStationId = localStorage.getItem('miniFireStationId')
            if(name == '人员配备详情'){
                let p = this.totalPage1
                p.MiniFireStationId = localStorage.getItem('miniFireStationId')
                 this.totalPage.current = this.totalPage1.current
                axios = this.$axios.get(this.$api.GetMiniFireJobUser,{params:p})
            }else if(name == '设施配备详情'){
                let p = this.totalPage2
                  this.totalPage.current = this.totalPage2.current
                p.MiniFireStationId = localStorage.getItem('miniFireStationId')
                axios = this.$axios.get(this.$api.GetMiniFireEquipmentList,{params:p})
            }else if(name == '活动记录详情'){
                let p = this.totalPage3
                this.totalPage.current = this.totalPage3.current
                p.MiniFireStationId = localStorage.getItem('miniFireStationId')
                axios = this.$axios.get(this.$api.GetActionList,{params:p})
            }

            axios.then(res=>{
                console.log("获取弹窗列表数据",res);
                if(res.data.success){
                    ({items:  this.stuff_equment_activityTableData,totalCount: this.totalCount} = res.data.result);
                }
                 
            }).catch(err=>{
                console.log("获取弹窗列表数据失败",err)
            })

        },
        //总得table查看详情
        showdetails(item,name){
            if(name == '人员配备详情'){
                this.$refs.stuffDialog.dialogVisible = true
                if(item.job == '站长'){
                    console.log("站长站长站长站长站长站长站长站长站长站长站长站长站长")
                    this.staffingForm_disabled = true
                }else{
                     console.log("正常正常正常正常正常正常")
                    this.staffingForm_disabled = false

                }
                this.GetJobUserDetail(item.jobUserId)
            }else if(name == '设施配备详情'){
                 this.$refs.equmentDialog.dialogVisible = true
                 this.equmentForm = item
            }else if(name == '活动记录详情'){
                 this.$refs.activityDialog.dialogVisible = true
                 this.GetMiniFireAction(item.miniFireActionId)

            }

        },
        //总得table删除
        deleteInfo(item){
            let axios ;
            if(this.tableName == '人员配备详情'){
                if(item.job == "站长"){
                    this.$message({
                        message: '站长不能删除',
                        type: 'warning'
                    });
                    return
                }else{

                    axios = this.$axios.delete(this.$api.DeleteJobUser,{params:{JobUserId:item.jobUserId}})
                    this.totalPage1.SkipCount = 0
                }
            
            }else if(this.tableName == '设施配备详情'){
                axios = this.$axios.delete(this.$api.DeleteMiniFireEquipment,{params:{MiniFireEquipmentId:item.miniFireEquipmentId}})
                this.totalPage2.SkipCount = 0
            }else if(this.tableName == '活动记录详情'){
                axios = this.$axios.delete(this.$api.DeleteMiniFireAction,{params:{MiniFireActionId:item.miniFireActionId}})
                  this.totalPage3.SkipCount = 0
            }
            axios.then(res=>{
                console.log("总删除成功",res)
                if(res.data.result.success){
                    this.$message({
                        message: '删除数据成功',
                        type: 'success'
                    });
                    this.gettotalData(this.tableName)
                }
            }).catch(err=>{
                console.log("失败",err)
            })
      
        },
        //总体新增按钮
        addNew(name){
            if(name == '人员配备详情'){
                this.$refs.stuffDialog.dialogVisible = true
                this.staffingForm_disabled =false
                this.staffingForm ={}
            }else if(name == '设施配备详情'){
                this.$refs.equmentDialog.dialogVisible = true
                this.equmentForm = {};
            }else if(name == '活动记录详情'){
                this.$refs.activityDialog.dialogVisible = true
                this.activityForm = {};
            }
        },
        //下一页
        nextClick(dataPage){
            console.log("dataPage",dataPage)
           
            if(this.tableName == '人员配备详情'){
                this.gettotalData(this.tableName)
                this.totalPage1.SkipCount = (dataPage-1)* this.totalPage1.MaxResultCount
                this.totalPage1.current = dataPage
                this.totalPage.current = dataPage
            }else if(this.tableName == '设施配备详情'){
                this.gettotalData(this.tableName)
                this.totalPage2.SkipCount = (dataPage-1)* this.totalPage2.MaxResultCount
                this.totalPage2.current = dataPage
                this.totalPage.current = dataPage
            }else if(this.tableName == '活动记录详情'){
                this.gettotalData(this.tableName)
                this.totalPage3.SkipCount = (dataPage-1)* this.totalPage3.MaxResultCount
                this.totalPage.current = dataPage
            }
        },
        // ------------------人员配备---------------------------
        //人员配备提交
        submitStuff(){
            console.log("执行下雨")
            this.staffingForm.miniFireStationId = localStorage.getItem('miniFireStationId')
           let as = this.staffingForm.jobUserId
            ? this.$axios.put(this.$api.UpdateJobUser, this.staffingForm)
            : this.$axios.post(this.$api.AddJobUser, this.staffingForm);
            as.then(res => {
                if (res.data.success) {
                    this.$message.success(
                        `${this.staffingForm.jobUserId ? "修改" : "新增"}微型消防站成功`
                    );
                    this.$refs.stuffDialog.dialogVisible  = false;
                    this.gettotalData('人员配备详情')
                }
            }).catch(err=>{
                console.log("添加失败",err)
            });
        },
        GetJobUserDetail(id){
            this.$axios.get(this.$api.GetJobUserDetail,{params:{JobUserId:id}}).then(res=>{
            if(res.data.success){
                this.staffingForm = res.data.result
            }
            }).catch(err=>{
            console.log("获取人员配备的数据失败",err)
            })
        },
        //------------设施配备------------------------------------------
        //获取设施配备类别
        GetMiniFireEquipmentTypes(){
            this.$axios.get(this.$api.GetMiniFireEquipmentTypes).then(res=>{
                console.log("获取设施配备类别",res)
                if(res.data.success){
                this.equmentClassify = res.data.result
                }
            }).catch(err=>{
                console.log("获取设施配备类别错误",err)
            })
        },
        selectEqumentClassify(item){
            console.log("ite",item)
            if(this.equmentForm.name){
                this.equmentForm.name = ''
            }
            let roles = []
            this.$axios.get(this.$api.GetMiniFireEquipmentsByType,{params:{Type:item}}).then(res=>{
                console.log("选择设施配备的二级",res)
                if(res.data.success){
                this.equmentName = res.data.result
                }
            }).catch(err=>{
                console.log("选择设施配备的二级错误",err)
            })
        },
        selectEqumentName(name){
            console.log("选择的那么",name)

            this.equmentForm.name = name
        },
        submitequment(){
            this.equmentForm.miniFireStationId = localStorage.getItem('miniFireStationId')
            let as = this.equmentForm.miniFireEquipmentId
                ? this.$axios.put(this.$api.UpdateMiniFireEquipment, this.equmentForm)
                : this.$axios.post(this.$api.AddMiniFireEquipment, this.equmentForm);
            as.then(res => {
                if (res.data.success) {
                    this.$message.success(
                        `${this.equmentForm.miniFireEquipmentId ? "修改" : "新增"}设施配备成功`
                    );
                    this.$refs.equmentDialog.dialogVisible = false;
                    this.gettotalData('设施配备详情')
                }
            }).catch(err=>{
                console.log("添加失败",err)
          });
        },
        //-------------------------------活动记录-------------------------------------
        //获取某一一条活动记录详情
        GetMiniFireAction(id){
            this.$axios.get(this.$api.GetMiniFireAction,{params:{MiniFireActionId:id}}).then(res=>{
                console.log("获取某一条活动记录详情",res)
                if(res.data.success){
                this.activityForm = res.data.result
                }
            }).catch(err=>{
                console.log("获取某一条活动记录详情失败",err)
            })
        },
        submitactivity(){
                this.activityForm.miniFireStationId = localStorage.getItem('miniFireStationId')
                let as = this.activityForm.miniFireActionId
                    ? this.$axios.put(this.$api.UpdateMiniFireAction, this.activityForm)
                    : this.$axios.post(this.$api.AddMiniFireAction, this.activityForm);
                as.then(res => {
                    if (res.data.success) {
                        this.$message.success(
                            `${this.activityForm.miniFireActionId ? "修改" : "新增"}活动记录成功`
                        );
                        this.$refs.activityDialog.dialogVisible = false;
                        this.gettotalData('活动记录详情')
                    }
                }).catch(err=>{
                    console.log("添加失败",err)
                });
        }
    }
}
</script>

<style lang="less">
    .minFirestationBox{
        .left_box{
            .tips{
                color: #cccccc;
                font-size: 14px;
            }
            .el-form{
                 .bordernone{
                    .el-input__inner{
                        border: none !important;
                    }
                }
                .el-form-item{
                    margin: 50px 0px;
                    .el-form-item__label{
                        color:rgb(255, 252, 191) !important;
                    }
                    .el-input__inner{
                        border: 1px solid #025691;
                        background: #020d1c;
                        color: #abd5ff;
                    }  
                    .el-button{
                        width: 48%;
                        background: #025691;
                    } 
                    &.address_form_item{
                        .el-form-item__content{
                            display: flex;
                            align-content: center;
                        }
                        .el-input{
                            width: 96%;
                        }
                        .imgbox{
                            display: flex;
                            align-items: center;
                        }   
                        
                    }
                    .el-select{
                        width: 100%;
                    }

                    .cancel_btn{
                        background: #020d1c;
                        color: white;
                    }
                }
            }
        }
        .grid-content{
            .btns_box{
                margin: 100px 0px;
                display: flex;
                justify-content: center;
                .el-button{
                    width: 170px;
                    background: #025691;
                    color: white;
                }
            }
           
        }
        .el-dialog .el-dialog__body{
            display: flex;
            flex-direction: column;
            align-items: center;
            .addBox{
               text-align: right;
               width: 100%;
               .el-button{
                   width: 160px;
                   background: #025691;
                   color: white;
               }
            }
            .fire-house-form{
                width: 50%;
                .el-form-item{
                    .el-form-item__label{
                        color: white;
                    }
                    .el-form-item__content{
                        .el-input__inner{
                            background:#025691;
                            color: white;
                        }
                        .el-select{
                            width: 100%;
                        }
                        .el-textarea__inner{
                            background:#025691;
                            color: white;
                        }
                        .el-date-editor{
                            width: 100%;
                        }
                        .el-button{
                            width: 100%;
                            background: #025691;
                            color: white;
                        }
                    }
                }
            }
        }
        .baseTable_pagenation{
            width: 100%;
        }
    }
</style>