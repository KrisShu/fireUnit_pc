<style lang="less">
@baseColor:#072041;
@headColor:#385093;
.calendar_container{
  .wh_container[data-v-2ebcbc83]{
      margin: 0;
      max-width: 860px;
      .wh_content_all{
        background-color:@baseColor;
        .wh_top_changge[data-v-2ebcbc83]{
          background: @headColor;
          .wh_jiantou1[data-v-2ebcbc83]{
            border-top: 2px solid #aac6ff;
            border-left: 2px solid #aac6ff;
          }
          .wh_content_li[data-v-2ebcbc83]{
            font-size: 14px;
            color: #fff;
          }
          .wh_jiantou2{
            border-top: 2px solid #aac6ff;
            border-right: 2px solid #aac6ff;
          }
        }
        /* 日期头 */
        .wh_content[data-v-2ebcbc83]{
          padding: 0px;
          justify-content: space-between;
          .wh_content_item{
          border: solid 1px #385093;
          height: 50px;
          .wh_top_tag,.wh_item_date{
            height: 50px;
            line-height: 50px;
            text-align: center;
            margin: 0px;
            width: 100%;
          }
          .wh_item_date{
            &:hover{
             background-color: #385093 !important;
            }
          }
          .wh_other_dayhide{
            color: #5571c1;
          }
          .wh_isToday{
           background: transparent;
            border-radius: 0px;
          }
          .wh_chose_day{
            background-color: #385093 !important;
            border-radius:0px !important;
          }
          }
          
        }

        /* 标记 */
        .mark1{
        background: url("../../assets/image/home/home_img_08.png") no-repeat !important;;
        background-position: bottom right !important;
        background-size: 20px 20px !important;
        }
        .mark2{
            background: url("../../assets/image/home/home_img_09.png") no-repeat !important;;
            background-position: bottom right !important;
            background-size: 20px 20px !important;
        }
        .mark3{
            background: url("../../assets/image/home/home_img_10.png") no-repeat !important;
            background-position: bottom right !important;
            background-size: 20px 20px !important;
        }
        .lastMark3{
          background: url("../../assets/image/home/selected03.png") !important;
           background-position: bottom right !important;
        }
        .lastMark2{
          background: url("../../assets/image/home/selected02.png") !important;
           background-position: bottom right !important;
        }
        .lastMark1{
          background: url("../../assets/image/home/selected01.png") !important;
           background-position: bottom right !important;
        }
      }

  }


  /* 标记 */
 
  .remarks_container{
     color: #a2ecff;
     font-size: 14px;
     line-height: 2.5;
     margin-top: 40px;
  }
}

</style>
<template>
<div class="calendar_container">
  <Calendar ref="Calendar" v-on:choseDay="clickDay" :markDateMore=markDatearr   v-on:changeMonth="changeMonth"></Calendar>
  <div class="remarks_container">
    <p>
      <img src="../../assets/image/home/home_img_08.png">
      代表当天有巡查记录，记录中未发现问题
    </p>
    <p>
      <img src="../../assets/image/home/home_img_09.png">
      代表当天有巡查记录，记录中发现并现场解决了问题
    </p>
    <p>
      <img src="../../assets/image/home/home_img_10.png">
      代表当天有巡查记录，记录中发现了问题但未能现场解决，已自动提交故障处理单
    </p>
  </div>
</div>
    
</template>
<script>
import Calendar from 'vue-calendar-component';
export default {
  components:{
    Calendar
  },
  props:{
    markDatearr:Array
  },
  methods:{
    /* 选择日历 */
    clickDay(data) {
        console.log(data); //选中某天
        this.$emit('clickDay',data)
    },
    changeMonth(data) {
      console.log(data); //左右点击切换月份
      this.$emit('changeMonth',data)
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    }
  },

}
</script>


