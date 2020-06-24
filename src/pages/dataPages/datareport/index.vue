<template>
    <div ref="dataReportBox" id="dataReportBox" class="dataReportBox">
        <div class="top display">
            <div class="top_left">
                智慧消防数据综合报告 
                <el-button type="success" @click="dayin">打印</el-button>
            </div>
            <div class="top_right display">
                <div class="block">
                    <span>日期：</span>
                    <el-date-picker
                    v-model="timeData"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button @click="select" type="primary">查询</el-button>
                </div>
                <a href="#" @click="perWeek">查询上周</a>
                <a href="#" @click="perMonth">查询上月</a>
            </div>
        </div>
        <div 
        class="dataBlock"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-scrollbar style="height:100%">
                <el-collapse v-model="activeNames" >
                    <el-collapse-item title="设施设备数据" name="1">
                        <el-collapse v-model="activeNames" class="two">
                            <el-collapse-item 
                                v-for="(arr,index) in collapseIemsOne" 
                                :key="index"
                                :name="arr.name"
                                :disabled="arr.disabled"
                            >
                            <template slot="title">
                                <div class="titlebox display">
                                    <span>{{arr.title}}</span>
                                    <i v-if="arr.disabled" >暂无数据</i>
                                </div>
                                
                            </template>
                            <div class="content">
                                <div> 
                                    <p class="content_title"> <span> ◆</span>当前数据</p>
                                    <p :class="arr.title =='其他消防设施' ?'pdb':'' " v-html="arr.data.nowData"></p>
                                </div>
                                <div v-if="arr.title != '其他消防设施'"> 
                                    <p class="content_title"><span> ◆</span>事件数据（{{content_title_time}}） </p>
                                    <p style="padding-bottom: 20px;" v-html="arr.data.eventData"></p>
                                </div>
                            </div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-collapse-item>
                    <el-collapse-item title="人工作业数据" name="2">
                            <div class="content">
                                <div> 
                                    <p class="content_title"> <span> ◆</span>当前数据</p>
                                    <p v-html="personData.nowData"></p>
                                </div>
                                <div> 
                                    <p class="content_title"><span> ◆</span>事件数据（{{content_title_time}}）</p>
                                    <p style="padding-bottom: 20px;" v-html="personData.eventData"></p>
                                </div>
                            </div>
                    </el-collapse-item>
                </el-collapse>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
