<template>
  <div class="content-article">
    <Home1 :isBanner="false" :isAdTipRow="false" :adTip="adTip">
      <div slot="article">
      <MyBreadcrumb :getRouter="getRouter" :title1="title1" :title2="title2" :icon1="icon1" :icon2="icon2"></MyBreadcrumb>
        <div v-if="showTips" class="ad-tips content-left ad-content-left">
          该分类下暂无数据，您可以查看其它分类
        </div>
        <div v-if="!showTips" class="ad-content-left">
          <div class="content-box">
            <!-- 顶部参数 -->
            <div class="detail-top">
              <!-- 左边图片 -->
              <div class="img-left">
                <img :src="tagList.coverImage" />
                <div class="app-name">{{ tagList.name }}</div>
              </div>
              <!-- 右边各项参数 -->
              <div class="parameter">
                <ul>
                  <li>
                    <span class="item-tag">分类：</span>
                    <span class="item-text">{{ tagList.getClass }}</span>
                  </li>
                  <li>
                    <span class="item-tag">提现：</span>
                    <span class="item-text">{{ tagList.tixian }}</span>
                  </li>
                  <li>
                    <span class="item-tag">本金：</span>
                    <span class="item-text">{{ tagList.benjin }}</span>
                  </li>
                  <li>
                    <span class="item-tag">系统：</span>
                    <span class="item-text">{{ tagList.system }}</span>
                  </li>
                  <li>
                    <span class="item-tag">时间：</span>
                    <span class="item-text">{{ tagList.times | formatDateDay }}</span>
                  </li>
                  <li>
                    <span class="item-tag">发布：</span>
                    <span class="item-text">{{ tagList.autor }}</span>
                  </li>
                  <li>
                    <span class="item-tag">浏览：</span>
                    <span class="item-text">{{ tagList.view }}次</span>
                  </li>
                  <li>
                    <span class="item-tag">下载：</span>
                    <span class="item-text">{{ tagList.downLoadNum }}次</span>
                  </li>
                  <li>
                    <span class="item-tag">可玩性：</span>
                   
                    <span class="item-text"><Rate class="detaill-rate" disabled v-model="tagList.rate" /></span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 下载 -->
            <div class="az_btn">
              <a :href="tagList.downLoadUrl" rel="nofollow" target="blank">
                <p style="width: 103px">进入下载</p>
                <span
                  @mouseenter="hoverQrcode(1)"
                  @mouseleave="hoverQrcode(0)"
                ></span
              ></a>
              <div class="qrcodeDiv" v-if="showQrcode">
                <img :src="tagList.qrcode" />
                <div class="qrcode-text">手机扫描下载</div>
              </div>
            </div>
            <Divider></Divider>
            <!-- 详情 -->
            <div class="detail-bottom">
              <!-- 介绍 -->
              <div class="app-introduce">
                <div class="detail-title"><Icon type="md-flame" />软件介绍</div>
                <div class="detail-context">
                  {{ tagList.introduce }}
                </div>
              </div>
              <!-- 特点 -->
              <div class="app-introduce">
                <div class="detail-title">
                  <Icon type="md-thumbs-up" />软件特点
                </div>
                <div class="detail-context">
                  <ul>
                    <li>
                      {{ tagList.trait }}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 玩家群 -->
              <div class="app-introduce">
                <div class="detail-title">
                  <Icon type="ios-chatbubbles" />玩家群
                </div>
                <div class="detail-context">
                  <ul>
                    <li v-for="(item, index) in tagList.contact" :key="index">
                      {{ item.types }}：{{ item.text }}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 截图 -->
              <div class="app-introduce">
                <div class="detail-title">
                  <Icon type="ios-chatbubbles" />玩家群
                </div>
                <div class="detail-context">
                  <ul>
                    <li
                      v-for="(item, index) in tagList.screenshot"
                      :key="index"
                    >
                      <img :src="item.url" />
                      <div>{{ item.name }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Home1>
  </div>
</template>

<script>
import Home1 from "./Home1";
import MyBreadcrumb from "./MyBreadcrumb";
import VueMarkdown from "vue-markdown";
import Bus from "@/assets/event-bus.js";
export default {
  name: "AppDetail",

  props: [],
  components: { VueMarkdown, Home1 ,MyBreadcrumb},
  data() {
    return {
     getRouter:"",
      title1:"淘宝赚钱",
      title2:"货返",
      icon1:"ios-home-outline",
      icon2:"logo-buffer",
      tagList: {},
      // [
      //   {
      //     tag: "分类",
      //     text: "安卓赚钱"
      //   },
      //   {
      //     tag: "提现",
      //     text: "无门槛"
      //   },
      //   {
      //     tag: "本金",
      //     text: "需要"
      //   },
      //   {
      //     tag: "系统",
      //     text: "安卓苹果"
      //   },
      //   {
      //     tag: "时间",
      //     text: "2012-09"
      //   },
      //   {
      //     tag: "发布",
      //     text: "用户"
      //   },
      //   {
      //     tag: "浏览",
      //     text: "254次"
      //   },
      //   {
      //     tag: "下载",
      //     text: "145次"
      //   },
      //   {
      //     tag: "可玩性",
      //     text: "5"
      //   }
      // ],
      adTip: "appDetail",
      isBanner: false,
      isAdTipRow: false,
      articleList: [],
      showTips: false, //是否显示没有内容的提示
      articleLength: 1, //文章长度
      articleIndex: 0,
      articleObj: [
        {
          coverImage: "",
          title: "",
          content: "",
          tag: "",
          autor: "",
          times: ""
        }
      ],
      showQrcode: false
    };
  },
  computed: {},
  watch: {
    $route: {
      //同一个路由，参数不同会触发这里
      handler() {
        if (this.$route.query.type) {
          //点击非首页导航
          this.isBanner = false;
          this.isAdTipRow = false;
          this.adTip = this.$route.query.type;
          this.getArticle(this.$route.query.type);
        } else {
          this.isBanner = true;
          this.isAdTipRow = true;
          this.adTip = "all";
          this.getArticle("all");
        }
      },
      deep: true
    }
  },
  methods: {
    getAppList(types1, types2, id) {
      this.axios
        .get(`${this.baseUrl}/appLists/getApp`, {
          //接全部改成模板字符创
          params: {
            // pageSize: this.pageSize,
            // currentPage:this.currentPage,
            types1: types1,
            types2: types2,
            id: id
          }
        })
        .then(res => {
          //一开始要查所有数据的长度，用来传给文章底部的上一篇下一篇时，判断当前文章是不是最后一篇
          res.data.resulet.length > 0
            ? (this.showApp = false)
            : (this.showApp = true);
          this.tagList = res.data.resulet;
          this.title2 = res.data.resulet.getClass
          // console.log(this.appArry, "打印文章数据");
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 进入文章详情
    gotoContent(item, index) {
      //拼装上一页，下一页数据
      let nextidIndex = this.articleObj[index - 1]
        ? this.articleObj[index - 1].idIndex
        : -1;
      let nextname = this.articleObj[index - 1]
        ? this.articleObj[index - 1].title
        : -1;
      let preidIndex = this.articleObj[index + 1]
        ? this.articleObj[index + 1].idIndex
        : -1;
      let prename = this.articleObj[index + 1]
        ? this.articleObj[index + 1].title
        : -1;
      let nextPre = {
        nextidIndex: nextidIndex,
        nextname: nextname,
        preidIndex: preidIndex,
        prename: prename
      };
      this.$router.push({
        path: "/articleContent",
        query: {
          // vue路由传对象刷新会报错，数据丢失，用json字符串解决
          // articleObj:encodeURIComponent(JSON.stringify(item)),
          idIndex: this.articleObj[index].idIndex,
          types: this.articleObj[index].types,

          nextPre: encodeURIComponent(JSON.stringify(nextPre)) //上一页下一页数据
        }
      });
    },
    hoverQrcode(flag) {
      if (flag == 1) {
        this.showQrcode = true;
      }
      else if(flag==0){
         this.showQrcode = false
      }
    }
  },
  mounted() {
    console.log(this.$route.query.id);
    let types1 = this.$route.query.types1;
    let types2 = this.$route.query.types2;
    let id = this.$route.query.id;
    this.$route.query.types2,
    this.getAppList(
      types1,
      types2,
      id
    );
     switch (types1) {
            case "tb":
            this.title1 = "淘宝赚钱"
            this.getRouter = "taobao"
                break;
             case "wx":
              this.title1 = "微信赚钱"
                break;
            default:
                break;
        }
    //  switch (types2) {
    //         case "huofan":
    //         this.title1 = "货返"
    //             break;
    //          case "wx":
    //           this.title1 = "微信赚钱"
    //             break;
    //         default:
    //             break;
    //     }
    // if (this.$route.query.type) {
    //   //点击非首页导航
    //   this.isBanner = false;
    //   this.isAdTipRow = false;
    //   this.adTip = this.$route.query.type;
    //   //  this.getArticle(this.$route.query.type)
    // } else {
    //   this.isBanner = true;
    //   this.isAdTipRow = true;
    //   this.adTip = "all";
    //   // this.getArticle("all")
    // }
    // this.getArticle("all");
    // Bus.$on("getTypes", data => {
    //   this.getArticle(data);
    // });
  }
};
</script>

<style lang="less" scoped>
.content-article {
  background-color: #fff;
  height: 155px;
  @media screen and (min-width: 992px) {
    margin: 0 0 30px 0;
    padding: 0 0 30px 0;
    border-bottom: 1px solid #f1f3f5;
  }
}
.article-left {
  display: none;
  @media screen and (min-width: 992px) {
    position: relative;
    display: block;
    float: left;
    width: 192px;
    margin-right: -192px;
  }
  .page-img {
    cursor: pointer;
    text-decoration: none;
    color: #212529;
    background-color: transparent;
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
      border-style: none;
      height: 120px;
    }
  }
}
.article-right {
  width: 100%;
  @media screen and (min-width: 992px) {
    box-sizing: border-box;
    float: right;
  }
  .article-text {
    display: block;
    @media screen and (min-width: 992px) {
      margin-left: 212px;
    }
    .article-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      a {
        cursor: pointer;
        text-decoration: none;
        color: #212529;
        background-color: transparent;
        touch-action: manipulation;
      }
    }
    .list-text {
      margin-bottom: 10px;
      color: #868e96;
      // min-height: 50px;
      max-height: 60px;
      overflow: hidden;
      @media screen and (min-width: 992px) {
        min-height: 50px;
      }
    }
    .list-meta {
      font-size: 12px;
      line-height: 14px;
      color: #868e96;
      .page-top {
        font-size: 12px;
        font-style: normal;
        line-height: 14px;
        display: block;
        float: left;
        width: 14px;
        height: 14px;
        margin-right: 4px;
        text-align: center;
        color: #fff;
        border-radius: 2px;
      }
      .bg-danger {
        background-color: #fa5252 !important;
      }
      .float-left {
        float: left !important;
      }
      .mr-small {
        margin-right: 10px !important;
      }
    }
    // .list-meta::after{
    //     display: block;
    // clear: both;
    // content: "";
    // }
  }
}
.article-right::after {
  display: block;
  clear: both;
  content: "";
}
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
    min-height: 155px;
    background-color: #fff;

    // }
  }
}
.ad-tips {
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
}
.detail-top {
  .img-left {
    width: 100px;
    height: 100px;
    display: inline-block;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      border: none;
    }
    .app-name {
      display: block;
      height: 34px;
      line-height: 34px;
      font-size: 16px;
      font-weight: 700;
      color: #36aafd;
      margin-top: 10px;
    }
  }
  .parameter {
    margin-left: 140px;
    margin-top: -147px;
    ul {
      width: 600px;
      li {
        float: left;
        list-style: none;
            width: 200px;
        padding: 10px;
        .item-tag {
          font-size: 12px;
          color: #9e9e9e;
        }
        .item-text {
          padding-left: 5px;
          font-size: 12px;
          color: #525252;
        }
      }
    }
    ul::after {
      display: block;
      content: "";
      height: 0;
      visibility: hidden;
      overflow: hidden;
      clear: both;
    }
  }
}
.az_btn {
  position: relative;
  margin-top: 50px;
  background: #29cc96;
  // float: left;
  width: 152px;
  height: 50px;
  border-radius: 4px;
  margin-right: 10px;
  box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  a {
    cursor: pointer;

    p {
      width: 150px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      float: left;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin: 11px 0;
      border-right: 1px solid #fff;
    }
    span {
      display: block;
      float: left;
      margin: 14px 0 0 13px;
      background: url(https://www.app522.com/templates/pc/images/ico-img3.png)
        no-repeat;
      height: 24px;
      width: 24px;
      background-position: 0 -161px;
    }
  }
}
.detail-bottom {
  .app-introduce {
    margin-bottom: 40px;
    .detail-title {
      font-size: 18px;
      font-weight: 600;
    }
    .detail-context {
      margin: 10px;
      color: #848484;
      letter-spacing: 1px;
      ul {
        li {
          list-style: none;
          display: inline-block;
          padding: 10px;
          span {
            color: #000;
          }
          img {
            height: 442px;
            width: 220px;
          }
          div {
            text-align: center;
          }
        }
      }
    }
  }
}
.qrcodeDiv {
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 200px;
  border-radius: 5px;
  text-align: center;
  border: 2px solid #ddd;
  width: 150px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
  .qrcode-text {
    height: 30px;
    line-height: 30px;
    width: 150px;
    margin-left: -2px;
    background: #29cc96;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
}
.detaill-rate{
  font-size: 12px;
  display: inline-block;
}
</style>
