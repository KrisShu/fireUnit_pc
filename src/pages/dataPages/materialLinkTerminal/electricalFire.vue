<template>
  <div class="electricalFireBox">
   
    <el-row class="allStatus">
      <el-col class="allStatus_left" :span="21">
        <el-button  type="primary" @click="screen('全部')" plain round>
          全部
          <i v-if="screensign == '全部'" class="el-icon-check  el-icon--right"></i>
        </el-button>
        <el-button @click="screen('良好')" type="success" plain round>
          良好：{{ElectricDeviceState.goodNum}}
          <i v-if="screensign == '良好'" class="el-icon-check  el-icon--right"></i>
        </el-button>
        <el-button @click="screen('隐患')" type="warning" plain round>
          隐患：{{ElectricDeviceState.badNum}}
          <i v-if="screensign == '隐患'" class="el-icon-check  el-icon--right"></i>
        </el-button>
        <el-button @click="screen('超限')" type="danger" plain round>
          超限：{{ElectricDeviceState.warnNum}}
          <i v-if="screensign == '超限'" class="el-icon-check  el-icon--right"></i>
        </el-button>
        <el-button @click="screen('故障')" type="warning" plain round>
          故障：{{ElectricDeviceState.faultNum}}
          <i v-if="screensign == '故障'" class="el-icon-check  el-icon--right"></i>
        </el-button>
        <el-button @click="screen('离线')" type="info" plain round>
          离线：{{ElectricDeviceState.offlineNum}}
          <i v-if="screensign == '离线'" class="el-icon-check  el-icon--right"></i>
        </el-button>
       
      
        
        <el-popover
          placement="top-start"
          trigger="hover"
        >
          <div class="content">
            <p style="color:rgb(59, 218, 11)" class="green">在线：当前与数据中心通讯正常的装置，其状态可能为良好/隐患/超限</p>
            <p style="color:gray" class="gray">离线：当前与数据中心通讯异常的装置</p>
            <p style="color:rgb(59, 218, 11)" class="green">良好：当前监测数值在上限值的80%以下</p>
            <p style="color:orange" class="yellow">隐患：当前监测数值达到上限值的80%及以上</p>
            <p style="color:#F56C6C" class="orange">超限：当前监测数值达到上限值的100%及以上</p>
          </div>
         <img  slot="reference" src="../../../assets/image/index/tooltip.png">
        </el-popover>
        

      </el-col>
      <el-col class="allStatus_right" :span="3">
        <el-button @click="addNew" type="primary" plain>新增</el-button>
      </el-col>
      
    </el-row>
    <!--  -->
    <baseTable 
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :tableThead="tabelThead"
      :tableData='tableData'
      :totalCount="ElectricTotalCount"
      :pageSize="8"
      :iselectric="true"
      @getdialogContent='getcontent'
      @showdetails="GetFireElectricDevice"
      @deleteInfo="DeleteFireElectricDevice"
      @pageChange="prev_next"
      @getrefresh="refresh"
      @Poweroff="poweroff"

      ></baseTable>

    <!--新增或详情弹窗  -->
    <baseDialog title="消防设备" @closeDialog="closeDialog" ref="baseDialog">
      <el-form class="formBox" :rules="rules" ref="form" :model="Electricform" label-width="80px">
        <!-- 基本 -->
        <el-row class="baseBox" :gutter="20">
          <el-col class="left_box" :span="4">
            <div class="grid-content basetitle">基本</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content">
              <el-row class="pd20 one_row" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="设备型号" prop="deviceModel">
                    <el-select  v-model="Electricform.deviceModel" placeholder="请选择设备型号">
                      <el-option 
                        v-for="item in ElectricDeviceTypes"
                        :key ="item"
                        :label="item" 
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                    <p class="marginleft10">设备名称：电气火灾设施</p>
                </el-col>
              </el-row>
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="设备编号" prop="deviceSn">
                     <el-input  v-model="Electricform.deviceSn" placeholder="请输入设备编号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                    <p v-if="Electricform.deviceId" class="marginleft10">
                      设备状态：
                      <span style="color:rgb(59, 218, 11)"  v-if="Electricform.state == 2 ">良好</span> 
                      <span style="color:rgb(59, 218, 11)"  v-if="Electricform.state == -3 ">隐患</span> 
                      <span style="color:orange" v-if="Electricform.state == -2 ">超限</span> 
                      <span style="color:#F56C6C" v-if="Electricform.state == -1 ">离线</span> 
                    <!--   <span style="color:#ccc" v-if="Electricform.state == '离线' ">{{Electricform.state}}</span>  -->
                    </p>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!-- 位置 -->
        <el-row class="baseBox" :gutter="20">
          <el-col class="left_box" :span="4">
            <div class="grid-content basetitle">位置</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content">
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                    <el-form-item  label="所在建筑" prop="fireUnitArchitectureId">
                      <el-select @change="selectbuild"  v-model="Electricform.fireUnitArchitectureId" placeholder="请选择所在建筑">
                        <el-option 
                          v-for="item in buildList"
                          :key="item.id"
                         :label="item.name" 
                         :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                
                <el-col :span="12">
                    <el-form-item  label="所在楼层" prop="fireUnitArchitectureFloorId">
                      <el-select  v-model="Electricform.fireUnitArchitectureFloorId" placeholder="请选择所在楼层">
                        <el-option
                          v-for="item in floors"
                          :key="item.id"
                          :label="item.name" 
                          :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
               
              </el-row>
              <el-row class="pd20">
                <el-col :span="24">
                  <el-form-item  label="安装位置">
                    <el-input  v-model="Electricform.location" placeholder="请输入安装位置"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!-- 参数 -->
        <el-row class="baseBox" :gutter="20">
          <el-col class="left_box" :span="4">
            <div class="grid-content basetitle">参数</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content">
              <!--监测类型  -->
              <el-row class="pd20">
                <el-col class="Monitoringtype" :span="24">
                  <el-form-item  label="监测类型" prop="monitorItemList">
                    <el-checkbox-group v-model="Electricform.monitorItemList">
                      <div>
                          <el-checkbox label="电缆温度"></el-checkbox>
                      </div>
                      <el-checkbox label="剩余电流"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <div class="Monitoringtype_right">
                    <p v-if="Electricform.monitorItemList.indexOf('电缆温度') !=-1" @click="getmonitoringrange" class="Monitoringtype_right_title">监测范围</p>
                    <p v-else></p><!-- 占位 -->
                    <div v-if="Electricform.monitorItemList.indexOf('剩余电流') !=-1" class="Monitoringtype_right_Surplus">
                      <span >监测范围：</span>
                      <el-input v-model.number="Electricform.minAmpere">
                         <template slot="append">mA</template>
                      </el-input>
                      <p>—</p>
                      <el-input v-model.number="Electricform.maxAmpere">
                         <template slot="append">mA</template>
                      </el-input>

                    </div>
                    
                  </div>
                </el-col>
              </el-row>

              <el-row class="pd20">
                <el-col :span="24">
                  <el-form-item  label="超限动作" prop="Model">
                    <el-checkbox-group v-model="Electricform.enableAlarmList">
                      <el-checkbox label="终端报警"></el-checkbox>
                      <el-checkbox label="云端报警"></el-checkbox>
                      <el-checkbox label="发送短信"></el-checkbox>
                      <el-checkbox label="自动断电"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                    <el-col  v-if="Electricform.enableAlarmList.indexOf('发送短信') !=-1" class="smsPhones" :span="15">
                      <el-form-item  label="接收手机">
                        <el-input  v-model="Electricform.smsPhones" placeholder="请输入接收手机号码(输入多个时需要用英文逗号隔开)"></el-input>
                      </el-form-item>
                    </el-col>
                </el-col>
              </el-row>
              <!--  -->
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="通讯方式" prop="netComm">
                    <el-select  v-model="Electricform.netComm" placeholder="请选择通讯方式">
                      <el-option label="以太网" value="以太网"></el-option>
                      <el-option label="WIFI" value="WIFI"></el-option>
                      <el-option label="NB-IOT" value="NB-IOT"></el-option>
                      <el-option label="4G" value="4G"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                    <p v-if="Electricform.deviceId" class="marginleft10">数据采集频率：{{Electricform.dataRate}}</p>
                    <p v-else class="marginleft10">数据采集频率：2小时</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!-- 按钮 -->
        <el-row  class="btns" :gutter="20">
          <el-button @click="submit_updateElectric">提交</el-button>
          <el-button @click="cancel(Electricform.deviceId)">取消</el-button>
        </el-row>
      </el-form>
          
    </baseDialog>
    <!-- 电缆温度--监测范围弹窗 -->
    <baseDialog title="电缆温度监测范围" ref="monitoringRangeDialog">
        <div class="monitoringRangeDialog">
            <el-row class="flex1 border margin20">
              <el-col :span="6">
                 <el-radio v-model="Electricform.phaseType" :label=1>单相</el-radio>
              </el-col>
              <el-col v-if="Electricform.phaseType == 1" :span="18">
                <div class="flex1 margin20">
                  <span class="spantitle">L</span>
                  <el-input v-model.number="Electricform.minL">
                      <template slot="append">℃</template>
                  </el-input>
                  <p>——</p>
                  <el-input v-model.number="Electricform.maxL">
                      <template slot="append">℃</template>
                  </el-input>
                </div>
                 <div class="flex1">
                  <span class="spantitle">N</span>
                  <el-input v-model.number="Electricform.minN">
                      <template slot="append">℃</template>
                  </el-input>
                  <p>——</p>
                  <el-input v-model.number="Electricform.maxN">
                      <template slot="append">℃</template>
                  </el-input>
                </div>
              </el-col>
              <el-col class="nop" v-else :span="18">
                <p>L</p>
                <p>N</p>
              </el-col>

            </el-row>
            <!-- 三相 -->
            <el-row class="flex1 border margin20">
              <el-col :span="6">
                 <el-radio v-model="Electricform.phaseType" :label=2>三相</el-radio>
              </el-col>
              <el-col v-if="Electricform.phaseType == 2" :span="18">
                <div class="flex1 margin20">
                  <span class="spantitle">L1</span>
                  <el-input v-model.number="Electricform.minL1">
                      <template slot="append">℃</template>
                  </el-input>
                  <p>——</p>
                  <el-input v-model.number="Electricform.maxL1">
                      <template slot="append">℃</template>
                  </el-input>
                </div>
                <div class="flex1 margin20">
                  <span class="spantitle">L2</span>
                  <el-input v-model.number="Electricform.minL2">
                      <template slot="append">℃</template>
                  </el-input>
                  <p>——</p>
                  <el-input v-model.number="Electricform.maxL2">
                      <template slot="append">℃</template>
                  </el-input>
                </div>
                <div class="flex1 margin20">
                  <span class="spantitle">L3</span>
                  <el-input v-model.number="Electricform.minL3">
                      <template slot="append">℃</template>
                  </el-input>
                  <p>——</p>
                  <el-input v-model.number="Electricform.maxL3">
                      <template slot="append">℃</template>
                  </el-input>
                </div>
                 <div class="flex1">
                  <span class="spantitle">N</span>
                  <el-input v-model.number="Electricform.minN">
                      <template slot="append">℃</template>
                  </el-input>
                  <p>——</p>
                  <el-input v-model.number="Electricform.maxN">
                      <template slot="append">℃</template>
                  </el-input>
                </div>
              </el-col>
              <el-col class="nop" v-else :span="18">
                <p>L1</p>
                <p>L2</p>
                <p>L3</p>
                <p>N</p>
              </el-col>
            </el-row>
            <el-row class="btns">
              <el-button @click="monitorRangeSbumit">提交</el-button>
              <el-button class="cancel" @click="monitorCancel(Electricform.deviceId)">取消</el-button>
            </el-row>
        </div>
    </baseDialog>
    <!-- 当前数值趋势指标 -->
    <baseDialog ref="trendDialog" title=" 指标趋势">
      <div class="trendDialog">
        <!--  -->
        <div class="trendDialog_top">
          <span class="trendDialog_top_left">监测指标：{{monitorItemName}}</span>
          <div class="trendDialog_top_right">
            <span class="demonstration">日期范围</span>
            <el-date-picker
              v-model="trend_date"
              default-value="2019-12-25"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button @click="selectadtetrend">查询</el-button>
          </div>
        </div>
        <!--  -->
        <el-row v-if="trendData.length>0">
          <el-col :span="7">
            <el-scrollbar style="height:400px">
              <div class="left_list">
                <p v-for="item in trendData" :key="item.time">
                  <span class="time">{{item.time}}</span>
                  <span class="gap">-</span>
                  <span class="green" v-if="item.value<trendData_max*0.8" >{{item.value}} {{trendUnit}}</span>
                  <span class="orange" v-if="item.value<trendData_max && item.value>=trendData_max*0.8" >{{item.value}} {{trendUnit}}</span>
                  <span class="red" v-if="item.value>=trendData_max" >{{item.value}}{{trendUnit}}</span>
                </p>
              </div>
             </el-scrollbar>
          </el-col>
          <el-col :span="17">
             <div class="timeRange">
              {{starttime}} —— {{endtime}}
            </div>
            <div id="trendEcharts"></div>
          </el-col>
        </el-row>
        <el-row class="nodata" v-else>
          <img src="../../../assets/image/index/nodata.png" alt="">
          <p>您选择的日期范围内暂无记录数据</p>
        </el-row>
      </div>
    </baseDialog>
   
  </div>
