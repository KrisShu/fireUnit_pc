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
            <viewer v-if="srcList.length>0" class="viewer"  :images="srcList">
                <img
                    v-for="(img,Imgindex) in srcList"
                    :key="Imgindex"
                    style="width: 900px; height: 450px"
                    :src="img"
                    fit="cover"
                ><img>
            </viewer>
            <div v-else>
                暂无图片 
            </div>
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
                    prop:'visionDevice',
                },
                {
                    name:'监控地点',
                    prop:'location'
                },
                {
                    name:'报警图片',
                    
                },
                {
                    name:'解除警情时间',
                    prop:'releaseTime',
                },
                {
                    name:'解除警情图片',
                },
            ],
            totalCount:0,
            page:{
                FireUnitId :localStorage.getItem('fireUnitID'),
                VisionAlarmType:0,
                SkipCount:0,
                MaxResultCount:10
            },
          
            srcList: []
        }
    },
    created(){
        this.GetVisionAlarmTsjList();
        this.GetVisionAlarmTsjNum();
    },
    methods:{
        GetVisionAlarmTsjList(){
            this.$axios.get(this.$api.GetVisionAlarmTsjList,{params:this.page}).then(res=>{
                console.log("res",res);
                for(let arr of res.data.result.items){
                    arr.creationTime = this.delTime(arr.creationTime)
                    if(arr.releaseTime){
                          arr.releaseTime = this.delTime(arr.releaseTime)
                    }
                  
                };
                ({totalCount:this.totalCount,items:this.tableData} = res.data.result)
            })
        },
        GetVisionAlarmTsjNum(){
            this.$axios.get(this.$api.GetVisionAlarmTsjNum,
                {params:{fireUnitId:this.page.FireUnitId}}
            ).then(res=>{
                console.log("状态数量",res)
                this.buttonarr[1].num = res.data.result.passagewayOutdoor
                this.buttonarr[2].num = res.data.result.passagewayIndoor
                this.buttonarr[3].num = res.data.result.fire
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
            this.GetVisionAlarmTsjList();

        },
        //查看详情
        showdetails(items,index){
            console.log("items",items,index)
            this.srcList =[]
            this.$refs.baseDialog.dialogVisible = true;
            let img
            if(index.column.label == '报警图片'){
                if (items.alarmPhotoUrl) {
                    img  = `${this.$URL}${items.alarmPhotoUrl}`
                    this.srcList.push(img);
                }
                
            }else if(index.column.label == '解除警情图片'){
                if (items.releasePhotoUrl) {
                    img = `${this.$URL}${items.releasePhotoUrl}`
                     this.srcList.push(img);
                }
                
            }
           
        },
        prev_next(p){
            this.page.SkipCount = (p-1)*this.page.MaxResultCount
            this.GetVisionAlarmTsjList();
        }
    }
}
</script>

<style>

</style>