<template>
  <div class="fireAlarmLocationBox">
      <!--<el-row :gutter="30" class="row-box">-->
        <!--<el-col :span="8">-->
            <div class="left">
               <el-scrollbar style="height:100%">
                <div class="left_top">
                    <p>楼层：{{address}}</p>
                    <el-button v-if="ismark"  @click="stopmark" type="danger">结束标记</el-button>
                    <el-button v-else  @click="startmark" type="primary">开始标记点位</el-button>
                </div>
                <baseTable
                  :tableThead="tableThead"
                  :tableData="tableData"
                  :totalCount='totalCount'
                  :pageSize="10"
                  :specailText="specailText"
                  @showdetails="getdetails"
                >
                </baseTable>
               </el-scrollbar>
            </div>
        <!--</el-col>-->
        <!--<el-col :span="15">-->
            <div class="right">
              <div ref="dv" class="img" id="dv" @click="imgmark($event)">
                <img   ref="localImg"  id="LiuYiFeiImg" :src=floor_Picture>
              </div>
            </div>

        <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
import baseTable from '../../../components/baseTable/index'
export default {
    components:{
        baseTable
    },
    data(){
        return{
            address:'',
            floor_Picture:"",
            iscloummark:false,//一行的
            ismark:false,
            imgmark1:false,
            clounmIndex:0,
            specailText:"查看",
            tableThead:[
                {
                    name:'部件地址',
                    prop:'identify',
                },
                {
                    name:'部件类型',
                    prop:'typeName',
                },
                {
                    name:'安装位置',
                    prop:'location',
                },
                {
                    name:'坐标',
                    prop:'coordinateX',
                    prop1:'coordinateY',
                },
                {
                    name:'操作'
                }
            ],
            tableData:[],
            totalCount:0,
            coefficientX:1,
            coefficientY:1,
            maxImgWidth:1197,
            maxImgHeight:929,
            screenWidth:1920,
            screenHeight:1080,
            onlyflag:'',//
            flag:'addMark',//
            markx:0,//标记点x
            marky:0,//标记点y
            floorId:''
        }
    },
    created(){
      
      this.floorId = this.$route.query.floor_id
     
    },
    mounted(){
        //created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
        //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
        // this.getallmark()
      //进入页面将所有点显示
      this.GetBitMapSet();
      this.getImgCoefficient();//图片比率
      this.screenWidth = document.body.clientWidth;
      this.screenHeight = document.body.clientHeight;
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth;
          this.screenHeight = document.body.clientHeight;
          this.getImgCoefficient();
          if(this.ismark&&this.iscloummark){
            this.celarMark();
            this.createMarker(this.markx,this.marky,this.onlyflag)
          }else{
            this.getallmark()
          }
        })();
      };
    },
    methods:{
      //获取列表内容
      GetBitMapSet(){
        this.$axios.get(this.$api.GetBitMapSet,{
          params:{floorId:this.floorId}
        }).then(res=>{
          console.log("res",res)
          this.address = res.data.result.architectureName+res.data.result.floorName
          this.floor_Picture = res.data.result.floor_Picture;
          this.tableData = res.data.result.bitMapSetDetectorList
          this.getallmark();
        }).catch(err=>{
          console.log("err",err)
        })
      },
      //将所有点位标在图上
      getallmark(){
        for(let arr of this.tableData){
          
          this.createMarker(arr.coordinateX,arr.coordinateY,arr.id)
        }
      },
      //
      getdetails(items){
        console.log("items",items)
          if(this.ismark){//开始标记点位
            this.iscloummark = true;
            this.onlyflag=items.row.id;
            this.clounmIndex = items.$index //一行的index
            this.celarMark();
            if(items.row.coordinateX || items.row.coordinateY ){
              this.createMarker(items.row.coordinateX,items.row.coordinateY,this.onlyflag)
            }
          }else{//获取已标记点位改变状态颜色
            
            let dt = document.getElementById(items.row.id);
            if(dt){
              let a = $(`#${items.row.id}`).siblings().removeClass('blue')
              console.log("aaaaa",a)
              dt.className = `marker blue`;

            }
          }

      },
        //开始标记
      startmark(){
          this.ismark =!this.ismark;
          this.specailText = '标记'
          this.celarMark();//开始标记并清除所有点位
      },
      //结束标记，
      stopmark(){
          this.specailText = '查看'
          this.ismark =!this.ismark;
          this.iscloummark =!this.iscloummark;
          this.GetBitMapSet();
          // let markObject ={
          //       coordinateX:this.markx,
          //       coordinateY:this.marky,
          //       detectorId:this.onlyflag
          // };
          // this.$axios.put(this.$api.UpdateDetectorCoordinate,markObject).then(res=>{
          //   console.log("修改点位成功",res)
          //   this.GetBitMapSet();
          // }).catch(err=>{
          //   console.log("修改点位失败",err)
          // })

          
        },
        //创建标记点
       /*  createMarker(x, y,onlyflag) {
            if(x==0 && y==0){
              return
            }
            const flagId=document.getElementById(onlyflag);
            if(flagId){
                document.getElementById('dv').removeChild(flagId)
            }
            //再标记之前清空
            let div = document.createElement('div');
            div.className = `marker`;
            div.id = onlyflag;
            div.style.left = (x*this.coefficientX) + 'px';
            div.style.top = (y*this.coefficientY) + 'px';
            div.style.textAlign ='center';
            div.textContent=onlyflag;
            div.addEventListener("click", this.func2, false);
            document.getElementById('dv').appendChild(div);

            if(this.ismark && this.iscloummark && this.imgmark1){
                let markObject ={
                      coordinateX:this.markx,
                      coordinateY:this.marky,
                      detectorId:this.onlyflag
                };
                this.$axios.put(this.$api.UpdateDetectorCoordinate,markObject).then(res=>{
                  console.log("修改点位成功",res)
                  this.imgmark1 = false;

                  this.tableData[this.clounmIndex].coordinateX = x;
                  this.tableData[this.clounmIndex].coordinateY = y;
                }).catch(err=>{
                  console.log("修改点位失败",err)
                })
            }
        }, */
       /*  imgmark(e){
            if(this.iscloummark){
                this.imgmark1 = true;
                let x = e.offsetX+10, y = e.offsetY+10;//获取被点击的坐标
                this.markx = this.changeCoefficient(x,this.coefficientX);
                this.marky = this.changeCoefficient(y,this.coefficientY);
                console.log("markx,marky",this.markx,this.marky)
                this.createMarker(this.markx,this.marky,this.onlyflag)
            }else{
                // alert("请选择部件地址")
            }

        }, */
        imgmark(e){
          console.log(e.pageY)
          var radius=10;//半径
          var offset=$("#dv").offset();
          var top=e.pageY-offset.top-radius+"px";
          var left=e.pageX-offset.left-radius+"px";
          console.log(top);
          console.log(left);
          $('#dv').append('<div class="marker" style="top:'+top+';left:'+left+'"></div>')
          // if(this.iscloummark){
          //   console.log("sssssssss")
          //   this.imgmark1 = true;
          //   $("#dv").click((e)=>{
          //     var radius=10;//半径
          //     var offset=$("#dv").offset();
          //     var top=e.pageY-offset.top-radius+"px";
          //     var left=e.pageX-offset.left-radius+"px";
          //     console.log(top);
          //     console.log(left);
          //     $('#dv').append('<div class="marker" style="top:'+top+';left:'+left+'"></div>')

          //   })
          // }
        },
        func2(){
          window.event.stopPropagation();//阻止冒泡
        },
        //获取图片缩小率
        getImgCoefficient(){
          let imgw = this.$refs.dv.offsetWidth,
          imgh = this.$refs.dv.offsetHeight;//获取图片的宽高
          this.coefficientX=this.changeCoefficient(imgw,this.maxImgWidth);
          this.coefficientY=this.changeCoefficient(imgh,this.maxImgHeight);
        },
        //    页面大小改变坐标系数
        changeCoefficient(num1,num2){
           return this.accDiv(num1,num2)
         },
        accDiv(arg1,arg2){
          let t1=0,t2=0,r1,r2;
          try{t1=arg1.toString().split(".")[1].length}catch(e){}
          try{t2=arg2.toString().split(".")[1].length}catch(e){}
            r1=Number(arg1.toString().replace(".",""));
            r2=Number(arg2.toString().replace(".",""));
            return (r1/r2)*Math.pow(10,t2-t1);
        },
      // 标记模式清除所有显示点
      celarMark(){
        let a = document.getElementById("dv").getElementsByTagName("div");
        let b=[];
        if(a.length){
          for(let i of a){
              b.push(i);
          }
          b.map(item=>{
            // console.log('item',item)
            document.getElementById('dv').removeChild(item);
          });
        }
      }
    }
}
</script>

<style lang="less">
    .fireAlarmLocationBox{
        padding: 20px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        color: white;
        .left{
            position: absolute;
            width:35%;
            height:100%;
            top:0;
            left:0;
            padding:20px;
            box-sizing:border-box;
            .left_top{
                display: flex;
                align-items: center;
                p{
                    margin-right: 40px;
                }
            }
        }
        .right{
          position: absolute;
          width:65%;
          height:100%;
          top:0;
          right:0;
          padding:20px;
          box-sizing:border-box;
            #dv{
              width: 100%;
              height:100%;
            }
            img{
                width:100%;
                height:100%;
            }
            #myCanvas{
              position: absolute;width: 100%;height: 100%;top:0;left: 0;background-color:rgba(0,0,0,0.4);
            }
            .marker{
                position:absolute;
                width:20px;
                height:20px;
                background:rgb(22, 107, 218);
                cursor: pointer;
                border-radius: 50%;
                color: transparent;
            }
            .blue{
                background:#f00 ;
                // position: relative;
            }
        }
        .dd{
            border-radius: 8px;
        }
        .hoverp{
          width: 200px;
          height: 50px;
          background: white;
          color:darkcyan;
          position: absolute;
          left: 50px;

        }
    }
</style>
