webpackJsonp([23],{df9Y:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("BO1k"),n=a.n(i),s=a("Nn1j"),r=a("HR9O"),o={components:{baseTable:s.a,baseDialog:r.a},data:function(){return{buttonarr:[{type:"primary",text:"全部"},{type:"warning",text:"室外通道",num:0},{type:"danger",text:"室内通道",num:0},{type:"warning",text:"火焰烟雾",num:0}],screensign:"全部",loading:!1,tableData:[],tableThead:[{name:"报警时间",prop:"creationTime"},{name:"警情类型",prop:"visionAlarmType"},{name:"摄像编号",prop:"visionDevice"},{name:"监控地点",prop:"location"},{name:"报警图片"},{name:"解除警情时间",prop:"releaseTime"},{name:"解除警情图片"}],totalCount:0,page:{FireUnitId:localStorage.getItem("fireUnitID"),VisionAlarmType:0,SkipCount:0,MaxResultCount:10},srcList:[]}},created:function(){this.GetVisionAlarmTsjList(),this.GetVisionAlarmTsjNum()},methods:{GetVisionAlarmTsjList:function(){var t=this;this.$axios.get(this.$api.GetVisionAlarmTsjList,{params:this.page}).then(function(e){console.log("res",e);var a=!0,i=!1,s=void 0;try{for(var r,o=n()(e.data.result.items);!(a=(r=o.next()).done);a=!0){var l=r.value;l.creationTime=t.delTime(l.creationTime),l.releaseTime&&(l.releaseTime=t.delTime(l.releaseTime))}}catch(t){i=!0,s=t}finally{try{!a&&o.return&&o.return()}finally{if(i)throw s}}var u=e.data.result;t.totalCount=u.totalCount,t.tableData=u.items})},GetVisionAlarmTsjNum:function(){var t=this;this.$axios.get(this.$api.GetVisionAlarmTsjNum,{params:{fireUnitId:this.page.FireUnitId}}).then(function(e){console.log("状态数量",e),t.buttonarr[1].num=e.data.result.passagewayOutdoor,t.buttonarr[2].num=e.data.result.passagewayIndoor,t.buttonarr[3].num=e.data.result.fire})},delTime:function(t){var e=t.split("T"),a=e[1].split(".");return e[0]+" "+a[0]},screen:function(t){this.screensign=t,"室外通道"==t?this.page.VisionAlarmType=3:"室内通道"==t?this.page.VisionAlarmType=2:"火焰烟雾"==t?this.page.VisionAlarmType=1:"全部"==t&&(this.page.VisionAlarmType=0),this.GetVisionAlarmTsjList()},showdetails:function(t,e){console.log("items",t,e),this.srcList=[],this.$refs.baseDialog.dialogVisible=!0;var a=void 0;"报警图片"==e.column.label?t.alarmPhotoUrl&&(a=""+this.$URL+t.alarmPhotoUrl,this.srcList.push(a)):"解除警情图片"==e.column.label&&t.releasePhotoUrl&&(a=""+this.$URL+t.releasePhotoUrl,this.srcList.push(a))},prev_next:function(t){this.page.SkipCount=(t-1)*this.page.MaxResultCount,this.GetVisionAlarmTsjList()}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"AIAnalysis"},[a("div",{staticClass:"topStatus"},t._l(t.buttonarr,function(e){return a("el-button",{key:e.text,attrs:{round:"",plain:"",type:e.type},on:{click:function(a){return t.screen(e.text)}}},[t.screensign==e.text?a("i",{staticClass:"el-icon-check  el-icon--right"}):t._e(),t._v("\n              "+t._s(e.text)+t._s(e.num)+"\n          ")])}),1),t._v(" "),a("baseTable",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",tableThead:t.tableThead,tableData:t.tableData,totalCount:t.totalCount,pageSize:10,specailText:"查看"},on:{showdetails:t.showdetails,pageChange:t.prev_next}}),t._v(" "),a("baseDialog",{ref:"baseDialog",attrs:{title:"现场图片"}},[t.srcList.length>0?a("viewer",{staticClass:"viewer",attrs:{images:t.srcList}},[t._l(t.srcList,function(t,e){return a("img",{key:e,staticStyle:{width:"900px",height:"450px"},attrs:{src:t,fit:"cover"}})}),a("img")],2):a("div",[t._v("\n              暂无图片 \n          ")])],1)],1)},staticRenderFns:[]};var u=a("VU/8")(o,l,!1,function(t){a("k3Fg")},null,null);e.default=u.exports},k3Fg:function(t,e){}});
//# sourceMappingURL=23.03ca7f34a91edea003b4.js.map