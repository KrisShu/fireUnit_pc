<template>
  <div class="firenetworkingBox">
    <!--  -->
    <div class="top_tips">
      <div class="tooltip">
        <el-popover
          placement="top-start"
          trigger="hover"
        >
          <div class="content">
            高频报警部件是指近期频繁报警（近两天平均每天5次及以上报警）的终端探测部件<br/>
            应勘察频繁报警的终端探测器现场有无蒸汽、油气、粉尘等影响火灾探测器正常工作的环境存在，如有应设法排除。<br/>
            对于误报频繁而又无其他干扰影响正常工作的火灾探测器，应及时更换。
          </div>
          <el-button slot="reference">什么是高频报警部件？</el-button>
        </el-popover>
      </div>
      
      <el-button @click="addNew">新增</el-button>
    </div>
    <!--  -->
    <baseTable 
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :tableThead="tableThead" 
      :tableData="tableData"
      :ishownetworkBtn="true"
      :pageSize="10"
      :totalCount="totalCount"
      @pageChange="AlarmDeviceList_prev_next"
      @getnetwork="getnetwork"
      @getdialogContent="getdialogContent"
      @showdetails="showdetails"
      @deleteInfo="deleteTotal"
    >
    </baseTable>

    <!-- 详情和修改弹窗 -->
    <baseDialog @closeDialog="closeDialog" ref="baseDialog" title="消防设备信息">
      <el-form v-loading="loading" class="formBox" :rules="rules" ref="form" :model="equmentform" label-width="80px">
        <!-- 基本 -->
        <el-row class="baseBox" :gutter="20">
          <el-col class="left_box" :span="4">
            <div class="grid-content basetitle">基本</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content">
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="设备型号" prop="deviceModel">
                    <el-select  v-model="equmentform.deviceModel" placeholder="请选择设备型号">
                      <el-option 
                      v-for='item in DeviceTypes'
                      :key="item"
                      :label="item" 
                      :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                    <p class="marginleft10">设备名称：火警联网设施</p>
                </el-col>
              </el-row>
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="设备编号" prop="deviceSn">
                    <el-input  v-model="equmentform.deviceSn" placeholder="设备编号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="equmentform.deviceId" :span="12">
                    <p class="marginleft10" v-if="equmentform.state == '在线'">设备状态：<span class="green">{{equmentform.state}}</span></p>
                    <p class="marginleft10" v-if="equmentform.state == '离线'">设备状态：<span class="red">{{equmentform.state}}</span></p>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!-- 消防主机 -->
        <el-row class="baseBox" :gutter="20">
          <el-col class="left_box" :span="4">
            <div class="grid-content basetitle">消防主机</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content">
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                    <el-form-item  label="所在建筑" prop="fireUnitArchitectureId">
                      <el-select :disabled="equmentform.deviceId ? true :false"  v-model="equmentform.fireUnitArchitectureId" placeholder="请选择所在建筑">
                        <el-option 
                         v-for="item in buildList"
                        :key="item.id"
                        :label="item.name" 
                        :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="networkNum" :span="12">
                  <el-form-item  label="品牌：">
                    <el-input  v-model="equmentform.brand" placeholder="请输入品牌"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="通讯协议" prop="protocol">
                    <el-select  v-model="equmentform.protocol" placeholder="请选择通讯协议">
                      <el-option 
                        v-for="item in DeviceProtocols"
                        :key="item"
                        :label="item" 
                        :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="networkNum" :span="12">
                  <el-form-item  label="联网部件数量：" prop="netDetectorNum">
                    <el-input  v-model.number="equmentform.netDetectorNum" placeholder="请输入联网部件数量"></el-input>
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
              <!--  -->
              <el-row class="pd20">
                <el-col :span="24">
                  <el-form-item  label="发现故障" prop="Model">
                    <el-checkbox-group v-model="equmentform.enableFault">
                      <el-checkbox label="云端报警"></el-checkbox>
                      <el-checkbox label="发送短信"></el-checkbox>
                      <el-checkbox label="发送开关量信号"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row class="pd20">
                <el-col :span="24">
                  <el-form-item  label="发现火警" prop="Model">
                    <el-checkbox-group v-model="equmentform.enableAlarm">
                      <el-checkbox label="云端报警"></el-checkbox>
                      <el-checkbox label="发送短信"></el-checkbox>
                      <el-checkbox label="发送开关量信号"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                    <el-col  v-if="equmentform.enableAlarm.indexOf('发送短信') !=-1 ||equmentform.enableFault.indexOf('发送短信') !=-1" class="smsPhones" :span="16">
                      <el-form-item  label="接收手机">
                        <el-input  v-model="equmentform.smsPhones" placeholder="请输入接收手机号码(输入多个时需要用英文逗号隔开)"></el-input>
                      </el-form-item>
                    </el-col>
                </el-col>
              </el-row>
              <div>
                <!--  -->
                <el-row  class="pd20" :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="串口参数" prop="comType">
                          <el-select  v-model="equmentform.comType" placeholder="请选择类型">
                            <el-option 
                              v-for="item in types"
                              :key="item"
                              :label="item" 
                              :value="item"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="波特率" prop="baudRate">
                          <el-select  v-model="equmentform.baudRate" placeholder="请选择波特率">
                            <el-option 
                              v-for="item in Baudrates"
                              :key="item"
                              :label="item" 
                              :value="item"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--  -->
                <el-row class="pd20" :gutter="20">
                  <el-col :span="12">
                    <el-form-item  label="通讯方式" prop="netComm">
                      <el-select  v-model="equmentform.netComm" placeholder="请选择通讯方式">
                        <el-option label="以太网" value="以太网"></el-option>
                        <el-option label="WIFI" value="WIFI"></el-option>
                        <el-option label="NB-IOT" value="NB-IOT"></el-option>
                        <el-option label="4G" value="4G"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              
            </div>
          </el-col>
        </el-row>
        <!-- 按钮 -->
        <el-row  class="btns" :gutter="20">
          <el-button @click="add_update_equment">提交</el-button>
          <el-button @click="cancel(equmentform.deviceId)">取消</el-button>
        </el-row>
      </el-form>
          
    </baseDialog>

    <!-- 火警联网部件 -->
    <baseDialog class="networkDialog" ref="networkDialog" title="火警联网部件">
      <div class="topBox">
        <el-button @click="Import">导入</el-button>
        <el-button @click="addNetworkcomponents" class="add">新增</el-button>
      </div>
      <baseTable 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" 
        :totalCount="networktotalCount"
        :pageSize="5"
        :tableThead="networkThead"
        :tableData="networkData"
        :currentpage="networkPage.current"
        @pageChange="network_prev_next"
        @showdetails="showdetails_network"
        @deleteInfo="DeleteDetector"
      ></baseTable>
    </baseDialog>
    <!-- 联网部件详情弹窗 -->
    <baseDialog  @closeDialog="closeDialog" ref="network_detailDialog" title="联网部件信息">
      <el-form  ref="network_detail"  :rules="networkFormrules"  class="network_detail-form" label-width="120px" :model="networkForm">
            <el-form-item label="部件地址：" prop="identify">
                <el-input v-model="networkForm.identify" placeholder="请输入部件地址（必填）"></el-input>
            </el-form-item>
            <el-form-item  label="部件类型：" prop="detectorTypeName">
                <el-select  v-model="networkForm.detectorTypeName" placeholder="请选择部件类型">
                    <el-option 
                    v-for="item in FireAlarmDetectorTypes"
                    :key="item"
                    :label="item" 
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <p class="build">
              所在建筑：
              <span>{{networkForm.fireUnitArchitectureName}}</span>
            </p>
            <el-form-item  label="楼层：" prop="fireUnitArchitectureFloorId">
              <el-select  v-model="networkForm.fireUnitArchitectureFloorId" placeholder="请选择所在楼层">
                  <el-option 
                  v-for="item  in fireUnitArchitecturefloors" 
                  :key="item.id"
                  :label="item.name" 
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="安装位置：" prop="location">
                <el-input v-model="networkForm.location" placeholder="请输入安装位置"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button @click="add_updatenetwork">提交</el-button>
              <el-button @click="network_cancel" class="cancel">取消</el-button>
            </el-form-item>


      </el-form>  
    </baseDialog>
    <!-- 联网部件导入 -->
    <baseDialog class="network_importDialog" ref="network_importDialog" title="联网部件导入">
      <div class="dialog_content">
        <p class="tips">注：导入的方式会覆盖现有的记录，如果要新增部分联网部件，请使用“新增”功能</p>
        <div class="build">
          <p>
            <span>所在建筑：</span>
            <span>{{this.networkForm.fireUnitArchitectureName}}</span>
          </p>
          <!-- <div>
            <span>选择文件：</span>
            <input type="file">
          </div> -->
        </div>
        <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            name="excelFile"
            :multiple="false"
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="uploadFile"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :auto-upload="false"
        >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">
              <p>只能上传excel文件</p> 
            </div>
        </el-upload>

        <div class="bottom">
          <span @click="download">模板下载</span>
        </div>
      </div>
    </baseDialog>
    <!-- 故障部件数量弹窗 -->
    <baseDialog class="threedialog" ref="faultListDialog" title="火警联网系统故障部件">
      <baseTable
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" 
        :tableThead="faultThead"
        :tableData="faultData"
        :pageSize="5"
        :totalCount="faultTotalCount"
        @pageChange="fault_next_prevPage"
      >
      </baseTable>
    </baseDialog>
    <!-- 火警联网系统30天火警记录弹窗 -->
    <baseDialog class="threedialog" ref="fireRecord_highFrequencyDialog" :title="alarm30_high_title">
      <div class="top_tips">火警联网设备编号：{{Alarm30Day_toptips_deviceSn}} <span>所在建筑：{{Alarm30Day_toptips_fireUnitArchitectureName}}</span></div>
      <baseTable 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :tableThead="Alarm30Day_highThead"
        :tableData="Alarm30Day_highData"
        :pageSize="5"
        :currentpage="Alarm30Day_highPage.current"
        :totalCount="Alarm30Day_highTotal"
        @pageChange="next_prevPage"
      >
      </baseTable>
    </baseDialog>
    <!-- 火警联网系统高频报警部件 -->
    <!-- <baseDialog ref="highFrequencyDialog" title="火警联网系统30天火警记录">
    </baseDialog> -->

  </div>  
 

