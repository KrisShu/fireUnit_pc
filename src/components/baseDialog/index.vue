<style lang="less">
@divBG : #072041;
.base_dialog{
    .border_dialog{
        -webkit-border-image: url("../../assets/image/border.png") 27 round;
        border-image:url("../../assets/image/home/home_img_bg.png") 22 24 repeat stretch;
        border-style: solid;
        border-width: 24px 24px;
    }
    .el-dialog{
        // width: 1000px;
        // height: 538px;
        padding-bottom: 40px;
        .border_dialog();
        position: relative;
        background: @divBG;
        .el-dialog__headerbtn .el-dialog__close{
            display: inline-block;
            width: 50px;
            height: 50px;
            color: transparent;
            background: url("../../assets/image/home/dialog_btn_close.png");
            position: absolute;
            top: -50px;
            right: -50px;
        }
        .el-dialog__header{
            height: 70px;
            padding: 0px;
            background: url("../../assets/image/home/dialog_bg.png") no-repeat;
            background-position: center center;
            .el-dialog__title{
                color: #fefefe;
                font-size: 22px;
                line-height: 70px;
                text-align: center;
                width: 100%;
                display: inline-block;
            }
        }
        .el-dialog__body{
                padding: 0px;
                display: flex;
                min-height: 418px;    
        }
    }

}
    
</style>
<template>
<div class="base_dialog">
    <el-dialog :width="width"  @close="closeDialog" :title="title" :visible.sync="dialogVisible">
        <slot></slot>
        <slot name="off-line"></slot>
        <slot name="on-line"></slot>
        <slot name="soltContent"></slot>
    </el-dialog>
</div>
  
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            require:true
        },
        width:{
            type:String,
            default:'60%'
        }
    },
    data(){
        return{
            dialogVisible:false
        }
    },
    mounted(){
         console.log(this.$slots);   //获取父组件插入的插槽数
    },
    methods:{
        closeDialog(){
            this.$emit('closeDialog',this.title)
        }
    }
}
</script>



