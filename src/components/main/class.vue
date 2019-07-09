<template>
  <div id="classs">
    <div class="tab">
      <span @click="oneTab">自营</span>
      <span @click="two">贝式严选</span>
    </div>

    <div class="zy" v-show="active==1">
      <span v-for="(item,index) in one" :key="index" @click="optionData(index)">{{item.name}}</span>
      <ul>
        <li v-for="(item,index) in activeList" :key="index">
          <img :src="item.ImgUrl" style="width:100px;height:100px;" @click="toShow(item)">
          <button @click="add(item)">add</button>
        </li>
      </ul>
    </div>

    <div class="bs" v-show="active==2">
      <span @click>乳品</span>
      <ul>
        <li v-for="(item,index) in activeList" :key="index">
          <img :src="item.ImgUrl" style="width:100px;height:100px;" @click="toShow(item)">
          <button @click="add(item)">add</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      active: 1,
      goodsList: [],
      activeList: [],
      oneTabNum:0,
      one: [
        { name: "经典", mark: "KSK" },
        { name: "女神", mark: "NS" },
        { name: "伴手礼", mark: "JZ" }
      ]
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.GetJdListNew(res => {
        var goodsList = res.data.Tag.cakelist;
        var url = `https://res.bestcake.com/m-images/ww/`;
        goodsList.forEach(item => {
          if (item.SupplyNo.indexOf("KSK") != -1) {
            item.ImgUrl = `${url}jd/${item.Name}.png`;
          } else if (item.SupplyNo.indexOf("NS") != -1) {
            item.ImgUrl = `${url}ns/${item.Name}.jpg`;
          } else if (item.SupplyNo.indexOf("JZ") != -1) {
            item.ImgUrl = `${url}jz/${item.Name}.png`;
          } else {
            item.ImgUrl = `${url}rp/${item.Name}.jpg`;
          }
        });
        // https://res.bestcake.com/m-images/ww/jd/极地牛乳.png?v=14
        // https://res.bestcake.com/m-images/ww/ns/一见倾心.jpg?v=14
        // https://res.bestcake.com/m-images/ww/jz/草莓先生.png?v=14
        //  res.data.Tag.cakelist
        this.goodsList = goodsList;
        this.optionData(0);
      });
    },
    optionData(index) {
      var tabNo=this.one[index]?this.one[index].mark:"RP";
      var activeList = [];
      this.goodsList.forEach(item => {
        if (item.SupplyNo.indexOf(tabNo) != -1) {
          activeList.push(item);
        }
      });
      this.activeList = activeList;
      if(index!=4){
        this.oneTabNum=index;
      }
    },
    oneTab(){
      this.active=1;
      this.optionData(this.oneTabNum) 
    },
    add(item) {
      var data = {
        id: item.ID, //产品ID
        Name: item.Name, //产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, //产品价格
        Size: item.Size, //产品规格
        url: item.ImgUrl, //产品购物车显示图片
        SupplyNo: item.SupplyNo //产品货号类型
      };
      // console.log(data);
      this.$store.commit("add",data);
    },
    two() {
      this.active = 2;
      // this.optionData("");
      this.optionData(4);
    },
    toShow(item) {
      //图片焦点图跳转详情页

      var data = {
        key: item.Name,
        c: item.SupplyNo
      };
      this.$router.push({
        path: "/show",
        query: { key: data.key, c: data.c }
      });
    },

    GetJdListNew(callback) {
      this.$apis.GetJdListNew().then(res => {
        callback(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#classs {
  .tab {
    display: flex;
    border: 1px solid red;
    text-align: center;
    span {
      flex: 1;
    }
  }
  .zy {
    display: flex;
    border: 1px solid red;
    text-align: center;
    span {
      flex: 1;
    }
  }
}
</style>


