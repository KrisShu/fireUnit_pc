<style lang="less">
.right_details_border{
    border-bottom: 1px solid  #025691;
}
.right_details_pd{
    padding: 30px 20px;
}
.dutyRecord{
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
        .noData{
            color: white;
            text-align: center;
            height: 60px;
            line-height: 60px;
        }
        .el-scrollbar__wrap{
            overflow-x: hidden;
        }
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
            .img_box{
                margin-top: 30px;
                display: flex;
                img{
                    width: 102px;
                    height: 66px;
                    margin-right: 20px;
                }
            }
        }
        .right_details_problem{
            .right_details_border();
            font-size: 14px;
            color: #fff;
            .right_details_pd();
            p{
                 line-height: 2;
            }
            .right_details_problem_ImgBox{
                margin-top: 30px;
                display: flex;
                img{
                    width: 102px;
                    height: 66px;
                    margin-right: 20px;
                }
            }
           

        }
    }
}
</style>
<template>
    <div class="dutyRecord">
        <div class="left_calendar">
            <p class="total_data">
                共278条值班记录，发现36个问题，现场解决28个问题
            </p>
              <base-calendar @clickDay="clickDay" @changeMonth="changeMonth" :markDatearr=arr ></base-calendar>
        </div>
        <div class="right_details">
             <el-scrollbar style="height:100%">
                <p class="right_details_title">记录详情</p>

                <ul class="right_details_content" v-if="dutyInfoData.length>0">
                    <li v-for="(arr,index) in dutyInfoData" :key="index">
                        <div class="right_details_center">
                            <p>提交时间：<span>{{arr.creationTime}}</span></p>
                            <p>值班人员：<span>{{arr.dutyUser}}</span></p>
                            <p v-if="arr.dutyStatus == 1">发现问题：<span > 否（未发现问题）</span></p>
                            <p v-if="arr.dutyStatus == 2">发现问题：<span > 是（发现问题，已现场解决）</span></p>
                            <p v-if="arr.dutyStatus == 3">发现问题：<span > 是（发现问题，未能现场解决，已自动提交故障处理单）</span></p>
                            <p>值班记录：</p>
                            <div class="img_box">
                                <viewer v-if="arr.dutyPhtosPath.length>0" :images="arr.dutyPhtosPath">
                                <img v-for="(img,Imgindex) in arr.dutyPhtosPath" :key="Imgindex"  :src="`http://fd.sctsjkj.com:5081${img}`" alt="">
                                </viewer>
                                <p v-else>暂无值班记录</p>
                            </div>
                    
                        </div>
                        <div class="right_details_problem">
                            <p>问题描述：</p>
                            <p v-if="arr.dutyRemark" class="right_details_problem_decribe">
                                {{arr.dutyRemark}}
                            </p>
                            <p v-else>
                                暂无问题描述
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="noData" v-else>
                    当天没有巡查记录
                </div>
            </el-scrollbar>
           
        </div>
      
    </div>
</template>
<script>
let FireUnitId = localStorage.getItem('fireUnitID')

import baseCalendar from '../../../components/baseCalendar/index'
export default {
   components:{
       baseCalendar
   },
    data(){
        return{
            nowMoth_duty:0,//当前月份
            arr:[],//标记数据
            dutyInfoData:[],//详情数据
            totalcount:[]
        }
    },
    methods:{
        //获取值班记录总统计
        GetDutyStateTotal(){
            this.$axios.get(this.$api.GetDutyStateTotal,{params:{FireUnitId,CalendarDate:this.nowMoth_duty}}).then(res=>{
                console.log("打印获取值班记录总统计",res)
                this.totalcount = re.data.result
            }).catch(err=>{
                console.log("打印获取值班记录总统计",err)
            })
        },
        timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
            let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
            let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
            let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
            let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
            // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
            this.nowMoth_duty = year + "-" + month;
            
        },
        clickDay(date){
            console.log("打印选择日期",date)
            this.dutyInfo(FireUnitId,date)
        },
        changeMonth(date){
            console.log("打印选择月份",date)
            let newDate = date.slice(0,date.lastIndexOf("/")).split("/")
            this.nowMoth_duty = newDate[0]+"-"+newDate[1];
            this.dutyRecord();
        },
        /* 请求页面初始化数据 */
        dutyRecord(){
            this.$axios.get(this.$api.GetDutylistForCalendar,{params:{FireUnitId,CalendarDate:this.nowMoth_duty}}).then(res=>{
                console.log("初始数据值班日历成功",res)
                if(res.data.result.length<=0){
                    return
                }

                this.arr = this.fordata(res.data.result);
                let index = this.arr.length-1;
                // this.dutyInfo(FireUnitId,this.arr[index].date);

            }).catch(err=>{

            })   
        },
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
            //设置默认选中样式
            if(DutyArr[DutyArr.length-1].className == 'mark1'){
                DutyArr[DutyArr.length-1].className ="lastMark1"
            }else if(DutyArr[DutyArr.length-1].className == 'mark2'){
                    DutyArr[DutyArr.length-1].className ="lastMark2"
            }else if(DutyArr[DutyArr.length-1].className == 'mark3'){
                    DutyArr[DutyArr.length-1].className ="lastMark3"
            }
           
            return DutyArr
            
        },
        /* 筛选日历 */
        noRepeat(arr){
            for(var i=0; i<arr.length; i++){
                for(var j=i+1; j<arr.length; j++){
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

        dutyInfo(FireUnitId,date){
           /*  let that = this;
            this.$axios({
                method:'get',
                url:that.$api.GetDutyInfoForWeb,
                params:{
                    FireUnitId,
                    date:date
                }
            }).then(res=>{
                console.log("打印值班详情成功",res)
                that.dutyInfoData = res.data.result;
            }).catch(res=>{
                console.log("打印值班详情失败",res)
            }) */
            this.$axios.get(this.$api.GetDutyInfo,{params:{FireUnitId,date:date}})
        },

         /* 处理重复数据 */
     
    },
    mounted(){
        this.timeFormate(new Date());
        this.dutyRecord();
        this.GetDutyStateTotal();
       
        /*  */

    }
}
</script>

