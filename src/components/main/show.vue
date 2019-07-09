<template>
  <div id="show">
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img class="imgs" :src="item">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ul>
     <li v-for="(item,index) in sizeList" :key="index"> 
        <button @click="selSize(index)">{{item.Size}}</button>
      </li>
    </ul>
    <button @click="add">add</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      // 轮播图数据
      bannerList: [],
      //商品详情数据
      goods:{},
      sizeList:[],
      showData:{},
      selNum:0

    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      // 初始化执行

      // ns  KSK-0110-1   RP-0005-58
      //  console.log(this.$route.query.c.indexOf("ns")!=-1);
      //  console.log(this.$route.query.c.indexOf("KSK")!=-1);
      //  console.log(this.$route.query.c.indexOf("RP")!=-1);

      if (this.$route.query.c.indexOf("NS") != -1) {
        this.GetNSCakeByName(res => {
          this.goods=res;
        });
        this.setBannerList("ns-detail");
      } else if (this.$route.query.c.indexOf("KSK") != -1) {
        this.GetCakeByName(res => {
          this.goods=res;
        });
        this.setBannerList("jd-detail");
      } else if (this.$route.query.c.indexOf("RP") != -1) {
        this.GetRuPCakeByName(res => {
          this.goods=res;
        });
        this.setBannerList("rp-detail");
      } else {
        this.GetjzCakeInfo(res => {
          this.goods=res;
        });
        this.setBannerList("jz-detail");
      }
    },
    selSize(index){
      this.selNum=index;
    },
    add(){
      var data = {
          id: this.sizeList[this.selNum].ID||this.sizeList[this.selNum].Id,  //产品ID
          Name: this.showData.Name, //产品详情图片拼接,//贝利
          CurrentPrice:this.sizeList[this.selNum].CurrentPrice, //产品价格
          Size: this.sizeList[this.selNum].Size, //产品规格
          url: this.bannerList[0], //产品购物车显示图片
          SupplyNo:this.sizeList[this.selNum].SupplyNo  //产品货号类型
      }
       this.$store.commit("add",data);
    },
    setBannerList(path) {
      //  星光游乐园/星光游乐园-1.jpg
      for (var i = 0; i < 4; i++) {
        // https://res.bestcake.com/m-images/ns-detail/星光游乐园/星光游乐园-1.jpg
        // https://res.bestcake.com/m-images/jd-detail/奥利奥雪域牛乳芝士/奥利奥雪域牛乳芝士-1.jpg
        // https://res.bestcake.com/m-images/rp-detail/奥利奥雪域牛乳芝士/奥利奥雪域牛乳芝士-1.jpg

        var str = `https://res.bestcake.com/m-images/${path}/${
          this.$route.query.key
        }/${this.$route.query.key}-${i + 1}.jpg`;
        this.bannerList.push(str);
      }
    },

    GetNSCakeByName(callback) {
      // 焦点图详情接口
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetNSCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetCakeByName(callback) {
      var data = {
        ProName: this.$route.query.key
      };
      // 商品详情接口
      this.$apis.GetCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetjzCakeInfo(callback) {
      var data = {
        ProName: this.$route.query.key
      };
      // 商品详情接口
      this.$apis.GetjzCakeInfo(data).then(res => {
        callback(res);
      });
    },
    GetRuPCakeByName(callback) {
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetRuPCakeByName(data).then(res => {
        callback(res);
      });
    }
  },
  watch:{
    goods:{
      handler(){
          var city="上海";
          if(this.goods.data.Tag.length){
              // console.log(this.goods.data.Tag);
              this.goods.data.Tag.forEach((item)=>{
                if(city==item.City){
                  this.sizeList.push(item);
                }
              })
              this.showData= this.sizeList[0];

          }else{
             this.sizeList=this.goods.data.Tag.infos.CakeType;
            // console.log(this.goods.data.Tag.infos.CakeType)
             this.showData=this.goods.data.Tag.infos;
          }
          console.log(this.sizeList)
          // this.sizeList  规格分类
          // this.showData  详情数据
          // console.log( this.sizeList)

          // console.log(this.goods.data.Tag)
          // console.log(this.sizeList);
      },
      deep:true
    }
  }
};
</script>

<style scoped lang="scss">
#show {
  .swipe {
    width: 100%;
    height: r(190 * 2);
    .imgs {
      width: 100%;
      height: 100%;
    }
  }
}
</style>


