<template>
  <div class="hiddeElectric">
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
                {{item.text}} {{item.num}}
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
        @pageChange="prev_next"
        @dealDetail="dealDetail"
      >
      
      </baseTable>
      <baseDialog ref="baseDialog" title="警情处理" width="40%">
        <el-form v-if="alarmHandleStatus == 1" ref="form" :model="form" label-width="100px">
          <el-form-item label="情况处理：">
            <el-radio-group v-model="form.CheckState">
              <el-radio :label="4" >忽略</el-radio>
              <el-radio :label="2">误报</el-radio>
              <el-radio :label="3">已处理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="情况描述：">
            <el-input type="textarea" placeholder="情况简要描述，200字以内" rows="10" v-model="form.CheckContent"></el-input>
          </el-form-item>
          <el-button @click="submit">提交</el-button>
        </el-form>
        <div class="detailsBox" v-else>
           <p>处理时间：<span>{{details.handleTime}}</span> </p>
            <p>处理状态：
                <span v-if="details.alarmHandleStatus == 2">误报</span>
                <span v-if="details.alarmHandleStatus == 3">已处理</span>
                <span v-if="details.alarmHandleStatus == 4">忽略</span>
            </p>
            <div>
                <p class="handleContent" v-if="details.handleContent">情况描述：<span>{{details.handleContent}}</span></p>
                <div class="display_p" v-if="details.handleVoiceUrl">
                    <span> 情况描述：</span>
                    <div class="vioceUrl"  @click="playVioce(details.handleVoiceLength)">
                      <img src="../../../assets/image/index/voice.png" alt="">
                    <span>{{details.handleVoiceLength}}"</span>
                </div>
                </div>
            </div>
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
      loading:false,
      screensign:"全部",
      buttonarr:[
        {
            type:'primary',
            text:'全部'
        },
        {
            type:'warning',
            text:'未处理',
            num:0,
        },
        {
            type:'success',
            text:'已处理',
            num:0,
           
        },
      ],
      tableThead:[
          {
              name:'报警时间',
              prop:'creationTime',
              
          },
          {
              name:'设备编号',
              prop:'fireElectricDeviceSn',
          },
          {
              name:'所在建筑',
              prop:'fireUnitArchitectureName', 
          },
          {
              name:'所在楼层',
              prop:'fireUnitArchitectureFloorName', 
          },
          {
              name:'具体位置',
              prop:'location', 
          },
          {
              name:'状态',
              prop:'state', 
          },
          {
              name:'报警数值',
              prop:'analog', 
              prop1:'sign'
          },
          {
              name:'处理',
              prop:'alarmHandleStatus', 
          }
      ],
      tableData:[],
      totalCount:0,
      page:{
        FireUnitId :localStorage.getItem('fireUnitID'),
        VisitSource :1,
        HandleStatusFilter:1,
        State:0,
        SkipCount:0,
        MaxResultCount:10
      },
      form:{
        CheckState:4,
        CheckContent:''
      },
      alarmDataId:'',
      alarmHandleStatus:'',
      details:{}
    }
  },
  created(){
    this.GetElectricAlarmList();
    this.GetElectricAlarmCheckStatusNum();
  },
  methods:{
      GetElectricAlarmCheckStatusNum(){
            this.$axios.get(this.$api.GetElectricAlarmCheckStatusNum,{
                params:{fireUnitId:localStorage.getItem('fireUnitID')}
            }).then(res=>{
                // console.log(res)
                this.buttonarr[1].num = res.data.result[0].value
                this.buttonarr[2].num = res.data.result[1].value
            })
      },
    screen(state){
      this.screensign = state;
      if(state == '未处理'){
        this.page.HandleStatusFilter = 3
      }else if(state == '已处理'){
         this.page.HandleStatusFilter = 2
      }else if(state == '全部'){
        this.page.HandleStatusFilter = 1
      }
      this.page.SkipCount = 0;
      this.GetElectricAlarmList();
    },
    //
    GetElectricAlarmList(){
      this.loading = true;
      this.$axios.get(this.$api.GetElectricAlarmList,{params:this.page}).then(res=>{
        console.log("获取电气火灾",res)
        this.loading = false;
        for(let arr of res.data.result.items){
          arr.creationTime = this.delTime(arr.creationTime)
        };
        ({totalCount:this.totalCount,items:this.tableData} = res.data.result);
      })
    },
    //时间处理格式
    delTime(data){
        var str = data.split('T');
        var str2 = str[1].split(".")
        var timestr = str[0] +" "+ str2[0]
        return timestr;
    },
    dealDetail(item){
      console.log("dealDetail",item);
      this.$refs.baseDialog.dialogVisible = true;
      this.alarmDataId = item.alarmDataId;
      this.alarmHandleStatus = item.alarmHandleStatus
      if(item.alarmHandleStatus != 1){
        this.GetElectricAlarmCheckDetail(item.alarmDataId)
      } 
    },
    GetElectricAlarmCheckDetail(alarmId){
        this.$axios.get(this.$api.GetElectricAlarmCheckDetail,{
                params:{alarmId}
        }).then(res=>{
            console.log("详情",res)
            res.data.result.handleTime = this.delTime(res.data.result.handleTime)
            if(res.data.result.handleVoiceUrl){
                res.data.result.handleVoiceUrl = `${this.$URL}${res.data.result.handleVoiceUrl}`
                let BenzAMRRecorder = require('benz-amr-recorder');
                this.amr = new BenzAMRRecorder();
                this.amr.initWithUrl(res.data.result.handleVoiceUrl);  
            }
            this.details = res.data.result
        })
    },
    playVioce(){
            this.amr.play();
            this.amr.onEnded(function() {
               console.log("播放完毕")
            })
    },
    submit(){
            let param = new FormData();
            param.append("CheckState",  this.form.CheckState);
            param.append("CheckUserId ", localStorage.getItem('userId'));
            param.append("AlarmDataId", this.alarmDataId);
            param.append("CheckContent", this.form.CheckContent);
            this.$axios.post(this.$api.CheckElectricAlarm,param).then(res=>{
                console.log("请求",res)
                if(res.data.success){
                    this.form.CheckState = 4
                    this.form.CheckContent = ''
                    this.$refs.baseDialog.dialogVisible = false;
                    this.GetElectricAlarmList();
                    this.GetElectricAlarmCheckStatusNum();
                }
            })
    },  
    //
    prev_next(page){
      this.page.SkipCount = (page-1)*this.page.MaxResultCount;
      this.GetElectricAlarmList();
    }

  }
}
</script>

<style lang="less">
  .hiddeElectric{
    .base_dialog{
      .el-dialog__body{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .el-form{
          width: 50%;
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
  }
 
</style>