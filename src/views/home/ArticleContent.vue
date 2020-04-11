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
        <!-- <AdBanner></AdBanner>
        <AdTipRow></AdTipRow> -->

        <Content :style="{ minHeight: '220px' }" class="ad-content">
          <div class="ad-content-div">
            <div class="ad-content-left">
              <div class="content-box">
                <!-- 文章标题 -->
                <div>
                  <h2 class="log-title">{{ articleObj.title }}</h2>
                  <div class="log-meta clearfix">
                    <span>{{ articleObj.autor }}</span>
                    <span>{{ articleObj.times }}</span>
                    <span>{{ articleObj.Pageview }}次浏览</span>
                  </div>
                </div>
                <VueMarkdown
                  class="content-page"
                  :source="articleObj.content"
                ></VueMarkdown>
              </div>
            </div>
            <div>
              <ArticleRight></ArticleRight>
            </div>
          </div>
        </Content>
      </Layout>

      <AdFooter></AdFooter>
    </Layout>
  </div>
</template>

<script>
import AdHeader from "./AdHeader";
import AdBanner from "./AdBanner";
import AdTipRow from "./AdTipRow";

import AdFooter from "./AdFooter";
import ArticleRight from "./ArticleRight";
import VueMarkdown from "vue-markdown";

export default {
  name: "ArticleContent",
  components: {
    AdHeader,
    AdBanner,
    AdTipRow,

    AdFooter,
    ArticleRight,
    VueMarkdown
  },
  data() {
    return {
      // isCollapsed: false,
      // value3: 0,
      // showArticle: false,
      articleObj: {}
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    getArticle(index, types, idIndex) {
      this.axios
        .get("articles/get", {
          params: {
            // pageSize: this.pageSize,
            // currentPage:this.currentPage,
            userName: "longwei",
            flag: types, //all表示所有文章
            idIndex: idIndex
          }
        })
        .then(res => {
          this.articleObj = res.data.resulet;
          this.articleObj.Pageview = res.data.resulet.Pageview + 1;
          this.submit();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 增加阅读量
    submit() {
      // 如果id存在就是修改，如果id不存在就是新增
      // 拼装article数据
      let article = {};
      article[this.articleObj.types] = [this.articleObj];
      // console.log(article);
      this.axios
        .post("http://localhost:3001/articles/post", {
          data: {
            userName: "longwei",
            types: this.articleObj.types,
            id: this.articleObj.id,
            article: article
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            // this.$message.success('发布成功');
          } else {
            // this.$message.error('发布失败' + res.data.msg);
          }
        })
        .catch(err => {
          // this.$message.error('发布失败' + err);
        });
    }
  },
  mounted() {
    console.log(typeof this.$route.query.articleIndex);
    // this.articleIndex = this.$route.query.articleIndex;
    this.getArticle(
      this.$route.query.articleIndex,
      this.$route.query.types,
      this.$route.query.idIndex
    );
  }
};
</script>

<style lang="less" scoped>
// 内容区
.ad-content {
  margin-top: 40px;
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
        margin-right: 0;
        margin-bottom: 20px;
        margin-left: 0;
        padding: 30px;
        background-color: #fff;
        // 标题
        .log-title {
          color: #212529;
          font-weight: 700;
          margin-bottom: 10px;
          @media screen and (min-width: 992px) {
            font-size: 24px;
          }
        }
        // 标记，时间，作者
        .log-meta {
          font-size: 12px;
          margin-bottom: 20px;
          color: #868e96;
          @media screen and (min-width: 992px) {
            margin-bottom: 30px;
          }
          span {
            float: left;
            margin-right: 10px;
          }
        }
        .clearfix::after {
          display: block;
          clear: both;
          content: "";
        }
        .content-page {
          // word-break: break-all !important;
          // @media screen and (min-width: 992px) {
          //   margin-right: 0;
          //   margin-left: 0;
          //   padding: 40px;
          // }
          // 对文档的特殊标签进行处理
          /deep/ code {
            display: inline-block;
            word-break: break-all !important;
            // @media screen and (min-width: 576px) {
            //   width: 400px;
            // }
            // @media screen and (min-width: 768px) {
            //   width: 720px;
            // }
          }
          /deep/ img {
            margin: 0 auto;
            max-width: 80%;
          }
        }
      }
    }
  }
}
</style>
