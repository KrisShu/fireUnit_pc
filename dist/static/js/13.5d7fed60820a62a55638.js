webpackJsonp([13],{"2zVB":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADnklEQVRYR82XX2gcVRTGf99UqAg2O2kUEbXqQ6X4JEKtD0oFI+iDomIU/9FaUBT6WEVMJpvZKLRPQkGjiBXR2rRV1BdRChUVtKJWEK36YFsrgpjsbKKWBswcmd3ZzUx2Zme2eXFe73e+88055977XVHysyeHzufcf28G3QusxxhCrG2GG7OIGeBnsGnOnHNIu2b+KkOtIpCNrt2AE27HuA/hFuFjQQFiH6GzW5Ozx3rF9BRgnjsJbAfWlErcDZoHdssPRvPicwWY534C3HCWiZeHfSo/uDGLK1OAee6fwFBB8ujvTgFRry8HLirAz8gPLliO6RJgnns8JsziO4N4npC9qgXfJQFWXTNIuOpW4Gng6hwxJ+QHVyTXUgLMc/cD9+QEf4+jEVXrPxS1xcbdDzFuycEdkB+MtNc6AuKBeyY7yP6Q3ygqcSrUPPcN4IEcEc+2B7MpIN5qX+ROu2mbavVX22Q2OnQVWpxCtgHTMRy+JAz3qzb3dQrjLH6WM0vzhM6maIu2BHjuC8DjmWrNDqnWGE71e9x9CePRLrw5m1SbPdIR4VUOgu7OqcKL8oMnZE+5A6zmJDCQCRQvayJ4rEM6NnAtcr7KIX1TfvDgkgB3F7AjBzvHAutkXuUh0Os9BitNOj64B7Mt2dViSrWgU8mCoY5q/3AkoFeZojx1xEEW7S2kjYiduWJDu0mTjY8TFYjOiUvyf87elnnuN8A1RVurYP13HA0nt6h57nPxmdAr9KhszP0VcekKBBzB0SOp5NXBEUKbLuQ0TkUV+Ac4rxCcBRDvItuqaqORKHs0sFMl+U6vRMA8jq5fVvboIItu0LLf6RW0wCbkN6pL29M9jNhcNnMTF7fgbIfwNvnBB02e0cpmHB3uK3kLfDRqwT4gsll9ffKDxD0yuA3slb4IWuDp6By4E/RO/8EakV8/0KyAV/kIlDquy/HZXWqazdWLJ0v7vSXm34DPgcuA68olTKCMgIVV64ovo97M3wIXAhf3LQBal1FriJrON/86zmI326pa47W4BVXQeB8i0tdxi6TpgHMMSRd1ytXE8QXnfoojbUjaS6Wd8LIrOq7CT6D1JaqQcshZprSMI/4baVgT9aht2FhlC9KeEsm7nHGeLe/ljJN5fowHsMzDpcsRR0S9Hia9HHKJn01Bumamvfr/fZp1BrP9OIX7c31jdz3mgL0rfpwmeVvm1W4H7gBdmf08t1+A91jQ+9oZRCIKv/8AeIxhL5lFA1EAAAAASUVORK5CYII="},WbcD:function(e,t){},nQj3:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("BO1k"),a=i.n(r),o=i("Nn1j"),s=i("HR9O"),l={components:{baseTable:o.a,baseDialog:s.a},data:function(){return{expireNum:"",willExpireNum:"",screensign:"全部",loading:!1,OrtherDevicePage:{FireUnitId:localStorage.getItem("fireUnitID"),SkipCount:0,ExpireType:"",FireUnitArchitectureName:"",MaxResultCount:10},totalCount:0,fireSystems:[],buildList:[],floors:[],value:"",tableThead:[{name:"设备编号",prop:"deviceSn"},{name:"设备名称",prop:"deviceName"},{name:"所在建筑",prop:"fireUnitArchitectureName"},{name:"楼层",prop:"fireUnitArchitectureFloorName"},{name:"具体位置",prop:"location"},{name:"有效期",prop:"expireTime"},{name:"操作"}],tableData:[],rules:{fireSystemId:[{required:!0,message:"选择所属系统",trigger:"change"}],deviceName:[{required:!0,message:"选择设备名称",trigger:"change"}]},otherequmentForm:{},fileList:[]}},created:function(){this.GetFireOrtherDeviceExpire(),this.GetFireOrtherDeviceList(),this.getbuild(),this.GetFireUnitSystem()},methods:{GetFireOrtherDeviceExpire:function(){var e=this,t=localStorage.getItem("fireUnitID");this.$axios.get(this.$api.GetFireOrtherDeviceExpire,{params:{FireUnitId:t}}).then(function(t){console.log("取其他消防设施过期",t);var i=t.data.result;e.expireNum=i.expireNum,e.willExpireNum=i.willExpireNum}).catch(function(e){console.log("取其他消防设施过期",e)})},screenForBuild:function(e){console.log("name",e),this.OrtherDevicePage.FireUnitArchitectureName=e,this.OrtherDevicePage.SkipCount=0,this.GetFireOrtherDeviceList()},screen:function(e){this.OrtherDevicePage.ExpireType="全部"==e?"":e,this.screensign=e,this.OrtherDevicePage.SkipCount=0,this.GetFireOrtherDeviceList()},GetFireOrtherDeviceList:function(){var e=this;this.loading=!0,this.$axios.get(this.$api.GetFireOrtherDeviceList,{params:this.OrtherDevicePage}).then(function(t){console.log("获取其他消防设施列表成功",t),e.loading=!1;var i=t.data.result;e.tableData=i.items,e.totalCount=i.totalCount,0==t.data.result.items.length&&t.data.result.totalCount>0&&(e.OrtherDevicePage.SkipCount=0,e.GetFireOrtherDeviceList())}).catch(function(e){console.log("获取其他消防设施列表失败",e)})},otherequmentPrev_next:function(e){this.OrtherDevicePage.SkipCount=(e-1)*this.OrtherDevicePage.MaxResultCount,this.GetFireOrtherDeviceList()},addNew:function(){this.$refs.baseDialog.dialogVisible=!0,this.otherequmentForm={}},closeDialog:function(){this.$refs.form.resetFields()},GetFireOrtherDevice:function(e){var t=this;this.$refs.baseDialog.dialogVisible=!0;var i=e.deviceId;this.$axios.get(this.$api.GetFireOrtherDevice,{params:{Deviceid:i}}).then(function(e){console.log("获取详情",e),t.otherequmentForm=e.data.result,t.selectFloors(e.data.result.fireUnitArchitectureId)}).catch(function(e){console.log("获取详情失败",e)})},add_updateother:function(){var e=this;this.$refs.form.validate(function(t){if(t){var i=localStorage.getItem("fireUnitID");e.otherequmentForm.fireUnitId=i,console.log("this.otherequmentForm",e.otherequmentForm),(e.otherequmentForm.deviceId?e.$axios.put(e.$api.UpdateFireOrtherDevice,e.otherequmentForm):e.$axios.post(e.$api.AddFireOrtherDevice,e.otherequmentForm)).then(function(t){console.log("新增或修改成功",t),t.data.result.success?(e.$message.success((e.otherequmentForm.deviceId?"修改":"新增")+"其他消防设施成功"),e.$refs.baseDialog.dialogVisible=!1,e.GetFireOrtherDeviceList()):(console.log("res.data.result.failCause"),e.$message({message:t.data.result.failCause,type:"warning"}))})}})},cancel:function(e){e?this.$refs.baseDialog.dialogVisible=!1:this.otherequmentForm={}},getbuild:function(){var e=this,t=localStorage.getItem("fireUnitID");this.$axios.all([this.$axios.get(this.$api.GetListByFireUnitId,{params:{fireunitId:t}})]).then(this.$axios.spread(function(t){console.log("所在建筑",t),e.buildList=t.data.result}))},selectFloors:function(e){console.log("选择楼层",e);var t=!0,i=!1,r=void 0;try{for(var o,s=a()(this.buildList);!(t=(o=s.next()).done);t=!0){var l=o.value;e==l.id&&(this.floors=l.floors)}}catch(e){i=!0,r=e}finally{try{!t&&s.return&&s.return()}finally{if(i)throw r}}},GetFireUnitSystem:function(){var e=this,t=localStorage.getItem("fireUnitID");this.$axios.get(this.$api.GetFireUnitSystem,{params:{FireUnitId:t}}).then(function(t){console.log("获取该单位的所属系统",t),e.fireSystems=t.data.result}).catch(function(e){console.log("获取该单位的所属系统失败",e)})},DeleteFireOrtherDevice:function(e){var t=this,i=e.deviceId;this.$axios.delete(this.$api.DeleteFireOrtherDevice,{params:{DeviceId:i}}).then(function(e){console.log("删除数据成功",e),e.data.success&&(t.$message({message:"删除数据成功",type:"success"}),t.GetFireOrtherDeviceList())}).catch(function(e){console.log("删除失败",e)})},importData:function(){this.$refs.importDialog.dialogVisible=!0},download:function(){console.log("下载");var e=document.createElement("a");e.style.display="none",e.href="http://futest.sctsjkj.com/template/其它消防设施数据表.xlsx",e.click()},uploadFile:function(e){var t=this;console.log("uploadFileuploadFileuploadFileuploadFileuploadFileuploadFile",e);var i=new FormData;i.append("FireUnitId",localStorage.getItem("fireUnitID")),i.append("file",e.file),this.$axios.post(this.$api.ImportOrtherDevice,i).then(function(e){console.log("res",e),e.data.result.success?(t.$message({message:"导入数据成功!",type:"success"}),t.GetFireOrtherDeviceList()):t.$message({showClose:!0,message:"导入失败！"+e.data.result.failCause,type:"error",duration:"6000"}),t.fileList=[],t.$refs.importDialog.dialogVisible=!1}).catch(function(e){console.log("err",e)})},handleExceed:function(e){this.$notify({title:"警告",message:"只能上传一个文件哦!,若需要上传其他文件请先移除已选择的文件",type:"warning"})},beforeAvatarUpload:function(e){console.log("上传是的监测");var t="xls"===e.name.split(".")[1],i="xlsx"===e.name.split(".")[1];t||i||alert("上传模板只能是 xls、xlsx格式!")},submitUpload:function(e){var t=this;this.$confirm("导入的方式会覆盖现有的记录, 是否继续?","导入数据",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$refs.upload.submit()}).catch(function(){})},handleRemove:function(e,t){console.log("删除这个",e,t)},handlePreview:function(e){console.log(e,"dssaaaaaaaaaaa")}}},n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"otherFacilitiesBox"},[r("el-row",{staticClass:"otherFacilitiesBox_top"},[r("el-col",{staticClass:"otherFacilitiesBox_top_right",attrs:{span:16}},[r("el-button",{attrs:{type:"primary",round:"",plain:""},on:{click:function(t){return e.screen("全部")}}},[e._v("\n        全部\n        "),"全部"==e.screensign?r("i",{staticClass:"el-icon-check  el-icon--right"}):e._e()]),e._v(" "),r("el-button",{attrs:{type:"warning",round:"",plain:""},on:{click:function(t){return e.screen("即将过期")}}},[e._v("\n        即将过期："+e._s(e.willExpireNum)+"\n        "),"即将过期"==e.screensign?r("i",{staticClass:"el-icon-check  el-icon--right"}):e._e()]),e._v(" "),r("el-button",{attrs:{type:"danger",round:"",plain:""},on:{click:function(t){return e.screen("已过期")}}},[e._v("\n        已过期："+e._s(e.expireNum)+"\n        "),"已过期"==e.screensign?r("i",{staticClass:"el-icon-check  el-icon--right"}):e._e()]),e._v(" "),r("el-popover",{attrs:{placement:"top-start",trigger:"hover"}},[r("div",{staticClass:"content"},[r("p",{staticStyle:{color:"orange"}},[e._v("即将过期：存在有效期，且今天距离有效期在30天之内")]),e._v(" "),r("p",{staticStyle:{color:"#F56C6C"}},[e._v("已过期：存在有效期，今天的日期大于有效期")])]),e._v(" "),r("img",{attrs:{slot:"reference",src:i("2zVB")},slot:"reference"})]),e._v(" "),r("div",{staticClass:"selectBox"},[r("span",[e._v("所在建筑：")]),e._v(" "),r("el-select",{attrs:{placeholder:"请选择建筑"},on:{change:e.screenForBuild},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[r("el-option",{attrs:{label:"全部建筑",value:""}}),e._v(" "),e._l(e.buildList,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})})],2)],1)],1),e._v(" "),r("el-col",{staticClass:"otherFacilitiesBox_top_left",attrs:{span:8}},[r("el-button",{on:{click:e.importData}},[e._v("导入")]),e._v(" "),r("el-button",{on:{click:e.addNew}},[e._v("新增")])],1)],1),e._v(" "),r("baseTable",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",tableThead:e.tableThead,tableData:e.tableData,totalCount:e.totalCount,pageSize:10},on:{deleteInfo:e.DeleteFireOrtherDevice,showdetails:e.GetFireOrtherDevice,pageChange:e.otherequmentPrev_next}}),e._v(" "),r("baseDialog",{ref:"baseDialog",staticClass:"add_updateDialog",attrs:{title:"消防信息"},on:{closeDialog:e.closeDialog}},[r("el-form",{ref:"form",staticClass:"formBox",attrs:{rules:e.rules,model:e.otherequmentForm,"label-width":"80px"}},[r("el-row",{staticClass:"baseBox",attrs:{gutter:20}},[r("el-col",{staticClass:"left_box",attrs:{span:4}},[r("div",{staticClass:"grid-content basetitle"},[e._v("基本")])]),e._v(" "),r("el-col",{attrs:{span:20}},[r("div",{staticClass:"grid-content"},[r("el-row",{staticClass:"pd20",attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"所属系统",prop:"fireSystemId"}},[r("el-select",{attrs:{placeholder:"请选择所属系统"},model:{value:e.otherequmentForm.fireSystemId,callback:function(t){e.$set(e.otherequmentForm,"fireSystemId",t)},expression:"otherequmentForm.fireSystemId"}},e._l(e.fireSystems,function(e){return r("el-option",{key:e.fireSystemID,attrs:{label:e.fireSystemName,value:e.fireSystemID}})}),1)],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"设备名称",prop:"deviceName"}},[r("el-input",{attrs:{placeholder:"请填写设备名称"},model:{value:e.otherequmentForm.deviceName,callback:function(t){e.$set(e.otherequmentForm,"deviceName",t)},expression:"otherequmentForm.deviceName"}})],1)],1)],1),e._v(" "),r("el-row",{staticClass:"pd20",attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"设备型号"}},[r("el-input",{attrs:{placeholder:"请输入设备型号"},model:{value:e.otherequmentForm.deviceType,callback:function(t){e.$set(e.otherequmentForm,"deviceType",t)},expression:"otherequmentForm.deviceType"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"设备编号"}},[r("el-input",{attrs:{placeholder:"请输入设备编号"},model:{value:e.otherequmentForm.deviceSn,callback:function(t){e.$set(e.otherequmentForm,"deviceSn",t)},expression:"otherequmentForm.deviceSn"}})],1)],1)],1)],1)])],1),e._v(" "),r("el-row",{staticClass:"baseBox",attrs:{gutter:20}},[r("el-col",{staticClass:"left_box",attrs:{span:4}},[r("div",{staticClass:"grid-content basetitle"},[e._v("位置")])]),e._v(" "),r("el-col",{attrs:{span:20}},[r("div",{staticClass:"grid-content"},[r("el-row",{staticClass:"pd20",attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"所在建筑",prop:"fireUnitArchitectureId"}},[r("el-select",{attrs:{placeholder:"请选择所在建筑"},on:{change:e.selectFloors},model:{value:e.otherequmentForm.fireUnitArchitectureId,callback:function(t){e.$set(e.otherequmentForm,"fireUnitArchitectureId",t)},expression:"otherequmentForm.fireUnitArchitectureId"}},e._l(e.buildList,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"楼层",prop:"fireUnitArchitectureFloorId"}},[r("el-select",{attrs:{placeholder:"请选择所在楼层"},model:{value:e.otherequmentForm.fireUnitArchitectureFloorId,callback:function(t){e.$set(e.otherequmentForm,"fireUnitArchitectureFloorId",t)},expression:"otherequmentForm.fireUnitArchitectureFloorId"}},e._l(e.floors,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1)],1),e._v(" "),r("el-row",{staticClass:"pd20"},[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"具体位置"}},[r("el-input",{attrs:{placeholder:"请输入安装位置"},model:{value:e.otherequmentForm.location,callback:function(t){e.$set(e.otherequmentForm,"location",t)},expression:"otherequmentForm.location"}})],1)],1)],1)],1)])],1),e._v(" "),r("el-row",{staticClass:"baseBox",attrs:{gutter:20}},[r("el-col",{staticClass:"left_box",attrs:{span:4}},[r("div",{staticClass:"grid-content basetitle"},[e._v("有效期")])]),e._v(" "),r("el-col",{attrs:{span:20}},[r("div",{staticClass:"grid-content"},[r("el-row",{staticClass:"pd20",attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"启用时间",prop:"Model"}},[r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.otherequmentForm.startTime,callback:function(t){e.$set(e.otherequmentForm,"startTime",t)},expression:"otherequmentForm.startTime"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"有效期",prop:"expireTime"}},[r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.otherequmentForm.expireTime,callback:function(t){e.$set(e.otherequmentForm,"expireTime",t)},expression:"otherequmentForm.expireTime"}})],1)],1)],1)],1)])],1),e._v(" "),r("el-row",{staticClass:"btns"},[r("el-button",{on:{click:e.add_updateother}},[e._v("保存")]),e._v(" "),r("el-button",{on:{click:function(t){return e.cancel(e.otherequmentForm.deviceId)}}},[e._v("取消")])],1)],1)],1),e._v(" "),r("baseDialog",{ref:"importDialog",staticClass:"importDialog",attrs:{title:"消防设施导入"}},[r("div",{staticClass:"dialog_content"},[r("p",{staticClass:"tips"},[e._v("注：导入的方式会覆盖现有的记录，如果要新增部分联网部件，请使用“新增”功能")]),e._v(" "),r("div",{staticClass:"bottom"},[r("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"",name:"excelFile",multiple:!1,limit:1,"on-exceed":e.handleExceed,"http-request":e.uploadFile,"on-preview":e.handlePreview,"before-upload":e.beforeAvatarUpload,"file-list":e.fileList,"auto-upload":!1}},[r("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:e.submitUpload}},[e._v("上传到服务器")]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[r("p",[e._v("只能上传excel文件")])])],1),e._v(" "),r("p",{staticClass:"modeldownload",on:{click:e.download}},[e._v("模板下载")])],1)])])],1)},staticRenderFns:[]};var c=i("VU/8")(l,n,!1,function(e){i("WbcD")},null,null);t.default=c.exports}});
//# sourceMappingURL=13.5d7fed60820a62a55638.js.map