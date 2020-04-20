<template>
  <div class="col-right d-none d-lg-block" style="">
    <a :href="listTop.routerUrl" rel="nofollow" target="_blank"
      ><img style="width:100%" :src="listTop.url" :alt="listTop.name"
    /></a>
    <div class="sidebar-box">
      <h4 class="sidebar-title">随机文章</h4>
      <div class="sidebar-log">
        <ul>
          <li v-for="(item, index) in random" :key="index">
            <a @click="gotoContent(1, item.types, item.idIndex)">{{
              item.title
            }}</a>
          </li>
          <!-- <li>
            <a href="http://www.shukoe.com/post-164.html"
              >香港电影中的迁徙往事</a
            >
          </li>
          <li>
            <a href="http://www.shukoe.com/post-165.html"
              >毕业后选择西安，你有后悔过吗？</a
            >
          </li>
          <li>
            <a href="http://www.shukoe.com/post-167.html"
              >小黑记事本怎么卸载？</a
            >
          </li>
          <li><a href="http://www.shukoe.com/post-168.html">文字的构成</a></li>
          <li>
            <a href="http://www.shukoe.com/post-169.html"
              >搜狗联盟怎么申诉解封？</a
            >
          </li>
          <li>
            <a href="http://www.shukoe.com/post-170.html"
              >百度广告联盟点击率怎么控制？</a
            >
          </li>
          <li>
            <a href="http://www.shukoe.com/post-171.html"
              >360有钱和2345联盟哪个比较赚钱</a
            >
          </li>
          <li>
            <a href="http://www.shukoe.com/post-172.html"
              >分享广告联盟系统的源码</a
            >
          </li>
          <li>
            <a href="http://www.shukoe.com/post-173.html"
              >360联盟注册账号出现问题怎么办？</a
            >
          </li> -->
        </ul>
      </div>
    </div>
    <div class="sidebar-box1">
      <h4 class="sidebar-title">左邻右舍</h4>
      <div class="sidebar-link">
        <ul class="clearfix">
          <li v-for="(item,index) in linkList" :key="index">
            <a :href="item.url" :title="item.name" target="_blank"
              >{{item.name}}</a
            >
          </li>
         
        </ul>
      </div>
    </div>
    <div id="sticky-wrapper" class="sticky-wrapper" style="height: 209px;">
      <div class="sidebar-box js_asd_bottom" style="width: 300px;">
        <div class="sidebar-custom">
          <a :href="listBottom.routerUrl" rel="nofollow" target="_blank"
            ><img :src="listBottom.url" :alt="listBottom.name"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import VueMarkdown from 'vue-markdown';
// import README from './README.md';
export default {
  name: "ArticleRight",
  // props:["random"],
  data() {
    return {
      listTop: {},
      listBottom: {},
      random: [],
      linkList:[]
    };
  },
  methods: {
    // 进入文章详情
    gotoContent(articleIndex, types, idIndex) {
      const { href } = this.$router.resolve({
        path: "/articleContent",
        query: {
          articleIndex: articleIndex,
          types: types,
          idIndex: idIndex
        }
      });
      window.open(href, "_blank");

      // this.$router.push({
      //   path: "/articleContent",
      //   query: {
      //     articleIndex: articleIndex,
      //     types:types,
      //     idIndex:idIndex
      //   }
      // });
    },
    // 获取侧边栏广告图
    getData(flag) {
      this.axios
        .get(`${this.baseUrl}/sidebarAdImgs/get`, {
          params: {
            flag: flag
          }
        })
        .then(res => {
          let list = res.data.resulet;
          list.forEach((item, index) => {
            if (item.types == "top" && item.show == 1) {
              this.listTop = item;
            } else if (item.types == "buttom" && item.show == 1) {
              this.listBottom = item;
            }
          });
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 获取友情链接
    getLink() {
      this.axios
        .get(`${this.baseUrl}/friendLinks/get`)
        .then(res => {
          this.linkList = res.data.resulet;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
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
          res.data.resulet.forEach((item, index) => {
            let obj = {
              idIndex: item.idIndex,
              types: item.types,
              title: item.title
            };
            this.random.push(obj);
          });
          // 取第6篇文章开始取
          // this.random = this.random.splice(6, 12);
           this.random = this.random.splice(1, 3);
          this.random = this.random.sort(() => Math.random() - 0.5);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  computed: {},
  mounted() {
    this.getData("all");
    this.getArticle("all");
    this.getLink();
  }
};
</script>

<style lang="less" scoped>
.d-none {
  display: none !important;
}
.d-lg-block {
  @media screen and (min-width: 992px) {
    display: block !important;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    color: #212529;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    img {
      vertical-align: middle;
      border-style: none;
    }
  }
  .sidebar-box {
    margin-bottom: 20px;
    padding: 30px;
    background-color: #fff;
    .sidebar-title {
      font-weight: 700;
      line-height: 2;
      margin-bottom: 10px;
    }
    h4 {
      font-size: 18px;
    }
    ul {
      padding-left: 0;
      list-style: none;
      margin-top: 0;
      margin-bottom: 0;
      li {
        border-bottom: 1px dashed #e9ecef;
        display: list-item;
        text-align: -webkit-match-parent;

        a {
          line-height: 35px;
          display: block;
          overflow: hidden;
          height: 35px;
        }
      }
    }
  }
  .sidebar-box1 {
    margin-bottom: 20px;
    padding: 30px;
    background-color: #fff;
    .sidebar-title {
      font-weight: 700;
      line-height: 2;
      margin-bottom: 10px;
    }
    h4 {
      font-size: 18px;
    }
    .sidebar-link {
      padding-top: 10px;
      ul {
        padding-left: 0;
        list-style: none;
        margin-top: 0;
        margin-bottom: 0;
        li {
          float: left;
          display: list-item;
          text-align: -webkit-match-parent;
          width: 50%;
          a {
            line-height: 2;
            display: block;
            overflow: hidden;
          }
        }
        li:nth-child(2n-1) {
          padding-right: 5px;
        }
      }
      .clearfix::after {
        display: block;
        clear: both;
        content: "";
      }
    }
  }
}
.col-right {
  float: left;
  width: 100%;
  min-height: 1px;
  padding-right: 10px;
  padding-left: 10px;
  @media screen and (min-width: 992px) {
    width: 320px;
  }
  @media screen and (min-width: 1200px) {
    width: 320px;
  }
}
.sidebar-box {
  margin-bottom: 20px;
  padding: 30px;
  background-color: #fff;
  a {
    cursor: pointer;
    text-decoration: none;
    color: #212529;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    img {
      max-width: 100%;
      height: auto;
      vertical-align: middle;
      border-style: none;
    }
  }
}
</style>
