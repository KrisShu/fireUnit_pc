<template>
  <div class="otherFacilitiesBox">
    <el-row class="otherFacilitiesBox_top">
      <el-col class="otherFacilitiesBox_top_right" :span="16">
        <el-button @click="screen('全部')" type="primary" round plain>
          全部
          <i v-if="screensign == '全部'" class="el-icon-check  el-icon--right"></i>
        </el-button>
        <el-button @click="screen('即将过期')" type="warning" round plain>
          即将过期：{{willExpireNum}}
          <i v-if="screensign == '即将过期'" class="el-icon-check  el-icon--right"></i>
        </el-button>
        <el-button @click="screen('已过期')" type="danger" round plain>
          已过期：{{expireNum}}
          <i v-if="screensign == '已过期'" class="el-icon-check  el-icon--right"></i>
        </el-button>
        <!--  -->
        <el-popover
            placement="top-start"
            trigger="hover"
        >
          <div class="content">
            <p style="color:orange" >即将过期：存在有效期，且今天距离有效期在30天之内</p>
            <p style="color:#F56C6C"  >已过期：存在有效期，今天的日期大于有效期</p>
          </div>
         <img  slot="reference" src="../../../assets/image/index/tooltip.png">
        </el-popover>
        <!--  -->
        <div class="selectBox">
          <span>所在建筑：</span>
          <el-select v-model="value" @change="screenForBuild" placeholder="请选择建筑">
             <el-option label="全部建筑" value=""></el-option>
            <el-option
              v-for="item in buildList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col class="otherFacilitiesBox_top_left" :span="8">
        <el-button @click="importData">导入</el-button>
        <el-button @click="addNew">新增</el-button>
      </el-col>

    </el-row>
    <!--  -->
    <baseTable
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :tableThead="tableThead"
      :tableData="tableData"
      :totalCount='totalCount'
      :pageSize="10"
      @deleteInfo="DeleteFireOrtherDevice"
      @showdetails="GetFireOrtherDevice"
      @pageChange="otherequmentPrev_next"
    >
    </baseTable>
    <!-- 新增或修改详情dialog -->
    <baseDialog title="消防信息" @closeDialog="closeDialog" class="add_updateDialog" ref="baseDialog">
      <el-form class="formBox" :rules="rules" ref="form" :model="otherequmentForm" label-width="80px">
          <!-- 基本 -->
        <el-row class="baseBox" :gutter="20">
          <el-col class="left_box" :span="4">
            <div class="grid-content basetitle">基本</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content">
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="所属系统" prop="fireSystemId">
                    <el-select  v-model="otherequmentForm.fireSystemId" placeholder="请选择所属系统">
                      <el-option
                        v-for="item in fireSystems"
                        :key="item.fireSystemID"
                        :label="item.fireSystemName" 
                        :value="item.fireSystemID">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  label="设备名称" prop="deviceName">
                    <el-input  v-model="otherequmentForm.deviceName" placeholder="请填写设备名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="设备型号">
                    <el-input  v-model="otherequmentForm.deviceType" placeholder="请输入设备型号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  label="设备编号">
                    <el-input  v-model="otherequmentForm.deviceSn" placeholder="请输入设备编号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!--位置  -->
        <el-row class="baseBox" :gutter="20">
          <el-col class="left_box" :span="4">
            <div class="grid-content basetitle">位置</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content">
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                  <el-form-item  label="所在建筑" prop="fireUnitArchitectureId">
                    <el-select  v-model="otherequmentForm.fireUnitArchitectureId" @change="selectFloors" placeholder="请选择所在建筑">
                      <el-option 
                      v-for="item in buildList"
                      :key="item.id"
                      :label="item.name" 
                      :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  label="楼层" prop="fireUnitArchitectureFloorId">
                    <el-select  v-model="otherequmentForm.fireUnitArchitectureFloorId" placeholder="请选择所在楼层">
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
                  <el-form-item  label="具体位置">
                    <el-input  v-model="otherequmentForm.location" placeholder="请输入安装位置"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!-- 有效期 -->
        <el-row class="baseBox" :gutter="20">
          <el-col class="left_box" :span="4">
            <div class="grid-content basetitle">有效期</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content">
              <el-row class="pd20" :gutter="20">
                <el-col :span="12">
                    <el-form-item  label="启用时间" prop="Model">
                      <el-date-picker
                        v-model="otherequmentForm.startTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="有效期" prop="expireTime">
                      <el-date-picker
                        v-model="otherequmentForm.expireTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="btns">
          <el-button @click="add_updateother">保存</el-button>
          <el-button @click="cancel(otherequmentForm.deviceId)">取消</el-button>
        </el-row>
      </el-form>
    </baseDialog>
    <!--  导入数据-->
    <baseDialog class="importDialog" ref="importDialog" title="消防设施导入">
      <div class="dialog_content">
        <p class="tips">注：导入的方式会覆盖现有的记录，如果要新增部分联网部件，请使用“新增”功能</p>
        <div class="bottom"> 
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            name="excelFile"
            :multiple="false"
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="uploadFile"
            :on-preview="handlePreview"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">
              <p>只能上传excel文件</p> 
            </div>
          </el-upload>
          <p @click="download" class="modeldownload">模板下载</p>
        </div>
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

      expireNum:'',
      willExpireNum:'',
      screensign:'全部',
      loading:false,
      OrtherDevicePage:{
        FireUnitId:localStorage.getItem('fireUnitID'),
        SkipCount:0,
        ExpireType:'',
        FireUnitArchitectureName:'',
        MaxResultCount:10
      },
      totalCount:0,
      fireSystems: [],
      buildList:[],//所在建筑
      floors:[],//所在楼层
      value: '',
      tableThead:[
        {
          name:'设备编号',
          prop:'deviceSn'
        },
        {
          name:'设备名称',
          prop:'deviceName'
        },
        {
          name:'所在建筑',
          prop:'fireUnitArchitectureName'
        },
        {
          name:'楼层',
          prop:'fireUnitArchitectureFloorName'
        },
        {
          name:'具体位置',
          prop:'location'
        },
        {
          name:'有效期',
          prop:'expireTime'
        },
        {
          name:'操作'
        }
      ],
      tableData:[],
      rules:{
          fireSystemId: [
            { required: true, message: "选择所属系统", trigger: "change" }
          ],
          deviceName:[
            { required: true, message: "选择设备名称", trigger: "change" }
          ]
      },
      otherequmentForm:{},
      //导入
      fileList:[] 

    }
  },
  created(){
    this.GetFireOrtherDeviceExpire();
    this.GetFireOrtherDeviceList();
    this.getbuild();//获取所在建筑列表
    this.GetFireUnitSystem();//获取所属系统
  },
  methods:{
    //其他消防设施过期和即将过期值
    GetFireOrtherDeviceExpire(){
      let FireUnitId = localStorage.getItem('fireUnitID')
      this.$axios.get(this.$api.GetFireOrtherDeviceExpire,{params:{FireUnitId}}).then(res=>{
        console.log("取其他消防设施过期",res);
        ({expireNum:this.expireNum,willExpireNum:this.willExpireNum} = res.data.result)

      }).catch(err=>{
        console.log("取其他消防设施过期",err)
      })
    },
    //通过建筑筛选
    screenForBuild(name){
      console.log("name",name)
      this.OrtherDevicePage.FireUnitArchitectureName = name
      this.OrtherDevicePage.SkipCount = 0
      this.GetFireOrtherDeviceList()
    },
    //通过状态筛选
    screen(state){
      if(state == '全部'){
        this.OrtherDevicePage.ExpireType =''
      }else{
        this.OrtherDevicePage.ExpireType =state
      }
      this.screensign = state
      this.OrtherDevicePage.SkipCount = 0
      this.GetFireOrtherDeviceList()
    },
    //获取其他消防设施列表
    GetFireOrtherDeviceList(){
      this.loading = true
      this.$axios.get(this.$api.GetFireOrtherDeviceList,{params:this.OrtherDevicePage}).then(res=>{
        console.log("获取其他消防设施列表成功",res);

        this.loading = false;
        ({items:this.tableData,totalCount:this.totalCount} = res.data.result);
        if(res.data.result.items.length == 0 && res.data.result.totalCount>0){
            this.OrtherDevicePage.SkipCount = 0
            this.GetFireOrtherDeviceList()
        }
      }).catch(err=>{
        console.log("获取其他消防设施列表失败",err)
      })
    },
    //上下页
    otherequmentPrev_next(page){
      this.OrtherDevicePage.SkipCount = (page-1)*this.OrtherDevicePage.MaxResultCount
      this.GetFireOrtherDeviceList();
    },
    //打开新增弹窗
    addNew(){
      this.$refs.baseDialog.dialogVisible = true
      this.otherequmentForm={}
    },
    //关闭则取消验证
    closeDialog(){
        this.$refs.form.resetFields();
    },
    //获取一条信息的详情
    GetFireOrtherDevice(item){
      this.$refs.baseDialog.dialogVisible = true
      let Deviceid = item.deviceId
      this.$axios.get(this.$api.GetFireOrtherDevice,{params:{Deviceid}}).then(res=>{
        console.log("获取详情",res)
        this.otherequmentForm = res.data.result
        this.selectFloors(res.data.result.fireUnitArchitectureId)
      }).catch(err=>{
        console.log("获取详情失败",err)
      })
    },
    //新增提交和修改提交
    add_updateother(){
      this.$refs.form.validate(valid => {
        if(valid){
            let fireUnitId = localStorage.getItem('fireUnitID')
            this.otherequmentForm.fireUnitId = fireUnitId
            console.log("this.otherequmentForm",this.otherequmentForm)
            let as = this.otherequmentForm.deviceId ?
            this.$axios.put(this.$api.UpdateFireOrtherDevice,this.otherequmentForm):
            this.$axios.post(this.$api.AddFireOrtherDevice,this.otherequmentForm);

            as.then(res=>{
              console.log("新增或修改成功",res)
              if(res.data.result.success){
                this.$message.success(
                      `${this.otherequmentForm.deviceId ? "修改" : "新增"}其他消防设施成功`
                );
                this.$refs.baseDialog.dialogVisible = false
                this.GetFireOrtherDeviceList();
              }else{
                console.log("res.data.result.failCause")
                this.$message({
                  message: res.data.result.failCause,
                  type: 'warning'
                });
              }
            })
        }
      })
     
      
    },
    //取消按钮
    cancel(id){
      if(id){
          this.$refs.baseDialog.dialogVisible = false
      }else{
        this.otherequmentForm ={}
      }
    },

    //获取所有建筑
    getbuild(){
      let fireunitId = localStorage.getItem('fireUnitID')
      this.$axios.all([
        this.$axios.get(this.$api.GetListByFireUnitId,{params:{fireunitId}})
      ]).then(this.$axios.spread((res1)=>{
        console.log("所在建筑",res1)
        this.buildList = res1.data.result
      }))
    },
    //选择楼层
    selectFloors(item){
      console.log("选择楼层",item)
      for(let arr of this.buildList){
        if(item == arr.id){
          this.floors = arr.floors
        }
      }
    },
    //获取该单位的所属系统
    GetFireUnitSystem(){
      let FireUnitId = localStorage.getItem('fireUnitID')
      this.$axios.get(this.$api.GetFireUnitSystem,{params:{FireUnitId}}).then(res=>{
        console.log("获取该单位的所属系统",res)
        this.fireSystems = res.data.result
      }).catch(err=>{
        console.log("获取该单位的所属系统失败",err)
      })
    },
    //删除
    DeleteFireOrtherDevice(item){
      let DeviceId = item.deviceId
      this.$axios.delete(this.$api.DeleteFireOrtherDevice,{params:{DeviceId}}).then(res=>{
        console.log("删除数据成功",res)
        if(res.data.success){
          this.$message({
            message: '删除数据成功',
            type: 'success'
          });
          this.GetFireOrtherDeviceList()
        }
      }).catch(err=>{
        console.log("删除失败",err)
      })
    },
    //----------------------导入数据------------------------------------------
    //打开导入的弹窗
    importData(){
      this.$refs.importDialog.dialogVisible = true
    },
    //模板下载
    download(){
      console.log("下载")
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = 'http://futest.sctsjkj.com/template/其它消防设施数据表.xlsx';
      link.click();
    },  
    //上传的请求
    uploadFile(item){
      console.log("uploadFileuploadFileuploadFileuploadFileuploadFileuploadFile",item )
      const form = new FormData();
      form.append('FireUnitId',localStorage.getItem('fireUnitID'))
      form.append('file',item.file)
      this.$axios.post(this.$api.ImportOrtherDevice,form).then(res=>{
        console.log("res",res)
        if(res.data.result.success){
          this.$message({
            message: '导入数据成功!',
            type: 'success'
          });
          this.GetFireOrtherDeviceList();
        }else{
          this.$message({
            showClose: true,
            message: `导入失败！${res.data.result.failCause}`,
            type: 'error',
            duration:'6000'
          });
        }
        this.fileList =[]
        this.$refs.importDialog.dialogVisible = false
      }).catch(err=>{
        console.log("err",err)
      })

    },
    handleExceed(item){
      this.$notify({
        title: '警告',
        message: '只能上传一个文件哦!,若需要上传其他文件请先移除已选择的文件',
        type: 'warning'
      });
    },
    //上传之前的判断文件大小和格式
    beforeAvatarUpload(file){
      console.log("上传是的监测")
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      if (!extension && !extension2) {
           alert("上传模板只能是 xls、xlsx格式!");
          }
    },
    //上传按钮触发uploadFile方法
    submitUpload(file) {
        this.$confirm('导入的方式会覆盖现有的记录, 是否继续?', '导入数据', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          this.$refs.upload.submit();
            
        }).catch(() => {

        });
    
    },
    //移除文件
    handleRemove(file, fileList) {
      console.log("删除这个",file, fileList);
    },
    handlePreview(file) {
      console.log(file,"dssaaaaaaaaaaa");
    }
  }
}
</script>

