<style lang="less">
@bgColor:#072041;
.baseTable_pagenation{
    height: 100%;
 .el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color: #167fc1 !important ;
 }
 .el-table__body tr.current-row>td{
      background-color: #167fc1 !important;
 }
    .el-table{
        margin-top: 16px;
        border-right: 1px solid #025691;
        border-left: 1px solid #025691;
        &::before{
            content: "";
            position: absolute;
            background-color: #025691 !important;
            z-index: 1;
        }


        th.is-leaf{
               border-bottom: 1px solid #025691 !important;
        }
        tr{
            background: transparent ;
        }
         td{
            border-bottom: 1px solid #025691;
        }
         th.is-leaf{
            border-bottom: 1px solid #025691  !important;
        }


        .cell{
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .el-table__header-wrapper{
            .has-gutter{

                color: #a2ecff;
                tr{
                   th{
                       background: #1d477b !important;
                       &>.cell{
                           text-align: center;
                       }
                   }
                }
            }

        }

        .el-table__row{
            height: 56px;
            background: @bgColor !important;
             td{
                 padding: 0px;
                 border-bottom:1px solid #025691;
                .cell{
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .el-button{
                        background: none;
                        border: none;
                        color: #00e4ff;
                    }
                }
            }
        }
        /* 暂无数据 */
        .el-table__empty-block{
            background: #025691;
            .el-table__empty-text{
                color: white;
            }

        }

        .green{
            color: rgb(48, 212, 48);
        }
        .gray{
            color: #cccccc;

        }
        .red{
            color:#F56C6C
        }
        .orange{
            color: orangered;
        }
        .yellow{
            color:#e6a23c;
        }
        .cursor{
            cursor: pointer;
            margin-left: 20px;
            text-decoration:underline;
        }
        .specaildeal{
            color: #f7ff19;
        }

    }
    /* 分页 */
    .pagenationBox{
        width: 100%;
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
            .el-pagination__total{
                font-size: 12px;
                color: #bee3fd;
            }
            .el-pagination.is-background .btn-prev{
                display: inline-block;
                width: 47px;
                height: 28px;
                background-color: #146ca9;
                color: #bee3fd;
            }
            .el-pagination.is-background .btn-next{
                display: inline-block;
                width: 47px;
                height: 28px;
                background-color: #146ca9;
                color: #bee3fd;
            }
            .el-pagination.is-background .el-pager li{
               border: solid 1px #146ca9;
               background: #146ca9;
               color: #fff;
            }
            .el-pager li.active{
            border: solid 1px #146ca9;
               background: @bgColor !important;
               color: #fff;
            }

    }
}


