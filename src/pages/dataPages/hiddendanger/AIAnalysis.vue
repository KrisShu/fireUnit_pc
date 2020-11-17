<template>
  <div class="AIAnalysis">
        <div class="topStatus">
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
        @showdetails="showdetails"
        @pageChange="prev_next"
        specailText="查看"
      >
      
      </baseTable>
      
      <baseDialog title="现场图片" ref="baseDialog">
            <img class="monitorPicture" :src="monitorPicture" alt="">
      </baseDialog>


       
  </div>
</template>

<script>
import baseTable from '../../../components/baseTable/index'
import baseDialog from '../../../components/baseDialog/index'
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
                    type:'warning',
                    text:'室外通道',
                    num:0
                },
                {
                    type:'danger',
                    text:'室内通道',
                    num:0
                },
                {
                    type:'warning',
                    text:'火焰烟雾',
                    num:0
                }
            ],
            screensign:"全部",
            loading:false,
            tableData:[],
            tableThead:[
                {
                    name:'报警时间',
                    prop:'creationTime',
                },
                {
                    name:'警情类型',
                    prop:'visionAlarmType',
                },
                {
                    name:'摄像编号',
                    prop:'monitorSN',
                },
                {
                    name:'监控地点',
                    prop:'monitorAddress'
                },
                {
                    name:'报警图片',
                    
                },
                {
                    name:'解除警情时间',
                    prop:'relieveTime',
                },
            ],
            totalCount:0,
            page:{
                FireUnitId :localStorage.getItem('fireUnitID'),
                VisionAlarmType:0,
                SkipCount:0,
                MaxResultCount:10
            },
          
            monitorPicture: ''
        }
    },
    created(){
        this.GetVisionAlarmList_Vision();
        this.GetVisionAlarmTypeNum();
    },
    methods:{
        GetVisionAlarmList_Vision(){
           
            this.$axios.get(this.$api.GetVisionAlarmList_Vision,{params:this.page}).then(res=>{
                console.log("GetVisionAlarmList_Vision",res);
                for(let arr of res.data.result.items){
                    arr.creationTime = this.delTime(arr.creationTime)
                    if(arr.relieveTime){
                          arr.relieveTime = this.delTime(arr.relieveTime)
                    }
                  
                };
                ({totalCount:this.totalCount,items:this.tableData} = res.data.result)
            })
        },
        GetVisionAlarmTypeNum(){
            this.$axios.get(this.$api.GetVisionAlarmTypeNum,
                {params:{fireUnitId:this.page.FireUnitId}}
            ).then(res=>{
                console.log("状态数量",res)
                this.buttonarr[1].num = res.data.result[0].value
                this.buttonarr[2].num = res.data.result[1].value
                this.buttonarr[3].num = res.data.result[2].value
            })
        },
        //时间处理格式
        delTime(data){
            var str = data.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        },
        screen(text){
            this.screensign = text;
            if(text == '室外通道'){
                this.page.VisionAlarmType  =3
            }else if(text == '室内通道'){
                this.page.VisionAlarmType  =2
            }else if(text == '火焰烟雾'){
                this.page.VisionAlarmType  =1
            }else if (text == '全部') {
                 this.page.VisionAlarmType  =0
            }
            this.GetVisionAlarmList_Vision();

        },
        //查看详情
        showdetails(items,index){
            this.$refs.baseDialog.dialogVisible = true
            this.monitorPicture = `${this.$URL}${items.monitorPicture}`
           
        },
        prev_next(p){
            this.page.SkipCount = (p-1)*this.page.MaxResultCount
            this.GetVisionAlarmList_Vision();
        }
    }
}
</script>

<style lang="less" >
.monitorPicture{
    width: 100%;
    height: 500px;
}
</style>