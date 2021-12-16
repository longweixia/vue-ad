<template>
  <div class="content-article">
    <Home1 :isBanner="isBanner" :isAdTipRow="isAdTipRow" :adTip="adTip">
      <div slot="article">
        <div v-if="showTips" class="ad-tips content-left ad-content-left">该分类下暂无数据，您可以查看其它分类</div>
        <div v-if="!showTips" class="ad-content-left">
          <div>
            <div v-for="(item, index) in articleObj" :key="index">
              <div v-if="item.show" class="content-box">
                <div class="article-left">
                  <a @click="gotoContent(iitem, index)" class="page-img">
                    <img :src="item.coverImage" alt="内容无法展示..." />
                  </a>
                </div>
                <div class="article-right">
                  <div class="article-text">
                    <div class="article-title">
                      <a @click="gotoContent(item, index)">{{ item.title }}</a>
                    </div>
                    <div class="list-text">
                      <!-- <VueMarkdown
                      class="content-page"
                      :source="item.content"
                    ></VueMarkdown> -->
                    </div>
                    <div class="list-meta">
                      <i class="page-top bg-danger">{{ item.tag }}</i>
                      <span class="float-left mr-small">{{ item.autor }}</span>
                      {{ item.times }}
                    </div>
                  </div>
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
import Home1 from './Home1'
// import VueMarkdown from "vue-markdown";
import Bus from '@/assets/event-bus.js'
export default {
  name: 'Article',

  props: [],
  components: { Home1 },
  data() {
    return {
      adTip: '',
      isBanner: false,
      isAdTipRow: false,
      articleList: [],
      showTips: false, //是否显示没有内容的提示
      articleLength: 1, //文章长度
      articleIndex: 0,
      articleObj: [
        {
          coverImage: '',
          title: '',
          content: '',
          tag: '',
          autor: '',
          times: '',
        },
      ],
    }
  },
  computed: {},
  watch: {
    $route: {
      //同一个路由，参数不同会触发这里
      handler() {
        if (this.$route.query.type) {
          //点击非首页导航
          this.isBanner = false
          this.isAdTipRow = false
          this.adTip = this.$route.query.type
          this.getArticle(this.$route.query.type)
        } else {
          this.isBanner = true
          this.isAdTipRow = true
          this.adTip = 'all'
          this.getArticle('all')
        }
      },
      deep: true,
    },
  },
  methods: {
    getArticle(flag) {
      this.axios
        .get(`${this.baseUrl}/articles/get`, {
          //接全部改成模板字符创
          params: {
            // pageSize: this.pageSize,
            // currentPage:this.currentPage,
            userName: 'longwei',
            flag: flag, //all表示所有文章
          },
        })
        .then((res) => {
          //一开始要查所有数据的长度，用来传给文章底部的上一篇下一篇时，判断当前文章是不是最后一篇
          res.data.resulet.length > 0 ? (this.showTips = false) : (this.showTips = true)
          this.articleObj = res.data.resulet
          console.log(this.articleObj, '打印文章数据')
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    // 进入文章详情
    gotoContent(item, index) {
      //拼装上一页，下一页数据
      let nextidIndex = this.articleObj[index - 1] ? this.articleObj[index - 1].idIndex : -1
      let nextname = this.articleObj[index - 1] ? this.articleObj[index - 1].title : -1
      let preidIndex = this.articleObj[index + 1] ? this.articleObj[index + 1].idIndex : -1
      let prename = this.articleObj[index + 1] ? this.articleObj[index + 1].title : -1
      let nextPre = {
        nextidIndex: nextidIndex,
        nextname: nextname,
        preidIndex: preidIndex,
        prename: prename,
      }
      this.$router.push({
        path: '/articleContent',
        query: {
          // vue路由传对象刷新会报错，数据丢失，用json字符串解决
          // articleObj:encodeURIComponent(JSON.stringify(item)),
          idIndex: this.articleObj[index].idIndex,
          types: this.articleObj[index].types,

          nextPre: encodeURIComponent(JSON.stringify(nextPre)), //上一页下一页数据
        },
      })
    },
  },
  mounted() {
    if (this.$route.query.type) {
      //点击非首页导航
      this.isBanner = false
      this.isAdTipRow = false
      this.adTip = this.$route.query.type
      this.getArticle(this.$route.query.type)
    } else {
      this.isBanner = true
      this.isAdTipRow = true
      this.adTip = 'all'
      this.getArticle('all')
    }
    // this.getArticle("all");
    // Bus.$on("getTypes", data => {
    //   this.getArticle(data);
    // });
  },
}
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
    // float: right;
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
         padding: 1px;
        font-size: 12px;
        font-style: normal;
        // line-height: 14px;
        display: block;
        float: left;
        // width: 14px;
        // height: 14px;
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
        height: 16px;
        line-height: 16px;
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
.ad-tips{
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
}
</style>
