<template>
       <div class="index-brand">
          <div class="ad-content-top">
            <Row type="flex">
              <Col span="6" order="4" class="ad-col last-ad-col">
                <h3>全新首页，二次知识革命</h3>
                <span>十年磨一剑，未来的路还远</span></Col
              >
              <Col span="6" order="3" class="ad-col">
                <h3>资源整合，助力个人站长</h3>
                <span>庐山真面目，分享业界资讯</span></Col
              >
              <Col span="6" order="2" class="ad-col">
                <h3>宾至如归，只为你的体验</h3>
                <span>谈笑有鸿儒，广告联盟赚钱</span></Col
              >
              <Col span="6" order="1" class="ad-col">
                <h3>踌躇满志，赋能新的方向</h3>
                <span>行行出状元，专注广告联盟</span>
              </Col>
            </Row>
          </div>
    
  </div>
</template>
<script>
export default {
  name: "AdTipRow",
  components: {},
  data() {
    return {};
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
.index-brand {
  display: none;
  @media screen and (min-width: 992px) {
    display: block;
    margin-bottom: 20px;
    background-color: #f5f5f5;
  }
  .ad-content-top {
    margin-right: auto;
    margin-left: auto;
    padding-right: 10px;
    padding-left: 10px;

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
    .ad-col {
      @media (min-width: 992px) {
        width: 25%;
        padding: 30px 20px;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        border-bottom: 1px solid #e9ecef;
        border-left: 1px solid #e9ecef;
      }
    }
    .last-ad-col {
      @media (min-width: 992px) {
        border-right: 1px solid #e9ecef;
      }
    }
    .ad-col:hover {
      @media (min-width: 992px) {
        background-color: #fff;
        -webkit-box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>