</template>

<script>
import baseTable from '../../../components/baseTable/index'
import baseDialog from '../../../components/baseDialog'
export default {
  components:{
    baseTable,
    baseDialog
  },
  data(){
    return{
      ElectricDeviceState:{},
      screensign:'全部',
      loading:false,
      ElectricformPage:{
        FireUnitId:localStorage.getItem('fireUnitID'),
        SkipCount:0,
        state:'',
        MaxResultCount:8
      },
      ElectricTotalCount:0,
      ElectricDeviceTypes:[],//电气火灾设备型号
      buildList:[],//所在建筑
      floors:[],//所在楼层
      rules:{
          deviceModel: [
            { required: true, message: "选择设备型号", trigger: "change" }
          ],
          deviceSn: [
              { required: true, message: "请填写设备编号", trigger: "blur" }
          ],
          monitorItemList:[
            { required: true,type:'array', message: "请至少选择一个监测类型", trigger: "change" }
          ]
      },
      Electricform:{
        deviceModel:'TSJ-DQ10',
        enableAlarmList:['终端报警','云端报警'],
        monitorItemList:['电缆温度','剩余电流'],
        location:'',
        amax:300,
        amin:0,
        phaseType:1,
        minL:0,
        maxL:60,
        minL1:0,
        maxL1:60,
        minL2:0,
        maxL2:60,
        minL3:0,
        maxL3:60,
        minN:0,
        maxN:60,
      },
      Electricform_foradd:{
        deviceModel:'TSJ-DQ10',
        location:'',
        enableAlarmList:['终端报警','云端报警'],
        monitorItemList:['电缆温度','剩余电流'],
        maxAmpere:300,
        minAmpere:0,
        phaseType:1,
        minL:0,
        maxL:60,
        minL1:0,
        maxL1:60,
        minL2:0,
        maxL2:60,
        minL3:0,
        maxL3:60,
        minN:0,
        maxN:60,
      },
      tabelThead:[
        {
          name:'设备编号',
          prop:'deviceSn',
          with:'200px'
        },
        {
          name:'所在建筑',
          prop:'fireUnitArchitectureName'
        },
        {
          name:'所在楼层',
          prop:'fireUnitArchitectureFloorName'
        },
        {
          name:'具体位置',
          prop:'location'
        },
        {
          name:'状态',
          prop:'state'
        },
        {
          name:'当前数值',
          prop:'phaseType',
          prop0:'existAmpere',
          prop7:'existTemperature',
          prop1:'l',
          prop2:'n',
          prop3:'a',
          prop4:'l1',
          prop5:'l2',
          prop6:'l3',
        },
        {
          name:'操作',
          width:'350px'
        },
      ],
      tableData:[
        {
          code:'8644444444444444',
          build:'1号楼',
          floor:'12',
          address:'楼道配备箱',
          status:'良好',
          nowdata:['2','f','4']
        }
      ],
      starttime:'',
      endtime:'',
      trend_date:'',
      RecordElectric:{},//趋势指标数据
      trendData:[],
      trendUnit:'',
      monitorItemName:'',
      trendData_max:'',
      trendData_min:'',
      m:'',
    }
  },
  created(){
    this.GetFireElectricDeviceState()
    this.GetFireElectricDeviceList()
    this.getTypes_build();
  },
  computed:{
    
  },
  methods:{
    //获取电气设施火灾的状态数量
    GetFireElectricDeviceState(){
      let FireUnitId = localStorage.getItem('fireUnitID')
      this.$axios.get(this.$api.GetFireElectricDeviceState,{params:{FireUnitId}}).then(res=>{
        console.log("获取电气设施火灾的状态数量",res)
        this.ElectricDeviceState = res.data.result
      })
    },
    //筛选状态
    screen(state){
      if(state == '全部'){
         this.ElectricformPage.state = ''
      }else{
        this.ElectricformPage.state = state
      }
        this.screensign = state
        this.ElectricformPage.SkipCount =0
        this.GetFireElectricDeviceList();

    },
    //获取
    GetFireElectricDeviceList(){
      this.loading =true
      this.$axios.get(this.$api.GetFireElectricDeviceList,{params:this.ElectricformPage}).then(res=>{
        console.log("获取电气火灾设施列表成功",res);
        this.loading = false;
        ({items:this.tableData,totalCount:this.ElectricTotalCount} = res.data.result);

        if(res.data.result.items.length == 0 && res.data.result.totalCount>0){
            this.ElectricformPage.SkipCount = 0
            this.GetFireElectricDeviceList()
        }
      }).catch(err=>{
        console.log("获取电气火灾设施列表失败",err)
      })
    },
    //切换页码
    prev_next(page){
      this.ElectricformPage.SkipCount = (page-1)* this.ElectricformPage.MaxResultCount
      this.GetFireElectricDeviceList()
    },
    //刷新数据
    refresh(item){
      this.m = this.$message({
        message: '刷新数值中......',
        duration: 0,
        type: 'success'
      });
      // this.loading = true;
      let electricDeviceId = item.deviceId;
      this.$axios.get(this.$api.GetSingleElectricDeviceData,{params:{electricDeviceId}}).then(res=>{
        console.log("获取刷新数据",res)
        this.m.close();
        // this.loading = false;
        if(res.data.result.result){
          this.$message({
            message: '刷新数值成功!',
            type: 'success',
            showClose: true,
            duration:3000
          });
          this.GetFireElectricDeviceList();
        }else{
          this.$message({
            message: '刷新数值超时，请稍后再试',
            type: 'warning',
            showClose: true,
            duration:5000
          });
          
        }
      }).catch(err=>{
        console.log("获取刷新数据失败",err)
      })
    },
    //断电
    poweroff(item){
      this.m = this.$message({
        message: '发送断电信号中......',
        duration: 0,
        type: 'success'
      });
      // this.loading = true;
      let electricDeviceId = item.deviceId;
      let form =  new FormData();
      form.append("electricDeviceId", electricDeviceId);
      this.$axios.post(this.$api.BreakoffPower,form).then(res=>{
        this.m.close();
        // this.loading = false;
        console.log("断电数据成功",res)
        this.$message({
            message: '已发送断电指令',
            type: 'success',
            showClose: true,
            duration:5000
        });
      }).catch(err=>{
          this.$message({
            message: '发送断电指令失败',
            type: 'success',
            showClose: true,
            duration:5000
          });
        console.log("断电数据失败",err)
      })
    },
    //新增
    addNew(){
      this.$refs.baseDialog.dialogVisible = true
      let stringform = JSON.stringify(this.Electricform_foradd)
      this.Electricform = JSON.parse(stringform)//如果form对象里有多选的默认训中字段需要用深拷贝来清空form对象
      let contractPhone = localStorage.getItem('contractPhone')
      this.$set(this.Electricform,'smsPhones',contractPhone)
    },
    //关闭弹窗
    closeDialog(name){
      if(name == '消防设备'){
        this.$refs.form.resetFields();
      }
    },
    // //请求设备型号和所在建筑
    getTypes_build(){
      let fireunitId = localStorage.getItem('fireUnitID')
      this.$axios.all([
        this.$axios.get(this.$api.GetFireElectricDeviceModels,{params:{}}),
        this.$axios.get(this.$api.GetListByFireUnitId,{params:{fireunitId}})
      ]).then(this.$axios.spread((res,res1)=>{
        console.log("获取电气火灾设备型号",res)
        this.ElectricDeviceTypes = res.data.result
        console.log("所在建筑",res1)
        this.buildList = res1.data.result
      }))
    },
    //选择建筑楼层
    selectbuild(item){
      console.log("所在建筑的id",item)
      for(let arr of this.buildList){
        if(arr.id == item){
          this.floors = arr.floors
        }
      }

      console.log("floors",this.floors)
    },
    //查看详情
    async  GetFireElectricDevice(item){
      let DeviceId = item.deviceId
      this.$refs.baseDialog.dialogVisible = true
      await this.$axios.get(this.$api.GetFireElectricDevice,{params:{DeviceId}}).then(res=>{
        console.log("获取电气设备的具体详情",res)
        localStorage.setItem('GetFireElectricDevice',JSON.stringify(res.data.result))
        
        this.Electricform= res.data.result;
        this.Electricform.deviceId = this.Electricform.id
        console.log(" this.Electricform.deviceId", this.Electricform)
        if(!res.data.result.phaseType){
           this.Electricform.phaseType = 1
        }
        
        this.selectbuild(this.Electricform.fireUnitArchitectureId)
         
      }).catch(err=>{
        console.log('获取详情失败',err)
      })
      

    },
    //新增或修改电气火灾
    submit_updateElectric(){
        this.$refs.form.validate(valid => {
          if(valid){
            this.Electricform.fireUnitId = +localStorage.getItem('fireUnitID')
            if(!this.Electricform.monitorItemList.includes('电缆温度')){
              this.Electricform.phaseType =1
            }
            this.Electricform.deviceId = this.Electricform.id
            console.log('要提交的数据',this.Electricform)
            let as = this.Electricform.deviceId ?
            this.$axios.put(this.$api.UpdateFireElectricDevice,this.Electricform):
            this.$axios.post(this.$api.AddFireElectricDevice,this.Electricform);
            as.then(res=>{
              console.log("添加或修改成功",res)
             
                this.$message.success(
                      `${this.Electricform.deviceId ? "修改" : "新增"}电气火灾设施成功`
                );
                this.$refs.baseDialog.dialogVisible = false
                this.GetFireElectricDeviceList();

            }).catch(err=>{
              console.log("添加失败",err)
            })
          }
        })
     

    },
    //取消
    cancel(id){
      if(id){
        this.$refs.baseDialog.dialogVisible = false
      }else{
        let stringform = JSON.stringify(this.Electricform_foradd) 
        this.Electricform = JSON.parse(stringform)
        this.$refs.baseDialog.dialogVisible = false
      }
    },
    //获取电缆温度监测范围
    getmonitoringrange(){
      this.$refs.monitoringRangeDialog.dialogVisible = true
    },
    //提交缆温度监测范围
    monitorRangeSbumit(){
      console.log("this.Electricform111",this.Electricform)
      this.$refs.monitoringRangeDialog.dialogVisible = false
    },
    //取消
    monitorCancel(id){
      if(id){
        this.$refs.monitoringRangeDialog.dialogVisible = false
        let Electricforms = JSON.parse(localStorage.getItem('GetFireElectricDevice')) 
        this.Electricform.minL = Electricforms.minL
        this.Electricform.maxL = Electricforms.maxL
        this.Electricform.minL1 = Electricforms.minL1
        this.Electricform.maxL1 = Electricforms.maxL1
        this.Electricform.minL2 = Electricforms.minL2
        this.Electricform.maxL2 = Electricforms.maxL2
        this.Electricform.minL3 = Electricforms.minL
        this.Electricform.maxL3 = Electricforms.maxL3
        this.Electricform.minN = Electricforms.minN
        this.Electricform.maxN = Electricforms.maxN
      }else{
        this.$refs.monitoringRangeDialog.dialogVisible = false
        this.Electricform.minL = 0
        this.Electricform.maxL = 60
        this.Electricform.minL1 = 0
        this.Electricform.maxL1 = 60
        this.Electricform.minL2 = 0
        this.Electricform.maxL2 = 60
        this.Electricform.minL3 = 0
        this.Electricform.maxL3 = 60
        this.Electricform.minN = 0
        this.Electricform.maxN = 60
      }
     
    },
    //删除电气设施
    DeleteFireElectricDevice(item){
      let DeviceId = item.deviceId
      this.$axios.delete(this.$api.DeleteFireElectricDevice,{params:{DeviceId}}).then(res=>{
        console.log("删除数据成功",res)
        this.$message({
          message: '删除数据成功',
          type: 'success'
        });
          this.GetFireElectricDeviceList()
      }).catch(err=>{
        console.log("删除失败",err)
      })
    },
    getNowTime(){
      let timeDate = new Date();
      let year = timeDate.getFullYear();//得到年份
      let moth = timeDate.getMonth()+1 <10 ? '0'+(timeDate.getMonth()+1) : timeDate.getMonth()+1; //得到月份
      let date = timeDate.getDate()<10 ?  '0'+timeDate.getDate() : timeDate.getDate(); //得到日期
      let time = year +'-'+moth +'-'+date
      return time  //把时间抛出去
     
    },
    getpreTime(){
      let timeDate = new Date();
      var preDate = new Date(timeDate.getTime() - 24*60*60*1000); 
      let year = preDate.getFullYear();//得到年份
      let moth = preDate.getMonth()+1 <10 ? '0'+(preDate.getMonth()+1) : preDate.getMonth()+1; //得到月份
      let date = preDate.getDate()<10 ?  '0'+preDate.getDate() : preDate.getDate(); //得到日期
      let time = year +'-'+moth +'-'+date
      return time  //把时间抛出去
     
    },
    //获取当前数值
    getcontent(item,name){
        this.$refs.trendDialog.dialogVisible = true;
        this.RecordElectric.DeviceId = item.deviceId
        this.RecordElectric.Sign  = name
        this.RecordElectric.Start = null
        this.RecordElectric.End = null
        this.trend_date =''
        this.endtime = this.getNowTime()
        this.starttime = this.getpreTime()

        // this.RecordElectric.Identify = 'L'
        this.GetRecordElectric();
        
    },

    //获取指标趋势
    async  GetRecordElectric(){
      await  this.$axios.get(this.$api.GetRecordElectric,{params:this.RecordElectric}).then(res=>{
        console.log("获取趋势",res)
            if(res.data.result.monitorItemName !=null){
              this.monitorItemName = this.RecordElectric.Sign
              if(this.RecordElectric.Sign == 'A'){
                this.monitorItemName = '剩余电流'
              }
            }else{
               this.monitorItemName = ''
            }
        if(res.data.result.lstAnalogData){
            this.trendData = res.data.result.lstAnalogData
            this.trendUnit = res.data.result.unit
            this.trendData_max = res.data.result.max
            this.trendData_min = res.data.result.min
            
            let timevalue = []
            let datavalue = []
            for(let arr of this.trendData){
              arr.time = this.dealTime(arr.time)
              timevalue.push(arr.time)
              datavalue.push(arr.value)
            } 
            //数据反转
            timevalue.reverse()
            datavalue.reverse()
            if( this.trendData.length>0){
                this.$nextTick(()=>{
                  this.initEcharts(timevalue,datavalue)
                })
            }
        }
       
       
      }).catch(err=>{
        console.log("失败",err)
      })
    },
    //处理时间格式
    dealTime(data){
      var str = data.split('T');
      var str2 = str[1].split(".")
      var timestr = str[0] +" "+ str2[0]
      return timestr;
    },
    //Echarts图
    initEcharts(timevalue,datavalue){
      let trendEcharts = this.$echarts.init(document.getElementById('trendEcharts'));
      trendEcharts.setOption({
        legend:{
          top:'top'
        },
        grid:{
           top:'20'
        },
        xAxis: {//x轴
            type: 'category',
            data: timevalue,
            axisLabel:{
             
              showMaxLabel: true,//是否显示最大 tick 的 label。
              showMinLabel: true,//是否显示最小 tick 的 label。
              formatter:function(value,idx){//坐标文字处理现实
                 var str = value.split(" ");
                 var addstr ="";
                 addstr = str[0]+"\n"+str[1]  
                 return addstr
                /* if(timevalue.length>6){
                    return timevalue[idx]
                }else{
                  return value
                } */
              }
            },
            axisTick: {
              alignWithLabel: true,
            },
            axisLine:{//设置轴线的属性
                  lineStyle:{
                      color:'white',
                      width:4,//这里是为了突出显示加上的
                  }
            } 
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    color:'white',
                    width:4,//这里是为了突出显示加上的
                }
            } 

        },
         dataZoom: [
            {
                startValue: timevalue[0],
                endValue:timevalue[timevalue.length-1],
                left:"center",                           
                right:"auto",
                bottom:"0",     
            },
            {
              type: 'inside'
            }
        ],
        series: [{
            data:datavalue,
            type: 'line',
            symbol:'none'
        }]

      });
    },
    //查询指标趋势
    selectadtetrend(){
      console.log("value1",this.trend_date)
      this.RecordElectric.Start = this.trend_date[0]
      this.RecordElectric.End = this.trend_date[1]
      this.starttime = this.trend_date[0]
      this.endtime = this.trend_date[1]
      this.GetRecordElectric()
    }
  }
}
</script>

