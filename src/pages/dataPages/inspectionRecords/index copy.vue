<style lang="less">
.right_details_border{
    border-bottom: 1px solid  #025691;
}
.right_details_pd{
    padding: 30px 20px;
}
.inspectionRecords{
    display: flex;
    .left_calendar{
        width: 1100px;
        height:700px ;
        .total_data{
            color: #a2ecff;
            font-size: 14px;
            height: 50px;
            line-height: 50px;
            border-bottom: #385093 1px solid;
            margin-bottom: 50px;
        }

    }
    .right_details{
        width: 466px;
        height: 760px;
        margin-left: 100px;
        background-color: #10315b;
        border-radius: 5px;
        .right_details_title{
            font-size: 18px;
            color: #fff;
            height: 56px;
            line-height: 56px;
            text-align: center;
            .right_details_border();

        }
        .right_details_center{
            .right_details_pd();
            p{
                font-size: 14px;
                color: #fff;
                line-height: 2.5;
            }
             .right_details_TrajectoryPoint{
                &>p{
                    line-height: 2;
                    font-size: 14px;
                    color: #a2ecff;
                }
           

            }
            .right_details_TrackList{
                height: 480px;
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
                            width: 310px;
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
                            .right_box_box_patrolAddress{
                               display: flex;
                               align-items: center;
                                .remark{
                                    margin-left: 20px;

                                }
                                .audio{
                                    width: 100px;
                                    height: 22px;
                                    background-color: #6ff255;
                                    border-radius: 3px;
                                    display: flex;
                                    align-items: center;
                                    font-size: 12px;
                                    color: #262626;
                                    padding: 0px 6px;
                                    margin-left: 20px;
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
                                    height: 56px;
                                    &:nth-of-type(2){
                                        margin: 0px 4px;
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
            .right_details_TrackList_noData{
                font-size: 16px;
                text-align: center;
                padding-top: 20px;
                color: white;
            }
        }
        .noData{
            color: white;
            text-align: center;
            height: 60px;
            line-height: 60px;
        }
       
    }
}

</style>
<template>
    <div class="inspectionRecords">
        <div class="left_calendar">
            <p class="total_data">
               共{{patrolCount}}条巡查记录，发现{{proplemCount}}个问题，现场解决{{liveSolutionCount}}个问题
            </p>
              <base-calendar @changeMonth="changeMonth" @clickDay="clickDay" :markDatearr=arr ></base-calendar>
        </div>
        <div class="right_details">
            <p class="right_details_title">记录详情</p>
            <div v-if="patrolInfo_creationTime" class="right_details_center">
                <p>提交时间：<span>{{patrolInfo_creationTime}}</span></p>
                <p>值班人员：<span>{{patrolInfo_patrolUser}}</span></p>
                <p>巡查方式:<span>{{patrolInfo_patrolType}}</span></p>
                <div class="right_details_TrajectoryPoint">
                    <p class="right_details_TrajectoryPoint_summary">有效轨迹点{{patrolInfo_trackCount}}个，发现{{patrolInfo_problemCount}}个问题，现场解决{{patrolInfo_resolvedConut}}个问题</p>
                </div>
                <div class="right_details_TrackList" v-if=" patrolInfo_trackList.length>0">
                     <el-scrollbar style="height:100%">
                        <div class="right_details_TrackList_inner" v-for="(arr,index) in  patrolInfo_trackList" :key="index">
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
                                    <p class="right_box_box_fireSystemName">{{arr.fireSystemName}}等{{arr.fireSystemCount}}个系统</p>
                                    <div class="right_box_box_patrolAddress">
                                        <span>{{arr.patrolAddress}}</span>
                                        <span class="remark" v-if="arr.problemRemakeType == 1">{{arr.remakeText}}</span>
                                        <div v-if="arr.problemRemakeType == 2" class="audio" @click="play(index)">
                                            <img class="voice" src="../../../assets/image/index/voice.png" alt="">
                                            <span class="time">点击播放</span>
                                        </div>
                                    </div>
                                    <div class="right_box_box_Img">
                                        <viewer :images="arr.patrolPhotosPath">
                                            <img v-for="(img,imgIndex) in arr.patrolPhotosPath"  :key="imgIndex" :src="`http://fd.sctsjkj.com:5081${img}`" alt="">
                                        </viewer>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </el-scrollbar>
                </div>
                <div v-else class="right_details_TrackList_noData">
                    暂无巡查轨迹点
                </div>
            </div>
            <div class="noData" v-else>
                当天日期暂无记录
            </div>
        </div>
    </div>
</template>
<script>
let FireUnitId = localStorage.getItem('fireUnitID')
import baseCalendar from '../../../components/baseCalendar/index'
let BenzAMRRecorder = require('benz-amr-recorder');
export default {
   components:{
       baseCalendar
   },
    data(){
        return{
            test:[1,2,3],
             arr:[],
             nowMoth_patrol:'',//月份
             liveSolutionCount:0,
             patrolCount:0,
             proplemCount:0,
             /*  */
            patrolInfo_creationTime :'',
            patrolInfo_patrolUser   :'',
            patrolInfo_patrolType   :'',
            patrolInfo_trackCount   :'',
            patrolInfo_problemCount :'',
            patrolInfo_resolvedConut:'',
            patrolInfo_trackList    :'',
            /*  */
            amr:'',
            Duration:0,
            Duration1:0
        }
    },
    methods:{
        /*  */
         initBG(){
            var  element =  document.getElementsByClassName('left_cricle_box')
            var last = element.length-1
            element[last].style.height = 0+"px";
            var box = document.getElementsByClassName('right_box_box')
            var last_box = box.length-1;
            var one_height = box[0].clientHeight+12+'px'
            var postionheight =parseInt(one_height) /2 +'px'
            var last_height = box[last_box].clientHeight+12+'px'
            var postionheight_last =parseInt(last_height) /2 +'px'
            for( var i = 0;i<element.length;i++){
                    element[i].style.height = 'auto'
                    element[i].style.background  = "url('../../../static/two_bg.png')"
                    element[i].style.backgroundPosition = 'center'
                    element[i].style.backgroundRepeat = 'no-repeat'
            }
            // element[0].style.height = one_height
            element[0].style.background  = "url('../../../static/one_bg.png')"
            element[0].style.backgroundPosition = `center ${postionheight}`
            element[0].style.backgroundRepeat = 'no-repeat'
            element[last].style.height = postionheight_last
            element[last].style.background  = "url('../../../static/three.png')"
            element[last].style.backgroundRepeat = 'no-repeat'
            element[last].style.backgroundPosition = `center bottom`
       
          
        },
        /* 获取当月 */
        timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
            let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
            let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
            let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
            let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
            // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
            this.nowMoth_patrol = year + "-" + month;
        },
         /* 请求页面初始化数据 */
        patrolRecord(){
            let that = this; 
            let patrolArr  = [];
            this.$axios({
                method:'get',
                url:that.$api.GetPatrollistForWeb,
                params:{
                    FireUnitId,
                    Moth:that.nowMoth_patrol
                }
            }).then(res=>{
                console.log("初始数据巡查日历成功",res)
                if(res.data.result.length<=0){
                    return
                }
                for(let arr of res.data.result){
                    let patrolNewArr = new Object();
                    patrolNewArr.date = arr.creationTime
                    if(arr.patrolStatus == 1){
                        patrolNewArr.className = 'mark1'
                    }else if(arr.patrolStatus == 2){
                        patrolNewArr.className = 'mark2'
                    }else if(arr.patrolStatus == 3){
                          patrolNewArr.className = 'mark3'
                    }else if(arr.patrolStatus == 0){
                        patrolNewArr.className = 'mark1'
                    }

                  patrolArr.push(patrolNewArr)
                 
                }
                if(patrolArr[patrolArr.length-1].className == 'mark1'){
                    patrolArr[patrolArr.length-1].className ="lastMark1"
                }else if(patrolArr[patrolArr.length-1].className == 'mark2'){
                      patrolArr[patrolArr.length-1].className ="lastMark2"
                }else if(patrolArr[patrolArr.length-1].className == 'mark3'){
                      patrolArr[patrolArr.length-1].className ="lastMark3"
                }
                
                console.log("添加日期后的数据", patrolArr)
                that.arr = patrolArr
                that.patrolInfo(that.arr[that.arr.length-1].date)
            }).catch(res=>{
                console.log('初始化巡查日历数据失败',res)
            })
        },
        /* change月份 */
        changeMonth(date){
             console.log("打印选择月份",date)
            let newDate = date.slice(0,date.lastIndexOf("/")).split("/")
            this.nowMoth_patrol = newDate[0]+"-"+newDate[1];
            this.patrolRecord();

        },
        /* 点击日期 */
        clickDay(date){
            this.patrolInfo(date)
        },
        /* 获取总数 */
        patrolTotal(){
            let that = this;
            this.$axios({
                method:'get',
                url:that.$api.GetPatrolTotal,
                params:{
                    FireUnitId
                }
            }).then(res=>{
                console.log("获取总数",res)
                that.liveSolutionCount = res.data.result.liveSolutionCount
                that.patrolCount = res.data.result.patrolCount
                that.proplemCount = res.data.result.proplemCount
            }).catch(res=>{
                 console.log("获取总数失败",res)
            })
        },
        /* 处理重复数据 */
        noRepeat1(arr){
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
                        j--;

                    }
    
                }
            }
            return arr;
        },
        /* 获取巡查记录轨迹详情 */
        patrolInfo(date){
            let that = this;
            this.$axios({
                method:'get',
                url:that.$api.GetPatrolInfoForWeb,
                params:{
                    FireUnitId,
                    date 
                }
            }).then(res=>{
                console.log("获取巡查记录轨迹详情成功",res)
                if(res.data.result){
                    that.patrolInfo_creationTime = res.data.result.creationTime
                    that.patrolInfo_patrolUser = res.data.result.patrolUser
                    that.patrolInfo_patrolType  = res.data.result.patrolType
                    that.patrolInfo_trackCount = res.data.result.trackCount
                    that.patrolInfo_problemCount  = res.data.result.problemCount
                    that.patrolInfo_resolvedConut  = res.data.result.resolvedConut    
                    that.patrolInfo_trackList =  res.data.result.trackList
                    if( res.data.result.trackList.length>0){
                          this.$nextTick(()=>{
                            this.initBG();
                          })
                         
                    }
                }else{
                     that.patrolInfo_creationTime = ''
                }
               
            }).catch(res=>{
                 console.log("获取巡查记录轨迹详情失败",res)
            })
        },
        /* 播放音频 */
        play(index){
            let amr = new BenzAMRRecorder();
            // let  vioceUrlPath =  `http://fd.sctsjkj.com:5081${this.patrolInfo_trackList[index].remakeText}`
            let  vioceUrlPath =  `${this.$URL}${this.patrolInfo_trackList[index].remakeText}`
            amr.initWithUrl(vioceUrlPath).then(()=> {
                amr.play();
            });
           /*   ;
                *///此时可以获取到duration
        },
        forVoice(arr){
            arr.map((value,index,arr)=>{
                if(value.problemRemakeType == 2){
                    // value.vioceUrlPath =  `http://fd.sctsjkj.com:5081${value.remakeText}`
                    value.vioceUrlPath =  `${this.$URL}${value.remakeText}`
                    value.amr = new BenzAMRRecorder();
                    value.amr.initWithUrl(value.vioceUrlPath).then(()=> {
                        value.duration =  value.amr.getDuration();
                    });
                } 
            })

            return value
        }

    },
    mounted(){
        this.timeFormate(new Date())
        this.patrolRecord();
        this.patrolTotal();
    }
}
</script>

