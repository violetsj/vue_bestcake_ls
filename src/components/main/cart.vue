<template>
  <div class="hello">
      <ul>
        <li v-for="(item,index) in cartList" :key="index">
          <input type="checkbox" v-model="item.bool" @click="setSel">
          {{item.Name}}
          <button>+</button>
          <span>{{item.num}}</span>
          <button>-</button>
          <span>
            单价:¥{{item.num*item.CurrentPrice|setPrice}}
          </span>
        </li>
      </ul>
      <div>
        <span>总价:{{allPrice}}</span>
       <span>全选:<input type="checkbox" v-model="allSel"></span> 
       <span>购买</span>
      </div>
  </div>
</template>

<script>
var vm="";
import Store from "storejs"
export default {
  data () {
    return {
      cartList:[],
      selList:[],
      allSel:false
    }
  },
  mounted(){
    vm=this;
    vm.pageInit();
  },
  methods:{
    pageInit(){
      var cartList=Store.get("cartList");
      cartList.map((item)=>{
        item.bool=false;
      })
      this.cartList=cartList;
    },
    setSel(){
      // console.log(this.cartList); // 0 bool true 1 bool false  
      var selList=[];
        setTimeout(()=>{
          // 函数执行时异步
            this.cartList.map((item)=>{
              console.log(item.bool)
              if(item.bool){
                selList.push(item);
              }
            })
            // vue.$set()
            this.selList=selList;
        },80)
    }
  },
   computed:{
    //  computed 要在视图进行调用一波
      allPrice(){
        var num=0;
        this.selList.map((item)=>{
          console.log(item.num);
          num+=item.num*item.CurrentPrice;
        })
        if(this.selList.length==this.cartList.length){
          this.allSel=true;
        }else{
          this.allSel=false;
        }

        return num;
      }
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