<style lang="less">
  .electricalFireBox{
    color: white;
    .allStatus{
      .allStatus_left{
        .all_btn{
          background: #025691;
          color: white;
          border-color: #025691;
        }
        display: flex;
        align-items: center;
        img{
          margin-left: 20px;
        }
      }
      .allStatus_right{
        .el-button{
          width: 200px;
          background: #025691;
        }
      }
    }
    .el-dialog__body{
      display: flex;
      justify-content: center;
    }
    .flex1{
      display: flex;
      align-items: center;
    }
    .margin20{
      margin: 20px 0px;
    }
    .border{
      border: 1px dotted white;
      padding: 10px 10px;
      border-radius: 4px;
    }

    //-------------------
    .formBox{
      width: 90%;
      padding: 20px;
      border: 1px solid darkblue;
      box-shadow: 0 2px 12px 0 #29d;
      .el-form-item{
        margin: 0px;
      }
       .el-select{
          width: 100%;
        }
        .el-date-editor{
          width: 100% !important;
        }
      .smsPhones{
        margin-left: 70px;
      }
      .baseBox{
        display: flex;
        align-items: center;
        border: 1px dotted white;
        border-radius: 4px;
        padding: 10px 0px;
        .left_box{
          height: 80px;
          line-height: 80px;
          border-right:1px dotted rgb(124, 123, 123)
        }
        &:nth-of-type(2){
          margin: 20px 0px;
        }
      }
      .one_row{
        margin-bottom: 20px;
      }
      .pd20{
        padding: 6px;
        display: flex;
        align-items: center;
      }
      .marginleft10{
        margin-left: 34px;
        color: white;
      }
      .chuangkou{
        display: flex;
        color: #cccccc;
        .chuangkou_left{
          margin-left: 20px;
          p{
            line-height: 1.5;
          }
        }
      }
      .basetitle{
        font-size: 16px;
        color: white;
      }
      .el-form-item__label{
        font-size: 14px;
        color: white;
      }
      .el-checkbox__label{
        color: #cccccc;
      }
      .el-input__inner{
        background: #025691;
        color: white;
      }
      input::placeholder{
         color: #999898;
      }
      .el-select-dropdown__list{
        background: #011524;
      }
      .btns{
        margin-top: 40px;
        display: flex;
        justify-content: center;
        .el-button{
          width: 200px;
          background: #025691;
          color: #cccccc;
        }
      }
      .Monitoringtype{
        position: relative;

        .Monitoringtype_right{
          height: 76px;
          // border: 1px solid darkcyan;
          position: absolute;
          left: 200px;
          top: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
          .Monitoringtype_right_title{
            cursor: pointer;
            text-shadow: -1px -1px 6px rgb(0, 140, 255),
                         1px 1px 6px rgb(0, 140, 255), 
                         -1px 1px 6px rgb(0, 140, 255), 
                         1px -1px 6px rgb(0, 140, 255);
          }
          .Monitoringtype_right_Surplus{
            display: flex;
            flex-direction: row;
            align-items:center;
            .el-input{
              width: 100px;
            }
            .el-input-group__append{
              padding: 0 6px;
              background: #011524;
            }
          }

        }
      }
      
      
    }
    //monitoringRangeDialog
    .monitoringRangeDialog{

      width: 60%;
      padding:0px 20px;
      border: 1px solid darkblue;
      box-shadow: 0 2px 12px 0 #29d;
      .el-radio{
        &.is-checked{
          .el-radio__label{
            color: #409EFF !important;
          }
        }
        .el-radio__label{
          color: white;
        }
      }
      .el-input-group{
        width: 160px;
      }
      .el-input__inner{
        background: #025691;
        color: white;
      }
      input::placeholder{
         color: #999898;
      }
      .el-input-group__append{
        background: #011524;
        color: white;
      }
      .spantitle{
        display: inline-block;
        width: 50px;
        color: white;
      }
      .nop{
        p{
          color: white;
          line-height: 3;
        }
      }
      .btns{
        display: flex;
        margin: 40px 0px;
        justify-content: center;
        .el-button{
          width: 200px;
          background: #025691;
          color: white;
          &.cancel{
            background: #011524;
          }
        }
      }
    }
    //
    .trendDialog{
      width: 100%;
      .green{
        color: rgb(1, 160, 1);
      }
      .orange{
        color: orangered;
      }
      .red{
        color: red;
      }
      .trendDialog_top{
        display: flex;
        align-items: center;
        color: white;
        .trendDialog_top_right{
          margin-left: 160px;
        }
        .el-button{
          background: #025691;
          width: 130px;
          color: #fff;
        }
        .el-date-editor{
          background: #025691;
          .el-range-input{
             background: #025691;
             color: white;
          }
        }
      }
      .timeRange{
        color: white;
        text-align:center;
        font-weight: bold;
        margin-top: 20px;
      }
      .left_list{
        width: 100%;
        p{
          line-height: 2;
          color: white;
          .gap{
            display: inline-block;
            margin:0px 8px;
          }
          
        }
      }
      .el-scrollbar__wrap{
        overflow-x: hidden;
      }
      #trendEcharts{
        width: 100%;
        height:400px;
      }
      .nodata{
        display: flex;
        align-items: center;
        flex-direction: column;
        color: white;
      }

    }
  }
</style>