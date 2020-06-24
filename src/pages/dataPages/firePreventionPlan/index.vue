<style lang="less">
.firePreventionPlan{
    font-size: 14px;
    color: #ffffff;
    line-height: 3.5;
    position: relative;
     p:first-of-type{
        font-size: 18px;
        color: #a3caff;
    }
    .edit{
             display: flex;
            font-size: 14px; 
            align-items: center;
            cursor: pointer;
            position: absolute;
            right: 0;
    }
    .firePreventionPlan_title{
        font-size: 18px;
        color: #a3caff;
    }
    .el-dialog__wrapper{
        .el-dialog{
            width: 80% !important;
        }
    }
    
}
</style>
<template>
    <div class="firePreventionPlan">
         <el-scrollbar style="height:100%">
            <div class="edit" @click="edit">
                <img src="../../../assets/image/index/edit_btn.png">
                编辑
            </div>
            <div class="content" v-html="content"></div>

            <!--  <div id="editor"></div> -->
         </el-scrollbar>
        <el-dialog
        title="编辑文案"
        :visible.sync="dialogVisible"
        @close="closedialog"
        width="30%">
        <div  :value="content" id="editor"></div>
        <!-- <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption" ></quill-editor> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>

       
        </el-dialog>
    </div>
</template>
<script>
let FireUnitId = localStorage.getItem('fireUnitID')
export default {
    data(){
        return{
            editorOption:{},
            dialogVisible :false,
            editor:null,
            content:`   
            <p class="firePreventionPlan_title">
                <span>XX单位消防应急预案</span>
                
            </p>
            <div class="firePreventionPlan_article">
            <p>
                "根据公安部]和市政府的有关要求结合本单位的实际情况。为确保单位工作正常运行和人身财产安全，使现场一旦发生火情，能够有领导、有条不紊地进行扑救和疏散宾客，抢救财产，把火灾损失控制在最低限度，特制定《xx单位消防应急预案》。
            </p>
            <p> 一.报警程序 </p>

            <p> <span style="font-weight:blod"> (一)</span>发现火情的报警</p>

            <p>1.  无论什么时间，每个员工一旦发 现火情都有责任立即向消防中控室报警 (62xxxx) 。</p>

            <p>2.每一名员工都要记住中控室的报警电话0xxx或用对讲机呼叫，将自己的姓名、部门告诉消防中控室。</p>

            <p>3.员工发现火情时，不要惊慌失措，要冷静、沉着语言清晰地将火情发生的区域、部门地点、楼层、房号、报告中控室。</p>

            <p>(二)员工发现火情的工作程序</p>

            <p>1.员工发现火情后，如是初级火情自己能将其扑灭时，应先灭火后报警。遇火情难以扑救时，应按照下列程序工作:( 1 )立即用火场附近电话通知消防中控室，如附近无电话时，可打碎火场附近的手动报警器完成报警工作。</p>

            <p>(2)采用电话报警时，请拔内部报警电话“62xxxx”。报警时话音要清晰，要讲明起火地点、物质燃烧的种类、是否有人被围、火势的情况以及是否正在采取扑救措施等，然后通报自己的姓名和部门，之后注意倾听消防中控室的补充询问，并做认真回答，得到允许后方可挂断报警电话。</p>

            <p> (3)在扑救人员未到达火场前，报警者应采取相应的灭火措施，使用火场附近的消防设施进行扑救。"</p>
            </div>
            `,
        }
    },
    mounted(){
       this.initData();
      
    },
    methods:{
        edit(){
            this.dialogVisible = true
            this.$nextTick(()=>{
               this.editor = UE.getEditor('editor');
               this.editor.ready(()=>{
                  this.editor.setContent(this.content) 
               });
            })
        },
        submit(){
            let that = this;
            let plan = this.editor.getContent();
            console.log(plan)
            this.dialogVisible = false
            this.$axios({
                method:'post',
                url:that.$api.SaveFirePlan,
                data:{
                    FireUnitId,
                    plan
                }
            }).then(res=>{
                that.initData();
            }).catch(res=>{
                console.log("提交数据失败",res)
            })
        },
        initData(){
            let that = this;
            this.$axios({
                method:'get',
                url:that.$api.GetFirePlan,
                params:{
                    FireUnitId
                }
            }).then(res=>{
                console.log("请求数据",res)
                if(res.data.result){
                    this.content = res.data.result
                }else{
                    this.$message({
                        message: '操作失败',
                        type: 'error'
                    });
                }
            }).catch(res=>{
                console.log("请求数据失败",res)
            })
        },
        closedialog(){
            console.log("关闭弹窗")
            this.editor.destroy();
        }
    }
}
</script>