</template>

<script>
import baseTable from '../../../components/baseTable/index'
import baseDialog from '../../../components/baseDialog'
import { error } from 'util';
export default {
  components:{
    baseTable,
    baseDialog
  },
  data(){
    //检验规则只能是数字
      var checknetDetectorNum = (rule, value, callback) => {
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }else{
             callback();
          }
        }, 1000);
      };
    return{
      page:{
        FireUnitId:localStorage.getItem('fireUnitID'),
        SkipCount:0,
        MaxResultCount:10
      },
      totalCount:0,//火警联网设施总数
      buildList:[],//所在建筑的选择列表
      DeviceTypes:[],//设备型号选择列表
      DeviceProtocols:[],//通讯协议选择列表
      Baudrates:['1200','2400','4800','9600','14400','19200','28800','38400','57600','115200'],
      types:['232','485'],
      tableThead:[
        {
          name:'设备编号',
          prop:'deviceSn'
        },
        {
          name:'所在建筑',
          prop:'fireUnitArchitectureName'
        },
        {
          name:'状态',
          prop:'state'
        },
        {
          name:'联网部件数量',
          prop:'netDetectorNum'
        },
        {
          name:'故障部件数量',
          prop:'faultDetectorNum'
        },
        {
          name:'部件故障率',
          prop:'detectorFaultRate'
        },
        {
          name:'30天火警数量',
          prop:'alarmNum30Day'
        },
        {
          name:'高频部件数量',
          prop:'highAlarmDetectorNum'
        },
        {
          name:'操作',
          width:'200px'
        },
      ],
      tableData:[],
      equmentform:{
        enableAlarm:[],
        enableFault:[],
      },
      equmentform1:{
        deviceModel:'TSJ-CS10',
        enableAlarm:['云端报警'],
        enableFault:['云端报警'],
        baudRate:'9600',
        comType:'232'
      },//设备信息
      rules:{
        deviceModel: [
            { required: true, message: "选择设备型号", trigger: "change" }
          ],
        deviceSn: [
            { required: true, message: "请填写设备编号", trigger: "blur" }
        ],
        netDetectorNum:[
          { validator: checknetDetectorNum, trigger: 'blur' }
        ]
      },
      PortParam:{},//串口参数
      //-----------------联网部件所有参数--------------------------------------
      networkFormrules:{
        identify: [
          { required: true, message: "请填写部件地址", trigger: "blur" }
        ],
      },
      networkThead:[
        {
          name:'部件地址',
          prop:'identify'
        },
        {
          name:'部件类型',
          prop:'detectorTypeName'
        },
        {
          name:'安装位置',
          prop:'location'
        },
        {
          name:'状态',
          prop:'state'
        },
        {
          name:'操作'
        }
      ],
      networkData:[],
      networkForm:{},//联网部件form
      FireAlarmDetectorTypes:[],//选择部件类型
      fireUnitArchitecturefloors:[],//选择楼层
      networktotalCount:0,//联网部件的table标的总数
      networkPage:{
        SkipCount:0,
        MaxResultCount:5,
        current:1
      },
      fileList:[],
      //----------------------------------------
      FaultPage:{
        SkipCount:0,
        MaxResultCount:5,
        current:1
      },//故障table的参数
      faultTotalCount:0,//table总数
      //故障部件table
      faultThead:[
        {
          name:"部件地址",
          prop:'identify'
        },
        {
          name:"部件类型",
          prop:'detectorTypeName'
        },
        {
          name:"楼层",
          prop:'fireUnitArchitectureFloorName'
        },
        {
          name:"安装位置",
          prop:'location'
        },
        {
          name:"故障描述",
          prop:'faultContent'
        },
        {
          name:"故障时间",
          prop:'faultTime'
        },
      ],
      faultData:[],
      //---------------
      alarm30_high_title:'火警联网系统30天火警记录',
      Alarm30Day_highPage:{
        SkipCount:0,
        MaxResultCount:5,
        current:1
      },
      Alarm30Day_highTotal:0,
      Alarm30Day_highThead:[],
      Alarm30Day_highData:[],
      Alarm30Day_toptips_fireUnitArchitectureName:'',
      Alarm30Day_toptips_deviceSn:'',
      highThead:[
        {
          name:"部件地址",
          prop:'identify'
        },
        {
          name:"部件类型",
          prop:'detectorTypeName'
        },
        {
          name:"楼层",
          prop:'fireUnitArchitectureFloorName'
        },
        {
          name:"安装位置",
          prop:'location'
        },
        {
          // name:"30天平均每天报警",
          name:"平均每天报警",                                                                                                      
          prop:'alarmNum'
        },
      ],
      Alarm30DayThead:[
        {
          name:"部件地址",
          prop:'identify'
        },
        {
          name:"部件类型",
          prop:'detectorTypeName'
        },
        {
          name:"楼层",
          prop:'fireUnitArchitectureFloorName'
        },
        {
          name:"安装位置",
          prop:'location'
        },
        {
          name:"报警时间",
          prop:'alarmTime'
        },
      ],

      loading:false

    }
  },
  created(){
     this.GetListByFireUnitId();//初始化所在建筑选择列表
     this.GetFireAlarmDeviceList();
     this.GetFireAlarmDeviceModels();
  },
  methods:{
    //table列表
    GetFireAlarmDeviceList(){
      this.loading = true
      this.$axios.get(this.$api.GetFireAlarmDeviceList,{params:this.page}).then(res=>{
        console.log("GetFireAlarmDeviceList",res)
         this.loading = false
        if(res.data.result.totalCount){
          ({items:this.tableData ,totalCount:this.totalCount} = res.data.result);
          if(res.data.result.items.length == 0 && res.data.result.totalCount >0){
            this.page.SkipCount = 0
            this.GetFireAlarmDeviceList()
          }
        }
      }).catch(err=>{
        console.log('err',err)
      })
    },
    //
    AlarmDeviceList_prev_next(page){
      this.page.SkipCount = (page-1)*this.page.MaxResultCount
      this.GetFireAlarmDeviceList();
    },
    //获取所在建筑
    GetListByFireUnitId(){
      let fireunitId = localStorage.getItem('fireUnitID')
      this.$axios.get(this.$api.GetListByFireUnitId,{params:{fireunitId}}).then(res=>{
        console.log("获取到的建筑",res)
        if(res.data.result.length>0){
          let arrlist =[];
          for(let arr of res.data.result){
           arrlist.push({name:arr.name,id:arr.id})
          }
          console.log("arrlist",arrlist)
          this.buildList = arrlist
        }
      }).catch(error=>{
        console.log("获取到的建筑error",error)
      })
    },
    //获取火警联网设备型号数组/和通讯协议
    GetFireAlarmDeviceModels(){
      this.$axios.all([
        this.$axios.get(this.$api.GetFireAlarmDeviceModels,{params:{}}),
        this.$axios.get(this.$api.GetFireAlarmDeviceProtocols,{params:{}})
      ]).then(this.$axios.spread((data1,data2)=>{
        console.log("data1",data1)
        console.log("data2",data2)
        if(data1.data.result.length>0){
          this.DeviceTypes = data1.data.result
        }
        if(data2.data.result.length>0){
          this.DeviceProtocols = data2.data.result
          //  this.DeviceProtocols =['test1']
        }

      })).catch(this.$axios.spread((data1,data2)=>{
        console.log("data1",data1)
        console.log("data2",data2)
      }))
    },
    //新增或修改联网设施
    add_update_equment(){
      this.$refs.form.validate(valid => {
        if(valid){
            this.equmentform.fireUnitId = localStorage.getItem('fireUnitID')
            console.log("this.equmentform",this.equmentform)
            let as = this.equmentform.deviceId ?
            this.$axios.put(this.$api.UpdateFireAlarmDevice,this.equmentform):
            this.$axios.post(this.$api.AddFireAlarmDevice,this.equmentform);
            as.then(res=>{
              console.log("新增设施成功",res)
              if(res.data.success){
                this.$message.success(
                    `${this.equmentform.deviceId ? "修改" : "新增"}联网设施成功`
                );
                 this.$refs.baseDialog.dialogVisible  = false;
                 this.GetFireAlarmDeviceList();
              }
            }).catch(err=>{
              console.log("新增或修改联网设施失败",err)
            })
        }
      })
     
    },
    //quxiao
    cancel(deviceId){
      if(deviceId){
        this.$refs.baseDialog.dialogVisible = false
      }else{
        let stringform = JSON.stringify(this.equmentform1)
        this.equmentform = JSON.parse(stringform)
        
      }
    },
     //新增
    addNew(){
      this.$refs.baseDialog.dialogVisible = true
      let stringform = JSON.stringify(this.equmentform1) 
      this.equmentform = JSON.parse(stringform)
      let contractPhone = localStorage.getItem('contractPhone')
      this.$set(this.equmentform,'smsPhones',contractPhone)

    },
    //关闭弹窗
    closeDialog(name){
      if(name == '联网部件信息'){
        this.$refs.network_detail.resetFields();
      }else if(name == '消防设备信息'){
        this.$refs.form.resetFields();
      }
    },
    //删除
    deleteTotal(item){
      console.log(item)
      let DeviceId = item.deviceId
      this.$axios.delete(this.$api.DeleteFireAlarmDevice,{params:{DeviceId}}).then(res=>{
          console.log("删除成功",res)
        if(res.data.success){
          this.$message({
            message: '删除该条数据成功',
            type: 'success'
          });
          this.GetFireAlarmDeviceList()
        }
      
      }).catch(err=>{
        console.log("删除是被",err)
      })
    },
    // 查看总table的详情和获取串口参数
    showdetails(item){
      this.$refs.baseDialog.dialogVisible = true
      let DeviceId = item.deviceId
      this.$axios.all([
        this.$axios.get(this.$api.GetSerialPortParam,{params:{DeviceId}}),
        this.$axios.get(this.$api.GetFireAlarmDevice,{params:{DeviceId}})
      ]).then(this.$axios.spread((data1,data2)=>{
        console.log("获取串口参数成功",data1)
        if(data1.data.success){
          this.PortParam = data1.data.result;
        }
        console.log("获取联网设施详情",data2)
        if(data2.data.success){
          let string = JSON.stringify(data2.data.result)
          this.equmentform = JSON.parse(string)
        }
      }))
    },
    //刷新获取串口参数
    refreshPortParam(){
      this.loading = true
      let DeviceId = this.equmentform.deviceId
      this.$axios.get(this.$api.GetSerialPortParam,{params:{DeviceId}}).then(res=>{
        console.log("刷新串口参数成功",res)
        if(res.data.success){
          this.loading =false;
          this.PortParam = res.data.result;
          this.$message({
            message: '串口参数刷新成功',
            type: 'success'
          });
        }
      }).catch(err=>{
        console.log("刷新串口参数失败",err)
      })
    },
    


    //--------------打开故障数量————30天火警数量____高频部件数量弹窗-------------------------------
    getdialogContent(item,name){
      console.log("name",name,item)
      if(name == '故障部件数量'){
        this.$refs.faultListDialog.dialogVisible = true
        this.FaultPage.fireAlarmDeviceId = item.deviceId
        this.GetFireAlarmFaultDetectorList()
      }else if(name == '30天火警数量'){
        this.alarm30_high_title = '火警联网系统30天火警记录'
        this.$refs.fireRecord_highFrequencyDialog.dialogVisible = true
        this.Alarm30Day_highPage.fireAlarmDeviceId = item.deviceId
        this.Alarm30Day_toptips_deviceSn = item.deviceSn //顶部显示的设备编号
        this.Alarm30Day_toptips_fireUnitArchitectureName = item.fireUnitArchitectureName //顶部显示的所在建筑
        this.Alarm30Day_highThead = this.Alarm30DayThead
        this.Alarm30Day_highPage.SkipCount = 0
        this.Alarm30Day_highPage.current = 1
        this.GetFireAlarm30DayList(this.Alarm30Day_highPage)
      }else if(name =='高频部件数量'){
        this.alarm30_high_title = '火警联网高频报警数量'
        this.Alarm30Day_highThead = this.highThead
        this.Alarm30Day_highPage.fireAlarmDeviceId = item.deviceId
        this.Alarm30Day_toptips_deviceSn = item.deviceSn //顶部显示的设备编号
        this.Alarm30Day_toptips_fireUnitArchitectureName = item.fireUnitArchitectureName //顶部显示的所在建筑
        this.Alarm30Day_highPage.SkipCount = 0
        this.Alarm30Day_highPage.current = 1
        console.log('Alarm30Day_highPage',this.Alarm30Day_highPage)
        this.$refs.fireRecord_highFrequencyDialog.dialogVisible = true
        this.GetFireAlarmHighList(this.Alarm30Day_highPage)
      }
    },
    //获取故障数量list
    GetFireAlarmFaultDetectorList(){
      this.loading = true
      this.$axios.get(this.$api.GetFireAlarmFaultDetectorList,{params:this.FaultPage}).then(res=>{
        this.loading = false
        console.log("打印获取故障设施列表",res);
        ({items:this.faultData,totalCount:this.faultTotalCount} = res.data.result);
      }).catch(err=>{
        console.log("打印获取故障设施列表失败",err)
      })
    },
    //------火警联网系统故障部件上下页---
    fault_next_prevPage(page){
      this.FaultPage.SkipCount = (page-1)*this.FaultPage.MaxResultCount
      this.FaultPage.current = page
      this.GetFireAlarmFaultDetectorList(this.FaultPage)
      
    },
    //获取30天火警数量
    GetFireAlarm30DayList(Alarm30Day_highPage){
      this.loading = true;//table加载动画
      this.$axios.get(this.$api.GetFireAlarm30DayList,{params:Alarm30Day_highPage}).then(res=>{
        console.log("获取30天火警数量成功",res);
        this.loading = false;//关闭加载动画
        ({items:this.Alarm30Day_highData,totalCount:this.Alarm30Day_highTotal} = res.data.result);
        for(let arr of this.Alarm30Day_highData){
         
          arr.alarmTime = this.deal(arr.alarmTime)
        }
      }).catch(err=>{
        console.log("获取30天火警数量失败",err)
      })
    },
    deal(data){
      var str = data.split('T');
      var str2 = str[1].split(".")
      var timestr = str[0] +" "+ str2[0]
      return timestr;
    },
    //高频报警数量
    GetFireAlarmHighList(Alarm30Day_highPage){
      this.loading = true;//table加载动画
       this.$axios.get(this.$api.GetFireAlarmHighList,{params:Alarm30Day_highPage}).then(res=>{
        console.log("获取高频报警数量成功",res);
         this.loading = false;//关闭加载动画
        ({items:this.Alarm30Day_highData,totalCount:this.Alarm30Day_highTotal} = res.data.result)
      }).catch(err=>{
        console.log("获取高频报警数量失败",err)
      })
    },
    //上下页
    next_prevPage(page){
      console.log("page",page)
      this.Alarm30Day_highPage.current = page
      this.Alarm30Day_highPage.SkipCount = (page-1)*this.Alarm30Day_highPage.MaxResultCount;
      console.log("this.Alarm30Day_highPage",this.Alarm30Day_highPage)
      if(this.alarm30_high_title == '火警联网系统30天火警记录'){
        this.GetFireAlarm30DayList(this.Alarm30Day_highPage)
      }else if(this.alarm30_high_title == '火警联网高频报警数量'){
        this.GetFireAlarmHighList(this.Alarm30Day_highPage)
      }
     
    },
    //----------------联网部件------------------------------------------------
    //联网部件table弹窗
    getnetwork(item){
      console.log("getnetworkTable",item)
     /*  this.networkForm.fireUnitArchitectureName = item.fireUnitArchitectureName
      this.networkForm.fireUnitArchitectureId = item.fireUnitArchitectureId
      this.networkForm.deviceSn = item.deviceSn */
     
      this.networkForm.fireUnitArchitectureName = item.fireUnitArchitectureName
      let networkForm={}
      networkForm.fireUnitArchitectureName = item.fireUnitArchitectureName
      networkForm.fireUnitArchitectureId = item.fireUnitArchitectureId
      networkForm.deviceSn = item.deviceSn
      networkForm.fireAlarmDeviceId = item.fireAlarmDeviceId
      localStorage.setItem('networkForm',JSON.stringify(networkForm))
      this.$refs.networkDialog.dialogVisible = true; //显示弹窗
      this.networkPage.DeviceSn = item.deviceSn
      this.networkPage.fireAlarmDeviceId = item.deviceId
      this.networkPage.SkipCount = 0
      this.networkPage.current = 1
      
      this.GetDeviceDetectorList();//获取联网部件tablelist
      this.getneteorktypes_build(networkForm);//获取联网部件的楼层和部件类型

    
    },
    //获取联网部件的列表
    GetDeviceDetectorList(){
      this.loading = true
      this.$axios.get(this.$api.GetDeviceDetectorList,{params: this.networkPage}).then(res=>{
        console.log("获取该条联网部件",res);
        this.loading = false;
        ({items:  this.networkData,totalCount: this.networktotalCount} = res.data.result);
        if(res.data.result.items.length == 0 && res.data.result.totalCount>0){
            this.networkPage.SkipCount = 0
            this.GetDeviceDetectorList()
        }

      }).catch(err=>{
        console.log("获取该条联网部件失败",err)
      })
    },
    //联网部件的table上下页
    network_prev_next(page){
      this.networkPage.SkipCount = (page-1)*this.networkPage.MaxResultCount
      console.log("this.networkPage",this.networkPage)
      this.networkPage.current = page
      this.GetDeviceDetectorList();
    },
    //新增联网部件
    addNetworkcomponents(){
      this.networkForm ={}
      let networkForm = JSON.parse(localStorage.getItem('networkForm')) 
      this.networkForm.fireUnitArchitectureName =networkForm.fireUnitArchitectureName
      this.networkForm.fireUnitArchitectureId = networkForm.fireUnitArchitectureId
      this.networkForm.deviceSn = networkForm.deviceSn
      this.$refs.network_detailDialog.dialogVisible = true
     
     
    },
     //获取联网部件的楼层和部件类型
    getneteorktypes_build(networkForm){
      console.log("获取联网部件的楼层和部件类型")
      let fireunitId = localStorage.getItem('fireUnitID')
      this.$axios.all([       
        this.$axios.get(this.$api.GetFireAlarmDetectorTypes,{params:{}}),                                                                         
        this.$axios.get(this.$api.GetListByFireUnitId,{params:{fireunitId}})
      ]).then(this.$axios.spread((res0,res)=>{
        console.log("获取部件类型",res0)
        this.FireAlarmDetectorTypes = res0.data.result
        console.log("获取所在建筑 的楼层",res)
         console.log("名字相等",networkForm.fireUnitArchitectureName)
        if(res.data.result.length>0){
          for(let arr of res.data.result){
            if(networkForm.fireUnitArchitectureName == arr.name){
              this.fireUnitArchitecturefloors = arr.floors
            }
          }
        }
      }))
    },
    //提交或修改联网部件
    add_updatenetwork(){
      console.log(this.networkForm)
      this.$refs.network_detail.validate(valid => {
        if(valid){
          let as = this.networkForm.detectorId ?
          this.$axios.put(this.$api.UpdateFireAlarmDetector,this.networkForm):
          this.$axios.post(this.$api.AddFireAlarmDetector,this.networkForm);
          as.then(res=>{
            console.log("新增或修改联网部件成功",res)
            if(res.data.success){
              this.$refs.network_detailDialog.dialogVisible = false
              this.$message.success(
                      `${this.networkForm.detectorId ? "修改" : "新增"}联网部件成功`
                  );
              this.GetDeviceDetectorList(JSON.parse(localStorage.getItem('networkForm')).deviceSn );
            }
          }).catch(err=>{
            console.log("新增或修改联网部件失败",err)
          })
        }
      })
    },
    //取消
    network_cancel(){

    },
    //联网部件详情
    showdetails_network(item){
      console.log("联网部件详情",item)
      this.$refs.network_detailDialog.dialogVisible = true
      this.networkForm = item
      // this.getneteorktypes_build();
    },
    //删除联网部件
    DeleteDetector(item){
      let DetectorId = item.detectorId
      this.$axios.delete(this.$api.DeleteDetector,{params:{DetectorId}}).then(res=>{
        console.log("删除",res);
      
          this.$message({
            message: '删除该条数据成功',
            type: 'success'
          });
           this.GetDeviceDetectorList(JSON.parse(localStorage.getItem('networkForm')).deviceSn );
      })
    },
    //-----------------导入联网部件-------
    Import(){
      this.$refs.network_importDialog.dialogVisible = true
      
    },
    //模板下载
    download(){
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = 'http://futest.sctsjkj.com/template/消防火警联网部件设施数据表.xlsx';
      link.click();
    },  
    handleExceed(){
      this.$notify({
        title: '警告',
        message: '只能上传一个文件哦!,若需要上传其他文件请先移除已选择的文件',
        type: 'warning'
      });
    },
    uploadFile(item){
      const form = new FormData();
      form.append('FireAlarmDeviceSn',this.networkPage.DeviceSn)
      form.append('file',item.file)
      this.$axios.post(this.$api.ImportFireAlarmDetector,form).then(res=>{
        console.log("res",res)
        if(res.data.result.success){
          this.$message({
            message: '导入数据成功!',
            type: 'success'
          });
          this.GetDeviceDetectorList();//获取联网部件tablelist
        }else{
          this.$message({
            showClose: true,
            message: `导入失败！${res.data.result.failCause}`,
            type: 'error',
            duration:'6000'
          });
        }
        this.fileList =[]
        this.$refs.network_importDialog.dialogVisible = false
      }).catch(err=>{
        console.log("err",err)
      })

    },
    //上传之前的判断文件大小和格式
    beforeAvatarUpload(file){
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      if (!extension && !extension2) {
           alert("上传模板只能是 xls、xlsx格式!");
      }
    },
    submitUpload(){
      this.$confirm('导入的方式会覆盖现有的记录, 是否继续?', '导入数据', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
      }).then(() => {
          this.$refs.upload.submit();
            
      }).catch(() => {

      });
    
    }
  }
}
</script>

