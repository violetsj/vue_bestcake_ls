<template>
  <div class="hello">
    <div v-if="loginNum==0">
      <input type="text" v-model="uname">
      <input type="password" v-model="upwd">
      <button @click="login">login</button>
    </div>
     <div v-if="loginNum==1">
      <span>{{userInfo.name}}</span>
    </div>


  </div>
</template>

<script>
import Store from "storejs";
export default {
  data() {
    return {
      loginNum:0,
      uname:"",
      upwd:"",
      userInfo:{}
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      if(!Store.get("userInfo")){
        this.loginNum=0;
      }else{
       this.userInfo=Store.get("userInfo");
       this.loginNum=1;
      }
    },
    login(){
      // console.log(this.uname,this,upwd);
      var data={
        uname:this.uname,
        upwd:this.upwd
      }
      // console.log(data);
      this.$apis.login(data).then(res=>{
        if(res.data.code==0){
              this.$router.push({
                   path: "/edit"
              });
        }else if(res.data.code==1){
             this.loginNum=1;
        this.userInfo=res.data.data;
        //  Store.set("userInfo",this.userInfo);
        }else{
          console.log(res.data.msg);
        }
      
      })
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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


