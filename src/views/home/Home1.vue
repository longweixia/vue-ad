<template>
  <div class="layout">
    <AdHeader></AdHeader>
    <Layout>
      <!-- <Sider
        breakpoint="md"
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <Menu
          active-name="1-2"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem name="1-1">
            <Icon type="ios-navigate"></Icon>
            <span>Option 1</span>
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="ios-search"></Icon>
            <span>Option 2</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-settings"></Icon>
            <span>Option 3</span>
          </MenuItem>
        </Menu>
        <div slot="trigger"></div>
      </Sider> -->
      <Layout>
        <AdBanner v-if="isBanner"></AdBanner>
        <AdTipRow v-if="isAdTipRow"></AdTipRow>

        <Content :style="{ minHeight: '220px' }" class="ad-content">
          <div class="ad-content-div">
            <!-- 文章提示说明 -->
            <div class="article-tip">
              <!-- 显示按钮，不为all的时候才显示 -->
              <Button
                size="small"
                :icon="closeBtn"
                v-show="adTip != 'all'"
                class="show-tips"
                @click="openTip"
                type="success"
                ghost
                >{{ tipBtnText }}</Button
              >
              <div v-show="adTipTerm == 'tb'" class="tips-text">
                <div class="tip-title1">淘宝赚：这其中主要是两个板块</div>
                <div class="tip-title2">1.淘宝刷单：
                  <div class="tip-title3">
                    (1)对接商家
                    <div class="tip-context">
                      这种一般是立返的，直接跟商家沟通，由商家来放单，一般是刷手付款后，商家直接转本金和佣金给刷手
                      <!-- 优缺点 -->
                      <div class="advantage-defect">
                        <!-- 优点 -->
                        <div>
                          <Tag color="success">优点</Tag>：
                          <span>返款非常快；沟通畅通；佣金高(通常有5%的佣金)</span>
                        </div>
                        <!-- 缺点 -->
                        <div>
                          <Tag color="magenta">缺点</Tag>：
                          <span>单量很少；放单不稳定；</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tip-title3">
                    (2)对接平台
                    <div class="tip-context">
                      这种一般是货返的，用户在平台上找到对应的商品，然后按照描述要求进行操作，去淘宝下单-支付，将订单号填写到平台。
                      当商品发货后，商家会把钱转到平台，平台再把钱放到用户账户上；刷手收货评价后，将评价反馈到平台后，平台会往用户账户打款
                      佣金，然后用户再将钱提现到自己的银行卡。
                      <!-- 优缺点 -->
                      <div class="advantage-defect">
                        <!-- 优点 -->
                        <div>
                          <Tag color="success">优点</Tag>：
                          <span>返款非常快；沟通畅通；佣金高(通常有5%的佣金)</span>
                        </div>
                        <!-- 缺点 -->
                        <div>
                          <Tag color="magenta">缺点</Tag>：
                          <span>回款周期较长(最长48小时)；需要垫付；</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 <div class="tip-title2">2.淘宝返利：</div>
              </div>
               <div v-show="adTipTerm == 'wx'" class="tips-text">wx</div>
            </div>

            <!-- {{articleList}}----- -->
            <!-- 文章列表 -->
            <slot name="article"></slot>
            <slot name="articleContent"></slot>
            <slot name="android"></slot>
            <div>
              <ArticleRight></ArticleRight>
            </div>
          </div>
        </Content>
      </Layout>
      <!-- <Footer class="layout-footer-center"> -->
      <AdFooter></AdFooter>
      <!-- </Footer> -->
    </Layout>
  </div>
</template>

<script>
import AdHeader from "./AdHeader";
import AdBanner from "./AdBanner";
import AdTipRow from "./AdTipRow";
// import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
// import Article from "./Article";
import AdFooter from "./AdFooter";
import ArticleRight from "./ArticleRight";
// import ArticleContent from "./ArticleContent";
import Bus from "@/assets/event-bus.js";

