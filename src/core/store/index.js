import Vue from "vue";
import Vuex from "vuex";
// import apis from "@/core/api/index"
import Store from "storejs"
// console.log("OK");
Vue.use(Vuex);
// this.$store
// this.$store.state 访问属性
// this.$store.commit 访问属性 mutations 方法   this.$store.commit("add",{xxx})
// this.$store.dispatch 访问属性 actions 方法   this.$store.dispatch("add",{xxx})


//定义属性值  data
const state={
	cartList:[],
	isLogin:false
}
//定义同步方法
const mutations={
	vuexInit(state){
		state.cartList=Store.get("cartList")||[];
		// isLogin
	},
	add(state,data){
		// if(isLogin){

		// }else{

		// }
		// console.log(Store);
		if(state.cartList.length!=0){
			// console.log(state.cartList)
			// forEach空数组不遍历
			var bool=true;
			state.cartList.forEach((item)=>{
				if(data.id==item.id){
					item.num++;
					bool=false;
					return;
				}
			})
			if(bool){
				data.num=1;
				state.cartList.push(data);
			}
			// for(var i=0;i<state.cartList.length;i++){
			// 	if(data.id==state.cartList[i].id){
			// 		state.cartList[i].num++;
			// 		return;
			// 	}
			// }
		
		}else{
			data.num=1;
			state.cartList.push(data);
		}
		Store.set("cartList",state.cartList);
	}
}
//定义 computed(属性计算)
const getters={
	count(state){
		return state.cartList.length;
	}
}
//定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions={
	syFn(context){
		// context.state  可以取 state 属性
		// context.commit  可以调用 mutations 同步方法 属性
		// context.dispatch可以调用 actions 异步方法 属性
		// 在组件里面调用 也是一样,同上面的方法一直 
	},
	test(context,data){
		console.log(data)
	}	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
