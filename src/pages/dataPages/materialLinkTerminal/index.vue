<style lang="less">

.materialLinkTerminal{
    @import '../../../assets/css/dialog.less';
    .screenBox{
        text-align: left;
        color: #abd5ff;
        font-size: 14px;
        .el-form{
            display: inline-block;
            .el-form-item{
                margin: 0;
                width: 250px;
            }
            .el-form-item__label{
                width: 100px !important;
                color: white;
            }
        }
        .el-checkbox__label{
            color: #abd5ff;
            font-size: 14px;
        }
        .el-checkbox__input{
            .el-checkbox__inner{
                width: 16px;
                height: 16px;
                border: solid 1px #82b3f0;
                background-color: #163f72 !important;
            }
        }
        .el-checkbox__input.is-checked{
            .el-checkbox__inner{
                &::after{
                    border: 2px solid white;
                    -webkit-box-sizing: content-box;
                    box-sizing: content-box;
                    content: "";
                    border-left: 0;
                    border-top: 0;
                    height: 7px;
                    left: 4px;
                    position: absolute;
                    top: 1px;
                    width: 3px;
                    -webkit-transform: rotate(45deg) scaleY(1);
                    transform: rotate(45deg) scaleY(1);
                }
            }
        }
   
    }
}

.dialog-offline{
    padding-left: 130px;
    p{
        line-height: 32px;
        color: #fff;
        font-size: 14px;
        &.echartsTitle{
            color: #7cb1f3;
            font-size: 16px;
            text-align: center;
        }
    }
    #offLineEchart{
        width: 600px;
        height: 340px;
    }
}
.dialog-online{
    padding-left: 130px;
    p{
        line-height: 32px;
        color: #fff;
        font-size: 14px;
        span{
            color: #80a5f1;
        }
         &.echartsTitle{
            color: #7cb1f3;
            font-size: 16px;
            text-align: center;
        }
    }
    #onLineEchart{
        width: 600px;
        height: 380px;
    }
}
/*  */
.testsrcollBox{
    width: 500px;
    border: salmon 1px solid ;
    padding: 20px;
    height: 100%;
    .testBox{
        border: 2px solid darkgreen;
        display: flex;
        justify-content: space-between;
        height: 100%;
    }
    .testBox_right{
       height: 100%;
       width: 80px;
       border: red 1px solid;
       position: relative;
      .el-steps{
          position: absolute;
          top: 50%;

      }

    }
    .testBox_left{
        border: 1px solid skyblue;
        width: 300px;
        color: white;
        p{
            width: 100%;
            line-height: 3;
        }
    }

}
.el-steps{
    width: 400px;
    .el-step{
       
    }
    // .el-step__head{
        
    //     position: relative;
    //     top: 50%;
    // }

}


</style>
<template>
    <div class="materialLinkTerminal">
        <div class="screenBox">
                <el-form ref="form" :model="form" label-width="80px">
                     <el-form-item label="网关状态：">
                        <el-checkbox-group @change="screenData" v-model="form.type">
                            <el-checkbox label="在线" name="type"></el-checkbox>
                            <el-checkbox label="离线" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                   
                </el-form>
                <span>终端离线数量：{{offlineCount}}</span>
        </div>
        <base-table
            @showDialog="showDialog" 
            @prevClick="prevClick" 
            @currentChange="currentChange"  
            @nextClick="nextClick" 
            :totalCount="totalCount" 
            :tableThead="tableThead" 
            :tableData="tableData" 
            :specailText="specailText">
        </base-table>

          <!-- 弹窗1离线 -->
        <el-dialog  title="历史记录" :visible.sync="dialogVisible_offline">
           <div class="dialog-offline">
               <p>终端部件：{{an_name}}</p> 
               <p> 安装地址：{{an_location}}</p>
               <p> 网关状态：{{an_state}}</p>
               <p>网关状态最近变化时间：{{an_lastTimeStateChange}}</p> 
               <p class="echartsTitle">终端数值历史记录（单位：mA）</p>
               <div id="offLineEchart"></div>
           </div>
        </el-dialog>
        <!-- 弹窗2在线 -->
        <el-dialog  title="历史记录" :visible.sync="dialogVisible_online">
           <div class="dialog-online">
               <p>终端部件：{{UnAn_name}}</p> 
               <p>安装地址：{{UnAn_location}}</p> 
               <p>网关状态：<span>{{UnAn_state}}</span></p> 
               <p>网关状态最近变化时间：{{UnAn_lastTimeStateChange}}</p> 
               <p class="echartsTitle">终端历史记录小计</p>
               <div id="onLineEchart"> </div>
           </div>
           
        </el-dialog>
    </div>
</template>

