<template>
  <Footer class="layout-footer-center">
    <div class="container">
      <div class="row">
        <div class="col">
          <a rel="nofollow" href="http://www.shukoe.com" target="_blank"
            >广告联盟</a
          >
          <a rel="nofollow" href="http://www.shukoe.com" target="_blank"
            >点击广告联盟</a
          >
          <a rel="nofollow" href="http://www.shukoe.com/about" target="_blank"
            >关于我们</a
          >
          <a rel="nofollow" href="http://beian.miit.gov.cn/" target="_blank"
            >陕ICP备16015507号</a
          >
          <span>©&nbsp;广告联盟大事记&nbsp;</span>
        </div>
      </div>
    </div>
  </Footer>
</template>
<script>
export default {
  name: "AdFooter",
  data() {
    return {};
  },
  computed: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.layout-footer-center {
  text-align: center;
  line-height: 35px;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  color: #adb5bd;
  background-color: #343a40;
  .container {
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
    .row {
      margin-right: -10px;
      margin-left: -10px;
      .col {
        width: 100%;
        float: left;
        min-height: 1px;
        padding-right: 10px;
        padding-left: 10px;
        a {
          display: none;
          @media screen and (min-width: 992px) {
            display: block;
            float: left;
            margin-right: 15px;
            color: #adb5bd;
          }
        }
        span {
          @media screen and (min-width: 992px) {
            float: right;
          }
        }
      }
    }
    .row::after {
      display: block;
      clear: both;
      content: "";
    }
  }
}
</style>