let moment = require("moment");
export default {
    data(){
        return{
            loading:false,
            timeData:[],
            activeNames: ['1'],
            collapseIemsOne:[
                {
                    name:'1_1',
                    title:'火灾自动报警联网设施',
                    disabled:false,
                    data:''
                },
                {
                    name:'1_2',
                    title:'独立式火警联网设施',
                    disabled:false,
                    data:''
                },
                {
                    name:'1_3',
                    title:'电气火灾防护设施',
                    disabled:false,
                    data:''
                },
                {
                    name:'1_4',
                    title:'消防管网远程监控设施',
                    disabled:false,
                    data:''
                },
                {
                    name:'1_5',
                    title:'AI智能分析设施',
                    disabled:false,
                    data:''
                },
                {
                    name:'1_6',
                    title:'其他消防设施',
                    disabled:false,
                    data:''
                }
            ],
            personData:'',
            infos:{
                fireUnitId:localStorage.getItem('fireUnitID'),
                // fireUnitId:2,
                beginDate:'',
                endDate:'',
            },
            content_title_time:"",
            lastweekstartDate:'',//上一周第一天
            lastweekendDate:'',//上一周最后一天
            lastmonthstartDate:'',//上一个月第一天
            lastmonthendDate:'',//上一个月最后一天

        }
    },
    created(){
        // // this.GetFireUnitReport();
        // this.infos.beginDate = this.getNowTime();
        // this.infos.endDate = this.getNowTime();
        // this.timeData=[this.getNowTime(),this.getNowTime()];
        // this.setFirstDate(new Date())

        ///默认显示数据时间是上一周
        this.perWeek();
    },
    methods: {
        GetFireUnitReport(){
            this.loading = true;
            this.$axios.get(this.$api.GetFireUnitReport,{params:this.infos}).then(res=>{
                // console.log("请求结果",res);
                this.loading = false;
                this.content_title_time = res.data.result.dateRange
                let listDeviceData = res.data.result.listDeviceData;
                this.personData = res.data.result.personData;
                for(let x = 0;x<this.collapseIemsOne.length;x++){
                    if(listDeviceData[x].deviceData){
                        this.collapseIemsOne[x].data = listDeviceData[x].deviceData
                    }else{
                        this.collapseIemsOne[x].disabled = true
                    }
                }
                this.activeNames = ['1','2'];//调用钱展开所有节点
                for(let arr of this.collapseIemsOne){
                    if(!arr.disabled){
                        this.activeNames.push(arr.name)
                    }
                }
                // console.log("this.collapseIemsOne",this.collapseIemsOne)
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取当前日期
        getNowTime(){
            let timeDate = new Date();
            let year = timeDate.getFullYear();//得到年份
            let moth = timeDate.getMonth()+1 <10 ? '0'+(timeDate.getMonth()+1) : timeDate.getMonth()+1; //得到月份
            let date = timeDate.getDate()<10 ?  '0'+timeDate.getDate() : timeDate.getDate(); //得到日期
            let time = year +'-'+moth +'-'+date
            return time  //把时间抛出去
        },
        //获取前一天
        getpreTime(){
            let timeDate = new Date();
            var preDate = new Date(timeDate.getTime() - 24*60*60*1000); 
            let year = preDate.getFullYear();//得到年份
            let moth = preDate.getMonth()+1 <10 ? '0'+(preDate.getMonth()+1) : preDate.getMonth()+1; //得到月份
            let date = preDate.getDate()<10 ?  '0'+preDate.getDate() : preDate.getDate(); //得到日期
            let time = year +'-'+moth +'-'+date
            // console.log("time",time)
            return time  //把时间抛出去
        },
        //选择日期查询
        select(){
            this.infos.beginDate = this.timeData[0]
            this.infos.endDate =  this.timeData[1];
            this.GetFireUnitReport()
        },
        //上一周
        perWeek(){
            // let testday = this.$moment.weekday(-7).format('YYYY-MM-DD'); // 上个星期一
            // console.log("testday",testday)
            this.lastweekstartDate = moment().week(moment().week() - 1).startOf('week').add(1,'days').format('YYYY-MM-DD');
            this.lastweekendDate = moment().week(moment().week() - 1).endOf('week').add(1,'days').format('YYYY-MM-DD');
            this.timeData=[ this.lastweekstartDate,this.lastweekendDate];
            // console.log("timeData",this.timeData)
            this.infos.beginDate =  this.lastweekstartDate
            this.infos.endDate =  this.lastweekendDate
            this.GetFireUnitReport();
        },
        //上一一个月
        perMonth(){
            this.lastmonthstartDate = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD');
            this.lastmonthendDate = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD');
            this.timeData=[ this.lastmonthstartDate,this.lastmonthendDate];
            // console.log("timeData",this.timeData)
            this.infos.beginDate =  this.lastmonthstartDate
            this.infos.endDate =  this.lastmonthendDate
            this.GetFireUnitReport();
        },
        //打印按钮
        dayin(){

            // this.activeNames = ['1','2'];//调用钱展开所有节点
            //     for(let arr of this.collapseIemsOne){
            //         if(!arr.disabled){
            //             this.activeNames.push(arr.name)
            //         }
            //     }

            //方式一
            /* let head = document.getElementById('baseHeaderContainer');
            let elaside = document.getElementsByClassName('el-aside')[0];
            let top = document.getElementsByClassName('top')[0];
            let dataBlock = document.getElementsByClassName('dataBlock')[0];
            //  给对应DOM添加class
            head.classList.add("printHideCss")
            elaside.classList.add("printHideCss")
            top.classList.add("printHideCss")
            dataBlock.style.cssText="max-height:100%"

            //创建一个表头
            let topdiv = `<div class="topdiv"><span class="title">防火单位智慧消防数据综合报告</span><span class="time">${this.infos.beginDate}至${this.infos.endDate}</span></div>`
            $('#dataReportBox').prepend(topdiv); //将新创建的div节点插入到nav容器的内容顶部
            window.print(); */



            //方式二
            let dataReportBox =  document.getElementById('dataReportBox');
            let top = document.getElementsByClassName('top')[0];
            
            dataReportBox.removeChild(top);
            let topdiv = `<div class="topdiv"><span class="title">防火单位智慧消防数据综合报告</span><span class="time">${this.infos.beginDate}至${this.infos.endDate}</span></div>`
            $('#dataReportBox').prepend(topdiv); //将新创建的div节点插入到nav容器的内容顶部

            let printHtml = document.getElementById('dataReportBox').innerHTML
            window.document.body.innerHTML = printHtml;
            // this.remove_ie_header_and_footer();
            // this.print()
            window.print();
            window.location.reload();
        },
        print(){
            setTimeout(()=>{
                window.print();
                window.location.reload();
            })
        },
        //删除页眉和页脚
        remove_ie_header_and_footer(){
				var hkey_path;
				hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
				try {
					var RegWsh = new ActiveXObject("WScript.Shell");
					RegWsh.RegWrite(hkey_path + "header", "");
					RegWsh.RegWrite(hkey_path + "footer", "");
				} catch(e) {

                }
        }
    }
}
</script>

<style lang="less">
    .printHideCss{
        display: none !important;
        visibility: hidden;
    }
    .topdiv{
        width: 100%;
        text-align: center;
        .title{
            font-size: 20px;
            font-weight: bold;
        }
        .time{
            font-size: 14px;
        }
    }
    /*打印高度的设置*/
    @media print {
        html, body {
            height: 100%;
        }
        #dataReportBox {
            height: 100%;
        }
    }
    .dataReportBox{
        height: 100%;
        display: flex;
        flex-direction: column;
        .display{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .top{
            color: white;
            .top_left{
                font-size: 18px;
            }
            a{
                // color: rgb(78, 189, 115);
                color:  #167fc1;
            }
            a:nth-of-type(1){
                margin: 0px 20px;
            }
        }
        .dataBlock{
            // width: 100%;
            background:rgba(232, 247, 255, 1);
            flex: 2 0 auto;
            margin-top: 20px;
            padding: 20px;
            max-height: 680px;
            // height: auto;
            // height: ~"calc(100% - 50px)";
            .el-collapse{
                .el-collapse-item__header{
                    background: rgb(38, 88, 47);
                    // background:#1d477b ;
                    color: rgb(255, 255, 255);
                    padding: 0 20px;
                    font-size: 18px;
                }
                .el-collapse-item__content{
                    padding-bottom: 0px;
                }
                .content{
                     padding: 0 20px;
                     font-size: 14px;
                     .pdb{
                         padding-bottom: 20px;
                     }
                     color: black;
                     .content_title{
                         display: flex;
                         align-items: center;
                         span{
                             font-size: 36px;
                         }
                     }
                }
                .two{
                    .el-collapse-item__header{
                        background: rgb(111, 187, 125);
                        // background: #167fc1;
                        color: black;
                        font-weight: bold;
                        font-size: 16px;
                        padding: 0 20px;
                        .titlebox{
                            width: 100%;
                        }
                    }
                  
                }
            }
        }
    }
</style>