export default {
  name: "Home1",
  components: {
    AdHeader,
    AdBanner,
    AdTipRow,
    // Article,
    AdFooter,
    ArticleRight
  },
  data() {
    return {
      isCollapsed: false,
      value3: 0,
      // showArticle: false,
      articleList: [],
      // random:[],//随机文章
      showTips: false, //是否显示没有内容的提示
      articleLength: 1, //文章长度
      nextPre: [], //上一篇下一篇文章
      isBanner: true, //是否显示轮播
      isAdTipRow: true, //是否显示提示
      adTip: "all", //展示栏对应的类别
      adTipTerm:"",//判断点击的模块
      flagTip:false,//判断的点击是关闭还是开启
      tipBtnText:"显示提示",
      closeBtn:"ios-arrow-down"
     
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    openTip(){
      this.flagTip=!this.flagTip;
      if(this.flagTip){
        this.adTipTerm=this.adTip
        this.tipBtnText="关闭提示"
        this.closeBtn="ios-arrow-up"
      }else{
        this.adTipTerm=""
        this.tipBtnText="打开提示"
        this.closeBtn="ios-arrow-down"
      }
    }
  },
  mounted() {
    Bus.$on("getTypes", data => {
      if(data=="az"){
        this.isBanner = false
        this.$router.push({
          path:"/android",
          query:{}
        })
        return false
      }
      // else{
      //      this.$router.push({
      //     path:"/article",
      //     query:{}
      //   })
      // }
      this.adTip = data;
      this.adTipTerm=""
      // if (data != "all") {
      //   this.isBanner = false;
      //   this.isAdTipRow = false;
      // } else {
      //   this.isBanner = true;
      //   this.isAdTipRow = true;
      // }
    });
  }
};
</script>

<style lang="less" scoped>
.layout {
  // border: 1px solid #d7dde4;
  // background: #eeeeee;
  position: relative;
  // border-radius: 4px;
  overflow: hidden;
}
// .layout-header-bar {
//   background: #eeeeee;
//   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
// }
// .menu-item span {
//   display: inline-block;
//   overflow: hidden;
//   width: 69px;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   vertical-align: bottom;
//   transition: width 0.2s ease 0.2s;
// }
// .menu-item i {
//   transform: translateX(0px);
//   transition: font-size 0.2s ease, transform 0.2s ease;
//   vertical-align: middle;
//   font-size: 16px;
// }
// .collapsed-menu span {
//   width: 0px;
//   transition: width 0.2s ease;
// }
// .collapsed-menu i {
//   transform: translateX(5px);
//   transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
//   vertical-align: middle;
//   font-size: 22px;
// }
// .layout-header-bar {
//   height: 400px;
// }
// banner
// .zm-banner {
//   img {
//     width: 100%;
//     height: 300px;
//   }
// }
// .swiper-pagination {
//   position: relative;
//   margin-top: -25px;
// }
// .layout-header-bar {
//   // height: 500px;
//   margin-top: 64px;
// }

// 响应式
// 内容区顶部的展示栏
// .index-brand {
//     display: none;
// }

// 内容区
.ad-content {
  margin-right: auto;
  margin-left: auto;
  padding-right: 10px;
  padding-left: 10px;
  //  vue 媒体查询方式，注意从小到的顺序
  @media screen and (min-width: 576px) {
    width: 540px;
  }
  @media screen and (min-width: 768px) {
    width: 720px;
  }
  @media screen and (min-width: 992px) {
    width: 960px;
  }
  @media screen and (min-width: 1200px) {
    width: 1140px;
  }
  .ad-content-div {
    // height: 2111px;
    margin-right: -10px;
    margin-left: -10px;
    // .ad-content-left {
    //   float: left;
    //   width: 100%;
    //   min-height: 1px;
    //   padding-right: 10px;
    //   padding-left: 10px;
    //   @media screen and (min-width: 992px) {
    //     width: 640px;
    //   }
    //   @media screen and (min-width: 1200px) {
    //     width: 820px;
    //   }
    //   .content-box {
    //     // background-color: #fff;
    //     // @media screen and  (min-width: 992px) {
    //     margin-right: 0;
    //     margin-bottom: 20px;
    //     margin-left: 0;
    //     padding: 30px;
    //     background-color: #fff;

    //     // }
    //   }
    // }
    // .ad-content-right {
    //   float: left;
    //   width: 100%;
    //   min-height: 1px;
    //   padding-right: 10px;
    //   padding-left: 10px;
    //   // @media (min-width: 992px){
    //   //         display: block !important;
    //   // }
    //   @media (min-width: 1200px) {
    //     width: 320px;
    //     display: block !important;
    //   }
    //   @media (min-width: 992px) {
    //     width: 320px;
    //     display: block !important;
    //   }
    // }
  }
}
// .ad-none {
//   display: none !important;
// }
.ad-tips {
  text-align: center;
}
</style>
