<style lang="less">
.dialog-offline{
display: flex;
padding-left: 130px;
p{
    line-height: 32px;
    color: #fff;
    font-size: 14px;
}
#offLineEchart{
    width: 600px;
    height: 300px;
}
}
</style>
<template>
    <div class="materialLinkTerminal">
        <base-table @showDialog="showDialog" :tableThead="tableThead" :tableData="tableData" :specailText="specailText"></base-table>
        <!-- 弹窗 -->
        <base-dialog ref="baseDialog" :title="dialogTitle" >
            <div v-if="status == '离线'" class="dialog-offline" slot="off-line">
                <div>
                    <p>终端部件：剩余电流式探测器</p> 
                    <p>安装地址：A座1楼消防控制室</p> 
                    <p>网关状态：在线</p> 
                    <p>网关状态最近变化时间：2019-7-1 18:14:26</p>
                    <div ref="offLineEchart" id="offLineEchart">
                    </div> 

                </div>
               
            </div>
            <div v-if="status == '在线'" class="dialog-offline" slot="on-line">
                on-line
            </div>
        </base-dialog>
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
             tableThead:[
               {
                   name:'终端部件',
                   prop:'date',
                   width:'400'
               },
               {
                    name:'安装位置',
                    prop:'address',
                    width:'442'
               },
               {
                    name:'网关状态',
                    prop:'status',
                    width:'180'
               },
               {
                    name:'当前数据',
                    prop:'name',
                    width:'174'
               },
               {
                    name:'合格范围',
                    prop:'name',
                    width:'220'
               },
               {
                    name:'历史记录',
                    width:'200'
               }
            ],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路 1518 弄,',
                status:'离线'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                status:'离线'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                status:'离线'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                status:'在线'
                },
                {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                status:'离线'
                },
                {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                status:'在线'
                },
                {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                 status:'在线'
                },
                {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                status:'在线'
                },
                {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                 status:'在线'
                },
                {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                 status:'离线'
                },
            ],
            specailText:'历史记录',
            dialogTitle:'历史记录',
            dialogVisible:false,
            status:'在线'
        }
    },
    methods:{
        showDialog(index){
            let dialog = this.$refs.baseDialog
            console.log("dialog",dialog,index);
            this.status =  index.status;
            

            dialog.dialogVisible = true;
        },
        /* 初始化离线echarts图 */
        offLineEharts(){
          /*   let offline =  this.$echarts.init(document.getElementById('offLineEchart')); */
           /*  let offline =  document.getElementById('offLineEchart'); */
            let a = this.$refs.baseDialog
           /*  let offline =  this.$echarts.init(a); */
            console.log("aaa",a)
          /*   offline.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            }) */
        }
    },
    mounted(){
        this.offLineEharts();
    }
}
</script>