<style lang="less">
  .firenetworkingBox{
    .green{
      color: rgb(12, 179, 12) !important;
    }
    .red{
     color: #cccccc;
    }

    //total
    .el-form-item__label{
      font-size: 14px;
      color: white;
    }
    .top_tips{
      width: 100%;
      display: flex;
      align-items: center;
     
      justify-content: space-between;
      .tooltip{
        .el-button{
          background: #011524;
          border: none;
          color: rgb(214, 206, 206);
        }
        .content{
          padding: 20px;
        }
      }
      &>.el-button{
        width: 200px;
        background: #025691;
        color: white;
      }
    }
    // --------------------------------
    .formBox{
      width: 90%;
      padding: 20px;
      border: 1px solid darkblue;
      box-shadow: 0 2px 12px 0 #29d;
      .el-form-item{
        margin: 0px;
      }
      .el-form-item__content{
        width: 60%;
        .el-select{
          width: 100%;
        }
      }
      .smsPhones{
        margin-left: 70px;
      }
     /*  .el-select{
        width: 80%;
      } */
        .networkNum{
          .el-form-item__label{
            width: 120px !important;
            text-align: left;
          }
          .el-form-item__content{
            margin-left: 120px !important;
          }
        }
      .baseBox{
        display: flex;
        align-items: center;
        border: 1px dotted rgb(124, 123, 123);
        border-radius: 4px;
        padding: 14px 0px;
        .left_box{
          height: 80px;
          line-height: 80px;
          border-right:1px dotted rgb(124, 123, 123)
        }
        &:nth-of-type(2){
          margin: 20px 0px;
        }
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
        /* width: 80%; */
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
      
    }
    .el-dialog__body{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    //火警联网--------------------------------
    .networkDialog{
        .topBox{
          display: flex;
          .el-button{
            width: 160px;
            color: #cccccc;
            background: #025691;
            &.add{
              color: white;
              border-color:rgb(11, 153, 219);
            }

          }
        }
        .baseTable_pagenation{
          width: 100%;
        }
    }
    // 
    .network_detail-form{
      width: 50%;
      .el-input__inner{
        background: #025691;
        color: #cccccc;
      }
      .el-select{
        width: 100%;
      }
      .build{
        padding-left: 40px;
        color: white;
        margin-bottom: 20px;
        span{
          margin-left: 16px;
        }
      }
      .el-button{
        width: 48%;
        background: #025691;
        color: white;
        &.cancel{
          background: #011524;
        }
      }
    }
    //导入弹窗
    .network_importDialog{
      .dialog_content{
        display: flex;
        flex-direction: column;
        border: 1px solid darkblue;
        width: 500px;
        border-radius: 8px;
        padding: 40px;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 #29d;
        .tips{
          color: #cccccc;
          font-size: 16px;
        }
        p{
          line-height: 1.5;
          color: white;
        }
        .build{
          margin: 10px 0px;
          font-size: 16px;
          p{
            margin-bottom: 20px;
          }
          div{
            color: white;
          }
        }
        .bottom{
              width: 400px;
              margin-top: 10px;
              &>span{
                color: #0576c7;
                cursor: pointer;
                font-size: 16px;
              }
              .btn_box{
                margin-top: 16px;
                .el-button{
                  background:#011524;
                  color: #cccccc !important;
                }
              }
        }
        .el-upload-list{
          .el-upload-list__item:hover{
            a{
              color: #025691;
              .el-icon-document{
               color: #025691;
              }
           }
            
          }
          li{
            border: 1px solid darkblue;
            a{
              color: white;
              .el-icon-document{
                color: white;
              }
            }
          }
        }
 
      }
    }
    //
    .threedialog{
      .top_tips{
        color: white;
      }
      .baseTable_pagenation{
        width: 100%;
      }
    }
  }
 
</style>