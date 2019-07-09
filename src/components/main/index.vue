<template>
  <div id="warp">
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img class="imgs" :src="item.ImgUrl">
        </mt-swipe-item>
      </mt-swipe>
    </div>
      <!-- 8个ico -->
    <div class="ico">
      ico
    </div>
    <!-- 3张焦点图 -->
    <div class="imgClass">
        <span v-for="(item,index) in icoImgList" :key="index" @click="toShow(item)">{{item.name}}</span>
    </div>
    <!-- 魔法猜心Tab -->
    <div class="tabs">
      <span v-for="(item,index) in tabClass" :key="index" @click="setTab(index)" :class="{active:tabActive==index}">{{item}}</span>
      <hr>
      <ul>
        <li v-for="(item,index) in activeList" :key="index" @click="toShow(item)">{{item.Name}}</li>
      </ul>
    </div>
    <hr>
    <!-- 品质甄选  -->
    <div class="goodsList">
        <ul>
          <li v-for="(item,index) in goodList" :key="index">
            <img  v-lazy="item.ImgUrl" @click="toShow(item)">
            {{item.Name}}
            <button @click="add(item)">add</button>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  name: "HelloWorld",
  data() {
    return {
      bannerList: [],
      // 3张焦点图数据
      icoImgList: [
        {
          name: "宠爱少女",
          key: "宠爱少女",
          ImgUrl:"https://res.bestcake.com/m-images-2/guanggao1.png?v=0419"
        },
        {
          name: "小猪蛋糕-贝利",
          key: "贝丽",
          ImgUrl:""
        },
        {
          name: "星光游乐园",
          key: "星光游乐园",
          ImgUrl:""
        }
      ],
      // 8个ICO数据
      iconList:[],

      //tab魔法菜心数据
      tabClass:["送恋人","送挚友","送长者","送亲子"],

      activeList:[],
      tabActive:0,
// --------------------------------------------

      // 魔法猜心所有数据
      tabList:[],
      // 品质甄选所有数据
      goodList:[]
    };
  },
  mounted() {
    Indicator.open();
    this.GetBannerList(res => {
      // 3张焦点图数据
      res.forEach(item => {
        item.ImgUrl = "https://res.bestcake.com/" + item.ImgUrl;
      });
      this.bannerList = res;
      Indicator.close();
    });
    this.GetIndexCakeList(res => {
      // 8个图标数据
      this.iconList=res.iconList;
      //首页tab切换数据
      res.list.forEach((item)=>{
        // console.log()
        if(item.TabType==4){  //type=4魔法菜心 all
          // tab 魔法猜心数据制作完毕 
          this.tabList.push(item);
        }else{
          this.goodList.push(item);
        }
      })
      Indicator.close();
      this.setTab(0);
    });



  },
  methods: {
    toShow(item) {
      //图片焦点图跳转详情页
      var data={
        key:item.Name||item.key,
        c:item.SupplyNo||"NS"
      }
      this.$router.push({
        path: "/show",
        query:{key:data.key,c:data.c}
      });
    },
    setTab(index){
      // console.log(key);
      // this.tabActive=index;
      // console.log();
      var activeList=[];
        // console.log(this.tabClass[index])
      this.tabList.forEach((item)=>{
        // console.log(item.ActiveName)
        if( this.tabClass[index]==item.ActiveName){   
          activeList.push(item);
        }
      })
      this.activeList=activeList.slice(0,3);
      this.tabActive=index;
    },
    test(key){
      console.log(key);
    },
    add(item){
       var data = {
        id: item.Pid,  //产品ID
        Name: item.Name, //产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, //产品价格
        Size: item.Size, //产品规格
        url: item.ImgUrl, //产品购物车显示图片
      	SupplyNo:item.SupplyNo  //产品货号类型
      };
      this.$store.commit("add",data);
    },
    // ------------------接口部分
    GetBannerList(callback) {
      var data = {
        v: "1559785164172",
        c: "Index",
        m: "GetBannerList",
        Type: "2",
        City: "上海"
      };
      this.$apis.GetBannerList(data).then(res => {
        callback(res.data.Tag.List);
      });
    },
    GetIndexCakeList(callback) {
      this.$apis.GetIndexCakeList().then(res => {
        callback(res.data.Tag);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#warp {
  .swipe {
    width: 100%;
    height: r(190 * 2);
    .imgs {
      width: 100%;
      height: 100%;
    }
  }
  .imgClass {
    span {
      margin-left: 50px;
      margin-top: 50px;
    }
  }
  .tabs{
    display: flex;
    text-align: center;
    span{
      flex:1
    }
  }
  .goodsList{
    li{
      img{
        width:100px;
        height:100px;
        border:1px solid red;
      }
    }
  }
  .active{
    background:red;
  }
}
</style>


