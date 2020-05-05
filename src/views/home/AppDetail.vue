<template>
  <div class="content-article">
    <Home1 :isBanner="false" :isAdTipRow="false" :adTip="adTip">
      <div slot="article">
        <Breadcrumb>
          <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon> 首页
          </BreadcrumbItem>
          <BreadcrumbItem to="TemplateMall">
            <Icon type="logo-buffer"></Icon> 模板商城
          </BreadcrumbItem>
        </Breadcrumb>
        <div v-if="showTips" class="ad-tips content-left ad-content-left">
          该分类下暂无数据，您可以查看其它分类
        </div>
        <div v-if="!showTips" class="ad-content-left">
          <div>
            <div
              class="content-box"
              v-for="(item, index) in articleObj"
              :key="index"
            >
              <div class="detail-box Top_info info_L">
                <div class="Top_info info_L">
                  <div class="info">
                    <div class="img bt">
                      <img
                        src="https://www.app522.com/upload/img/2019/10/09/5d9dcf9c4a336.jpg"
                        alt="惠人赚"
                      />
                      <h1>惠人赚</h1>
                    </div>
                    <div class="info_cent">
                      <ul >
                        <li v-for="(item, index) in tagList" :key="index">
                          <span>{{ item.tag }}：</span>
                          <p>{{ item.text }}</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="bq"></div>
                  <div class="btnwrap">
                    <div class="btn az_btn ">
                      <a
                        href="/download.php?id=59131"
                        rel="nofollow"
                        target="blank"
                        ><p style="width: 103px">进入下载</p>
                        <span></span
                      ></a>
                      <div class="ewmwrap">
                        <!-- <div
                          id="qrcode"
                          title="https://www.app522.com/down/18073.html"
                        >
                          <canvas
                            width="120"
                            height="120"
                            style="display: none;"
                          ></canvas
                          ><img
                            src="data:image/png;base64,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"
                            style="display: block;"
                          />
                        </div> -->
                        <p>手机扫描下载</p>
                      </div>
                    </div>
                  </div>
                  <span class="title expand-btn"
                    ><i class="arrow arrow-down"></i><i class="icon"></i>
                    <h2>惠人赚</h2>
                    试玩介绍</span
                  >
                  <div class="app-detail-intro expand-panel">
                    惠人赚app是一款专注于游戏<a
                      href="https://www.app522.com/down/ios/"
                      target="_blank"
                      >试玩</a
                    >挂机自动<a
                      href="https://www.app522.com/down/ios/"
                      target="_blank"
                      >赚钱</a
                    >的APP。惠人赚是贵州书辉文化传媒有限公司旗下的一款游戏试玩APP。试玩游戏，享受游戏的乐趣
                    ，赚钱零花钱，利用闲时间赚钱。随手做几个任务，新手一元提现，随时可提现。<br />
                    <br />
                    【赚钱特点】<br />
                    1、新手注册一元提现。<br />
                    2、新用户注册送0.88元红包。<br />
                    3、签到送现金红包，人人有份。<br />
                    4、推荐好友，好友完成一元提现任务，奖励1元红包，上不封顶。<br />
                    5、推荐好友，好友每完成一个任务，奖励0.25元，上不封顶。<br />
                    <br />
                    【赚钱亮点】<br />
                    1、想要赚钱的吗？不管你是做什么的，都是可以在这里赚钱的呀；<br />
                    2、不管你是什么时候做，都有超级多的任务在这里等着你的哦，自己可以随意的前来选择；<br />
                    3、想要做<a
                      href="https://www.app522.com/down/ios/"
                      target="_blank"
                      >兼职</a
                    >的小伙伴不妨前来考虑一下，没有固定的时间，想要赚钱还是一件简单的事情的呢。<br />
                    <br />
                    【联系我们】<br />
                    惠人赚官方联系QQ：937598093<br />
                    惠人赚官方联系微信：zxhy1611
                  </div>
                  <span class="title"
                    ><i class="icon"></i>
                    <h2>惠人赚</h2>
                    赚钱截图</span
                  >
                  <div id="J_Screenshot" class="screen-shots" style="">
                    <a href="javascript:;" class="prev none"
                      ><i class="icon"></i></a
                    ><a href="javascript:;" class="next"
                      ><i class="icon"></i
                    ></a>
                    <div class="gallery-box">
                      <ul class="gallery clearfix">
                        <li>
                          <img
                            src="/upload/img/2019/10/09/5d9dcfa0b84db.jpg"
                            alt="惠人赚"
                          />
                        </li>
                        <li>
                          <img
                            src="/upload/img/2019/10/09/5d9dcfa3243f1.jpg"
                            alt="惠人赚"
                          />
                        </li>
                        <li>
                          <img
                            src="/upload/img/2019/10/09/5d9dcfa5964d8.jpg"
                            alt="惠人赚"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="article-left">
                <a @click="gotoContent(iitem, index)" class="page-img"
                  ><img :src="item.coverImage"
                /></a>
              </div> -->
              <!-- <div class="article-right">
                <div class="article-text">
                  <div class="article-title">
                    <a @click="gotoContent(item, index)">{{ item.title }}</a>
                  </div>
                  <div class="list-text">
                    
                    <div class="content-page">111</div>
                  </div>
                  <div class="list-meta">
                    <i class="page-top bg-danger">{{ item.tag }}</i>
                    <span class="float-left mr-small">{{ item.autor }}</span
                    >{{ item.times }}
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </Home1>
  </div>
