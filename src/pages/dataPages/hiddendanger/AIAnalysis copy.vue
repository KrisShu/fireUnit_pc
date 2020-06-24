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
                {{item.text}}
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
            <viewer class="viewer"  :images="srcList">
                <img
                    v-for="(img,Imgindex) in srcList"
                    :key="Imgindex"
                    style="width: 900px; height: 450px"
                    :src="img"
                    fit="cover"
                ><img>
                </viewer>
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
                    text:'通道堵塞'
                },
                {
                    type:'danger',
                    text:'火焰烟雾'
                
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
                    name:'视觉设备',
                    prop:'visionDevice',
                },
                {
                    name:'监控地点',
                    prop:'location'
                },
                {
                    name:'现场图片',
                    
                },
            ],
            totalCount:0,
            page:{
                FireUnitId :localStorage.getItem('fireUnitID'),
                VisionAlarmType :0,
                SkipCount:0,
                MaxResultCount:10
            },
          
            srcList: []
        }
    },
    created(){
        this.GetVisionAlarmList();
    },
    methods:{
        GetVisionAlarmList(){
            this.$axios.get(this.$api.GetVisionAlarmList,{params:this.page}).then(res=>{
                console.log("res",res);
                for(let arr of res.data.result.items){
                    arr.creationTime = this.delTime(arr.creationTime)
                };
                ({totalCount:this.totalCount,items:this.tableData} = res.data.result)
            }).catch(err=>{
                console.log("err",err)
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
            if(text == '通道堵塞'){
                this.page.VisionAlarmType  =2
            }else if(text == '火焰烟雾'){
                this.page.VisionAlarmType  =1
            }else if(text == '全部'){
                this.page.VisionAlarmType  =0
            }
            this.GetVisionAlarmList();

        },
        //查看详情
        showdetails(items){
            this.srcList =[]
            this.$refs.baseDialog.dialogVisible = true;
            this.$axios.get(this.$api.GetVisionAlarmPhotoPath,{params:{
                visionAlarmId:items.visionAlarmId
            }}).then(res=>{
                console.log("res",res)
                let img = `${this.$URL}${res.data.result}`
                this.srcList.push(img)
            })
        },
        prev_next(p){
            this.page.SkipCount = (p-1)*this.page.MaxResultCount
            this.GetVisionAlarmList();
        }
    }
}
</script>

<style>

</style>