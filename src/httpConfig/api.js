const API = {
    //    todo 登录模块
    USER_LOGIN: "/api/services/app/FireUnitUser/UserLogin", // 用户登录(PC端)
    USER_LOG_OUT: "/api/services/app/FireDeptUser/UserLogout", // 注销用户
    GET_VERIFY_CODE: "/api/services/app/FireUnitUser/GetVerifyCode", // 获取验证码
  
    //todo 数据大屏
    // GetAlarmChecks: "/api/services/app/Alarm/GetAlarmChecks",//【消防预警实时达】获取指定防火单位警情数据
    GetBreakDownTotal:'/api/services/app/BreakDownService/GetBreakDownTotal',//设施故障处理情况
    GetPatrollist:'/api/services/app/DutyAndPatrolService/GetPatrollist',//巡查记录

    GetFireAlarmForDataScreen:'/api/services/app/Alarm/GetFireAlarmForDataScreen',//获取数据大屏的火警联网实时达
    GetDeviceStatusForDataScreen:'/api/services/app/FireDevice/GetDeviceStatusForDataScreen',//用于数据大屏：获取各类消防物联网设施的各种状态及数量
    GetPatrollistForCalendar:"/api/services/app/DutyAndPatrolService/GetPatrollistForCalendar",//获取巡查记录日历列表
    GetDutylistForCalendar:"/api/services/app/DutyAndPatrolService/GetDutylistForCalendar",//获取值班记录日历列表
    GetDetectorBitMap:'/api/services/app/FireDevice/GetDetectorBitMap',//

    //火警联网
   /*  GetAlarmCheckDetail:'/api/services/app/Alarm/GetAlarmCheckDetail',//警情详细信息
    CheckAlarm:'/api/services/app/Alarm/CheckAlarm',//核警某一条警情---------数据大屏 */
    GetFireAlarmList:'/api/services/app/Alarm/GetFireAlarmList',//获取火警联网数据列表
    GetFireAlarmById:'/api/services/app/Alarm/GetFireAlarmById',//根据fireAlarmId获取单条火警数据详情
    CheckFireAlarm:'/api/services/app/Alarm/CheckFireAlarm',//火警联网核警[FromForm]
    GetFireAlarmCheckStatusNum:'/api/services/app/Alarm/GetFireAlarmCheckStatusNum',//获取未核警、已核警数量
    
    
    GetElectricAlarmCheckStatusNum:'/api/services/app/Alarm/GetElectricAlarmCheckStatusNum',//获取电气火灾未处理、已处理警情数量
    CheckElectricAlarm:'/api/services/app/Alarm/CheckElectricAlarm',//电气火灾警情处理
    GetElectricAlarmList:"/api/services/app/Alarm/GetElectricAlarmList",//电气火灾
    GetElectricAlarmCheckDetail:'/api/services/app/Alarm/GetElectricAlarmCheckDetail',//获取单条电气火灾警情处理详情

    GetWaterAlarmCheckStatusNum:'/api/services/app/Alarm/GetWaterAlarmCheckStatusNum',//获取消防管网未处理、已处理警情数量
    GetWaterAlarmList:"/api/services/app/Alarm/GetWaterAlarmList",//消防管网
    GetWaterAlarmCheckDetail:'/api/services/app/Alarm/GetWaterAlarmCheckDetail',// 获取单条消防管网警情处理详情
    CheckWaterAlarm:'/api/services/app/Alarm/CheckWaterAlarm',//消防管网警情处理
    //
    GetVisionAlarmList:"/api/services/app/Alarm/GetVisionAlarmList",//获取防火单位消防分析仪报警列表数据
    GetVisionAlarmPhotoPath:'/api/services/app/Alarm/GetVisionAlarmPhotoPath',//
    GetVisionDeviceList:'/api/services/app/FireDevice/GetVisionDeviceList',//获取消防分析仪设备列表

    AddVisionDevice:'/api/services/app/FireDevice/AddVisionDevice',//添加消防分析仪设备
    
    GetVisionDevice:'/api/services/app/FireDevice/GetVisionDevice',//
    UpdateVisionDevice:'/api/services/app/FireDevice/UpdateVisionDevice',//修改消防分析仪设备
    DeleteVisionDevice:'/api/services/app/FireDevice/DeleteVisionDevice',//删除消防分析仪设备
    GetVisionDetectorList:'/api/services/app/FireDevice/GetVisionDetectorList',//列表中点击“监控路数”时，获取监控路数列表数据
    UpdateVisionDetectorList:'/api/services/app/FireDevice/UpdateVisionDetectorList',//  监控路数页面点击提交保存时调用的接口
  




    //设施故障
    GetBreakDownlist:'/api/services/app/BreakDownService/GetBreakDownlist',//获取设施故障列表
    GetBreakDownInfo:'/api/services/app/BreakDownService/GetBreakDownInfo',//获取设施故障详情
    UpdateBreakDownInfo:'/api/services/app/BreakDownService/UpdateBreakDownInfo',//更新设施故障

    //值班记录
    GetDutylist:"/api/services/app/DutyAndPatrolService/GetDutylist",//获取值班记录列表
    GetDutyInfo:"/api/services/app/DutyAndPatrolService/GetDutyInfo",//Web获取值班记录详情
    GetDutyStateTotal:"/api/services/app/DutyAndPatrolService/GetDutyStateTotal",//获取值班记录总统计

    //巡查记录
    GetPatrolList:"/api/services/app/DutyAndPatrolService/GetPatrolList",//获取巡查记录列表
    GetPatrolInfo:"/api/services/app/DutyAndPatrolService/GetPatrolInfo",//获取巡查记录详情
    GetPatrolStatusTotal:"/api/services/app/DutyAndPatrolService/GetPatrolStatusTotal",//获取巡查记录状态统计

  

    //消防预案
    GetFirePlan:'/api/services/app/FireUnit/GetFirePlan',
    SaveFirePlan:'/api/services/app/FireUnit/SaveFirePlan',

    //单位信息
    GetFireUnitInfo:"/api/services/app/FireUnit/GetFireUnitInfo",//（单个防火单位）防火单位详情
    GET_FIRE_UNIT_REPORT_DATA: "/api/services/app/FireUnit/GetFireUnitReportData", //得到防火单位报表数据
    Update:'/api/services/app/FireUnit/Update',//修改防火单位信息

    GetFireUnitCard:'/api/services/app/FireUnit/GetFireUnitCard',//获取防火单位熟悉卡详情
    UpdateFireUnitCard:'/api/services/app/FireUnit/UpdateFireUnitCard',//修改单位熟悉卡

    //---建筑信息
    ArchitectureAdd:'/api/services/app/FireUnitArchitecture/Add',//添加建筑
    GetListByFireUnitId:'/api/services/app/FireUnitArchitecture/GetListByFireUnitId',//获取总得建筑信息
    ArchitectureGetById:'/api/services/app/FireUnitArchitecture/GetById',//获取某建筑的具体信息
    Delete:'/api/services/app/FireUnitArchitecture/Delete',//删除某建筑
    ArchitectureUpdate:'/api/services/app/FireUnitArchitecture/Update',//修改建筑信息
    UpdateFloor:'/api/services/app/FireUnitArchitecture/UpdateFloor',//修改楼层信息
    GetFloorById:"/api/services/app/FireUnitArchitecture/GetFloorById",//根据楼层Id获取楼层信息

    //消防从业人员
    GetFireUnitPeople:'/api/services/app/AppGuideSet/GetFireUnitPeople',//获取
    UpdateUserInfo:'/api/services/app/AppGuideSet/UpdateUserInfo',//编辑工作人员信息
    AddUser:'/api/services/app/AppGuideSet/AddUser',//新增工作人员
    DeleteUser:'/api/services/app/AppGuideSet/DeleteUser',//删除工作人员
    //获取微型消防站
    MiniFireStationGetById:'/api/services/app/MiniFireStation/GetByFireUnitId',//获取微型消防站
    MiniFireStationUpdate:'/api/services/app/MiniFireStation/Update',//修改
    MiniFireStationAdd:'/api/services/app/MiniFireStation/Add',//新增
    //-
    GetMiniFireJobUser: "/api/services/app/MiniFireStation/GetMiniFireJobUser", //获取指定ID的微型消防站人员列表
    AddJobUser: "/api/services/app/MiniFireStation/AddJobUser", // 添加指定微型消防站人员
    UpdateJobUser: "/api/services/app/MiniFireStation/UpdateJobUser", // 修改指定微型消防站人员
    GetJobUserDetail: "/api/services/app/MiniFireStation/GetJobUserDetail", //获取微型消防站人员详情
    DeleteJobUser: "/api/services/app/MiniFireStation/DeleteJobUser", // 删除指定微型消防站人员
    //-
    GetMiniFireEquipmentList: "/api/services/app/MiniFireStation/GetMiniFireEquipmentList", //取指定微型消防站ID的消防设施列表
    GetMiniFireEquipmentTypes: "/api/services/app/MiniFireStation/GetMiniFireEquipmentTypes", //获取微型消防站设施类别
    GetMiniFireEquipmentsByType: "/api/services/app/MiniFireStation/GetMiniFireEquipmentsByType", //获取微型消防站设施类别下属设施
    AddMiniFireEquipment: "api/services/app/MiniFireStation/AddMiniFireEquipment", //新增微型消防站设施
    UpdateMiniFireEquipment: "/api/services/app/MiniFireStation/UpdateMiniFireEquipment", //修改设施配备信息
    DeleteMiniFireEquipment:"/api/services/app/MiniFireStation/DeleteMiniFireEquipment", //删除设施配备条例
    //-
    GetActionList:"/api/services/app/MiniFireStation/GetActionList", //获取微型消防站活动列表
    AddMiniFireAction:"/api/services/app/MiniFireStation/AddMiniFireAction", //新增微型消防站活动
    UpdateMiniFireAction:"/api/services/app/MiniFireStation/UpdateMiniFireAction", //更新微型消防站活动详情
    GetMiniFireAction:"/api/services/app/MiniFireStation/GetMiniFireAction", //获取某一条活动的活动详情
    DeleteMiniFireAction : "/api/services/app/MiniFireStation/DeleteMiniFireAction", //删除某一条活动记录

    //消防设施
    GetFireAlarmDeviceStateNum:'/api/services/app/FireDevice/GetFireAlarmDeviceStateNum',// 获取某个防火单位的火警联网设施状态数量
    GetFireAlarmDeviceList:'/api/services/app/FireDevice/GetFireAlarmDeviceList',//获取指定防火单位ID的火警联网设施列表
    AddFireAlarmDevice:'/api/services/app/FireDevice/AddFireAlarmDevice',//新增火警联网设备
    GetFireAlarmDeviceModels:'/api/services/app/FireDevice/GetFireAlarmDeviceModels',//获取火警联网设备型号数组
    GetFireAlarmDeviceProtocols:'/api/services/app/FireDevice/GetFireAlarmDeviceProtocols',//获取火警联网设备协议数组
    DeleteFireAlarmDevice:'/api/services/app/FireDevice/DeleteFireAlarmDevice',//删除火警联网设备
    GetFireAlarmDevice:'/api/services/app/FireDevice/GetFireAlarmDevice',//获取火警联网设备详情
    UpdateFireAlarmDevice:'/api/services/app/FireDevice/UpdateFireAlarmDevice',//修改火警联网设备
    GetSerialPortParam:'/api/services/app/FireDevice/GetSerialPortParam',//获取串口参数
    //-联网部件
    ImportFireAlarmDetector:'/api/services/app/FireDevice/ImportFireAlarmDetector',//导入火警联网网关对应消防主机的联网部件
    DeleteDetector:'/api/services/app/FireDevice/DeleteDetector',//删除部件
    AddFireAlarmDetector:'/api/services/app/FireDevice/AddFireAlarmDetector',//添加火警联网部件
    GetDeviceDetector:'/api/services/app/FireDevice/GetDeviceDetector',//获取部件详情
    GetDeviceDetectorList:'/api/services/app/FireDevice/GetDeviceDetectorList',//获取指定设备SN的部件列表
    UpdateFireAlarmDetector:'/api/services/app/FireDevice/UpdateFireAlarmDetector',//修改火警联网部件
    GetFireAlarmDetectorTypes:'/api/services/app/FireDevice/GetFireAlarmDetectorTypes',//获取火警联网设施部件类型数组

    //-获取故障数量
    GetFireAlarmFaultDetectorList:'/api/services/app/FireDevice/GetFireAlarmFaultDetectorList',//获取指定设备ID的故障部件列表
    //-30天报警记录
    GetFireAlarm30DayList:'/api/services/app/FireDevice/GetFireAlarm30DayList',//获取指定设备ID的30天报警记录
    //-高频报警数量
    GetFireAlarmHighList:'/api/services/app/FireDevice/GetFireAlarmHighList',//获取高频报警部件列表




    //独立式火警设备---烟感
    AddIndependentDetector:'/api/services/app/IndependentDetector/AddIndependentDetector',//新增独立式火警设备
    UpdateIndependentDetector:'/api/services/app/IndependentDetector/UpdateIndependentDetector',//修改独立式火警设备信息
    GetIndependentDetectorList:'/api/services/app/IndependentDetector/GetIndependentDetectorList',//获取独立式火警设备列表
    GetIndependentDetector:'/api/services/app/IndependentDetector/GetIndependentDetector',//获取单个独立式火警设备信息
    DeleteIndependentDetector:'/api/services/app/IndependentDetector/DeleteIndependentDetector',//删除独立式火警设备
    GetIndependentDetectorStatesNum:'/api/services/app/IndependentDetector/GetIndependentDetectorStatesNum',

    //-----------------------------------电气火灾--------------------------------------
    GetFireElectricDeviceState:'/api/services/app/FireDevice/GetFireElectricDeviceState',//获取电气火灾设备各状态数量
    GetFireElectricDeviceModels:'/api/services/app/FireDevice/GetFireElectricDeviceModels',//获取电气火灾设备型号数组
    GetFireElectricDeviceList:'/api/services/app/FireDevice/GetFireElectricDeviceList',//获取指定防火单位ID的电气火灾设施列表
    GetFireElectricDevice:'/api/services/app/FireDevice/GetFireElectricDevice',//获取电气火灾设备详情
    AddFireElectricDevice:'/api/services/app/FireDevice/AddFireElectricDevice',//新增电气火灾设备
    DeleteFireElectricDevice:'/api/services/app/FireDevice/DeleteFireElectricDevice',//删除电气火灾设备
    UpdateFireElectricDevice:'/api/services/app/FireDevice/UpdateFireElectricDevice',//修改电气火灾设备
    GetRecordElectric:'/api/services/app/FireDevice/GetRecordElectric',//获取指定防火单位ID的电气火灾设施列表
    GetSingleElectricDeviceData:'/api/services/app/FireDevice/GetSingleElectricDeviceData',//刷新某一电气火灾设备的当前数值
    BreakoffPower:'/api/services/app/FireDevice/BreakoffPower',//发送断电信号

    //添加消防管网设备
    AddFireWaterDevice:'/api/services/app/FireDevice/AddFireWaterDevice',//添加消防管网设备
    GetFireWaterDeviceModels:'/api/services/app/FireDevice/GetFireWaterDeviceModels',//
    UpdateFireWaterDevice:'/api/services/app/FireDevice/UpdateFireWaterDevice',//修改消防管网设备
    DeleteFireWaterDevice:'/api/services/app/FireDevice/DeleteFireWaterDevice',//删除消防管网设备
    GetFireWaterDeviceById:'/api/services/app/FireDevice/GetFireWaterDeviceById',//获取单个设备信息
    GetFireWaterDeviceList:'/api/services/app/FireDevice/GetFireWaterDeviceList',//获取消防管网设备列表



    //其他消防设施列表
    GetFireOrtherDeviceList:'/api/services/app/FireDevice/GetFireOrtherDeviceList',//获取其他消防设备列表
    AddFireOrtherDevice:'/api/services/app/FireDevice/AddFireOrtherDevice',//新增其他消防设备
    GetFireOrtherDevice:'/api/services/app/FireDevice/GetFireOrtherDevice',//获取获取指定其他消防设备ID的详情
    UpdateFireOrtherDevice:'/api/services/app/FireDevice/UpdateFireOrtherDevice',//修改其他消防设备
    DeleteFireOrtherDevice:'/api/services/app/FireDevice/DeleteFireOrtherDevice',//删除其他消防设备
    GetFireOrtherDeviceExpire:'/api/services/app/FireDevice/GetFireOrtherDeviceExpire',//取其他消防设施过期/即将过期数量
    ImportOrtherDevice:'/api/services/app/FireDevice/ImportOrtherDevice',//导入其它消防设备
    GetFireUnitSystem:'/api/services/app/AppGuideSet/GetFireUnitSystem',// 获取防火单位消防系统
   


    GetBitMapSet:'/api/services/app/FireDevice/GetBitMapSet',//获取楼层的火警点位图设置
    UpdateDetectorCoordinate:'/api/services/app/FireDevice/UpdateDetectorCoordinate',//修改部件在点位图上的坐标


    GetFireUnitReport:'/api/services/app/FireUnit/GetFireUnitReport',//获取防火单位的综合数据报告
    
    GetVisionAlarmTypeNum:'/api/services/app/Vision/GetVisionAlarmTypeNum',//获取AI智能分析仪警情各类型数据
    GetVisionAlarmList_Vision:'/api/services/app/Vision/GetVisionAlarmList',//获取AI智能分析仪警情列表
    GetMonitorList:'/api/services/app/Vision/GetMonitorList',//获取AI智能分析仪设备列表

  }
  ;
  export default API;
  
