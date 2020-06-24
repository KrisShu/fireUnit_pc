<template>
  <div class="location_Map">
      <el-amap-search-box v-if="issearch"  class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" ></el-amap-search-box>
      <el-amap class="map_box" :zoom="zoom" :center="center">
         <el-amap-marker :position="position" :icon="icon">
         </el-amap-marker>
      </el-amap>
     
  </div>
</template>

<script>
export default {
    props:{
       lat:Number,
       lng:Number ,
       issearch:{
           type:Boolean,
           default(){
               return false
           }
       }
    },
    watch:{
        lat(val){
            console.log("有变化",val)
        }
    },
    created(){
        console.log("777777777777777777",this.lng )
    if(this.lng && this.lat){
        this.center = [this.lng,this.lat]
        this.position = [this.lng,this.lat]
    }
        
    },
    data(){
        return{
            zoom:12,//初始化地图显示层级
            center:[104.07,30.67],//地图中心坐标,
            position:[104.07,30.67], //标记点
            icon:require("../assets/image/index/mapMarker.png"),
            searchOption: {
                city: '成都',//城市名
                citylimit: false//是否限制城市内搜索
            },

        }
    },
    methods:{
        //搜索回调函数
        onSearchResult(pois) {
            console.log("打印地图位置",pois)
            let address = pois[0].name,
            lat = pois[0].lat,
            lng = pois[0].lng;
            this.position =[lng,lat]
            this.center =[lng,lat]
            console.log(this.position)
            this.$emit('getlocation',address,lat,lng)
        }
    }
}
</script>

<style lang="less">
.location_Map{
    width: 100%;
    height:600px;
    position: relative;
    .map_box{
        width: 100%;
        height: 100%;
    }
    .search-box {
      position: absolute;
      top: 25px;
      left: 20px;
    }
}
    
</style>