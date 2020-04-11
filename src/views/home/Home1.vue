<template>
  <div class="layout">
    <AdHeader @getTypes="getTypes"></AdHeader>
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
        <AdBanner></AdBanner>
        <AdTipRow></AdTipRow>
       
        <Content :style="{ minHeight: '220px' }" class="ad-content">
          <div class="ad-content-div">
            <div class="ad-content-left">
              <div class="content-box">
                <!-- {{articleList}}----- -->
                <!-- 文章列表 -->
                <div v-if="!showTips">
                  <!-- <Article :articleIndex="articleIndex"></Article> -->
                  <Article v-for="(item,index) in articleList" :key="index" 
                  :articleIndex="index" :articleObj="articleList[index]"></Article>
                </div>
                 <div v-if="showTips" class="ad-tips">
                   该分类下暂无数据，您可以查看其它分类
                 </div>
                <!-- <div vif="showArticle">
                  <ArticleContent></ArticleContent>
                </div> -->
                <!-- <div>
               <VueMarkdown :source="articleList"></VueMarkdown>
                </div> -->
              </div>
            </div>
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
import Article from "./Article";
import AdFooter from "./AdFooter";
import ArticleRight from "./ArticleRight";
import ArticleContent from "./ArticleContent";

export default {
  name: "Home1",
  components: {
    AdHeader,
    AdBanner,
    AdTipRow,
    Article,
    AdFooter,
    ArticleRight,
    ArticleContent
  },
  data() {
    return {
      isCollapsed: false,
      value3: 0,

      showArticle: false,
      articleList: [],
      showTips:false,//是否显示没有内容的提示
      // articleIndex:1
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    // 子组件传来的点击每一项大类
    getTypes(name){
      this.getArticle(name)
    },
    getArticle(flag) {
      this.axios
        .get("articles/get", {
          params: {
            // pageSize: this.pageSize,
            // currentPage:this.currentPage,
            userName: "longwei",
            flag:flag,//all表示所有文章
          }
        })
        .then(res => {
          console.log(res.data.resulet,66666)
          res.data.resulet.length>0?this.showTips= false:this.showTips= true
          this.articleList = res.data.resulet;
          
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  mounted() {
    // var mySwiper = new Swiper(".swiper-container", {
    //   autoplay: true,
    //   delay: 2000, //2秒切换一次
    //   loop: true,
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination"
    //   }
    // });
    // 默认获取所有的文章
    this.getArticle("all");
    
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
    .ad-content-left {
      float: left;
      width: 100%;
      min-height: 1px;
      padding-right: 10px;
      padding-left: 10px;
      @media screen and (min-width: 992px) {
        width: 640px;
      }
      @media screen and (min-width: 1200px) {
        width: 820px;
      }
      .content-box {
        // background-color: #fff;
        // @media screen and  (min-width: 992px) {
        margin-right: 0;
        margin-bottom: 20px;
        margin-left: 0;
        padding: 30px;
        background-color: #fff;

        // }
      }
    }
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
.ad-tips{
  text-align: center;
}
</style>
