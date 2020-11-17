<template>
   <div class="AIfacilitiesBox">
       <div class="top">
           <p>配置摄像头请使用天树聚AI智脑配置工具</p>
       </div>
       <baseTable
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :tableThead="tableThead"
        :tableData="tableData"
        :totalCount='totalCount'
        :isMonitor="true"
        :pageSize="10"
        @pageChange="prev_next"
       >
       </baseTable>
            
    </div>
</template>

<script>
import baseTable from '../../../components/baseTable/index'
export default {
    components:{
        baseTable,
    },
    data(){
        return{
            loading:false,
            tableThead:[
                {
                    name:'摄像头编号',
                    prop:'monitorSN',
                },
                {
                    name:'AI能力',
                    prop:'visionAlarmType',
                },
                {
                    name:'具体位置',
                    prop:'monitorAddress',
                },
                {
                    name:'状态',
                    prop:'status',
                }
            ],
            tableData:[],
            totalCount:0,
            page:{
                fireUnitId :localStorage.getItem('fireUnitID'),
                SkipCount:0,
                MaxResultCount:10
            },
        }
    },
    created(){
        this.GetMonitorList();
    },
    methods:{
        GetMonitorList(){
            // /api/services/app/Vision/GetMonitorList
            this.$axios.get(this.$api.GetMonitorList,
                {params:this.page}
            ).then(res=>{
                console.log("列表",res);
                ({totalCount:this.totalCount,items:this.tableData}= res.data.result)
            })
        },
        prev_next(page){
            this.page.SkipCount = (page-1)*this.page.MaxResultCount
            this.GetMonitorList();
        }
    }
}
</script>

<style lang="less">

    .AIfacilitiesBox{
        .top{
            display: flex;
            color: white;
        }
    }
</style>