</template>

<script>
import Home1 from "./Home1";
import VueMarkdown from "vue-markdown";
import Bus from "@/assets/event-bus.js";
export default {
  name: "AppDetail",

  props: [],
  components: { VueMarkdown, Home1 },
  data() {
    return {
      tagList: [
        {
          tag: "分类",
          text: "安卓赚钱"
        },
        {
          tag: "提现",
          text: "无门槛"
        },
        {
          tag: "系统",
          text: "安卓苹果"
        },
        {
          tag: "分类",
          text: "安卓赚钱"
        },
        {
          tag: "分类",
          text: "安卓赚钱"
        },
        {
          tag: "分类",
          text: "安卓赚钱"
        },
        {
          tag: "分类",
          text: "安卓赚钱"
        },
        {
          tag: "分类",
          text: "安卓赚钱"
        },
      ],
      adTip: "",
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
      ]
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
    getArticle(flag) {
      this.axios
        .get(`${this.baseUrl}/articles/get`, {
          //接全部改成模板字符创
          params: {
            // pageSize: this.pageSize,
            // currentPage:this.currentPage,
            userName: "longwei",
            flag: flag //all表示所有文章
          }
        })
        .then(res => {
          //一开始要查所有数据的长度，用来传给文章底部的上一篇下一篇时，判断当前文章是不是最后一篇
          res.data.resulet.length > 0
            ? (this.showTips = false)
            : (this.showTips = true);
          this.articleObj = res.data.resulet;
          console.log(this.articleObj, "打印文章数据");
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
    }
  },
  mounted() {
    if (this.$route.query.type) {
      //点击非首页导航
      this.isBanner = false;
      this.isAdTipRow = false;
      this.adTip = this.$route.query.type;
      //  this.getArticle(this.$route.query.type)
    } else {
      this.isBanner = true;
      this.isAdTipRow = true;
      this.adTip = "all";
      // this.getArticle("all")
    }
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
// ---------------------
.detail.detail-page .detail-box,
.detail.detail-page .detail-side {
  zoom: 1;
  -moz-transform: scale(1);
  -moz-transform-origin: top center;
}
.detail .detail-box {
  float: left;
  width: 780px;
  min-height: 600px;
  background: #fff;
  border-radius: 2px;
  padding: 28px;
}
.Top_info {
  width: 100%;
  min-height: 290px;
  border-bottom: 1px solid #f0f1f7;
}

.Top_info .info {
  float: left;
  width: 100%;
  min-height: 100px;
}
.Top_info .info .img {
  width: 120px;
  text-align: center;
}
.Top_info .info .img {
  float: left;
  margin-right: 15px;
}
.Top_info .bt {
  width: 100%;
  height: 34px;
  float: left;
}
.Top_info .info .img img {
  margin-right: 15px;
  margin: 0 auto;
}
.alllist_app img,
.icon-wrap img,
.info_L .info img {
  transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -webkit-transition: all 0.5s ease-out;
  border-radius: 10px;
}
.alllist_app img,
.icon-wrap img,
.info_L .info img {
  transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -webkit-transition: all 0.5s ease-out;
  border-radius: 10px;
}
.info img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
img {
  vertical-align: middle;
}
fieldset,
iframe,
img {
  border: 0 none;
}
.Top_info .bt h1,
.Top_info .bt p {
  display: block;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  font-weight: 700;
  color: #36aafd;
  margin-top: 10px;
  max-width: 580px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: 400;
}
.Top_info .info .info_cent {
  float: right;
  width: 600px;
  min-height: 90px;
}
li,
ol,
ul {
  list-style: none;
}
.Top_info .info .info_cent ul li {
  // width: 100%;
  display: block;
  float: left;
  min-height: 26px;
  line-height: 26px;
  font-size: 12px;
  margin: 4px 0;
}
li,
ol,
ul {
  list-style: none;
}
.Top_info .info .info_cent ul li span {
  width: 50px;
  color: #9e9e9e;
}
.Top_info .info .info_cent ul li span,
.Top_info .info .info_cent ul li p {
  display: block;
  float: left;
}
.Top_info .info .info_cent ul li p {
  min-width: 140px;
  max-width: 100%;
  height: 26px;
  overflow: hidden;
  margin: 0 4px;
  color: #525252;
}
.Top_info .info .info_cent ul li span,
.Top_info .info .info_cent ul li p {
  display: block;
  float: left;
}
.Top_info .bq {
  float: left;
  width: 100%;
  height: 15px;
  overflow: hidden;
  margin: 10px 0;
}
.Top_info .btnwrap {
  float: left;
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 25px;
}
.Top_info .btnwrap .az_btn {
  background: #29cc96;
}
.Top_info .btnwrap .az_btn {
  background: #29cc96;
}
.Top_info .btnwrap > div {
  float: left;
  width: 152px;
  height: 50px;
  border-radius: 4px;
  margin-right: 10px;
  box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, 0.1);
  position: relative;
}
</style>
