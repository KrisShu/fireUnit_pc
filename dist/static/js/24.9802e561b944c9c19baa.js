webpackJsonp([24],{"kb/t":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("BO1k"),s=e.n(o),i={components:{baseTable:e("Nn1j").a},data:function(){return{loading:!1,screensign:"全部",buttonarr:[{type:"info",text:"全部"},{type:"success",text:"正常",num:0},{type:"success",text:"故障-已解决",num:0},{type:"warning",text:"故障-未解决",num:0}],totalCount:0,tableData:[],tableThead:[{name:"提交时间",prop:"creationTime"},{name:"巡查人员",prop:"userName"},{name:"状态",prop:"state"},{name:"操作"}],page:{FireUnitId:localStorage.getItem("fireUnitID"),PatrolStatus:0,SkipCount:0,MaxResultCount:10},dialogVisible:!1,PatrolInfo:[],amr:Object}},created:function(){this.GetPatrolList(),this.GetPatrolStatusTotal()},methods:{screen:function(t){this.screensign=t,"全部"==t?this.page.PatrolStatus=0:"正常"==t?this.page.PatrolStatus=1:"故障-已解决"==t?this.page.PatrolStatus=2:"故障-未解决"==t&&(this.page.PatrolStatus=3),this.page.SkipCount=0,this.GetPatrolList()},GetPatrolStatusTotal:function(){var t=this,a=localStorage.getItem("fireUnitID");this.$axios.get(this.$api.GetPatrolStatusTotal,{params:{fireunitId:a}}).then(function(a){t.buttonarr[1].num=a.data.result.normalCount,t.buttonarr[2].num=a.data.result.greenFaultCount,t.buttonarr[3].num=a.data.result.redFaultCount}).catch(function(t){console.log("err",t)})},GetPatrolList:function(){var t=this;this.loading=!0,this.$axios.get(this.$api.GetPatrolList,{params:this.page}).then(function(a){if(console.log("获取巡查列表成功",a),t.loading=!1,a.data.result.totalCount>0){var e=!0,o=!1,i=void 0;try{for(var n,l=s()(a.data.result.items);!(e=(n=l.next()).done);e=!0){var r=n.value;r.creationTime=t.deal(r.creationTime),1==r.patrolStatus?r.state="正常":2==r.patrolStatus?r.state="故障-已解决":3==r.patrolStatus&&(r.state="故障-未解决")}}catch(t){o=!0,i=t}finally{try{!e&&l.return&&l.return()}finally{if(o)throw i}}var c=a.data.result;t.totalCount=c.totalCount,t.tableData=c.items}}).catch(function(t){console.log("获取巡查列表失败",t)})},deal:function(t){var a=t.split("T"),e=a[1].split(".");return a[0]+" "+e[0]},prev_next:function(t){this.page.SkipCount=(t-1)*this.page.MaxResultCount,this.GetPatrolList()},showdetails:function(t){this.dialogVisible=!0,this.GetPatrolInfo(t.patrolId)},initBG:function(){if(this.PatrolInfo.patrolDetailList.length>0){var t=document.getElementsByClassName("left_cricle_box");console.log("element",t);var a=t.length-1;t[a].style.height="0px";var e=document.getElementsByClassName("right_box_box"),o=e.length-1,s=e[0].clientHeight+12+"px",i=parseInt(s)/2+"px",n=e[o].clientHeight+12+"px",l=parseInt(n)/2+"px";if(1==this.PatrolInfo.patrolDetailList.length)console.log("只有一条数据");else{for(var r=0;r<t.length;r++)t[r].style.height="auto",t[r].style.background="url('../../../static/two_bg.png')",t[r].style.backgroundPosition="center",t[r].style.backgroundRepeat="no-repeat";t[0].style.background="url('../../../static/one_bg.png')",t[0].style.backgroundPosition="center "+i,t[0].style.backgroundRepeat="no-repeat",t[a].style.height=l,t[a].style.background="url('../../../static/three.png')",t[a].style.backgroundRepeat="no-repeat",t[a].style.backgroundPosition="center bottom"}}},GetPatrolInfo:function(t){var a=this;this.loading=!0,this.$axios.get(this.$api.GetPatrolInfo,{params:{patrolId:t}}).then(function(t){if(console.log("获取巡查记录详情",t),t.data.result.creationTime=a.deal(t.data.result.creationTime),a.PatrolInfo=t.data.result,t.data.result.patrolDetailList.length>0){var o=!0,i=!1,n=void 0;try{for(var l,r=s()(t.data.result.patrolDetailList);!(o=(l=r.next()).done);o=!0){var c=l.value;c.creationTime=a.deal(c.creationTime);for(var u=0;u<c.patrolPhtosPath.length;u++)c.patrolPhtosPath[u]=""+a.$URL+c.patrolPhtosPath[u];if(c.problemVoiceUrl){c.problemVoiceUrl=""+a.$URL+c.problemVoiceUrl;var p=e("/y4m");a.amr=new p,a.amr.initWithUrl(c.problemVoiceUrl)}}}catch(t){i=!0,n=t}finally{try{!o&&r.return&&r.return()}finally{if(i)throw n}}a.$nextTick(function(){a.initBG(),a.loading=!1})}}).catch(function(t){console.log("获取巡查记录详情失败",t)})},playaudio:function(){this.amr.play(),this.amr.onEnded(function(){console.log("播放完毕")})}}},n={render:function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"inspectionRecords"},[o("div",{staticClass:"topStatus"},t._l(t.buttonarr,function(a){return o("el-button",{key:a.text,attrs:{round:"",plain:"",type:a.type},on:{click:function(e){return t.screen(a.text)}}},[t.screensign==a.text?o("i",{staticClass:"el-icon-check  el-icon--right"}):t._e(),t._v("\n            "+t._s(a.text)+"\n            "+t._s(a.num)+"\n        ")])}),1),t._v(" "),o("baseTable",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",tableThead:t.tableThead,tableData:t.tableData,totalCount:t.totalCount,pageSize:10,specailText:"查看巡查记录"},on:{showdetails:t.showdetails,pageChange:t.prev_next}}),t._v(" "),o("el-dialog",{attrs:{top:"4vh",title:"巡查记录",visible:t.dialogVisible},on:{"update:visible":function(a){t.dialogVisible=a}}},[o("div",{staticClass:"dialogContent"},[o("p",[o("span",{staticClass:"title"},[t._v("提交时间：")]),t._v(t._s(t.PatrolInfo.creationTime))]),t._v(" "),o("p",[o("span",{staticClass:"title"},[t._v("值班人员：")]),t._v(t._s(t.PatrolInfo.userName))]),t._v(" "),o("p",[o("span",{staticClass:"title"},[t._v("巡查方式：")]),t._v(" "),1==t.PatrolInfo.patrolType?o("span",[t._v("一般巡查")]):t._e(),t._v(" "),2==t.PatrolInfo.patrolType?o("span",[t._v("扫码巡查")]):t._e()]),t._v(" "),o("p",{staticClass:"summary"},[t._v("有效轨迹点"+t._s(t.PatrolInfo.totalDetailNum)+"个，发现"+t._s(t.PatrolInfo.totalProblemNum)+"个问题，现场解决"+t._s(t.PatrolInfo.greenProblemNum)+"个问题")]),t._v(" "),t.PatrolInfo.patrolDetailList?o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"right_details_TrackList",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[o("el-scrollbar",{staticStyle:{height:"100%"}},t._l(t.PatrolInfo.patrolDetailList,function(a,s){return o("div",{key:s,staticClass:"right_details_TrackList_inner"},[o("div",{staticClass:"cricle_container"},[o("div",{staticClass:"left_cricle_box"}),t._v(" "),o("div",{staticClass:"right_box_box"},[o("p",{staticClass:"right_box_box_time"},[o("span",[t._v(t._s(a.creationTime))]),t._v(" "),0==a.patrolStatus?o("span",{staticClass:"status"},[t._v("未指定")]):t._e(),t._v(" "),1==a.patrolStatus?o("span",{staticClass:"status normal"},[t._v("正常")]):t._e(),t._v(" "),2==a.patrolStatus?o("span",{staticClass:"status had"},[t._v("已解决")]):t._e(),t._v(" "),3==a.patrolStatus?o("span",{staticClass:"status hading"},[t._v("异常")]):t._e()]),t._v(" "),o("div",{staticClass:"right_box_box_patrolAddress"},[o("span",[t._v(t._s(a.patrolAddress))])]),t._v(" "),o("div",{staticClass:"VoiceRemark"},[a.problemRemark?o("p",{staticClass:"remark"},[t._v(t._s(a.problemRemark))]):t._e(),t._v(" "),a.problemVoiceUrl?o("div",{staticClass:"audio",on:{click:function(a){return t.playaudio(s)}}},[o("img",{staticClass:"voice",attrs:{src:e("FEo8"),alt:""}}),t._v(" "),o("span",{staticClass:"time"},[t._v(t._s(a.voiceLength)+'"')])]):t._e()]),t._v(" "),o("div",{staticClass:"right_box_box_Img"},[o("viewer",{attrs:{images:a.patrolPhtosPath}},t._l(a.patrolPhtosPath,function(t,a){return o("img",{key:a,attrs:{src:t,alt:""}})}),0)],1)])])])}),0)],1):t._e()])])],1)},staticRenderFns:[]};var l=e("VU/8")(i,n,!1,function(t){e("tAAv")},null,null);a.default=l.exports},tAAv:function(t,a){}});
//# sourceMappingURL=24.9802e561b944c9c19baa.js.map