<script>
let FireUnitId  = localStorage.getItem('fireUnitID')
import baseTable from '../../../components/baseTable/index';
export default {
    components:{
        baseTable
    },
    data(){
        return{
            form:{
                type:['在线','离线']
            },
            tableThead:[
               {
                   name:'终端部件',
                   prop:'name',
               },
               {
                    name:'安装位置',
                    prop:'location',
               },
               {
                    name:'网关状态',
                    prop:'stateName',
               },
               {
                    name:'当前数据',
                    prop:'analog',
               },
               {
                    name:'合格范围',
                    prop:'standard',
               },
               {
                    name:'历史记录',
               }
            ],
            tableData: [],
            totalCount:0,//总共条数
            offlineCount:0,
            MaxResultCount:10,//最大条数
            specailText:'历史记录',
            dialogTitle:'历史记录',
            dialogVisible_offline:false,
            dialogVisible_online:false,
            status:'在线',
            /* 非模拟量 */
            UnAn_lastTimeStateChange:"",
            UnAn_location:"",
            UnAn_name:"",
            UnAn_state:"",
            unAnalogTimes:"",
            /* 模拟量 */
            analogTimes:"",
            an_lastTimeStateChange:"",
            an_location:"",
            an_name:"",
            an_state:"",
            Option:0,//默认全部
            dataPage:1,//当前页面
          
        }
    },
    methods:{

        goto(){
            this.$router.push({
                path:'/test'
            })
        },
        /* 筛选数据 */
        screenData(){
            console.log("this.form",this.form)
            if(this.form.type == '在线'){
                this.Option = 1
                this.fireUnitEndDeviceState(1,1)

            }else if(this.form.type == '离线'){
                this.Option = -1
                  this.fireUnitEndDeviceState(1,-1)
            }else if(this.form.type.length ==2){
                 this.Option = 0
                 this.fireUnitEndDeviceState(1,0)
            }else if(this.form.type.length ==0){

            }
        },

        /* 初始化页面数据 */
        fireUnitEndDeviceState(dataPage=1,Option=0){
            let that = this;
            this.$axios({
                method:'get',
                url:that.$api.GetFireUnitEndDeviceState,
                params:{
                    FireUnitId,
                    SkipCount:(dataPage-1)*that.MaxResultCount,
                    MaxResultCount:that.MaxResultCount,
                    Option
                }
            }).then(res=>{
                console.log("物联终端初始化",res)
                that.tableData = res.data.result.items
                that.totalCount = res.data.result.totalCount
                that.offlineCount = res.data.result.offlineCount
            }).catch(res=>{
                 console.log("物联终端初始化失败",res)
            })
        },
        /* 获得防火单位模拟量终端历史记录 */
        recordAnalog(DetectorId){
           let that = this;
           this.$axios({
               method:'get',
               url:that.$api.GetRecordAnalog,
               params:{
                   DetectorId,
                   FireUnitId, 
               }
           }).then(res=>{
               console.log("获得防火单位模拟量终端历史记录成功",res)

               that.analogTimes = res.data.result.analogTimes
               that.an_lastTimeStateChange = res.data.result.lastTimeStateChange
               that.an_location  = res.data.result.location
               that.an_name = res.data.result.name
               that.an_state = res.data.result.state
                that.$nextTick(()=>{
                    that.offLineEharts(that.analogTimes);
                })

           }).catch(res=>{
               console.log("获得防火单位模拟量终端历史记录失败",res)
           })
        },
       /* 获得防火单位非模拟量终端历史记录 */
        recordUnAnalog(DetectorId){
           let that = this;
           this.$axios({
               method:'get',
               url:that.$api.GetRecordUnAnalog,
               params:{
                   DetectorId,
                   FireUnitId, 
               }
           }).then(res=>{
               console.log("非模拟量终端历史记录",res)
               that.UnAn_lastTimeStateChange = res.data.result.lastTimeStateChange
               that.UnAn_location = res.data.result.location
               that.UnAn_name = res.data.result.name
               that.UnAn_state = res.data.result.state
               that.unAnalogTimes= res.data.result.unAnalogTimes
                that.$nextTick(()=>{
                    console.log("that.unAnalogTimes",that.unAnalogTimes)
                   that.onLineEharts(that.unAnalogTimes),6000;
                   
                })

           }).catch(res=>{
               console.log("非模拟量终端历史记录失败",res)
           })
        },
        /* 展示弹窗 */
        showDialog(index){
            let that = this;
            console.log("状态",index)
           
            this.status =  index.isAnalog;
            if(this.status == false){
                console.log("detectorId",index.detectorId)
                this.recordUnAnalog(index.detectorId)
                this. dialogVisible_online = true;
            }else if(this.status == true){
              
                 this. dialogVisible_offline = true;
                 this.recordAnalog(index.detectorId);
               
            }
        },

        /* 上一页 */
        prevClick(dataPage){
            console.log("上一页",dataPage)
            this.dataPage =dataPage
            this.fireUnitEndDeviceState(dataPage,this.Option);

        },
        /* 点击页数 */
        currentChange(dataPage){
            console.log("点击页数",dataPage)
             this.dataPage =dataPage
              this.fireUnitEndDeviceState(dataPage,this.Option);
        },
        /* 点击下一页 */
        nextClick(dataPage){
            console.log("点击下一页",dataPage)
            this.dataPage =dataPage
            this.fireUnitEndDeviceState(dataPage,this.Option);
        },

        /* 初始化离线echarts图 */
        offLineEharts(analogTimes){
            let dateData = [];//时间
            let value = [];//值
            for (const arr of analogTimes) {
                dateData.push(arr.time)
                value.push(arr.value)
            }
            let offline =  this.$echarts.init(document.getElementById('offLineEchart'));
            offline.setOption({
                color:['#00b4ff'],
                /* 图像四周边距设置 */
                grid:{
                    left:50,
                    top:10,
                    right:10,
                    bottom:100,
                },
                 /* 鼠标悬浮时显示数据 */
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                /*x轴的数据  */
                xAxis: {
                    type: 'category',
                    data: dateData,
                    /* 设置轴线的颜色 */
                    axisLine:{      
                        lineStyle: {
                            color: '#42749e'
                        }
                    },
                    //调整x轴的lable
                    axisLabel:{   
                        textStyle:{
                        fontSize:12, // 让字体变小
                        color:'white'
                        },
                        interval: 0,    //强制文字产生间隔
					    rotate: 45,     //文字逆时针旋转45°
                    } 

                },
                yAxis:{
                    type: 'value',
                    splitLine: {// 控制网格线是否显示
                        show: true, 
                        lineStyle: { //  改变轴线颜色
                             color: ['#42749e']
                        }                            
                    },
                    axisLine:{ //设置轴线的属性
                        lineStyle:{
                            color:'#42749e',
                        }
                    },
                    axisLabel:{   
                        textStyle:{
                        fontSize:12, // 让字体变小
                        color:'white'
                        }
                    }  
                },
                series: [{
                    data: value,
                    type: 'line',
                    symbol:'circle',
                    symbolSize:10
                }]
            })
        },
        /* 初始化非模拟量echarts图 */
         onLineEharts(unAnalogTimes){
             console.log("unAnalogTimes",unAnalogTimes)
            let offline =  this.$echarts.init(document.getElementById('onLineEchart'));
            let offlineCount =[]//离线次数
            let alarmCount =[]//报警次数
            let faultCount =[]//故障次数
            let dateData = []//日期
            for(let newArr of unAnalogTimes){
                dateData.push(newArr.time)
                offlineCount.push(newArr.offlineCount)
                alarmCount.push(newArr.alarmCount)
                faultCount.push(newArr.faultCount)
                 
            }
            console.log("dateData",dateData,faultCount)
           

            offline.setOption({
                color:['#00a2ff','#ff8a00','#e8e23f'],
                 /* 图像四周边距设置 */
                grid:{
                    left:40,
                    top:0,
                    right:10,
                    bottom:40
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data:['离线次数','报火警次数','报故障次数'],
                    padding:[
                        5,
                        20,
                        0,
                        20
                    ],
                    textStyle:{
                        color:'white',

                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    splitLine: {
                        show: true, 
                         //  改变轴线颜色
                        lineStyle: {
                            // 使用深浅的间隔色
                             color: ['#42749e']
                         }                            
                    },
                     //设置轴线的属性
                    axisLine:{
                        lineStyle:{
                            color:'#42749e',
                        }
                    },
                    axisLabel:{   
                        textStyle:{
                        fontSize:12, // 让字体变小
                        color:'white'
                        }
                    }  
                },
                xAxis: {
                    type: 'category',
                    data: dateData,
                     /* 设置轴线的颜色 */
                    axisLine:{      
                        lineStyle: {
                            color: '#42749e'
                        }
                    },
                    //调整x轴的lable
                    axisLabel:{   
                        textStyle:{
                        fontSize:12, // 让字体变小
                        color:'white',
                        },
                        interval: 0,    //强制文字产生间隔
					    rotate: 45,     //文字逆时针旋转45°
                    }

                },
                series: [
                    {
                        name: '离线次数',
                        type: 'bar',
                        data: offlineCount
                    },
                    {
                        name: '报警次数',
                        type: 'bar',
                        data: alarmCount
                    },
                     {
                        name: '报故障次数',
                        type: 'bar',
                        data: offlineCount
                    }
                ]
            })
        }
    },

    mounted(){
        this.fireUnitEndDeviceState(1)
        
    }
}
</script>