</style>
<template>
    <div class="baseTable_pagenation">

        <el-table  ref="interfaceTable" highlight-current-row  :data="tableData" style="width: 100%" @row-click="handleRowClick">
            <el-table-column
                v-for="(arr,index) in tableThead"
                :key="index" 
                :prop="arr.prop"
                :label="arr.name"
                :width="arr.width"
                show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <!-- 状态栏 -->
                    <span v-if="arr.prop == 'state'">
                        <i v-if="scope.row[arr.prop]  == null || scope.row[arr.prop]  == 0">暂无状态</i>
                        <i v-if="scope.row[arr.prop]== 1 ||scope.row[arr.prop]== 2 ||scope.row[arr.prop]== '正常'" class="green">
                            <i v-if="scope.row[arr.prop]== 1">在线</i>
                            <i v-if="scope.row[arr.prop]== 2">良好</i>
                            <i v-if="scope.row[arr.prop]=='正常'">正常</i>
                        </i>
                        <i v-if="scope.row[arr.prop]== -1 " class="gray">
                            离线
                        </i>
                        <i v-if="scope.row[arr.prop]== -2" class="orange">
                           超限
                        </i>
                        <i v-if="scope.row[arr.prop]== -4" class="yellow">
                           故障
                        </i>
                        <i v-if="scope.row[arr.prop]== -3" class="yellow">
                            隐患
                        </i>
                        <i v-if="scope.row[arr.prop]== '故障-已解决'" class="green">
                            故障-已解决
                        </i>
                        <i v-if="scope.row[arr.prop]== '故障-未解决'" class="yellow">
                            故障-未解决
                        </i>
                        <i v-if="scope.row[arr.prop]== '故障'" class="yellow">
                            故障
                        </i>

                    </span>
                    <!--值班状态 -->
                    <p v-else-if="arr.prop == 'source'">
                        <span v-if="scope.row[arr.prop] == 0">未指定</span>
                        <span v-if="scope.row[arr.prop] == 1">值班</span>
                        <span v-if="scope.row[arr.prop] == 2">巡查</span>
                        <span v-if="scope.row[arr.prop] == 3">物联终端</span>
                    </p>
                    <p v-else-if="arr.prop == 'analog'">
                      {{scope.row[arr.prop1]}}：  {{scope.row[arr.prop]}}
                    </p>

                    <!-- 火警联网设施的三个按钮 -->
                    <el-button
                        @click="getcontent(scope.row,arr.name)"
                        v-else-if="arr.prop == 'faultDetectorNum' || arr.prop == 'alarmNum30Day' || arr.prop == 'highAlarmDetectorNum'"
                    >
                        {{ scope.row[arr.prop] }}
                        <i class="el-icon-search el-icon--right" ></i>
                    </el-button>
                    <!-- 一个单元格放多个数据---电气设施火灾当前数值 -->
                    <div v-else-if="arr.prop == 'phaseType'">
                        <ul v-if="scope.row[arr.prop7]">

                            <li v-if="scope.row[arr.prop]== 1">
                                <p>
                                    <span>L：{{scope.row[arr.prop1]}}</span>
                                    <span @click="getcontent(scope.row,'L')" class="cursor">趋势</span>
                                </p>

                                <p>
                                    <span>N：{{scope.row[arr.prop2]}}</span>
                                    <span @click="getcontent(scope.row,'N')" class="cursor">趋势</span>
                                </p>
                            </li>
                            <li v-if="scope.row[arr.prop]== 2">
                               <p>
                                   <span>L1：{{scope.row[arr.prop4]}}</span>
                                   <span @click="getcontent(scope.row,'L1')" class="cursor">趋势</span>
                                </p>
                                <p>
                                   <span>L2：{{scope.row[arr.prop5]}}</span>
                                   <span @click="getcontent(scope.row,'L2')" class="cursor">趋势</span>
                                </p>
                                <p>
                                   <span>L3：{{scope.row[arr.prop6]}}</span>
                                   <span @click="getcontent(scope.row,'L3')" class="cursor">趋势</span>
                                </p>

                                <p>
                                    <span>N：{{scope.row[arr.prop2]}}</span>
                                    <span @click="getcontent(scope.row,'N')" class="cursor">趋势</span>
                                </p>
                            </li>
                        </ul>
                        <ul v-if="scope.row[arr.prop0]">
                            <li>
                                剩余电流：{{scope.row[arr.prop3]}}
                                <span @click="getcontent(scope.row,'A')" class="cursor">趋势</span>
                            </li>
                        </ul>

                    </div>
                    <!-- 消防管网设施的监控类型判断 -->
                    <p v-else-if="arr.prop == 'monitorType'">
                        <span v-if="scope.row[arr.prop]  == 1">液位</span>
                        <span v-if="scope.row[arr.prop]  == 2">水压</span>
                    </p>
                    <!-- Ai智能分析设施 -->
                    <p v-else-if="arr.prop == 'aIdetectorStatus'">
                        <span  v-if="scope.row[arr.prop]  == 0">未连接</span>
                        <span class="green" v-if="scope.row[arr.prop]  == 1">监控中</span>
                        <span class="yellow" v-if="scope.row[arr.prop]  == 2">报警中</span>
                    </p>
                    <p v-else-if="arr.prop == 'currentValue'">
                        <span v-if="scope.row[arr.prop]">{{scope.row[arr.prop]}}</span>
                        <span v-else>未知</span>

                    </p>
                    <!-- 点位坐标 -->
                    <div v-else-if="arr.prop == 'coordinateX'">
                           <p>X:{{scope.row[arr.prop]}}</p>
                           <p>Y:{{scope.row[arr.prop1]}}</p>
                    </div>
                    <div v-else-if="arr.prop == 'visionAlarmType'">
                        <span v-if="scope.row[arr.prop] == 1"> 烟雾火焰</span>
                        <span v-if="scope.row[arr.prop] == 2"> 室内通道堵塞</span>
                        <span v-if="scope.row[arr.prop] == 3"> 室外通道堵塞</span>
                    </div>
                   
                    <!-- 隐患及警情 -->
                    <div v-else-if="arr.prop == 'alarmHandleStatus'">
                        <el-button  @click="dealDetail(scope.row)" type="text">
                            <span class="specaildeal" v-if="scope.row[arr.prop] == 1">处理</span>
                            <span v-if="scope.row[arr.prop] == 2">误报</span>
                            <span v-if="scope.row[arr.prop] == 3">已处理</span>
                            <span v-if="scope.row[arr.prop] == 4">忽略</span>
                        </el-button>
                    </div>
                    <!-- 操作列 -->
                    <!-- 如果有操作列就显示没有就不显示 -->
                    <div  v-else-if="!arr.prop">
                        <el-button v-if="specailText" type="text" @click="getDetail(scope.row,scope,specailText)">
                            <span>{{specailText}}</span>
                        </el-button>
                        <div class="table_btns" v-else>
                            <el-button
                                @click="getDetail(scope.row, $event,tableName)"
                                size="mini"
                                type="text"
                                icon="el-icon-search"
                            >详情</el-button>
                            <el-button
                                v-if="ishownetworkBtn"
                                @click="getnetwork(scope.row, $event)"
                                size="mini"
                                type="text"
                                icon="el-icon-search"
                            >联网部件</el-button>
                            <el-button
                                v-if="iselectric"
                                @click="getrefresh(scope.row)"
                                size="mini"
                                type="text"
                                icon="el-icon-refresh-left"
                            >数值刷新</el-button>
                            <el-button
                                v-if="iselectric"
                                @click="Poweroff(scope.row)"
                                size="mini"
                                type="text"
                                icon="el-icon-warning-outline"
                            >断电</el-button>
                            <el-button
                                v-if="isMonitor"
                                @click="Monitor(scope.row)"
                                size="mini"
                                type="text"
                                icon="el-icon-warning-outline"
                            >监控路数</el-button>
                            <el-button
                            @click="deleteInfo(scope.row)"
                                size="mini"
                                type="text"
                                icon="el-icon-delete"
                            >删除</el-button>

                        </div>

                    </div>
                     <!-- 默认数据 -->
                    <span style="margin-left: 10px" v-else>{{ scope.row[arr.prop] }} </span>

                </template>
            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="pagenationBox">
            <el-pagination
                @current-change="pageChange"
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
                :current-page="currentpage"
                :page-size="pageSize"
                background
                layout="total,prev, pager, next"
                :total="totalCount"
            ></el-pagination>
        </div>
    </div>


  <!-- 分页 -->

