
<template>
    <div id="homeContainer">
        <baseHeader :ishome=true ></baseHeader>
        <el-row :gutter="10" class="main">
            <!-- 左 -->
            <el-col :span="7">
                <div class="grid-content left">
                    <!-- 上-echarts -->
                    <div class="top-gird-left column-gird">
                        <div class="topTitle">
                            <span>设施故障处理情况</span>
                            <img src="../../assets/image/home/home_img_01.png" alt="">
                        </div>
                        <div class="contentContainer">
                            <div class="EchartsBox">
                                <div id="leftEcharts"></div>
                            </div>
                            <div class="EchartsBox">
                                <div id="rightEcharts"> </div>
                            </div>
                        </div>
                    </div>
                    <!-- 中-巡查日历 -->
                    <div class="center-gird-left-pd">
                        <div class="center-gird-left column-gird">
                            <div class="topTitle">
                                <span>巡查日历</span>
                                <img src="../../assets/image/home/home_img_02.png" alt="">
                            </div>
                            <!-- 日历 -->
                        
                            <Calendar @changeMonth="changeMonth1" :markDateMore=patrolDate ></Calendar>
                        </div>
                    </div>
                    
                    <!-- 下-值班日历 -->
                    <div class="bottom-gird-left column-gird">
                        <div class="topTitle">
                            <span>值班日历</span>
                            <img src="../../assets/image/home/home_img_03.png" alt="">
                        </div>
                        <!-- 日历 -->
                        <Calendar @changeMonth="changeMonth2" :markDateMore=dutyDate ></Calendar>
                    </div>
                </div>
            </el-col>
            <!-- 中 -->
            <el-col :span="10">
                <div class="grid-content medium">
                    <div 
                        class="top-gird-medium column-gird"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                    >
                        <div class="topTitle">
                            <span class="green">火警联网实时达</span>
                            <img src="../../assets/image/home/home_img_05.png" alt="">
                        </div> 
                        <p class="oldTimeRecord" >
                            5秒自动刷新，上次刷新时间：{{refreshTime2}}
                        </p>

                        <audio ref="audio"  :src="audioUrl"></audio>
                        <!-- 核警列表 -->
                        <ul v-if="GetAlarmChecksData.length>0" class="realTimeFireAlarm-ul">
                            <li :class="arr.checkState == 1 || arr.checkState == 5 ? 'fefefe':'e8aaeb' " v-for="(arr,index) in GetAlarmChecksData" :key="index">
                                <div class="left_content">
                                    <p>
                                        <span class="title">【时间】</span>
                                        <span>{{arr.creationTime}}</span>
                                    </p>
                                    <p>
                                        <span>【部件地址】</span>
                                        <span>{{arr.detectorSn}}</span>
                                    </p>
                                    <p>
                                        <span>【部件类型】</span>
                                        <span>{{arr.detectorTypeName}}</span>
                                    </p>
                                    <p>
                                        <span>【部件位置】</span>
                                        <span>{{arr.location}}</span>
                                    </p>
                                </div>
                                <p class="right_state">
                                    <a @click="dialogs(arr.checkState,arr.fireAlarmId)" :class="getName(arr.checkState)" href="#"> 
                                        <i v-if="arr.checkState == 1">核警 </i>
                                        <i v-if="arr.checkState == 2">误报 </i>
                                        <i v-if="arr.checkState == 3">测试 </i>
                                        <i v-if="arr.checkState == 4">真实火警 </i>
                                        <i v-if="arr.checkState == 5">核警 </i>
                                    </a>
                                    <a 
                                    :class="getName(arr.checkState)"
                                    v-if="arr.existBitMap" 
                                    @click="getpoint(arr.fireAlarmId)"
                                    >点位图</a>
                                </p>
                                
                            </li>
                        </ul>
                        <div class="nodata" v-else>
                            <p>暂无数据</p>
                        </div>
                   
                    </div>
                    <div class="bottom-gird-medium-pd">
                        <div class="bottom-gird-medium column-gird">
                            <div class="topTitle">
                                <span class="green">消防物联网状态</span>
                                <img src="../../assets/image/home/home_img_06.png" alt="">
                            </div> 
                            <div class="refreshTime">90秒自动刷新，上一次刷新时间 {{refreshTime}}</div>
                            <div class="parallelogram_box">
                                <div class="parallelogram" v-for="item in GetFireUnitEndDeviceStateData" :key="item.deviceType">
                                
                                    <p class="parallelogram_title">{{item.deviceType}}</p>
                                    <ul>
                                        <li :class="getState(arr.status)"  v-for="(arr,i) in item.deviceStatusList" :key="i">{{arr.status}}：{{arr.num}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </el-col>
            <!-- 右 -->
            <el-col :span="7">
                <div class="grid-content right">
                     <div class="topTitle">
                        <span>最新巡查记录</span>
                        <img src="../../assets/image/home/home_img_07.png" alt="">
                    </div> 
                    <div class="dialogContent" v-if="newPatroRecordata.creationTime">
                        <p><span class="title">提交时间：</span>{{newPatroRecordata.creationTime}}</p>
                        <p><span class="title">值班人员：</span>{{newPatroRecordata.userName}}</p>
                        <p>
                            <span class="title">巡查方式：</span>
                            <span v-if="newPatroRecordata.patrolType == 1">一般巡查</span>
                            <span v-if="newPatroRecordata.patrolType == 2">扫码巡查</span>
                        </p>
                
                        <p class="summary">有效轨迹点{{newPatroRecordata.totalDetailNum}}个，发现{{newPatroRecordata.totalProblemNum}}个问题，现场解决{{newPatroRecordata.greenProblemNum}}个问题</p>
                        <div 
                            class="right_details_TrackList" 
                            v-if=" newPatroRecordata.patrolDetailList"
                        >
                            <el-scrollbar style="height:100%">
                                <div class="right_details_TrackList_inner" v-for="(arr,index) in  newPatroRecordata.patrolDetailList" :key="index">
                                    <div class="cricle_container">
                                        <div class="left_cricle_box">
                                        </div>
                                        <div class="right_box_box">
                                            <p class="right_box_box_time">
                                                <span>{{arr.creationTime}}</span>
                                                <span class="status" v-if="arr.patrolStatus == 0">未指定</span>
                                                <span class="status normal" v-if="arr.patrolStatus == 1">正常</span>
                                                <span class="status had" v-if="arr.patrolStatus == 2">已解决</span>
                                                <span class="status hading" v-if="arr.patrolStatus == 3">异常</span>
                                            </p>
                                            <div class="right_box_box_patrolAddress">
                                                <span>{{arr.patrolAddress}}</span>
                                            </div>
                                            <div class="VoiceRemark">
                                                <p class="remark" v-if="arr.problemRemark">{{arr.problemRemark}}</p>
                                                <div v-if="arr.problemVoiceUrl" class="audio" @click="playaudio(index)">
                                                    <img class="voice" src="../../assets/image/index/voice.png" alt="">
                                                    <span class="time">{{arr.voiceLength}}"</span>
                                                </div>
                                            </div>
                                            <div class="right_box_box_Img">
                                                <viewer :images="arr.patrolPhtosPath">
                                                    <img v-for="(img,imgIndex) in arr.patrolPhtosPath"  :key="imgIndex" :src="img" alt="">
                                                </viewer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>
                    <p class="nodata" v-else>
                        暂无数据
                    </p>
                </div>
            </el-col>
        </el-row>

        <!-- 弹窗1 -->
        <el-dialog   title="消防警情核警" :visible.sync="dialogVisible">
                <el-form class="nuclearpoliceForm" ref="nuclearpoliceForm" :model="nuclearpoliceForm" label-width="100px">
                    <el-form-item label="情况处理：">
                        <el-radio-group v-model="nuclearpoliceForm.CheckStatestirg ">
                            <el-radio label="误报">误报</el-radio>
                            <el-radio label="测试">测试</el-radio>
                            <el-radio label="真实火警">真实火警</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="truePolice" v-if="nuclearpoliceForm.CheckStatestirg == '真实火警'">
                        <el-checkbox-group v-model="nuclearpoliceForm.NotifyList">
                            <el-checkbox label="通知工作人员"></el-checkbox>
                            <el-checkbox label="通知119"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-form-item label="情况描述：">
                        <el-input type="textarea" rows="10"  placeholder="情况简要描述，200字以内" v-model="nuclearpoliceForm.CheckContent"></el-input>
                    </el-form-item>
                    <el-button @click="onSubmitNuclearPolice">提交</el-button>
                </el-form>            
            
        </el-dialog>

        <!-- 弹窗2 -->
        <el-dialog  title="消防警情核警情况" :visible.sync="dialogVisible2">
            <div class="detailsBox">
                        <p>处理时间：<span>{{dealData.checkTime}}</span> </p>
                        <p>处理状态：
                            <span v-if="dealData.checkState == 2">误报</span>
                            <span v-if="dealData.checkState == 3">测试</span>
                            <span v-if="dealData.checkState == 4">真实火警</span>
                        </p>
                        <div>
                            <p class="handleContent" v-if="dealData.content">情况描述：<span>{{dealData.content}}</span></p>
                            <div class="display_p" v-if="dealData.handleVoiceUrl">
                                <span> 情况描述：</span>
                                <div class="vioceUrl"  @click="playVioce(dealData.handleVoiceLength)">
                                <img src="../../assets/image/index/voice.png" alt="">
                                <span>{{dealData.vioceUrl}}"</span>
                            </div>
                            </div>
                        </div>
            </div>
        </el-dialog>
        <!-- 点位图 -->
        <el-dialog custom-class="fireMap" width="80%"   :visible.sync="dialogVisible3">
            <div id="fireBit" ref="fireBit">
               
            </div>
            
        </el-dialog>

       
    </div>
</template>

<script>


import baseHeader from '../../components/baseHeader/index'
import Calendar from 'vue-calendar-component';
import showImg from '../../assets/image/show/1.jpg'
import two_bg from '../../assets/image/home/two_bg.png'
import AILabel  from 'ailabel'
export default {
    components:{
        baseHeader,
        Calendar
    },
    data(){
        return{
            loading:false,
            two_bg:two_bg,
            refreshTime:'',//消防数据实时达刷新时间
            refreshTime2:'',//物联终端刷新时间
            refreshTime3:'',//物联终端刷新时间
            nowMoth_patrol:'',
            nowMoth_duty:'',
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            arr:[
                {date:'2019-07-02',className:'mark2'}
            ],
            patrolDate:[],//巡查日历
            dutyDate:[],//值班日历
            GetFireUnitEndDeviceStateData:[],  /* 消防物联网状态 */
            //---------------------火警联网实时达数据---------------------------------------
            GetAlarmChecksData:[],//火警联网实时达数据列表
            dealData:[],//待处理数据
            patrolRecord:[],
            count: 0,
            checkId:0,//警情id
            checkList:['通知工作人员','通知微型消防站'],
            nuclearpoliceForm:{
               CheckStatestirg:'误报',
               NotifyList: ['通知工作人员']
            },
            newPatroRecordata:[],//最新巡查记录
            setInterval:'',//计时器
            setInterval2:'',
            setInterval3:'',
            amr:'',
            fireBit:{},
            fireimg:require('../../assets/image/home/fire.png'),
            gMap:'',
            gFeatureLayer:'',
            audioUrl:require('../../../static/fire_alarm.wav'),
            AlarmDataId:''
        }
       
    },
    methods:{
        /* 最新巡查记录里的左侧滚条 */
        initBG(){
            if(this.newPatroRecordata.patrolDetailList.length>0){
                let  element =  document.getElementsByClassName('left_cricle_box')
                let box = document.getElementsByClassName('right_box_box')
                let last_box = box.length-1;
                let one_height = box[0].clientHeight+12+'px'
                let postionheight =parseInt(one_height) /2 +'px'
                let last_height = box[last_box].clientHeight+12+'px'
                let postionheight_last =parseInt(last_height) /2 +'px'
                if(this.newPatroRecordata.patrolDetailList.length == 1){
                    // console.log("只有一条数据",)
                }else{
                    for( let i = 0;i<element.length;i++){
                        element[i].style.background  = "url('../../../static/two_bg.png')"
                        element[i].style.backgroundPosition = 'center'
                        element[i].style.backgroundRepeat = 'no-repeat'
                    }
                    element[0].style.background  = "url('../../../static/one_bg.png')"
                    element[0].style.backgroundPosition = `center ${postionheight}`
                    element[0].style.height = one_height
                    element[0].style.backgroundRepeat = 'no-repeat'
                    let last = element.length-1
                    element[last].style.height = postionheight_last
                    element[last].style.background  = "url('../../../static/three.png')"
                    element[last].style.backgroundRepeat = 'no-repeat'
                    element[last].style.backgroundPosition = `center bottom`
                }   
            }
          
        },
        go(){
            this.$router.push({
                path:'/dataPage'
            })
        },
        /* 初始化echarts数据 */
        initEcharts(){
            let that = this;
            let dutyCount,patrolCount,resolvedCount,resolvingCount,terminalCount,uuResolveCount;
            let FireUnitId  = localStorage.getItem('fireUnitID')
            this.$axios({
                method:'get',
                url:that.$api.GetBreakDownTotal,
                params:{
                    FireUnitId
                }

            }).then(res=>{
                // console.log("设施故障处理情况成功",res)
                 dutyCount = res.data.result.dutyCount
                 patrolCount = res.data.result.patrolCount
                 resolvedCount = res.data.result.resolvedCount
                 resolvingCount = res.data.result.resolvingCount
                 terminalCount = res.data.result.terminalCount
                 uuResolveCount = res.data.result.uuResolveCount
                  /* left */
                let leftEcharts = this.$echarts.init(document.getElementById('leftEcharts'));
                leftEcharts.setOption({
                    title : {
                        text: '故障来源',
                        x:'center',
                        y:'bottom',
                        textStyle:{
                            fontSize:14,
                            color:'#fefefe',
                            fontWeight:'normal'
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: 0,
                        top: 20,
                        itemWidth: 10,   // 设置图例图形的宽
                        itemHeight: 10,  // 设置图例图形的高
                        textStyle: {
                            fontSize:12,
                            color: '#fefefe'  // 图例文字颜色
                        },
                        data:['巡查','值班','物联终端'],
                        
                    },
                    
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '60%',
                            center: ['40%', '45%'],
                            data:[
                                {value:dutyCount, name:'巡查'},
                                {value:patrolCount, name:'值班'},
                                {value:terminalCount, name:'物联终端'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            label: {
                                normal: {
                                show: false
                                },
                                emphasis: {
                                show: false
                                }
                            },
                        }
                    ],
                    color: ["#00aeff","#ff9600","#12e02f"]
                })

                 /* right */
                let index =0;
                let rightEcharts = this.$echarts.init(document.getElementById('rightEcharts'));
                rightEcharts.setOption({
                    title : {
                        text: '处理进度',
                        x:'center',
                        y:'bottom',
                        textStyle:{
                            fontSize:14,
                            color:'#fefefe',
                            fontWeight:'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: 0,
                        top: 20,
                        itemWidth: 10,   // 设置图例图形的宽
                        itemHeight: 10,  // 设置图例图形的高
                        textStyle: {
                            fontSize:12,
                            color: '#fefefe'  // 图例文字颜色
                        },
                        data:['待处理','处理中','已解决'],
                        
                    },
                    /* 中间文字注释 */
                    graphic: [
                        {　　　　　　　　　　　　　　　　//环形图中间添加文字
                            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
                            left: '28%',　　　　　　　　　　
                            top: '30%',
                            style: {　　　　　　　　　　　　　　　　
                                text: uuResolveCount,
                                textAlign: 'center',
                                fill: '#fefefe',　　　　　　　　//文字的颜色
                                width: 30,
                                height: 30,
                                fontSize: 12,
                                color: "#fefefe",
                                fontFamily: "Microsoft YaHei"
                            }
                        }, 
                        {
                            type: 'text',
                            left: '24%',　　　　
                            top: '45%',
                            style: {
                                text: '待处理',
                                textAlign: 'center',
                                fill: '#fefefe',
                                width: 30,
                                height: 30,
                                fontSize: 12
                            }
                        }
                    ],
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['45%', '60%'],
                            center: ['30%', '40%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'normal'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:uuResolveCount, name:'待处理'},
                                {value:resolvingCount, name:'处理中'},
                                {value:resolvedCount, name:'已解决'}
                            ]
                        }
                    ],
                    color: ["#00aeff","#ff9600","#12e02f"]
                })

            }).catch(res=>{
                console.log("设施故障处理情况失败",res)
            })
           
        },
        // 火警联网实时达实时达弹窗
        dialogs(status,fireAlarmId){
            if(status == 1 || status == 5){
                this.dialogVisible = true;     
                this.AlarmDataId = fireAlarmId           
            }else if(status == 2 || status == 4 || status == 3){
                this.dialogVisible2 = true;
                this.GetFireAlarmById(fireAlarmId)
            }
        },
        //查看火警联网实详情
        GetFireAlarmById(fireAlarmId){
            this.$axios.get(this.$api.GetFireAlarmById,{params:{fireAlarmId}}).then(res=>{
                // console.log("获取某一条火警数据详情",res)
                res.data.result.creationTime = this.deal( res.data.result.creationTime)
                if(res.data.result.vioceUrl){
                    res.data.result.vioceUrl = `${this.$URL}${ res.data.result.vioceUrl}`;
                    let BenzAMRRecorder = require('benz-amr-recorder');
                    this.amr = new BenzAMRRecorder();
                    this.amr.initWithUrl(res.data.result.vioceUrl);
                }
                 this.dealData = res.data.result
            }).catch(err=>{
                console.log("err",err)
            })
        },
       
        /* 核警提交 */
        onSubmitNuclearPolice() {
            const fd = new FormData();
            this.nuclearpoliceForm.CheckUserId  = +localStorage.getItem('userId');
            if(this.nuclearpoliceForm.CheckStatestirg == '误报'){
                this.nuclearpoliceForm.CheckState = 2
            }else if(this.nuclearpoliceForm.CheckStatestirg == '测试'){
                this.nuclearpoliceForm.CheckState = 3
            }else if(this.nuclearpoliceForm.CheckStatestirg == '真实火警'){
                this.nuclearpoliceForm.CheckState = 4
            }
            // console.log("this.nuclearpoliceForm",this.nuclearpoliceForm)
            fd.append('CheckUserId',this.nuclearpoliceForm.CheckUserId)
            fd.append('AlarmDataId',this.AlarmDataId)
            fd.append('CheckState',this.nuclearpoliceForm.CheckState)
            fd.append('CheckContent',this.nuclearpoliceForm.CheckContent)
            if(this.nuclearpoliceForm.CheckState = 3){
                 fd.append('NotifyList',this.nuclearpoliceForm.NotifyList)
            }

            this.$axios.post(this.$api.CheckFireAlarm,fd).then(res=>{
                console.log("处理核警成功",res)
                this.dialogVisible = false;
                this.GetFireAlarmForDataScreen(true)
            }).catch(err=>{
                console.log("处理核警失败",err)
            })
        },

        /* 动态设置class属性 */
        getName(status){
            if(status == 1){
                return 'fffc00'
            }else if(status == 5){
                return 'fffc00'
            }else{
                 return 'gray'
            }
        },
        getState(state){
            if(state == '在线' || state == '良好'){
                return 'green'
            }else if(state == '离线'){
                return 'gray'
            }else if(state == '隐患'){
                return 'yellow'
            }else if(state == '超限'){
                return 'orange'
            }else if(state == '故障'){
                return 'yellow'
            }
        },
        init(cx,cy){
            this.gMap = new AILabel.Map('fireBit',
                {
                    zoom: 1500, 
                    cx: 0, 
                    cy: 0, 
                    zoomMax: 650 * 10, 
                    zoomMin: 650 / 10, 
                    autoPan: true, 
                    drawZoom: true
                }
            );
            // 图片层实例\添加
            const gImageLayer = new AILabel.Layer.Image('img',  this.fireBit.floorPicture, 
                {
                    w: 1080, 
                    h: 720
                }, 
                {
                    zIndex: 1
                }
            );
            this.gMap.addLayer(gImageLayer);
            // 矢量层实例\添加
            this.gFeatureLayer = new AILabel.Layer.Feature('featureLayer', 
            {
                zIndex: 2, 
                transparent: true
            }
            );
            this.gMap.addLayer(this.gFeatureLayer);
        },
        makemark(content){
            let  marker = new AILabel.Marker(content.id, {
                src:require('../../assets/image/home/fire.gif'),
                x: content.coordinateX,
                y: content.coordinateY,
                offset: {x: -10, y: -10},
            });
            // this.hejingMark = marker
            this.gMap.mLayer.addMarker(marker);
            let imga =  $("#markerLayer").find('img')
            // console.log("imga",imga)

            imga.on({
                mouseenter: function (e) {
                    let p =$(`<div class='ss'>
                    <p>【时间】：${content.creationTime}</p>
                    <p>【部件】：${content.detectorSn}</p>
                    <p>【类型】：${content.detectorTypeName}</p>
                    <p>【位置】：${content.location}</p>
                    </div>`);
                    p.css({"position":"absolute"})
                    imga.after(p)
                },
                mouseleave: function (e) {
                    $('.ss').remove()
                }
            })
        },

        //火警点位
        getpoint(fireAlarmId){
            this.dialogVisible3 = true;
            this.$axios.get(this.$api.GetDetectorBitMap,{
                // params:{fireAlarmId:1247}
                params:{fireAlarmId}
            }).then(res=>{
                // console.log("火警点位图",res)
                if(res.data.result.floorPicture){
                    res.data.result.creationTime=this.deal(res.data.result.creationTime)
                    this.fireBit = res.data.result;
                    this.init(res.data.result.coordinateX,res.data.result.coordinateY);
                    this.makemark(res.data.result)
                }
              
            }).catch(err=>{
                console.log("err",err)
            })
        },

        // 消防物联网状态
        GetDeviceStatusForDataScreen(){
              this.timeFormate(new Date(),'GetDeviceStatusForDataScreen');
            let fireUnitId = localStorage.getItem('fireUnitID')
            this.$axios.get(this.$api.GetDeviceStatusForDataScreen,{params:{fireUnitId}}).then(res=>{
                // console.log("消防物联网状态成功",res)
                this.GetFireUnitEndDeviceStateData = res.data.result
            }).catch(err=>{
                console.log("消防物联网状态失败",err)
            })
        },

        // 火警联网实时达
        GetFireAlarmForDataScreen(refesh){
            refesh = refesh || false;
            if(refesh){
                 this.loading = true
            }
           
            this.timeFormate(new Date(),'GetFireAlarmForDataScreen');
            let fireUnitId  = localStorage.getItem('fireUnitID')
            this.$axios.get(this.$api.GetFireAlarmForDataScreen,{params:{fireUnitId}}).then(res=>{
                // console.log("GetFireAlarmForDataScreen火警联网实时达",res)
                if(refesh){
                    for(let arr of res.data.result.fireAlarmForDataScreenList){
                        arr.creationTime = this.deal(arr.creationTime)
                    }
                    this.GetAlarmChecksData = res.data.result.fireAlarmForDataScreenList
                }else{
                    if(res.data.result.existNewAlarm){
                        this.$refs.audio.play();
                        for(let arr of res.data.result.fireAlarmForDataScreenList){
                                arr.creationTime = this.deal(arr.creationTime)
                        }
                         this.GetAlarmChecksData = res.data.result.fireAlarmForDataScreenList
                    }
                }
                 this.loading = false;
                
            }).catch(err=>{
                console.log("err",err)
            })
        },
        deal(data){
            var str = data.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        },
        /* 获取当前时间 */
        timeFormate(timeStamp,refreshTime=" ") {
            let year = new Date(timeStamp).getFullYear();
            let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
            let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
            let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
            let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
            let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
            // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
            if(refreshTime == 'GetDeviceStatusForDataScreen'){
                this.refreshTime = year + "-" + month + "-" + date +"  "+hh+":"+mm+":"+ss  ;
            }else if(refreshTime == 'GetFireAlarmForDataScreen'){
                 this.refreshTime2 = year + "-" + month + "-" + date +"  "+hh+":"+mm+":"+ss  ;
            }else if(refreshTime == 'nowMoth_patrol'){
                 this.nowMoth_patrol = year + "-" + month;
            }else if(refreshTime == 'nowMoth_duty'){
                 this.nowMoth_duty = year + "-" + month;
            }else if(refreshTime == 'refreshTime3'){
                 this.refreshTime3 = year + "-" + month + "-" + date +"  "+hh+":"+mm+":"+ss  ;
            }
          
           
            
        },

        //巡查日历显示
         GetPatrollist(){
            let FireUnitId  = localStorage.getItem('fireUnitID')
            this.$axios.get(this.$api.GetPatrollistForCalendar,{params:{FireUnitId,CalendarDate:this.nowMoth_patrol}}).then(res=>{
                // console.log("获取巡查日历",res)
                if(res.data.result.length>0){
                    this.patrolDate  = this.fordata(res.data.result);
                    console.log(" this.dutyDate", this.patrolDate)
                }else{
                    this.patrolDate  = []
                }
            
            }).catch(err=>{
                console.log("获取巡查日历失败",err)
            })
        },
        /* 日历changeMonth */
        changeMonth1(data){
            // console.log("点击日期")
            let newDate = data.slice(0,data.lastIndexOf("/")).split("/")[1] <10?"0"+data.slice(0,data.lastIndexOf("/")).split("/")[1]:data.slice(0,data.lastIndexOf("/")).split("/")[1]
            this.nowMoth_patrol = data.slice(0,data.lastIndexOf("/")).split("/")[0] +"-"+newDate;
            console.log("this.nowMoth_patrol ",this.nowMoth_patrol )
            this.GetPatrollist();
        
        },
        /* 值班记录 */
         GetDutylist(){
        
            let FireUnitId  = localStorage.getItem('fireUnitID');
            this.$axios.get(this.$api.GetDutylistForCalendar,{params:{FireUnitId,CalendarDate:this.nowMoth_duty}}).then(res=>{
                // console.log("获取值班记录日历",res)

                if(res.data.result.length>0){
                    this.dutyDate = this.fordata(res.data.result);
                  
                }else{
                    this.dutyDate  = []
                }
            }).catch(err=>{
                console.log("获取值班记录失败",err)
            })
        },
        /* 值班日历的添加样式 */
        fordata(data){
             let DutyArr = [];
             for (let arr of data) {
                 let newArr2 = new Object();
                 if(arr.status == 1){
                     newArr2.date = arr.creationTime
                     newArr2.className = 'mark1'
                 }else if(arr.status == 2){
                     newArr2.date = arr.creationTime
                     newArr2.className = 'mark2'
                 }else if(arr.status == 3){
                    newArr2.date = arr.creationTime
                    newArr2.className = 'mark3' 
                 }else if(arr.status == 0){
                    newArr2.date = arr.creationTime
                    newArr2.className = '' 
                 }
                   DutyArr.push(newArr2)
             }
           
            DutyArr =   this.noRepeat(DutyArr)
            return DutyArr
            
        },
        /* 日历changeMonth */
        changeMonth2(data){
            let newDate = data.slice(0,data.lastIndexOf("/")).split("/")[1] <10?"0"+data.slice(0,data.lastIndexOf("/")).split("/")[1]:data.slice(0,data.lastIndexOf("/")).split("/")[1] 
            this.nowMoth_duty = data.slice(0,data.lastIndexOf("/")).split("/")[0] +"-"+newDate;
            this.GetDutylist();
        
        },
        /* 筛选日历 */
        noRepeat(arr){
            // 第一层for用来控制循环的次数
            for(var i=0; i<arr.length; i++){
                //第二层for 用于控制与第一层比较的元素
                for(var j=i+1; j<arr.length; j++){
                    //如果相等
                    if(arr[i].date == arr[j].date){
                        if(arr[i].className == arr[j].className){
                            arr.splice(j,1);
                       }else if(arr[i].className== 'mark1' && arr[j].className== 'mark2'){
                            arr.splice(i,1);
                       }else if(arr[i].className== 'mark1' && arr[j].className== 'mark3'){
                            arr.splice(i,1);
                       }else if(arr[i].className== 'mark2' && arr[j].className== 'mark1'){
                           arr.splice(j,1);
                       }else if(arr[i].className== 'mark2' && arr[j].className== 'mark3'){
                            arr.splice(i,1);
                       }else if(arr[i].className== 'mark3' && arr[j].className== 'mark2'){
                            arr.splice(j,1);
                       }else if(arr[i].className== 'mark3' && arr[j].className== 'mark1'){
                           arr.splice(j,1);
                       }
                        //删除后面的 即第 j个位置上的元素  删除个数 1 个
                        
                        // j--很关键的一步  如果删除 程序就会出错 
                        //j--的原因是 每次使用splice删除元素时 返回的是一个新的数组 
                        // 这意味这数组下次遍历是 比较市跳过了一个元素
                        /*
                            例如： 第一次删除后 返回的是 1 1 3 2 1 2 4
                        *  但是第二次遍历是 j的值为2  arr[2] = 3
                        *  相当于跳过一个元素 因此要 j--
                        * */
                        j--;

                    }
    
                }
            }
            return arr;
        },
        /* 最新巡查记录 */
        newPatroRecord(){

            this.timeFormate(new Date(),"nowMoth_patrol");
            this.$axios.get(this.$api.GetPatrolList,
                {params:
                    {
                        FireUnitId :localStorage.getItem('fireUnitID'),
                        PatrolStatus:0,
                        SkipCount:0,
                        MaxResultCount:1
                    }
                }).then(res=>{
                    // console.log("最新巡查记录",res)
                    this.$axios.get(this.$api.GetPatrolInfo,{params:{patrolId:res.data.result.items[0].patrolId}}).then(res2=>{
                        // console.log("最新巡查记录详情",res2);
                        res2.data.result.creationTime = this.deal(res2.data.result.creationTime)
                        this.newPatroRecordata = res2.data.result;
                        if( res2.data.result.patrolDetailList.length>0){
                            for(let arr of res2.data.result.patrolDetailList){
                                arr.creationTime = this.deal( arr.creationTime)
                                for(let x=0;x<arr.patrolPhtosPath.length;x++){
                                    arr.patrolPhtosPath[x] = `${this.$URL}${ arr.patrolPhtosPath[x]}`
                                }
                                if(arr.problemVoiceUrl){
                                    arr.problemVoiceUrl =  `${this.$URL}${arr.problemVoiceUrl}`;
                                    let BenzAMRRecorder = require('benz-amr-recorder');
                                    this.amr = new BenzAMRRecorder();
                                    this.amr.initWithUrl( arr.problemVoiceUrl);
                                }
                        
                            }
                                this.$nextTick(()=>{
                                    this.initBG();
                                })
                        
                        }
                         
                    })
                }).catch(err=>{

            })
        },
        /* 播放语音 */
        play(index){
            // let vioceUrlPath =  `http://fd.sctsjkj.com:5081${this.newPatroRecord_trackList[index].remakeText}`
            let vioceUrlPath =  `${this.$URL}${this.newPatroRecord_trackList[index].remakeText}`
            console.log(vioceUrlPath)
            let BenzAMRRecorder = require('benz-amr-recorder');
            this.amr = new BenzAMRRecorder();
            this.amr.initWithUrl(vioceUrlPath).then(()=> {
                 this.amr.play();
            });
        },
        /*  */
        playVioce(){
            this.policeDetails_amr.play();
            this.policeDetails_amr.onEnded(function() {
               console.log("播放完毕")
            })
        }
    },
    mounted(){
        let that = this;
        this.initEcharts();//设施故障处理情况  
        this.timeFormate(new Date(),"nowMoth_duty")
        this.GetDutylist();//巡查日历
        this.newPatroRecord();//最新巡查记录
        this.GetFireAlarmForDataScreen(true);//火警联网实时达
        this.GetDeviceStatusForDataScreen();//消防物联网状态
        this.GetPatrollist();//巡查日历
         this.setInterval3 =setInterval(() => {
            setTimeout(()=>{
                this.timeFormate(new Date(),"refreshTime3") //时间
            }, 0)
        }, 1000)
        //消防物联网状态每90秒刷新一次
        this.setInterval = setInterval(() => {
            setTimeout(()=>{
                that.GetDeviceStatusForDataScreen()
            }, 0)
        }, 90000)
        // 火警联网实时达每五秒刷新一次
         this.setInterval2 =setInterval(() => {
            setTimeout(()=>{
                that.GetFireAlarmForDataScreen()
            }, 0)
        }, 5000)        
    },
    computed:{
        optionSingleHeightTime() {
            return {
                    singleHeight: 20,
                     waitTime:1000
            }
        }
    },
    beforeDestroy () {
    //    console.log('清除定时器')
       clearInterval(this.setInterval);
       clearInterval(this.setInterval2);
       clearInterval(this.setInterval3);
       this.setInterval = ''
       this.setInterval2 = ''
       this.setInterval3 = ''
    },
}
</script>
<style lang="less">
@divBG : #072041;
.border{
    -webkit-border-image: url("../../assets/image/border.png") 27 round;
    border-image:url("../../assets/image/home/home_img_bg.png") 22 24 repeat stretch;
    border-style: solid;
    border-width: 14px 14px;
}
.border_dialog{
    -webkit-border-image: url("../../assets/image/border.png") 27 round;
    border-image:url("../../assets/image/home/home_img_bg.png") 22 24 repeat stretch;
    border-style: solid;
    border-width: 24px 24px;
}
.border-bottom{
    border-bottom: 1px solid #4360a4;
}
.border-top{
    border-top: 1px solid #4360a4;
}
.topTitle{
    width: 100%;
    display: flex;
    font-size: 16px;
    color: #00ccff;
    justify-content: space-between;
    margin-bottom: 8px;
    img{
        width: 40px;
        height: 19px;  
    }
}
.refreshTime{
    font-size: 12px;
    color: #afc6ff;
    line-height: 2.5
}
/* 主页面 */
#homeContainer{
    // display: flex;
    // flex-direction: column;
    height: 100vh;
    width: 100%;
    .main{
        width: 100%;
        height: 92%;
        // background: rgb(167, 167, 204);
        overflow: hidden;
        padding: 0px 0px 10px 10px;
        box-sizing: border-box;
        display: flex;
        /* 左侧 */
        .left{
            height: 100%;
            .column-gird{
                background: @divBG;
                width: 100%;
                .border();
                box-sizing: border-box;
            }
            /* 上-echarts */
            .top-gird-left{
                width: 100%;
                height: 24%;
                .contentContainer{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    height: 86%;
                    display: flex;
                    box-sizing: border-box;
                    .EchartsBox{
                        width: 50%;
                        height: 160px;
                        #leftEcharts{
                            width: 100%;
                            height:100%;
                        }
                        #rightEcharts{
                            width: 100%;
                            height: 100%;
                        }
                       
                    }
                }
            }
            /* 中-巡查日历 */
            .center-gird-left-pd{
                box-sizing: border-box;
                padding: 6px 0;
                min-height: 304px;
                height:38% ;
                .center-gird-left{
                    height: 100%;
                }
            }
           
            /* 下-值班日历 */
            .bottom-gird-left{
                min-height: 304px;
                height: 38%;
            }
        }
        /* 中间 */
        .medium{
            height: 100%;
            .column-gird{
                .border();
                background: @divBG;
                box-sizing: border-box;
            }
            .top-gird-medium{
                // flex: 2;
                height: 60%;
                // margin-bottom: 6px;
                .green{
                    color: #ff8533;
                }
                .oldTimeRecord{
                    font-size: 12px;
                    color: #afc6ff;
                }
                .realTimeFireAlarm-ul{
                    padding: 10px;
                    font-size:  14px;
                    color: #fefefe;
                    
                    li{
                        padding: 14px 0px;
                        line-height: 2;
                        display: flex;
                        align-items: center;
                        .left_content{
                            display: flex;
                            flex-wrap: wrap;
                            flex: 1;
                            &>p{
                                width: 50%;
                               
                            }
                        }
                        .right_state{
                            width: 80px;
                            a{
                                display: block;
                                cursor: pointer;
                            }
                        }
                        .border-bottom();
                        &:first-child{
                            .border-top();
                        }
                        &.fefefe{
                            color: #fefefe;
                            p{
                                span:nth-of-type(1){
                                   color:#ff8533;
                                }
                            }
                        }
                        &.e8aaeb{
                                color: gray;
                        }
                        a{
                            &.fffc00{
                                color: #ff8533;
                            }
                            &.gray{
                                color: gray;
                            }
                            &.no_del{
                                text-decoration: none;
                                color: gray;
                            }
                        }
                    }
                }
                
            }
            .bottom-gird-medium-pd{
                height: 40%;
                padding-top: 6px;
                box-sizing: border-box;
            }
            .bottom-gird-medium{
               height: 100%;
                .parallelogram_box{
                    width: 100%;
                    height: 80%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    .parallelogram{
                        /*  padding: 20px; */
                        width: 94%;
                        height: 60px;
                        display: flex;
                        background: url('../../assets/image/home/test1.png') no-repeat;
                        background-size: 100% 100%;
                        &:nth-of-type(2){
                            // margin: 14px 0px;
                            background: url('../../assets/image/home/test2.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        &:nth-of-type(3){
                            background: url('../../assets/image/home/test3.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .parallelogram_title{
                            height: 100%;
                            width: 90px;
                            margin-left: 40px;
                            
                            color: #afc6ff;
                            display: flex;
                            align-items: center;
                            padding: 0 14px;
                            box-sizing: border-box;

                        }
                        ul{
                            width: 80%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin-left: 26px;
                            li{
                                width: 80px;
                                border: 1px solid skyblue;
                                color: white;
                                padding: 10px 10px;
                                border-radius: 8px;
                                margin-right: 6px;
                                &.green{
                                    color: rgb(102, 209, 92);
                                }
                                &.gray{
                                    color: rgb(200, 200, 200);
                                }
                                &.yellow{
                                    color: rgb(238, 231, 132);
                                }
                                &.orange{
                                    color: rgb(233, 107, 34);
                                }
                            }

                        }
                    }
                }
                
                
            }
        }
        /* 右边 */
        .right{
            .border();
            box-sizing: border-box;
            height: 100%;
            background: @divBG;
            .dialogContent{
                p{
                    line-height: 2;
                    color: white;
                    span{
                        &.title{
                            font-weight: bold;
                            display: inline-block;
                            width: 100px;
                            font-size: 14px;
                            text-align: left;
                        }
                    }
                    &.summary{
                        color: #a2ecff;
                    }
                }
                .right_details_TrackList{
                    height: 580px;
                    padding: 20px 0px;
                    width:100%;
              
                    .el-scrollbar__wrap{
                        overflow-x: hidden;
                    }
                    .right_details_TrackList_inner{
                        .cricle_container{
                            display: flex;
                            /*  */
                            .right_box_box{
                                width: 390px;
                                padding: 16px;
                                border: solid 1px #4360a4;
                                margin-bottom: 10px;
                                font-size: 12px;
                                color: white;
                                p{
                                    line-height: 2;
                                }
                                .right_box_box_time{
                                    display: flex;
                                    justify-content: space-between;
                                    .status{
                                        font-size: 14px;
                                        &.normal{
                                        color: #1eff00;
                                        }
                                        &.had{
                                        color: #1eff00;
                                        }
                                        &.hading{
                                        color: orange;
                                        }
                                    }
                                }
                                .VoiceRemark{
                                    margin-top: 20px;
                                    .remark{
                                        font-size: 16px;
                                    }
                                    .audio{
                                        width: 80px;
                                        height: 30px;
                                        background: #54b954;
                                        border-radius: 10px;
                                        display: flex;
                                        align-items: center;
                                        color: white;
                                        padding: 0px 6px;
                                        cursor: pointer;
                                        .voice{
                                            margin-right: 10px;
                                        }
                                    }
                                }
                                .right_box_box_Img{
                                    display: flex;
                                    margin-top: 12px;
                                    img{
                                        width: 100px;
                                        height: 100px;
                                        &:nth-of-type(2){
                                            margin: 0px 40px;
                                        }
                                    }
                                }
                            }
                            /*  */
                            .left_cricle_box{
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                position: relative;
                                width: 40px;
                                .cricle{
                                    width: 14px;
                                    height: 14px;
                                    border-radius: 50%;
                                    background-color: #00baff;
                                }
                                .line{
                                    width: 1px;
                                    height: 190px;
                                    background-color: #00baff;
                                    position: absolute;
                                    top: 102px;
                                }

                            }
                        }

                        &:last-of-type .line{
                            height: 0px !important;
                        }

                    }

                }
            
            }
        }
    }

    /* 日历修改 */
      .wh_container[data-v-2ebcbc83]{
        background:transparent;
        max-width: 510px !important;
        .wh_content_all{
                background: #072041;
              border-radius: 8px;
            .wh_top_changge[data-v-2ebcbc83]{
              background-color: #385093;
               height: 28px;
                li[data-v-2ebcbc83]{
                    height: 28px;
                    font-size: 12px;
                }
            .wh_jiantou1[data-v-2ebcbc83]{
                border-top: 2px solid #aac6ff;
                border-left: 2px solid #aac6ff;
            }
            .wh_content_li[data-v-2ebcbc83]{
                font-size: 14px;
                color: #fff;
            }
            .wh_jiantou2{
                border-top: 2px solid #aac6ff;
                border-right: 2px solid #aac6ff;
            }
            }
            /* 日期头 */
            .wh_content[data-v-2ebcbc83]{
            padding: 0px;
            justify-content: space-between;
            .wh_content_item{
            border: solid 1px #385093;
            height: 28px;
            .wh_top_tag,.wh_item_date{
                height: 28px;
                line-height: 28px;
                text-align: center;
                margin: 0px;
                width: 100%;
            }
            .wh_item_date{
                &:hover{
                background-color: #385093;
                }
            }
            .wh_other_dayhide{
                color: #5571c1;
            }
            .wh_isToday{
                background: transparent;
                border-radius: 0px;
            }
            .wh_chose_day{
                background-color: #385093;
                border-radius:0px;
            }
            }
            
            }

            /* 标记 */
            .mark1{
            background: url("../../assets/image/home/home_img_08.png") no-repeat !important;
            background-position: bottom right !important;
            background-size: 16px 16px !important;
            }
            .mark2{
                background: url("../../assets/image/home/home_img_09.png") no-repeat !important;
                background-position: bottom right !important;
                background-size: 16px 16px !important;
            }
            .mark3{
                background: url("../../assets/image/home/home_img_10.png") no-repeat !important;
                background-position: bottom right !important;
                background-size: 16px 16px!important;
            }
        }

      }

    /* 弹窗 */
    .el-dialog{
        .border_dialog();
        position: relative;
        background: @divBG;
        .el-dialog__headerbtn .el-dialog__close{
            display: inline-block;
            width: 50px;
            height: 50px;
            color: transparent;
            background: url("../../assets/image/home/dialog_btn_close.png");
            position: absolute;
            top: -50px;
            right: -50px;
        }
        .el-dialog__header{
            height: 70px;
            padding: 0px;
            background: url("../../assets/image/home/dialog_bg.png") no-repeat;
            background-position: center center;
            .el-dialog__title{
                color: #fefefe;
                font-size: 22px;
                line-height: 70px;
                text-align: center;
                width: 100%;
                display: inline-block;
            }
        }
        .el-dialog__body{
                padding: 0px;
                display: flex;
                height: 450px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                   .bg{
                        background: #455b8f;  
                        background: linear-gradient(to right,#455b8f, #182848 );
                        border-radius: 4px;
                        border: 1px solid #1d3561;
                        width: 50%;
                        height: 100%;
                   }
                    .top{
                            height: 40px;
                            border-bottom: 1px solid #1d3561;
                            background: #4b6cb7;  
                            background: linear-gradient(to right,#4b6cb7, #182848 );

                    }
                    .el-form{
                        width: 50%;
                        height: 80% !important;
                        padding: 20px;
                        height: inherit;
                        border: 1px solid darkblue;
                        box-shadow: 0 2px 12px 0 #29d;
                        .el-form-item{
                            .el-form-item__label{
                                font-size: 16px;
                                color: white;
                            }
                            .el-form-item__content{
                                .el-radio-group{
                                    .el-radio__label{
                                    color: white;
                                    }
                                }
                                .el-textarea__inner{
                                    background: #025691;
                                    color: white;
                                    resize: none;
                                }
                            }
                        }
                        .truePolice{
                            margin-bottom: 10px;
                            margin-left: 102px;
                        }
                        .el-button{
                            width: 100%;
                            background: #025691;
                            color: #cccccc;
                        }
                    }
                    

                
                .detailsBox{
                    width: 70%;
                    padding: 40px 20px;
                    border: 1px solid darkblue;
                    box-shadow: 0 2px 12px 0 #29d;
                    color: white;
                    font-size: 16px;
                    height: fit-content;
                    p{
                        line-height: 2;
                    }
                    .vioceUrl{
                        width: 100px;
                        height: 30px;
                        border-radius: 8px;
                        background-color: #6ff255;
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        img{
                            width: 20px;
                            height: 20px;
                        }
                        span{
                        font-size: 16px;
                        color: #262626;
                        cursor: pointer;
                        }
                    }

                }   
                
               
        }
        &.fireMap{
            height: 80%;
            .el-dialog__header{
                height: 0px;
            }
            .el-dialog__body{
                height: 100%;
                #fireBit{
                    width: 94%;
                    height: 100%;
                    position: relative; 
                    cursor: pointer;
                    .noData{
                        color: white;
                        font-size: 20px;
                        text-align: center;
                    }
                    #markerLayer{
                        position: relative;
                        img{
                            width: 20px;
                            height: 20px;
                        }
                        .ss{
                            background: rgb(255, 255, 255);
                            padding: 10px;
                            border-radius: 6px;

                        } 
                    }
                  
             
                }
            }
        }
    }


    .nodata{
        color: white;
        text-align: center;
    }

   

}
</style>

