// mint_底部导航
import {
  Tabbar,
  TabItem
} from 'mint-ui';
// mint_轮播
import {
  Swipe,
  SwipeItem
} from 'mint-ui';


export default (Vue) => {
  // mint_底部导航
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);

  // mint_轮播
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
}