<style lang="less">
  .otherFacilitiesBox{
    .otherFacilitiesBox_top{
      
      .otherFacilitiesBox_top_right{
        display: flex;
        align-items: center;
        .all_btn{
          background: #025691;
          color: white;
          border-color: #025691;
        }
        .el-popover__reference{
          margin-left: 20px;
        }
        .selectBox{
          color: white;
          margin-left: 50px;
          .el-input__inner{
            color: white;
            background:  #011524;
          }
          input::placeholder{
            color: #999898;
          }
        }
      }

      .otherFacilitiesBox_top_left{
        .el-button{
          width: 200px;
          background: #025691;
          color: white;
        }
      }
    
    }
    .add_updateDialog{
      .formBox{
        width: 90%;
        padding: 20px;
        border: 1px solid darkblue;
        box-shadow: 0 2px 12px 0 #29d;
        .pd20{
          padding: 6px;
          display: flex;
          align-items: center;
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
        .basetitle{
          font-size: 16px;
          color: white;
        }
        .el-form-item__label{
          font-size: 14px;
          color: white;
        }
        .el-select{
          width: 100%;
        }
        .el-date-editor{
          width: 100% !important;
        }
        .el-input__inner{
          background: #025691;
          color: white;
        }
        input::placeholder{
         color: #999898;
      }
        .btns{
          display: flex;
          justify-content: center;
          margin-top: 20px;
          .el-button{
            width: 200px;
            background:#025691;
            color: white;
          }
        }
      
      }
    }
    //数据导入弹窗
    .importDialog{
      display: flex;
      justify-content: center;
      .el-dialog__body{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .dialog_content{
        display: flex;
        flex-direction: column;
        border: 1px solid darkblue;
        height: 280px;
        width: 500px;
        border-radius: 8px;
        padding: 40px;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 #29d;
        .tips{
          color: #cccccc;
          font-size: 16px;
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
            margin-top: 40px;
            .btn_box{
              margin-top: 16px;
              .el-button{
                background:#011524;
                color: #cccccc !important;
              }
            }
            .modeldownload{
              color: #0576c7;
              cursor: pointer;
              font-size: 16px;
              margin-top: 10px;
            }
      }
    }
    
  }


</style>