</template>
<script>
import basedelete from '../../httpConfig/commdelete'
export default {
    //接收父组件的值
     props: {
     tableName:String,
        tableData:{
            type:Array,
            require: true
        },
        tableThead:{
            type:Array,
            require: true
        },
        specailText:{
            type:String
        },
        totalCount:{//总的数据条数
            type:Number
        },
        pageSize:Number,
        currentpage:{
            type:Number,
            default(){
                return 1
            }
        },
        ishownetworkBtn:{
            type:Boolean,
            default(){
                return false
            }
        },
        iselectric:{
            type:Boolean,
            default(){
                return false
            }
        },
        isMonitor:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    methods:{
        getcontent(item,propName){
            console.log(item,propName)
            this.$emit('getdialogContent',item,propName)
        },
        getDetail(index,row,specailText){
           console.log("specailText",specailText)
            if(specailText === '历史记录'){
                this.$emit('showDialog',index)
            }else if( specailText === '详情' || specailText === '处理'){
                  this.$emit('showdetails',index)
            }else if( specailText === '人员配备详情'){
                this.$emit('showdetails',index,specailText)
            }else if( specailText === '设施配备详情'){
                this.$emit('showdetails',index,specailText)
            }else if( specailText === '活动记录详情'){
                this.$emit('showdetails',index,specailText)
            }else if(specailText === '标记' || specailText === '查看'){
                console.log("查看标记",index)
                if(specailText === '标记'){
                    this.$emit('showdetails',row)
                }else{
                     this.$emit('showdetails',index,row)
                }
              
            } else{ //没有传特殊值
                this.$emit('showdetails',index)
            }
        },
        getnetwork(item){
            console.log("ssss")
            this.$emit("getnetwork",item)

        },
        //
        getrefresh(item){
            console.log("刷新",item)
            this.$emit("getrefresh",item)
        },
        Poweroff(item){
            console.log("断电")
            this.$confirm('您确认要对该设备所在线路执行断电操作吗？',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
              this.$emit("Poweroff",item)
            }).catch(()=>{

            })

        },
        //监控路数
        Monitor(item){
             this.$emit("Monitor",item)

        },
        deleteInfo(index){
            console.log("删除",index)
           this.$confirm('确定删除该数据？',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
           }).then(()=>{
               this.$emit('deleteInfo',index)
           }).catch(()=>{

           })

        },
        pageChange(dataPage){
            console.log("pageChange",dataPage)
            this.$emit('pageChange',dataPage)
        },
        //      选择这一行
        handleRowClick(val){
            //  console.log("val",val)
        },
        dealDetail(item){
            // console.log(item)
            this.$emit('dealDetail',item)
        }
    },
    watch:{
        tableData:function() {
            this.$nextTick(function() {
                this.$refs.interfaceTable.setCurrentRow(this.tableData[0])
            })
        }
    }
};
</script>


