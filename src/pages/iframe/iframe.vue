<style lang="less" scoped>
    #iframe-container {
        width: 100%;
        height: 100%;
       
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        .frame {
            width: 100%;
            height: 100%;
        }
    }
</style>
<template>
   <div id="iframe-container">
     <iframe :src="src" scrolling="auto" frameborder="0" class="frame" :onload="onloaded()"></iframe>
  </div>
</template>

<script>
export default {
    data() {
        return {
            src: "",
            loading: null
        };
    },
    mounted() {
        this.resetSrc('http://fd.sctsjkj.com:5080/swagger/index.html');
    },
    methods:{
        // 获取路径
        resetSrc: function(url) {
            this.src = url
            this.load()
        },
        load: function() {
        this.loading = this.$loading({  
            lock: true,
            text: "loading...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.8)",
            // fullscreen: false,
            target: document.querySelector("#iframe-container")
        })
        },
        onloaded: function() {
            if(this.loading) {
                this.loading.close()
            }
        }
    }
}
</script>

