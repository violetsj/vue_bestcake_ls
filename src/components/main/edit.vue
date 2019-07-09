<template>
  <div class="hello">
    <h1>注册</h1>
    <button @click="edit">提交</button>
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
  },
  methods: {
      edit(){
                var data={
                    id: 118,
                    username: 'cr',
                    password: '123456',
                    avatar: 'https://avatars0.githubusercontent.com/u/22588905?v=4&s=120',
                    name: '超人'
                };

                 this.$apis.edit(data).then(res=>{
                     if(res.data.code==1){
                         console.log(res.data.msg);
                            this.$router.push({
                                path: "/user"
                            });
                     }
                 })

      }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


