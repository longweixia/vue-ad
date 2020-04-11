<template>
  <div class="content-article">
    <!-- <Home1></Home1> -->
    <div class="article-left">
      <a
        @click="gotoContent"
        class="page-img"
        ><img
          :src="articleObj.coverImage"
          alt="读完百度优质内容指南的一点感悟"
      /></a>
    </div>
    <div class="article-right">
      <div class="article-text">
        <div class="article-title">
          <a @click="gotoContent">{{ articleObj.title }}</a>
        </div>
        <div class="list-text">
          <VueMarkdown
            class="content-page"
            :source="articleObj.content"
          ></VueMarkdown>
        </div>
        <div class="list-meta">
          <i class="page-top bg-danger">{{articleObj.tag}}}</i>
          <span class="float-left mr-small">{{ articleObj.autor }}</span
          >{{ articleObj.times }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Home1 from './Home1';
import VueMarkdown from "vue-markdown";
export default {
  name: "Article",

  props: ["articleIndex", "articleObj"],
  components: { VueMarkdown },
  data() {
    return {};
  },
  computed: {},
  methods: {
    // 进入文章详情
    gotoContent() {
      this.$router.push({
        path: "/articleContent",
        query: {
          articleIndex: this.articleIndex,
          types:this.articleObj.types,
          idIndex:this.articleObj.idIndex

        }
      });
    }
  },
  mounted() {}
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
</style>
