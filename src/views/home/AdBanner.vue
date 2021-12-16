<template>
  <div class="layout">
    <Header class="layout-header-bar">
      <div class="zm-banner">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in bannerData"
              :key="index"
            >
              <a :href="item.routerUrl">
                <img :src="item.url" :alt="item.name" :title="item.name" />
              </a>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>

        <!-- banner中的输入框 -->
        <!-- <Row class="zm-banner-input">
              <Col span="8" class="banner-input-Col">
                <Input
                  size="large"
                  search
                  enter-button
                  placeholder="输入行业或职业名，寻找属于您的专属简历模板"
                />
              </Col>
            </Row> -->
      </div>
    </Header>
  </div>
</template>
<script>
// import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
import Bus from "@/assets/event-bus.js";
export default {
  name: "AdBanner",
  components: {},
  data() {
    return {
      bannerData: [],
 
    };
  },
  methods: {
    // 获取banner数据
    getData(flag) {
      this.axios
        .get(`${this.baseUrl}/banners/get`, {
          params: {
            flag: flag
          }
        })
        .then(res => {
          this.bannerData = res.data.resulet;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  mounted() {
 
  //   var mySwiper = new Swiper(".swiper-container", {
  //     autoplay: true,
  //     delay: 2000, //2秒切换一次
  //     loop: true,
  //     // 如果需要分页器
  //     pagination: {
  //       el: ".swiper-pagination"
  //     },
  //     observer: true, //修改swiper自己或子元素时，自动初始化swiper
  //     observeParents: true //修改swiper的父元素时，自动初始化swiper
  //   });
  //   this.getData("all");
  }
};
</script>

<style lang="less" scoped>
.layout-header-bar {
  background: #eeeeee;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
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
.layout-header-bar {
  height: 400px;
}

.zm-banner {
  img {
    width: 100%;
    height: 350px;
  }
}
.swiper-pagination {
  position: relative;
  margin-top: -25px;
}
.layout-header-bar {
  // height: 500px;
  // margin-top: 64px;
}
</style>