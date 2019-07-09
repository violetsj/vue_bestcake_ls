<template>
  <div>

    <lay_head v-if="!($route.path=='/show')"></lay_head>
    

    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import lay_head from "@/components/layout/lay_head";
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currntPath:this.$route.path
    }
  },
  mounted(){
      // 绑定 core.config
      // Vue.prototype.$eventHub=new Vue();

    // A 需要初始化的位置
        // this.$eventHub.$on("sub",(val)=>{
        //        console.log(val)//{name:"Msea"}
        // })

    //  任何组件调用
      // @click=test()
      // test(){
        // this.$eventHub.$emit("sub",{xxxxx})
      // }

        this.$store.commit("vuexInit");
    
  },
  components:{
    lay_head
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


