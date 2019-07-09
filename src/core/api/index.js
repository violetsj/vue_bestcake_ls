import request from "./http"
import mock from "@/mock/mock"

var url1 = "/json1811.ashx";

class Apls {
  //首页轮播
  GetBannerList(data) {
    return request({
      method: "get",
      url: url1,
      params: data
    })
  }
  //首页商品数据
  GetIndexCakeList() {
    return request({
      method: "get",
      url: url1,
      params: {
        m: "GetIndexCakeList",
        v: "1560219368002",
        c: "Index"
      }
    })
  }
  //  焦点图详情接口
  GetNSCakeByName(data) {
    return request({
      method: "get",
      url: url1,
      params: {
        Name: data.Name,
        c: "NsCakeCenter",
        m: "GetNSCakeByName",
        v: "1560225194548"
      }
    })
  }
  // 商品详情接口
  GetCakeByName(data) {
    return request({
      method: "get",
      url: url1,
      params: {
        City: "上海",
        ProName: data.ProName,
        c: "Product",
        m: "GetCakeByName",
        v: "1560236137480"
      }
    })
  }
  //分类数据接口
  GetJdListNew() {
    return request({
      method: "get",
      url: url1,
      params: {
        c: "NsCakeCenter",
        m: "GetJdListNew",
        v: "1560225194548"
      }
    })
  }

  GetjzCakeInfo(data){
    return request({
      method: "get",
      url: url1,
      params: {
        City: "上海",
        ProName: data.ProName,
        c: "IndexCenter",
        m: "GetjzCakeInfo",
        v: "1560236137480"
      }
    })
  }
  GetRuPCakeByName(data){
    return request({
      method: "get",
      url: url1,
      params: {
        Name: data.Name,
        c: "NsCakeCenter",
        m: "GetRuPCakeByName",
        v: "1560225194548"
      }
    })
  }

  login(data){
    return mock.post("/login",{
      data
    })
  }

  edit(data){
    return mock.post("/test",{
      data
    })
  }

  



}


export default new Apls();
